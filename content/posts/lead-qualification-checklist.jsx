import ArticleCTA from "../../app/blog/_components/ArticleCTA";

export const meta = {
  slug: "lead-qualification-checklist",
  title: "Lead Qualification Checklist: 9 Steps That Actually Hold Up",
  excerpt:
    "Most checklists get printed once and forgotten. These 9 qualification steps survive a busy week, and the ones we cut never made it past month two.",
  category: "Sales Playbooks",
  readTime: "10 min read",
  date: "2026-05-18",
  updated: "2026-05-18",
  featured: false,
  cover: {
    gradient: "from-teal-700 to-cyan-600",
    title: "A lead qualification checklist that survives real use",
    image: "/blog/lead-qualification-checklist.jpg",
    alt: "Lead qualification checklist — a working sequence of steps a sales team can run every week",
  },
  faqs: [
    {
      q: "What is a lead qualification checklist?",
      a: "A lead qualification checklist is a short, ordered sequence of decisions a sales team runs on every new lead before any rep starts writing a personal message. It usually covers fit against the ideal customer, evidence the company is real and active, evidence the contact has some say in a buying decision, and the rule for what happens to each tier afterwards. A good checklist fits on one page and runs in seconds per lead.",
    },
    {
      q: "What should be on a lead qualification checklist?",
      a: "Five things at a minimum: a fit check against a plain-English ICP, a basic data hygiene pass, a website-level look at what the company actually does, a tier decision with thresholds written down in advance, and a routing rule for each tier. Everything else is either a deeper sales discovery question that belongs in the first call, or a reporting field that does not belong on the checklist at all.",
    },
    {
      q: "How is a lead qualification checklist different from BANT or MEDDIC?",
      a: "BANT and MEDDIC are discovery frameworks. They tell a rep what to ask a prospect during a conversation. A lead qualification checklist runs before the conversation, on every lead in a batch, and answers the simpler question of whether the conversation is worth having at all. The two are not in conflict — the checklist filters who gets to the call, and the framework structures the call itself.",
    },
    {
      q: "How often should I update a lead qualification checklist?",
      a: "Review it once a quarter, and any time you notice the score and the closed-deal outcomes start to drift apart. The ICP definition tends to shift faster than the checklist structure, so most updates land on the wording of the fit check rather than on adding new steps. A thirty-minute review of last quarter's won and lost deals is usually enough to catch the drift.",
    },
    {
      q: "Can I automate a lead qualification checklist?",
      a: "Most of it, yes. The fit check, the website read, the data hygiene pass, and the tier assignment can all run automatically when you describe your ICP in plain English and point a modern tool at a spreadsheet. The two steps that still need a human are reviewing the explanations for a sample of leads and deciding what to do with the bottom tier. Automation removes the boring work, not the judgement.",
    },
    {
      q: "How many criteria should a lead qualification checklist have?",
      a: "Five to nine. Fewer than five and you are guessing; more than nine and your team will stop running it within a month. Every extra criterion adds time per lead, multiplied across hundreds of leads a week, and the marginal criterion almost never changes the tier decision. If a criterion has not flipped a lead from one tier to another in the last quarter, cut it.",
    },
    {
      q: "What is the biggest mistake teams make with a lead qualification checklist?",
      a: "Treating the checklist as a reporting form instead of a decision tool. The moment a team adds fields for marketing attribution, campaign source, and a free-text notes box, the checklist stops being a filter and becomes a survey. Reps fill it in to satisfy the dashboard, not to make a decision, and within weeks every lead is marked qualified because nobody wants to lose one. Keep it to the decision fields, and put the reporting somewhere else.",
    },
  ],
};

export default function Post() {
  return (
    <>
      <p>
        Walk into most sales offices and you will find a one-page lead
        qualification checklist taped to a wall, pinned in a shared Notion, or
        sitting in slide forty-seven of the onboarding deck. It was built with
        good intentions, usually in a workshop, usually by the previous head of
        sales. It lists ten or twelve criteria. It asks the rep to grade each
        one out of five. It produces a number.
      </p>

      <p>
        The number is almost never used. Reps fill it in after the call, not
        before, because the form is too long to run on a fresh lead. The fields
        drift toward the answers that justify keeping the deal in the pipeline,
        because nobody wants to mark a lead unqualified and lose it. Within a
        quarter the checklist is decoration, and the team is back to a quiet
        free-for-all where every rep decides for themselves which leads are
        worth working.
      </p>

      <p>
        This is the gap a working lead qualification checklist has to close.
        The job is not to write a longer list with more boxes — the job is to
        write a shorter list that the team will actually run, on every lead,
        before any time is spent. The rest of this piece walks through the
        nine steps that survive that test, the failure modes that kill all the
        others, and what the operational picture looks like once the
        checklist is doing real work.
      </p>

      <h2>What a Lead Qualification Checklist Actually Is</h2>

      <p>
        A lead qualification checklist is a short, ordered sequence of
        decisions a team applies to every new lead before any rep opens a
        personal conversation. It is not a discovery script for the first call,
        and it is not a marketing-attribution form. It is the filter that
        decides who gets the rep&apos;s time, and the order matters because
        cheap checks should always run before expensive ones.
      </p>

      <p>
        It helps to separate the checklist from the frameworks people often
        confuse it with. BANT, MEDDIC, CHAMP, and the rest are discovery
        frameworks: they structure the conversation a rep has with a prospect
        who is already on a call. A lead qualification checklist runs earlier,
        on every lead in a batch, and answers a much smaller question — is this
        a conversation we should be trying to have at all? The two pair well
        when the boundaries are clear, and they fight each other when the
        checklist tries to do the framework&apos;s job.
      </p>

      <h2>Why Most Lead Qualification Checklists Die in a Quarter</h2>

      <p>
        Before the nine steps, the failure modes. Every one of these has killed
        a working checklist somewhere, and they are easier to spot once they
        have names.
      </p>

      <h3>The Twelve-Field Form Disguised as a Checklist</h3>

      <p>
        Someone in operations decides the checklist should also capture
        campaign source, marketing-attribution channel, region, industry code,
        and a free-text notes box, on top of the actual fit questions. The
        list grows to twelve fields, the rep gives up filling it in before the
        call, and the data quality collapses inside a month. A checklist that
        doubles as a reporting form does neither job well. Put the reporting
        somewhere else and let the checklist stay short.
      </p>

      <h3>The Five-Point Scale That Means Nothing</h3>

      <p>
        Reps are asked to grade fit, intent, and budget on a scale of one to
        five. The scale looks rigorous and produces nothing useful, because
        the difference between a three and a four is a guess and everyone
        rounds toward the answer that keeps the lead alive. Binary or
        three-tier answers — top, middle, bottom, or yes/no/unknown — force a
        decision and survive contact with reality. The five-point scale only
        survives in slide decks.
      </p>

      <h3>The Score Without a Reason</h3>

      <p>
        The checklist produces a number, the number lands in the CRM, and
        nobody can explain afterwards why a particular lead got a 78 instead
        of a 62. The rep cannot defend the score to a manager, the manager
        cannot trust it, and within a few weeks reps are working the list in
        their own order again. Every line on a working checklist has to leave
        a short, readable reason behind it, or the number quietly stops being
        used.
      </p>

      <h3>The Checklist Nobody Runs Until After the Call</h3>

      <p>
        Because the checklist is long, the rep fills it in retroactively, once
        the deal is in the pipeline and a tier has to be marked for reporting.
        At that point every lead the rep is still talking to is qualified by
        definition — the checklist becomes a recorder of decisions already
        made, not a tool that helps make them. The fix is operational, not
        cultural: shorten the checklist until it can be run in seconds per
        lead, then enforce that it runs before any outreach goes out.
      </p>

      <h3>The Checklist That Never Changes</h3>

      <p>
        The list was set up two years ago, the business has changed, the ICP
        has shifted, and the checklist still asks about a market segment the
        team stopped chasing nine months ago. Reps quietly ignore the
        out-of-date fields and the team loses faith in the whole thing. A
        quarterly review against the deals that actually closed catches this
        before the trust is gone, and it usually takes thirty minutes.
      </p>

      <h2>The Nine-Step Lead Qualification Checklist</h2>

      <p>
        With the failure modes out of the way, here is the working version.
        Every step is short on purpose, every step produces a yes, a no, or a
        tier label, and every step leaves a one-line reason behind it. Run them
        in this order, because the earlier steps are cheap and the later ones
        cost time you do not want to spend on a lead that already failed.
      </p>

      <ol>
        <li>
          <strong>Basic data hygiene.</strong> Is the email a real work
          address, is the company name spelled like a real company, and does
          the website load? A surprising share of inbound and partner leads
          fail at this step alone, and there is no point running the rest of
          the checklist on a broken record. This is the cheapest line on the
          page and the one that saves the most time.
        </li>
        <li>
          <strong>ICP fit on the obvious signals.</strong> Industry, rough
          company size, and country against the description of who you want to
          work with. This is the coarse filter — it should knock out the
          clearly-not-a-fit leads in seconds without anyone reading a
          website.
        </li>
        <li>
          <strong>Website-level read of what the company actually does.</strong>{" "}
          A database tells you a company is in &ldquo;software,&rdquo; the
          website tells you they sell a single-product mobile game with three
          employees. The website is where the truth lives, and a real
          qualification step has to look at it before any conversation
          happens.
        </li>
        <li>
          <strong>Buying-side signal check.</strong> Is the contact in a role
          that has any say in this kind of decision, or close enough to one
          that the lead is worth nurturing? You are not running full MEDDIC at
          this stage — you are filtering out the lone intern and the
          competitor doing research.
        </li>
        <li>
          <strong>Activity signal check.</strong> If the lead came from an
          inbound action, what was the action — a demo request, an ebook
          download, a pricing-page visit, a partner introduction? The action
          itself is information. A demo request from a fit company gets a
          different tier than the same person downloading an ebook.
        </li>
        <li>
          <strong>Disqualifier check.</strong> A short list of automatic stops
          you decided in advance: competitor domain, free email on a
          single-person company, a country you cannot legally sell into, an
          industry you tried and stopped going after. Negative criteria
          sharpen the score more than positive ones, because they tell the
          system what to filter out.
        </li>
        <li>
          <strong>Tier assignment with a thresholds you wrote down.</strong>{" "}
          Top, middle, or bottom — three tiers, no five-point scale. The
          thresholds for each tier sit on the same page as the checklist, and
          they were decided in advance so nobody is arguing about them with a
          live lead in front of them.
        </li>
        <li>
          <strong>One-line reason next to the tier.</strong> Every lead leaves
          a short, readable sentence explaining the tier, in the rep&apos;s or
          the tool&apos;s words. &ldquo;Top — fit industry, 50-person company,
          VP title, demo request from pricing page.&rdquo; A score without a
          reason is a number nobody trusts.
        </li>
        <li>
          <strong>Routing rule fires automatically.</strong> Top tier goes to
          an on-call rep inside the hour, middle tier goes to a nurture
          sequence that watches for a higher-intent action, bottom tier exits
          the pipeline with a polite acknowledgement. The routing has to be
          decided before any lead lands, because routing is what turns the
          checklist into a system instead of a list.
        </li>
      </ol>

      <p>
        Nine steps, every one of them either pass/fail or a tier label. The
        whole list takes a few minutes per lead by hand, or a few seconds per
        lead when a tool is doing the website-reading step for you. The
        difference between the two is the difference between a checklist that
        gets run on the first ten leads of a batch and a checklist that gets
        run on all eight hundred.
      </p>

      <ArticleCTA
        title="Stop running a checklist nobody actually runs."
        body="Drop your spreadsheet into nobadleads, write your ICP in plain English, and the nine steps run automatically with a score and a one-line reason for every lead. First ten leads on every run are free."
        cta="Run the checklist on my list"
      />

      <h2>The Math That Decides Whether You Run It by Hand</h2>

      <p>
        Most teams underestimate the cost of running the checklist manually
        because they only count the easy leads. The fair way to run the
        numbers is to take a normal week of inbound and outbound combined and
        time the full nine steps on a sample of twenty.
      </p>

      <p>
        A realistic time per lead, end to end, is between three and five
        minutes for a rep who is paying attention. At four minutes per lead
        and four hundred leads per week, that is over twenty-six hours of work
        every week, before anyone has sent a single email. That is two thirds
        of a full-time role assigned to reading websites, and it is the role
        nobody on the team actually wants. The predictable result is that the
        checklist either gets run on the first hundred leads and skipped on
        the rest, or it gets stretched to a one-minute sniff test that quietly
        loses the signal it was supposed to capture.
      </p>

      <p>
        The same nine steps run by a tool that can read a website in seconds
        come in at under thirty seconds per lead end to end, which collapses
        the same four hundred leads into under four hours of compute. The
        cost moves from a person&apos;s week to the bottom of an invoice, and
        the checklist starts getting run on every lead the way it was always
        supposed to.{" "}
        <a
          href="https://www.forrester.com/blogs/category/sales/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Forrester&apos;s sales research
        </a>{" "}
        has been pointing at the same gap for years — reps spend a large
        share of their week on leads that were never going to close, and
        almost none of that time gets recovered without automating the
        triage.
      </p>

      <h2>What Good Looks Like Once the Checklist Is Doing Real Work</h2>

      <p>
        A team that has a working lead qualification checklist looks calm from
        the outside. Reps know which leads are theirs to call within an hour,
        which ones are sitting in a nurture sequence, and which ones quietly
        exited. Marketing and sales meet weekly to look at the bottom tier and
        the unscored leads, not to argue about lead quality in the abstract.
        The conversion rate on the top tier is two to three times the
        conversion rate on the middle tier, which is the simplest sign that
        the scoring is actually sorting.
      </p>

      <p>
        A few habits hold the system together once it is set up. Reps trust
        the tier as the qualification, instead of running their own private
        version on top. The team reports conversion by tier, not in one
        rolled-up average, because the average hides where the pipeline is
        actually being made. The ICP description is reviewed every quarter
        against the deals that closed, and the threshold for the top tier is
        adjusted when the gap between tiers starts to flatten. The{" "}
        <a
          href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-multiplier-effect-how-b2b-winners-grow"
          target="_blank"
          rel="noopener noreferrer"
        >
          McKinsey 2024 B2B Pulse research
        </a>{" "}
        on B2B buying journeys is a useful reality check at that quarterly
        review, because the way buyers behave keeps shifting and the
        checklist has to shift with it.
      </p>

      <p>
        If you already have the inbound side wired up, the same checklist
        works on cold lists with one change to the routing rules — our piece
        on{" "}
        <a href="/blog/inbound-lead-qualification">
          inbound lead qualification
        </a>{" "}
        walks through the timing side of the same workflow, and the{" "}
        <a href="/blog/ai-lead-qualification">AI lead qualification</a>{" "}
        article covers the spreadsheet version. The interesting part is that
        the nine-step list does not change between the two — only the speed
        requirement and the routing change.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What is a lead qualification checklist?</h3>
      <p>
        A lead qualification checklist is a short, ordered sequence of
        decisions a sales team runs on every new lead before any rep starts
        writing a personal message. It usually covers fit against the ideal
        customer, evidence the company is real and active, evidence the
        contact has some say in a buying decision, and the rule for what
        happens to each tier afterwards. A good checklist fits on one page and
        runs in seconds per lead.
      </p>

      <h3>What should be on a lead qualification checklist?</h3>
      <p>
        Five things at a minimum: a fit check against a plain-English ICP, a
        basic data hygiene pass, a website-level look at what the company
        actually does, a tier decision with thresholds written down in
        advance, and a routing rule for each tier. Everything else is either a
        deeper sales discovery question that belongs in the first call, or a
        reporting field that does not belong on the checklist at all.
      </p>

      <h3>How is a lead qualification checklist different from BANT or MEDDIC?</h3>
      <p>
        BANT and MEDDIC are discovery frameworks. They tell a rep what to ask
        a prospect during a conversation. A lead qualification checklist runs
        before the conversation, on every lead in a batch, and answers the
        simpler question of whether the conversation is worth having at all.
        The two are not in conflict — the checklist filters who gets to the
        call, and the framework structures the call itself.
      </p>

      <h3>How often should I update a lead qualification checklist?</h3>
      <p>
        Review it once a quarter, and any time you notice the score and the
        closed-deal outcomes start to drift apart. The ICP definition tends to
        shift faster than the checklist structure, so most updates land on the
        wording of the fit check rather than on adding new steps. A
        thirty-minute review of last quarter&apos;s won and lost deals is
        usually enough to catch the drift.
      </p>

      <h3>Can I automate a lead qualification checklist?</h3>
      <p>
        Most of it, yes. The fit check, the website read, the data hygiene
        pass, and the tier assignment can all run automatically when you
        describe your ICP in plain English and point a modern tool at a
        spreadsheet. The two steps that still need a human are reviewing the
        explanations for a sample of leads and deciding what to do with the
        bottom tier. Automation removes the boring work, not the judgement.
      </p>

      <h3>How many criteria should a lead qualification checklist have?</h3>
      <p>
        Five to nine. Fewer than five and you are guessing; more than nine and
        your team will stop running it within a month. Every extra criterion
        adds time per lead, multiplied across hundreds of leads a week, and
        the marginal criterion almost never changes the tier decision. If a
        criterion has not flipped a lead from one tier to another in the last
        quarter, cut it.
      </p>

      <h3>What is the biggest mistake teams make with a lead qualification checklist?</h3>
      <p>
        Treating the checklist as a reporting form instead of a decision tool.
        The moment a team adds fields for marketing attribution, campaign
        source, and a free-text notes box, the checklist stops being a filter
        and becomes a survey. Reps fill it in to satisfy the dashboard, not to
        make a decision, and within weeks every lead is marked qualified
        because nobody wants to lose one. Keep it to the decision fields, and
        put the reporting somewhere else.
      </p>

      <h2>The Bottom Line</h2>

      <p>
        A lead qualification checklist is only worth the page it sits on if
        the team actually runs it on every lead, before any time is spent.
        That bar is what kills most of them — the lists are too long, the
        scales are too vague, the reasons are missing, and the routing was
        never decided in advance. A working version is short, decisive, and
        boring to look at, which is exactly why it survives the second
        quarter.
      </p>

      <p>
        If you want to see how a nine-step checklist behaves on your own data
        without rebuilding the spreadsheet by hand, the fastest test is to
        upload a recent week of leads into{" "}
        <a href="/tool">a tool that runs the steps for you</a> and read the
        tiers and reasons next to what your team would have written. That is
        the test that answers the question, and it costs nothing to run.
      </p>
    </>
  );
}
