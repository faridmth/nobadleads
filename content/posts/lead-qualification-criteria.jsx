import ArticleCTA from "../../app/blog/_components/ArticleCTA";

export const meta = {
  slug: "lead-qualification-criteria",
  title: "Lead Qualification Criteria: Signals That Predict a Buyer",
  excerpt:
    "Lead qualification criteria are not BANT. They are the fit, intent, and disqualifier signals that sort real buyers from busywork before the first call.",
  category: "Qualifying Leads",
  readTime: "11 min read",
  date: "2026-05-23",
  updated: "2026-05-23",
  featured: false,
  cover: {
    gradient: "from-teal-700 to-cyan-600",
    title: "Lead qualification criteria that hold up before the call",
    image: "/blog/lead-qualification-criteria.jpg",
    alt: "Lead qualification criteria mapped into fit, intent, and disqualifier signals next to a list of leads",
  },
  faqs: [
    {
      q: "What are lead qualification criteria?",
      a: "Lead qualification criteria are the specific signals you use to decide whether a lead is worth a sales conversation. They usually split into three groups: fit signals that describe who the lead is, intent signals that describe what they have done, and disqualifiers that pull a lead out of the pipeline. Together they let you sort a long list before the first call instead of after it.",
    },
    {
      q: "What is the BANT lead qualification criteria?",
      a: "BANT stands for Budget, Authority, Need, and Timeline. It is a set of questions a rep asks during a discovery call to confirm a buyer is serious. BANT is a framework for one stage of qualification, not a list of criteria for sorting a spreadsheet of two hundred leads. Treating BANT as your full criteria set means you cannot rank a lead until you have already spent thirty minutes on the phone with them.",
    },
    {
      q: "What are the main types of lead qualification criteria?",
      a: "Three types matter in practice. Fit criteria describe the company and the person: industry, company size, role, location, the tools they already use. Intent criteria describe the behavior that suggests buying interest: a demo request, a pricing-page visit, a reply to outreach. Disqualifier criteria pull a lead out of the pipeline: a competitor domain, a market you cannot sell to, a free email address on a one-person company.",
    },
    {
      q: "How is a lead qualification criteria different from a lead qualification framework?",
      a: "Criteria are the signals you can measure about a lead before any conversation happens. A framework is a set of questions a rep asks during the conversation itself. BANT, MEDDIC, and CHAMP are frameworks, and they belong inside one stage of the process. Criteria sit upstream, where you decide which leads ever earn the conversation in the first place.",
    },
    {
      q: "What criteria should B2B companies use to qualify leads?",
      a: "Start with three or four fit criteria that match your ideal customer description: industry, company size band, role seniority, and either geography or a tech-stack signal. Add two or three intent criteria tied to real buying behavior, not generic engagement. Finally, write down the disqualifiers that should remove a lead outright. Anything beyond seven or eight total criteria is usually noise.",
    },
    {
      q: "How many lead qualification criteria should you have?",
      a: "Around five to eight in total is enough for most teams. Too few and the score is coarse; too many and each criterion carries so little weight that nothing moves the ranking. The aim is a short list of signals every rep can hold in their head, so when a lead lands in the top tier the reason is obvious in a sentence. A page of criteria is a sign nobody trusts the model.",
    },
    {
      q: "Can lead qualification criteria be automated?",
      a: "Most of the fit and disqualifier checks can. Industry, company size, role seniority, location, free-email checks, and competitor-domain checks all run automatically once you describe your ideal customer in plain English and point a modern tool at a spreadsheet. The part that still needs a person is writing that description in the first place, and reviewing the scored output to confirm the criteria are matching reality.",
    },
  ],
};

export default function Post() {
  return (
    <>
      <p>
        A rep finishes a thirty-minute discovery call and clicks through the
        qualification form on the screen. Budget: yes, there is a real number
        the prospect said out loud. Authority: yes, the person on the call
        signs the contracts. Need: yes, the pain showed up unprompted in the
        second question. Timeline: this quarter. Four green checkboxes, the
        form saves itself, the proposal goes out by Friday.
      </p>

      <p>
        Three weeks later the inbox is silent. A polite follow-up earns a
        polite reply about internal priorities and a vague reference to
        revisiting next quarter. The deal is over, and the form on the screen
        is still showing four green checkboxes from the discovery call. None
        of them turned out to be true.
      </p>

      <p>
        This is the trouble with most lead qualification criteria. They are
        captured during the conversation, from the buyer&apos;s own mouth, on
        the day the buyer is most interested in giving the answer the rep
        wants to hear. By the time the form is filled in, the rep has already
        spent the thirty minutes, and the cost of being wrong is the call that
        already happened. This article is about the criteria that sit
        upstream of that call — the signals you can measure before the phone
        ever rings — and how to choose them so the call itself is shorter and
        more honest.
      </p>

      <h2>What Lead Qualification Criteria Actually Are</h2>

      <p>
        Lead qualification criteria are the specific signals you use to decide
        whether a lead deserves a sales conversation. They are not the same
        thing as a qualification framework, even though most articles online
        treat the two as interchangeable. Frameworks like BANT and MEDDIC are
        scripts for a live conversation, and they belong inside one stage of
        the larger{" "}
        <a href="/blog/lead-qualification-process">lead qualification process</a>
        . Criteria sit before the conversation, on a list of two hundred names
        nobody has spoken to yet, and they decide which of those names is
        worth the next thirty minutes.
      </p>

      <p>
        It helps to be honest about what criteria really are. They are a
        prediction. You are looking at a row of data and saying, with no
        guarantee, that this lead is more likely to buy than the row above it.
        A good set of criteria makes that prediction in a way you can defend
        in a sentence. A bad set produces a number, hands it to a rep, and
        hopes the rep does not ask where the number came from. The{" "}
        <a
          href="https://business.linkedin.com/sales-solutions/resources/sales-terms/lead-qualification"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn Sales Solutions primer on lead qualification
        </a>{" "}
        walks through the broad shape of this, but stops short of the specific
        question this article is here to answer: which signals belong in your
        criteria, and which ones quietly poison the model.
      </p>

      <h2>Why Most Lead Qualification Criteria Stop Predicting Buyers</h2>

      <p>
        The criteria most teams write down look reasonable on the page, and
        they still fail in practice. Four patterns explain almost every
        failure, and they are easier to catch once they have names.
      </p>

      <h3>Criteria You Took From the Buyer&apos;s Own Mouth</h3>

      <p>
        Most criteria captured on a discovery call are self-reported by the
        buyer, and a buyer answering yes-or-no questions tends to say yes when
        they like the rep. They will agree that the timeline is this quarter,
        because saying so keeps the conversation moving. They will name a
        budget that sounds about right, because they would rather not look
        unprepared. The form ends up green, and the form is measuring whether
        the buyer was polite, not whether the deal is real. The signal you
        want is something the buyer cannot influence in the moment — what
        their company looks like, what their team has actually done — not
        what they said when a stranger asked them on a Tuesday.
      </p>

      <h3>Criteria Borrowed From a Framework That Wasn&apos;t for You</h3>

      <p>
        BANT was written for enterprise software sold to procurement
        committees, where budget conversations are real and timelines mean
        something. Plenty of teams copy it down without noticing that none of
        those four letters apply to their own deal. A self-serve product with
        a $200 monthly plan has no budget conversation, no procurement, and
        often no committee. Filling in a BANT form for that lead is theatre,
        and the criteria that come out of it are theatre too. Borrowing a
        framework is fine; borrowing it without re-asking which of the
        letters actually match your sale is how a team ends up with a
        criteria set that fits someone else&apos;s business.
      </p>

      <h3>The Soft Criterion That Quietly Outweighs the Hard Ones</h3>

      <p>
        A team will say their criteria are fit and intent, then sort the
        queue by how friendly the last reply was. Likeability is the
        criterion nobody writes down and everybody uses, and it tends to
        promote the leads who are happy to chat over the leads who actually
        match your customer. The same pattern shows up with engagement: the
        analyst who opens every newsletter looks like a hot lead by the
        numbers, while the right-fit VP who only opened one email gets buried
        underneath. Soft criteria are not always wrong, but a soft criterion
        that you cannot name is one that you cannot correct, and it is the
        one quietly running the queue.
      </p>

      <h3>Criteria That Only Apply After the Conversation</h3>

      <p>
        A useful criterion is one you can check before you call. &ldquo;Has
        an executive champion&rdquo; is a real signal, but it is not a
        criterion you can score from a spreadsheet — you only know after
        thirty minutes on the phone. A criteria set built mostly out of
        signals like this is not sorting your list; it is describing the
        deals you already won, after the fact. You end up with a beautiful
        post-mortem and no way to triage tomorrow&apos;s two hundred new
        leads, which is the exact decision the criteria were supposed to
        make.
      </p>

      <h2>The Math of Picking the Wrong Criteria</h2>

      <p>
        Put numbers on it and the cost gets clearer. Imagine a team handling
        400 inbound leads a month, and a rep capacity of about 60 real
        conversations in that window. The job of the criteria is to pick the
        right 60 names out of 400. If the criteria are sharp, and a third of
        the genuine fits in that list make the cut, the team books roughly 60
        meetings with a meeting-to-deal rate of 25 percent and an average
        contract of $9,000. That is 15 closed deals at $135,000 in new
        pipeline, from criteria that did their job.
      </p>

      <p>
        Now use criteria that are mostly engagement and self-reported answers
        from the form. The top 60 by that score still book meetings — the
        team is still working hard — but the meeting-to-deal rate drops to
        about 10 percent because many of those meetings are with curious
        non-buyers. The same hours produce six closed deals at $54,000.
        Nobody on the team is working less; the criteria are simply pointing
        the same effort at the wrong rows. The gap between the two months is
        $81,000, and it is not a budget line in any spreadsheet. It is just
        the price of letting the wrong signals decide who gets the call.
      </p>

      <h2>The Three Buckets That Actually Qualify a Lead</h2>

      <p>
        A working criteria set splits into three buckets, and every signal
        you write down belongs in exactly one of them. Keeping them separate
        is what stops a busy non-buyer from outscoring a quiet perfect fit,
        which is the most common failure mode in scoring models. The same
        split sits inside any{" "}
        <a href="/blog/lead-scoring-template">working lead scoring template</a>
        , because it is the part that decides whether the number at the end
        is honest.
      </p>

      <h3>Fit Criteria — Who the Lead Is</h3>

      <p>
        Fit criteria describe the company and the person, and they are the
        ones that survive the longest because the underlying facts move
        slowly. A company in healthcare today is in healthcare next month. A
        VP of sales is still a VP of sales in eight weeks. These are the
        signals you can verify without asking the buyer anything, and they
        are usually the strongest predictors of whether a deal is real. A
        reasonable starting set is the industry the company sits in, the
        employee count, the role seniority of the contact, the country or
        region, and one tech-stack or product signal that matters for what
        you sell. If you sell to revenue teams, that signal might be the CRM
        the company already uses; if you sell to engineering, it might be a
        language or a cloud provider. Five or six fit criteria is plenty.
        More than that and the weighting gets fragile.
      </p>

      <h3>Intent Criteria — What the Lead Has Done</h3>

      <p>
        Intent criteria describe behavior that suggests buying interest, and
        the trick with them is to be specific. A demo request is intent; an
        ebook download is barely a heartbeat. A pricing-page visit on a
        weekday is intent; a newsletter open on a Sunday is noise. The
        criteria in this bucket should be the small handful of actions that,
        in your own closed-won data, repeated more often before a deal than
        they did before a loss. Without that check, intent criteria reward
        whoever clicked the most, and the analysts who read everything will
        always outscore the VPs who read nothing. Intent should usually
        carry less weight than fit, because a perfect-fit buyer who has done
        nothing yet is a better lead than a stranger who has done everything.
      </p>

      <h3>Disqualifier Criteria — What Pulls a Lead Out</h3>

      <p>
        Disqualifiers are the criteria nobody enjoys writing, and they save
        more time than the other two buckets combined. A competitor domain
        is a disqualifier; so is a free email address on a one-person
        company, a market you cannot legally sell into, and a job title that
        clearly has no influence on the purchase. The point of a
        disqualifier is to remove the lead before any scoring happens, not
        to nudge their score down by ten points. A lead that fails a hard
        disqualifier exits the pipeline; a lead that scores low on a fit
        criterion stays in nurture. Mixing those two is how teams end up
        emailing competitors every Monday by accident.
      </p>

      <h2>How to Choose Lead Qualification Criteria for Your Own List</h2>

      <p>
        The three buckets describe the shape of a working set. The list
        below is how you turn that shape into the five to eight criteria
        that actually belong on your team&apos;s page, and it does not
        require new software to start.
      </p>

      <ol>
        <li>
          <strong>Pull your last forty closed deals.</strong> Wins and
          losses, in equal share if you can. The criteria worth keeping are
          the ones that appeared in the wins and were missing from the
          losses. Anything that shows up evenly in both is decoration, not
          signal.
        </li>
        <li>
          <strong>Write your fit criteria from what those winners shared.</strong>{" "}
          Industry, size band, role seniority, region, and one tech-stack or
          context signal. Five at most. If a sixth is fighting for the slot,
          one of the first five is weaker than you think.
        </li>
        <li>
          <strong>Pick the two or three intent signals that repeated.</strong>{" "}
          A demo request, a pricing-page visit, a reply to outreach. Skip
          the soft engagement metrics that did not actually precede the
          wins, however good the chart looks in the marketing dashboard.
        </li>
        <li>
          <strong>Write the disqualifiers down.</strong> Competitor domains,
          unsellable geographies, free email plus tiny company. These are
          hard exits, not point penalties.
        </li>
        <li>
          <strong>Attach a one-line reason to every score.</strong> A lead
          that lands in the top tier should come with a sentence a rep can
          read in three seconds: &ldquo;Fit industry, 80-person company, VP
          title, replied to outreach.&rdquo; Without the reason, the score
          is something the team works around within a quarter.
        </li>
        <li>
          <strong>Put a review date on the file.</strong> Markets shift,
          your product changes, and last year&apos;s winners are not
          this year&apos;s. A quarterly look at the criteria against the
          most recent deals is what stops the set from slowly going stale.
        </li>
      </ol>

      <p>
        Most of those steps live happily in a spreadsheet, and a small team
        can run the whole loop by hand. The part that strains is checking
        the fit signals against what is actually true about each company,
        because the database label and the real website rarely match — a
        company tagged &ldquo;software&rdquo; in your CRM is often a
        two-person reseller, and the lead form never asked. This is the
        part a good tool is built to carry. A good lead qualification tool
        should take a plain spreadsheet, let you describe your ICP and your
        disqualifiers in ordinary English, read each lead&apos;s real
        website the way a person would, and return a score with a one-line
        reason for every row. nobadleads was built to work this way, and it
        also drafts three cold openers per lead, so the criteria stop at a
        decision the rep can act on rather than a number on a page.
      </p>

      <ArticleCTA
        title="Four green checkboxes is not a qualified lead."
        body="Upload your list, describe your ideal customer and your disqualifiers in plain English, and let nobadleads check every fit signal before the first call — the first ten leads on every run are free."
        cta="Check my list before I call"
      />

      <h2>What Good Lead Qualification Criteria Look Like in Use</h2>

      <p>
        A criteria set that is doing its job is small, defensible, and
        boring to look at. A few signs tell you the set is holding rather
        than drifting.
      </p>

      <ul>
        <li>
          The whole set fits on one page, and any rep on the team can recite
          the criteria from memory without checking the file.
        </li>
        <li>
          Fit, intent, and disqualifier criteria are kept in separate
          groups, so a high score always means the lead is a fit, not just
          active.
        </li>
        <li>
          Every criterion can be checked from data the team already has, so
          a lead can be scored before the first conversation rather than
          after it.
        </li>
        <li>
          Every score arrives with a one-sentence reason, and the reason
          reads like something a rep would write on a sticky note.
        </li>
        <li>
          Conversion is reported by tier, not as one rolled-up average,
          because a single blended rate hides a strong top tier and a
          wasted middle.
        </li>
        <li>
          The list is reviewed every quarter against the deals that
          actually closed, and a criterion that stopped predicting wins is
          retired rather than carried for sentimental reasons.
        </li>
      </ul>

      <p>
        None of this requires a heavy platform. It needs evidence behind
        the criteria, an honest split between fit and intent, and a habit
        of revisiting the set on a schedule.{" "}
        <a
          href="https://www.gartner.com/en/sales/insights/b2b-buying-journey"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gartner&apos;s B2B buying journey research
        </a>{" "}
        keeps surfacing the same number: buyers spend only about 17 percent
        of their journey talking to a sales rep at all, which means the
        criteria that decide who earns that scarce time have to be sharper
        than ever. A set built on self-reported answers and engagement
        clicks is using the rep&apos;s hours to confirm what the rep already
        suspected, instead of pointing them at the row of leads they would
        not have found.
      </p>

      <p>
        The per-call decisions that sit downstream of the score are worth
        keeping in view too. Once a lead clears the criteria and a real
        conversation begins, our piece on the{" "}
        <a href="/blog/lead-qualification-checklist">
          lead qualification checklist
        </a>{" "}
        covers the pass-or-fail decisions a rep should be running inside
        that call, and the{" "}
        <a href="/blog/ai-lead-qualification">AI lead qualification</a>{" "}
        article walks through what changes once a tool is reading every
        website for you before the call ever happens.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What are lead qualification criteria?</h3>
      <p>
        Lead qualification criteria are the specific signals you use to
        decide whether a lead is worth a sales conversation. They usually
        split into three groups: fit signals that describe who the lead is,
        intent signals that describe what they have done, and disqualifiers
        that pull a lead out of the pipeline. Together they let you sort a
        long list before the first call instead of after it.
      </p>

      <h3>What is the BANT lead qualification criteria?</h3>
      <p>
        BANT stands for Budget, Authority, Need, and Timeline. It is a set
        of questions a rep asks during a discovery call to confirm a buyer
        is serious. BANT is a framework for one stage of qualification, not
        a list of criteria for sorting a spreadsheet of two hundred leads.
        Treating BANT as your full criteria set means you cannot rank a
        lead until you have already spent thirty minutes on the phone with
        them.
      </p>

      <h3>What are the main types of lead qualification criteria?</h3>
      <p>
        Three types matter in practice. Fit criteria describe the company
        and the person: industry, company size, role, location, the tools
        they already use. Intent criteria describe the behavior that
        suggests buying interest: a demo request, a pricing-page visit, a
        reply to outreach. Disqualifier criteria pull a lead out of the
        pipeline: a competitor domain, a market you cannot sell to, a free
        email address on a one-person company.
      </p>

      <h3>How is a lead qualification criteria different from a lead qualification framework?</h3>
      <p>
        Criteria are the signals you can measure about a lead before any
        conversation happens. A framework is a set of questions a rep asks
        during the conversation itself. BANT, MEDDIC, and CHAMP are
        frameworks, and they belong inside one stage of the process.
        Criteria sit upstream, where you decide which leads ever earn the
        conversation in the first place.
      </p>

      <h3>What criteria should B2B companies use to qualify leads?</h3>
      <p>
        Start with three or four fit criteria that match your ideal
        customer description: industry, company size band, role seniority,
        and either geography or a tech-stack signal. Add two or three
        intent criteria tied to real buying behavior, not generic
        engagement. Finally, write down the disqualifiers that should
        remove a lead outright. Anything beyond seven or eight total
        criteria is usually noise.
      </p>

      <h3>How many lead qualification criteria should you have?</h3>
      <p>
        Around five to eight in total is enough for most teams. Too few
        and the score is coarse; too many and each criterion carries so
        little weight that nothing moves the ranking. The aim is a short
        list of signals every rep can hold in their head, so when a lead
        lands in the top tier the reason is obvious in a sentence. A page
        of criteria is a sign nobody trusts the model.
      </p>

      <h3>Can lead qualification criteria be automated?</h3>
      <p>
        Most of the fit and disqualifier checks can. Industry, company
        size, role seniority, location, free-email checks, and
        competitor-domain checks all run automatically once you describe
        your ideal customer in plain English and point a modern tool at a
        spreadsheet. The part that still needs a person is writing that
        description in the first place, and reviewing the scored output to
        confirm the criteria are matching reality.
      </p>

      <h2>Criteria Decide the Call Before You Make It</h2>

      <p>
        The four green checkboxes from the opening scene were not wrong on
        the day they were captured. They were captured too late. By the
        time a rep is filling in a form on a discovery call, the criteria
        have already been used: the rep used them when they decided this
        lead was worth thirty minutes. The teams that close cleanly are not
        the ones with the cleverest framework. They are the ones who put
        the harder work upstream — pick a small set of fit, intent, and
        disqualifier signals, base them on real wins, and check them
        against every lead before the phone ever rings.
      </p>

      <p>
        If you want to see how your own criteria hold up, the fastest test
        is to take a recent batch of leads, run them through{" "}
        <a href="/tool">
          a tool that scores each lead against a plain-English ICP and a
          list of disqualifiers
        </a>
        , and read the scores and reasons next to the deals you already
        know the outcome of. That comparison tells you in an afternoon
        which criteria are doing real work and which ones have been
        decoration for a year.
      </p>
    </>
  );
}
