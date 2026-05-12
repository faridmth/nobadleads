"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

const SR_KEY_STORAGE = "nobadleads:sr-key";
const TRIAL_HIT_STORAGE = "nobadleads:trial-hit";
const ICP_KEY = "nobadleads:icp-prompt";

// Per-run free trial: each click of Score gives the user up to this many leads
// for free (using our Screenshot Render key) when they have no key of their own.
const FREE_PER_RUN = 10;

export default function ToolPage() {
  // settings / screenshotrender key
  const [srKey, setSrKey] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsMode, setSettingsMode] = useState("default");
  // Once the user hits the trial limit at least once, we stick a permanent
  // reminder pill on the page until they add their own key.
  const [trialHit, setTrialHit] = useState(false);

  // ICP
  const [icpPrompt, setIcpPrompt] = useState("");
  const [promptSaved, setPromptSaved] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState(null);
  // Keep the pre-enhance draft so the user can undo within a short window
  const [preEnhanceDraft, setPreEnhanceDraft] = useState(null);

  // leads
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [linkColumn, setLinkColumn] = useState(undefined);

  // run
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const cancelRef = useRef(false);

  /* ---- helpers ---- */
  const openSettings = useCallback((mode = "default") => {
    setSettingsMode(mode);
    setSettingsOpen(true);
    if (mode === "trial_ended") {
      setTrialHit(true);
      localStorage.setItem(TRIAL_HIT_STORAGE, "1");
    }
  }, []);

  const stopRun = useCallback(() => {
    cancelRef.current = true;
    setRunning(false);
  }, []);

  /* ---- load from localStorage ---- */
  useEffect(() => {
    const k = localStorage.getItem(SR_KEY_STORAGE);
    if (k) setSrKey(k);
    const t = localStorage.getItem(TRIAL_HIT_STORAGE);
    if (t === "1") setTrialHit(true);
    const p = localStorage.getItem(ICP_KEY);
    if (p) setIcpPrompt(p);
  }, []);

  useEffect(() => {
    if (srKey) {
      localStorage.setItem(SR_KEY_STORAGE, srKey);
      // Adding a key dismisses the trial reminder permanently
      localStorage.removeItem(TRIAL_HIT_STORAGE);
      setTrialHit(false);
    } else {
      localStorage.removeItem(SR_KEY_STORAGE);
    }
  }, [srKey]);

  useEffect(() => {
    if (!icpPrompt) return;
    const t = setTimeout(() => {
      localStorage.setItem(ICP_KEY, icpPrompt);
      setPromptSaved(true);
      const t2 = setTimeout(() => setPromptSaved(false), 1200);
      return () => clearTimeout(t2);
    }, 400);
    return () => clearTimeout(t);
  }, [icpPrompt]);

  useEffect(() => {
    if (!settingsOpen) return;
    const fn = (e) => e.key === "Escape" && closeSettings();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsOpen]);

  function closeSettings() {
    setSettingsOpen(false);
    setSettingsMode("default");
  }

  async function enhancePrompt() {
    if (!icpPrompt.trim()) {
      toast.error("Write something first, then enhance");
      return;
    }
    setEnhanceError(null);
    setEnhancing(true);
    const original = icpPrompt;
    try {
      const res = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft: icpPrompt }),
      });
      const json = await res.json();
      if (!res.ok || !json.prompt) throw new Error("Error");
      setPreEnhanceDraft(original);
      setIcpPrompt(json.prompt);
      toast.success("Enhanced");
    } catch {
      setEnhanceError("Error");
      toast.error("Could not enhance. Try again.");
    } finally {
      setEnhancing(false);
    }
  }

  function undoEnhance() {
    if (preEnhanceDraft == null) return;
    setIcpPrompt(preEnhanceDraft);
    setPreEnhanceDraft(null);
  }

  const handleFile = useCallback(async (file) => {
    setFileName(file.name);
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
    const cols = json.length > 0 ? Object.keys(json[0]) : [];
    setRows(
      json.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, String(v)])))
    );
    setColumns(cols);
    let guess;
    for (const c of cols) {
      if (/(url|website|site|link|domain)/i.test(c)) {
        guess = c;
        break;
      }
    }
    setLinkColumn(guess);
    setResults([]);
  }, []);

  function clearFile() {
    setRows([]);
    setColumns([]);
    setFileName(null);
    setLinkColumn(undefined);
    setResults([]);
  }

  async function runAll() {
    if (rows.length === 0) {
      toast.error("Upload a spreadsheet of leads first");
      return;
    }
    if (!linkColumn) {
      toast.error("Pick which column holds the website URLs");
      return;
    }
    if (!icpPrompt.trim()) {
      toast.error("Add or draft a scoring prompt first");
      return;
    }
    cancelRef.current = false;
    setRunning(true);
    setExpanded(null);

    // Each run gives the keyless user up to FREE_PER_RUN screenshots on our key
    let freeUsedThisRun = 0;

    const initial = rows.map((r, i) => ({
      index: i,
      row: r,
      url: String(r[linkColumn] || "").trim(),
      status: "pending",
    }));
    setResults(initial);

    for (let i = 0; i < initial.length; i++) {
      if (cancelRef.current) break;

      if (!srKey && freeUsedThisRun >= FREE_PER_RUN) {
        openSettings("trial_ended");
        break;
      }

      const lead = initial[i];
      if (!lead.url) {
        update(i, { status: "error", error: "Missing URL" });
        continue;
      }
      update(i, { status: "screenshotting" });
      try {
        const shot = await fetch("/api/screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: lead.url, apiKey: srKey || undefined }),
        }).then((r) => r.json());

        if (!shot.success) {
          if (shot.code === "credits_exhausted") {
            update(i, { status: "error", error: "Error" });
            openSettings("credits_exhausted");
            stopRun();
            return;
          }
          if (shot.code === "invalid_key") {
            update(i, { status: "error", error: "Error" });
            openSettings("invalid_key");
            stopRun();
            return;
          }
          throw new Error("Error");
        }

        if (shot.usedFreeKey) {
          freeUsedThisRun += 1;
        }

        update(i, {
          screenshotUrl: shot.data.screenshot,
          siteTitle: shot.data.title,
          siteDescription: shot.data.description,
          status: "scoring",
        });

        const extra = {};
        for (const [k, v] of Object.entries(lead.row)) {
          if (k === linkColumn) continue;
          if (v && String(v).trim()) extra[k] = String(v);
        }

        const scoreRes = await fetch("/api/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            screenshotUrl: shot.data.screenshot,
            scoringPrompt: icpPrompt,
            lead: { url: lead.url, extra },
            siteMeta: { title: shot.data.title, description: shot.data.description },
          }),
        }).then((r) => r.json());
        if (scoreRes.error) throw new Error("Error");

        update(i, {
          status: "done",
          score: scoreRes.score,
          reasoning: scoreRes.reasoning,
        });
      } catch {
        update(i, { status: "error", error: "Error" });
      }
    }
    setRunning(false);
  }

  function update(i, patch) {
    setResults((prev) => {
      const next = prev.slice();
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }

  function exportCsv() {
    const exportable = results.filter((r) => r.status !== "error");
    if (exportable.length === 0) return;
    const baseCols = columns;
    const header = [...baseCols, "score", "reasoning"];
    const lines = [header.map(csvCell).join(",")];
    for (const r of exportable) {
      const fields = [
        ...baseCols.map((c) => r.row[c] ?? ""),
        r.score ?? "",
        r.reasoning ?? "",
      ];
      lines.push(fields.map(csvCell).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nobadleads-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* derived */
  const stats = useMemo(() => {
    const done = results.filter((r) => r.status === "done");
    const hot = done.filter((r) => (r.score ?? 0) >= 71).length;
    const warm = done.filter((r) => (r.score ?? 0) >= 31 && (r.score ?? 0) < 71).length;
    const cold = done.filter((r) => (r.score ?? 0) < 31).length;
    const errors = results.filter((r) => r.status === "error").length;
    const avg = done.length
      ? Math.round(done.reduce((s, r) => s + (r.score ?? 0), 0) / done.length)
      : 0;
    return { total: results.length, done: done.length, hot, warm, cold, errors, avg };
  }, [results]);

  const filtered = useMemo(() => {
    if (filter === "all") return results;
    if (filter === "error") return results.filter((r) => r.status === "error");
    return results.filter((r) => {
      if (r.status !== "done" || typeof r.score !== "number") return false;
      if (filter === "hot") return r.score >= 71;
      if (filter === "warm") return r.score >= 31 && r.score < 71;
      if (filter === "cold") return r.score < 31;
      return true;
    });
  }, [results, filter]);

  const linkSet = !!linkColumn;

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <header className="shrink-0 bg-background border-b">
        <div className="px-5 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="inline-flex items-center gap-1 text-sm font-semibold tracking-tight">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-brand h-4.5 w-4.5" aria-hidden>
                <path d="M5 5 L21 7 L19 19 L3 17 Z" />
              </svg>
              <span>nobadleads<span className="text-brand">.</span></span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {trialHit && !srKey && (
              <TrialReminderPill onClick={() => openSettings("trial_ended")} />
            )}
            <HeaderStatus srKey={srKey} onClick={() => openSettings("default")} />
            <button
              onClick={() => openSettings("default")}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-surface text-muted hover:text-foreground transition-colors"
              aria-label="Settings"
              title="Settings"
            >
              <GearIcon />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[440px_1fr] min-h-0 overflow-hidden">
        {/* LEFT */}
        <aside className="flex flex-col border-b lg:border-b-0 lg:border-r min-h-0 max-h-[60vh] lg:max-h-none">
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-7 min-h-0">
            {/* ICP */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-medium">Your ICP</h2>
                  <InfoTip>
                    Describe your business and ideal customer. Used to grade every lead.
                  </InfoTip>
                </div>
                {promptSaved && (
                  <span className="text-[11px] text-muted-soft">Saved</span>
                )}
              </div>
              <p className="text-xs text-muted leading-relaxed -mt-1">
                Describe what you sell and who your ideal customer is. The AI
                uses this to score every lead. Rough notes are fine, then click
                Enhance.
              </p>

              <div className="relative">
                <textarea
                  value={icpPrompt}
                  onChange={(e) => {
                    setIcpPrompt(e.target.value);
                    if (preEnhanceDraft != null) setPreEnhanceDraft(null);
                  }}
                  rows={14}
                  disabled={enhancing}
                  placeholder={`What do you sell, and to whom?\nWhat does a strong fit company look like (industry, size, role, signals)?\nAny red flags that mean someone is a bad fit?\n\nWrite it like you'd explain it to a new sales rep. Don't worry about formatting.`}
                  className="w-full px-3 py-3 pb-12 rounded-md border bg-background text-sm leading-relaxed focus:outline-none focus:border-foreground transition-colors resize-y min-h-56 disabled:opacity-60"
                />

                {enhancing && (
                  <div className="absolute inset-0 rounded-md bg-background/60 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-md border bg-background shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Spinner />
                        <span>
                          Enhancing
                          <DotPulse />
                        </span>
                      </div>
                      <span className="text-[11px] text-muted">
                        Restructuring and sharpening your draft.
                      </span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                  {preEnhanceDraft != null && !enhancing && (
                    <button
                      onClick={undoEnhance}
                      title="Undo enhance"
                      className="h-7 px-2.5 rounded-md text-[11px] font-medium text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
                    >
                      Undo
                    </button>
                  )}
                  <button
                    onClick={enhancePrompt}
                    disabled={enhancing || !icpPrompt.trim()}
                    title="Improve and structure with AI"
                    className="h-7 px-2.5 rounded-md bg-brand text-white text-[11px] font-semibold hover:bg-brand-hover transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <SparkleIcon />
                    Enhance with AI
                  </button>
                </div>
              </div>

              {enhanceError && (
                <p className="text-xs text-danger">Could not enhance. Try again.</p>
              )}
            </section>

            <hr className="border-border" />

            {/* Leads */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-medium">Leads</h2>
                <InfoTip>
                  Drop a spreadsheet with a column of website URLs.
                </InfoTip>
              </div>

              {!fileName ? (
                <FileDrop onFile={handleFile} />
              ) : (
                <>
                  <div className="flex items-center justify-between rounded-md border px-3 py-2">
                    <div className="min-w-0 flex items-center gap-2">
                      <FileIcon />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{fileName}</div>
                        <div className="text-[11px] text-muted">
                          {rows.length.toLocaleString()} rows · {columns.length} cols
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <label
                        title="Replace file"
                        className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
                      >
                        <SwapIcon />
                        <input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFile(f);
                          }}
                        />
                      </label>
                      <button
                        onClick={clearFile}
                        title="Remove file"
                        className="h-7 w-7 inline-flex items-center justify-center rounded-md text-danger hover:bg-red-50 transition-colors"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-muted flex items-center gap-1">
                        Website column <span className="text-danger">*</span>
                      </label>
                      <InfoTip>
                        The column with website URLs. Other columns pass to the
                        AI automatically.
                      </InfoTip>
                    </div>
                    <select
                      value={linkColumn ?? ""}
                      onChange={(e) => setLinkColumn(e.target.value || undefined)}
                      className="h-9 px-3 rounded-md border bg-background text-sm focus:outline-none focus:border-foreground transition-colors"
                    >
                      <option value="">Select column</option>
                      {columns.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </section>
          </div>

          {/* sticky footer — score button always visible */}
          <div className="shrink-0 border-t bg-background px-5 py-4">
            <button
              onClick={runAll}
              disabled={running}
              className="w-full h-10 rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2 shadow-sm"
            >
              {running ? (
                <>Running…</>
              ) : !rows.length ? (
                "Score leads"
              ) : !linkSet ? (
                "Select website column"
              ) : !icpPrompt.trim() ? (
                "Add a scoring prompt"
              ) : (
                <>
                  Score {rows.length} {rows.length === 1 ? "lead" : "leads"}
                  <ArrowRightIcon />
                </>
              )}
            </button>
            <p className="text-[11px] text-muted-soft text-center mt-2 inline-flex items-center gap-1.5 justify-center w-full">
              <span>
                ~{Math.max(1, Math.ceil((rows.length || 0) * 0.04))} min for {rows.length || 0} leads
              </span>
              <InfoTip align="right" direction="up">
                Roughly 4 seconds per lead. Stop anytime.
              </InfoTip>
            </p>
          </div>
        </aside>

        {/* RIGHT */}
        <section className="overflow-y-auto bg-surface/30 min-h-0">
          <ResultsPane
            stats={stats}
            results={filtered}
            allResults={results}
            running={running}
            linkColumn={linkColumn}
            filter={filter}
            setFilter={setFilter}
            expanded={expanded}
            setExpanded={setExpanded}
            onCancel={() => (cancelRef.current = true)}
            onExport={exportCsv}
          />
        </section>
      </div>

      {settingsOpen && (
        <SettingsModal
          srKey={srKey}
          setSrKey={setSrKey}
          mode={settingsMode}
          onClose={closeSettings}
        />
      )}
    </main>
  );
}

function TrialReminderPill({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Free trial used. Click to add your Screenshot Render API key."
      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold hover:bg-orange-100 transition-colors cursor-pointer animate-[pulse-soft_2s_ease-in-out_infinite]"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
      <span className="hidden sm:inline">Add Screenshot Render key</span>
      <span className="sm:hidden">Add key</span>
    </button>
  );
}

/* -------------------- File drop -------------------- */

function FileDrop({ onFile }) {
  const [drag, setDrag] = useState(false);
  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      className={`flex flex-col items-center justify-center text-center rounded-md border border-dashed py-8 transition-colors cursor-pointer ${
        drag ? "border-foreground bg-surface" : "border-border-strong hover:bg-surface"
      }`}
    >
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      <span className="text-sm font-medium">Drop spreadsheet</span>
      <span className="text-xs text-muted mt-0.5">.xlsx · .xls · .csv</span>
    </label>
  );
}

/* -------------------- Results pane -------------------- */

function ResultsPane({
  stats,
  results,
  allResults,
  running,
  linkColumn,
  filter,
  setFilter,
  expanded,
  setExpanded,
  onCancel,
  onExport,
}) {
  const pct = stats.total ? (stats.done / stats.total) * 100 : 0;

  if (allResults.length === 0) {
    return (
      <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-center gap-3 p-10">
        <div className="h-9 w-9 rounded-md border flex items-center justify-center text-muted">
          <ChartIcon />
        </div>
        <div className="text-sm text-foreground">No results yet</div>
        <p className="text-xs text-muted max-w-xs leading-relaxed">
          Configure your ICP and upload a spreadsheet on the left, then hit Score.
          Results stream in here as each lead is processed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-20 bg-surface/95 backdrop-blur border-b">
        <div className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className="mr-1 text-muted-soft inline-flex items-center gap-1.5">
              <InfoTip>
                Hot above 71. Warm 31 to 70. Cold below 31. Click to filter.
              </InfoTip>
            </span>
            <Chip label={`All ${stats.total}`} active={filter === "all"} onClick={() => setFilter("all")} />
            <Chip
              label={
                <span className="flex items-center gap-1.5">
                  <Dot tone="emerald" /> Hot {stats.hot}
                </span>
              }
              active={filter === "hot"}
              onClick={() => setFilter("hot")}
            />
            <Chip
              label={
                <span className="flex items-center gap-1.5">
                  <Dot tone="amber" /> Warm {stats.warm}
                </span>
              }
              active={filter === "warm"}
              onClick={() => setFilter("warm")}
            />
            <Chip
              label={
                <span className="flex items-center gap-1.5">
                  <Dot tone="zinc" /> Cold {stats.cold}
                </span>
              }
              active={filter === "cold"}
              onClick={() => setFilter("cold")}
            />
            {stats.errors > 0 && (
              <Chip
                label={`Errors ${stats.errors}`}
                active={filter === "error"}
                onClick={() => setFilter("error")}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            {stats.avg > 0 && (
              <span className="text-xs text-muted">
                avg <span className="text-foreground tabular-nums font-medium">{stats.avg}</span>
              </span>
            )}
            {running ? (
              <button
                onClick={onCancel}
                className="h-8 px-3 rounded-md bg-danger text-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={onExport}
                className="h-8 px-3 rounded-md bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <DownloadIcon /> Export CSV
              </button>
            )}
          </div>
        </div>
        {running && (
          <div className="h-px w-full bg-border overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="rounded-md border bg-background">
          {results.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-muted">
              No leads match this filter.
            </div>
          ) : (
            <>
              <div className="sticky top-14 z-10 bg-surface/95 backdrop-blur border-b rounded-t-md px-3 py-2 flex gap-3 items-center text-[11px] uppercase tracking-wider text-muted font-medium">
                <div className="w-5 shrink-0">#</div>
                <div className="w-16 shrink-0">Preview</div>
                <div className="flex-1 min-w-0">Lead</div>
                <div className="hidden md:block flex-1 max-w-md min-w-0">Reasoning</div>
                <div className="w-14 shrink-0 text-right">Score</div>
              </div>
              <div className="divide-y">
                {results.map((r) => (
                  <ResultRow
                    key={r.index}
                    r={r}
                    linkColumn={linkColumn}
                    expanded={expanded === r.index}
                    onToggle={() => setExpanded(expanded === r.index ? null : r.index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 h-7 rounded transition-colors inline-flex items-center ${
        active
          ? "bg-foreground text-background"
          : "text-muted hover:text-foreground hover:bg-surface"
      }`}
    >
      {label}
    </button>
  );
}

function Dot({ tone }) {
  const cls =
    tone === "emerald" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : "bg-zinc-400";
  return <span className={`h-1.5 w-1.5 rounded-full ${cls}`} />;
}

function ResultRow({ r, linkColumn, expanded, onToggle }) {
  const subtitleEntries = Object.entries(r.row)
    .filter(([k, v]) => k !== linkColumn && v && String(v).trim())
    .slice(0, 2)
    .map(([, v]) => v);
  const title = r.siteTitle || r.url;

  return (
    <div className="hover:bg-surface/60 transition-colors">
      <button
        onClick={onToggle}
        className="w-full text-left px-3 py-2.5 flex gap-3 items-center"
      >
        <div className="text-xs text-muted-soft font-mono w-5 shrink-0 tabular-nums">
          {r.index + 1}
        </div>

        <div className="w-16 h-10 rounded border bg-surface overflow-hidden shrink-0 relative">
          {r.screenshotUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={r.screenshotUrl}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          ) : r.status === "screenshotting" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full border border-muted-soft border-t-foreground animate-spin" />
            </div>
          ) : null}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{title}</div>
          <div className="text-xs text-muted truncate">
            {[r.url, ...subtitleEntries].filter(Boolean).join(" · ")}
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-md min-w-0">
          {r.reasoning ? (
            <p className="text-xs text-muted line-clamp-2 leading-relaxed">
              {r.reasoning}
            </p>
          ) : r.status === "scoring" ? (
            <p className="text-xs text-muted animate-pulse">Scoring…</p>
          ) : r.status === "error" ? (
            <p className="text-xs text-danger truncate">Error</p>
          ) : null}
        </div>

        <div className="shrink-0 w-14 flex items-center justify-end">
          {typeof r.score === "number" ? (
            <ScorePill score={r.score} />
          ) : (
            <StatusDot status={r.status} />
          )}
        </div>
      </button>

      {expanded && r.status === "done" && (
        <div className="px-3 pb-4 pl-25 flex flex-col gap-3 border-t bg-surface/40">
          {r.screenshotUrl && (
            <div className="mt-3">
              <div className="text-[11px] text-muted mb-1.5">Screenshot</div>
              <div className="rounded border bg-background overflow-hidden max-h-96 overflow-y-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.screenshotUrl} alt="" className="w-full h-auto block" />
              </div>
            </div>
          )}
          {r.reasoning && (
            <div>
              <div className="text-[11px] text-muted mb-1">Why</div>
              <p className="text-sm text-foreground-soft leading-relaxed">{r.reasoning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScorePill({ score }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium tabular-nums">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          score >= 71 ? "bg-emerald-500" : score >= 31 ? "bg-amber-500" : "bg-zinc-400"
        }`}
      />
      {score}
    </span>
  );
}

function StatusDot({ status }) {
  if (status === "error") return <span className="text-xs text-danger">Error</span>;
  if (status === "pending") return <span className="text-xs text-muted-soft">·</span>;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span className="h-1 w-1 rounded-full bg-foreground animate-pulse" />
      {status === "screenshotting" ? "Capturing" : "Scoring"}
    </span>
  );
}

/* -------------------- Header status -------------------- */

function HeaderStatus({ srKey, onClick }) {
  return (
    <button
      onClick={onClick}
      className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {srKey ? "Connected" : "Free"}
    </button>
  );
}

/* -------------------- Settings modal -------------------- */

function SettingsModal({ srKey, setSrKey, mode, onClose }) {
  const [draft, setDraft] = useState(srKey);

  const banner = (() => {
    if (mode === "trial_ended") {
      return {
        tone: "amber",
        title: "Free scorings used for this run",
        body: (
          <>
            We use{" "}
            <a
              href="https://screenshotrender.com"
              target="_blank"
              rel="noreferrer"
              className="text-orange-500 font-semibold hover:underline"
            >
              Screenshot Render
            </a>{" "}
            to capture pages. Grab your own free API key and paste it below to keep scoring.
          </>
        ),
      };
    }
    if (mode === "credits_exhausted") {
      return {
        tone: "red",
        title: "Your Screenshot Render credits ran out",
        body: (
          <>
            Upgrade your plan at{" "}
            <a
              href="https://screenshotrender.com/pricing"
              target="_blank"
              rel="noreferrer"
              className="text-orange-500 font-semibold hover:underline"
            >
              Screenshot Render
            </a>{" "}
            to keep scoring.
          </>
        ),
      };
    }
    if (mode === "invalid_key") {
      return {
        tone: "red",
        title: "That key didn't work",
        body: (
          <>
            Please paste a valid{" "}
            <a
              href="https://screenshotrender.com"
              target="_blank"
              rel="noreferrer"
              className="text-orange-500 font-semibold hover:underline"
            >
              Screenshot Render
            </a>{" "}
            API key.
          </>
        ),
      };
    }
    return null;
  })();

  const helpHref =
    mode === "credits_exhausted"
      ? "https://screenshotrender.com/pricing"
      : "https://screenshotrender.com";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg border bg-background shadow-xl"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h3 className="text-sm font-medium">Settings</h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {banner ? (
            <div
              className={`rounded-md border px-3 py-2.5 text-xs ${
                banner.tone === "red"
                  ? "border-red-200 bg-red-50 text-danger"
                  : "border-amber-200 bg-amber-50 text-amber-900"
              }`}
            >
              <div className="font-semibold mb-0.5">{banner.title}</div>
              <div className="opacity-90 leading-relaxed">{banner.body}</div>
            </div>
          ) : (
            <div className="text-sm">
              <div className="font-semibold">The AI is on us.</div>
              <p className="text-muted mt-1 leading-relaxed">
                Get your API key from{" "}
                <a
                  href={helpHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Screenshot Render
                </a>
                .
              </p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted">
              Screenshot Render API key
            </label>
            <input
              autoFocus
              type="password"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSrKey(draft.trim());
                  onClose();
                }
              }}
              placeholder="sr-…"
              className="h-9 px-3 rounded-md border bg-background text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 px-5 py-3 border-t bg-surface/50">
          <span className="text-[11px] text-muted-soft">
            Stays in your browser.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-8 px-3 rounded-md text-sm text-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setSrKey(draft.trim());
                onClose();
              }}
              className="h-8 px-4 rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-colors disabled:opacity-30"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- icons -------------------- */

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-foreground/20 border-t-brand animate-spin"
    />
  );
}

function DotPulse() {
  return (
    <span className="inline-flex w-3 ml-0.5">
      <span className="animate-[dots_1.4s_steps(4,end)_infinite]">.</span>
    </span>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* -------------------- Info tooltip -------------------- */

function InfoTip({ children, align = "left", direction = "down" }) {
  const dirCls = direction === "up" ? "bottom-full mb-2" : "top-full mt-2";
  const alignCls = align === "right" ? "right-0" : "left-0";
  return (
    <span className="relative inline-flex group align-middle" tabIndex={0}>
      <span
        className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full border border-muted-soft text-[9px] text-muted-soft font-semibold leading-none cursor-help"
        aria-label="More info"
      >
        i
      </span>
      <span
        className={`absolute z-30 w-60 rounded-md border bg-background p-2.5 text-xs text-foreground-soft leading-relaxed shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity ${dirCls} ${alignCls}`}
        role="tooltip"
      >
        {children}
      </span>
    </span>
  );
}

function csvCell(v) {
  const s = v == null ? "" : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
