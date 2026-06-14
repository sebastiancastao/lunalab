export interface FAQItem {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readTime: string;
  content: string;
  faq?: FAQItem[];
}

export const posts: Post[] = [
  {
    slug: 'why-small-teams-win-with-ai',
    title: 'Why small teams win with AI agents',
    date: '2026-05-10',
    tag: 'AI',
    excerpt: 'The automation advantage used to belong to enterprises with big engineering budgets. AI agents have changed the math.',
    readTime: '5 min',
    content: `<p>For years, automation belonged to companies with dedicated engineering teams and six-figure tooling budgets. If you were a ten-person business, you hired someone to do the repetitive work, or you did it yourself.</p>
<p>AI agents have changed that calculation entirely.</p>
<h3>What an agent actually is</h3>
<p>An AI agent is a language model that can take actions — browse the web, call APIs, read documents, write code, send messages. Think of it as an employee who never sleeps, never misses a ticket, and costs a fraction of a full-time hire.</p>
<p>For small teams, the most impactful use cases are:</p>
<ul>
<li><strong>Inbox triage:</strong> Reading support emails and routing them, drafting replies, escalating urgent tickets without manual review.</li>
<li><strong>Lead qualification:</strong> Scoring inbound leads against your criteria before a human ever looks at them.</li>
<li><strong>Internal RAG:</strong> A search assistant that answers questions about your own documentation, contracts, or knowledge base.</li>
<li><strong>Reporting pipelines:</strong> Summarizing data from multiple sources into a weekly digest, automatically.</li>
</ul>
<h3>The real advantage</h3>
<p>It's not speed. It's context capacity. A human doing inbox triage has to keep the company's policies, past decisions, and product knowledge in their head simultaneously. An agent backed by your actual documents does this consistently, at any volume, without degrading over a long shift.</p>
<p>Small teams benefit most because they can't afford specialization. One agent can handle what would otherwise require three different hires covering three different functions.</p>
<h3>What it still can't do</h3>
<p>Judgment calls that require accountability, anything involving sensitive credentials without proper security architecture, tasks that depend on physical presence, and work where the cost of a mistake is catastrophic. Agents are powerful tools — not replacements for decision-makers.</p>
<p>The best implementations we've built pair an agent with a human checkpoint: the agent handles 80% autonomously, flags the 20% that needs a real eye, and logs everything for audit.</p>`,
  },
  {
    slug: 'the-case-for-boring-stacks',
    title: 'The case for boring technology stacks',
    date: '2026-04-22',
    tag: 'Engineering',
    excerpt: 'Chasing new frameworks costs more than most teams realize. The best stack for a small business is usually the most boring one.',
    readTime: '4 min',
    content: `<p>Every year there's a new framework that promises to solve the problems of the one that came before it. And every year, developers migrate, rewrite, and spend months getting back to feature parity.</p>
<p>For small businesses, this churn is almost always the wrong call.</p>
<h3>What "boring" actually means</h3>
<p>A boring stack isn't old or slow — it's proven. It has large communities, abundant documentation, cheap hosting, and a hiring pool wide enough to replace a departing developer without a six-month search.</p>
<p>For web applications, that means Next.js on the frontend, PostgreSQL for the database, Stripe for billing, and a major cloud provider for infrastructure. None of these are exciting. All of them will be maintained, documented, and hireable for the next decade.</p>
<h3>The hidden cost of novelty</h3>
<p>When you build on a framework with a 50-person Discord server, you own every bug you hit. Documentation is thin. Stack Overflow has two questions about your exact problem, both unanswered. Your contractor who knows the framework charges a premium because the pool of contractors who know it is tiny.</p>
<p>None of this shows up in the initial estimate.</p>
<h3>When new tech makes sense</h3>
<p>When the novel technology is the product. AI features built on the latest model APIs — that's worth staying current because the capability is the differentiator. Infrastructure-level novelty, framework novelty, database novelty? Almost never worth it for a business that needs to ship and maintain software, not explore it.</p>
<p>The software that serves small businesses best is the software that's still running, still maintained, and still understandable two years after it's built. Boring is a feature.</p>`,
  },
  {
    slug: 'building-for-handoff',
    title: 'Building for handoff: code your team can actually own',
    date: '2026-03-15',
    tag: 'Process',
    excerpt: "The most important thing a contractor can do isn't ship fast. It's leave code that doesn't require them.",
    readTime: '6 min',
    content: `<p>There's a version of contract work that's good for the contractor and bad for the client: complex, clever code that only the original author fully understands. It looks impressive on delivery. It becomes a liability six months later.</p>
<p>At Luna Lab, we've built a set of practices around a single constraint: everything we ship, a capable developer who didn't build it should be able to read, understand, and modify within a week.</p>
<h3>The practices</h3>
<p><strong>No magic dependencies.</strong> Every third-party package must have a clear reason to exist. If we can implement something in fifty lines ourselves, we don't add a dependency. Dependencies are maintenance debt with a third party as co-signer.</p>
<p><strong>Obvious over clever.</strong> The smartest code is usually the code that's easiest to read. Sometimes a complex algorithm is the right call — but it should be the exception, not a default mode.</p>
<p><strong>Document the why, not the what.</strong> Comments that describe what code does are mostly noise — the code itself does that. Comments that explain why a decision was made, why a particular edge case exists, or why something that looks wrong is actually right — those are valuable.</p>
<p><strong>Environment variables for everything external.</strong> No hardcoded API keys, endpoints, or credentials. Not even in development. Getting this right from day one makes handoff dramatically simpler.</p>
<h3>The handoff document</h3>
<p>Every project we complete includes a handoff document: what the system does, where the parts live, what credentials are needed, what third-party services are integrated, and what the gotchas are. Not a full wiki — just enough that a new developer could deploy a fix without calling us.</p>
<p>The goal isn't to be replaceable. The goal is for the client to own what they paid for. That's the only kind of software agency relationship that scales.</p>`,
  },
  {
    slug: 'cost-to-build-custom-web-app-2026',
    title: 'How much does a custom web app cost for a small business in 2026?',
    date: '2026-06-01',
    tag: 'Pricing',
    excerpt: 'A direct breakdown of what small businesses actually pay for custom web applications, and the factors that move the number up or down.',
    readTime: '6 min',
    content: `<p>Most small businesses pay between <strong>$15,000 and $80,000</strong> for a custom web application. Simple internal tools and landing-page-plus-form projects start around <strong>$5,000–$15,000</strong>. Multi-feature platforms with logins, payments, dashboards, and integrations typically land between <strong>$30,000 and $80,000</strong>. Complex products with custom workflows, multiple user roles, and heavy third-party integrations can run <strong>$80,000–$150,000+</strong>.</p>
<p>Those ranges assume a small, focused team and a 4–12 week build. The exact number depends on a handful of factors that are worth understanding before you ask anyone for a quote.</p>
<h3>What actually drives the cost</h3>
<ul>
<li><strong>Number of user roles.</strong> A tool with one type of user (just "admin") is far cheaper than one with admins, staff, and customers each seeing different views.</li>
<li><strong>Integrations.</strong> Every third-party connection — payments, calendars, CRMs, shipping APIs — adds setup time, testing, and ongoing maintenance.</li>
<li><strong>Data complexity.</strong> A simple CRUD app (create, read, update, delete records) is cheap. Real-time dashboards, reporting engines, or anything involving scheduled jobs costs more.</li>
<li><strong>Design fidelity.</strong> A clean, functional UI built from a component library is much faster than a fully custom, animated design system.</li>
<li><strong>Compliance requirements.</strong> Healthcare, finance, and anything touching personal data adds audit, security review, and documentation overhead.</li>
</ul>
<h3>Three pricing tiers in practice</h3>
<p><strong>Tier 1 — $5,000–$15,000:</strong> A landing page with a working contact or booking form, a simple internal tool (e.g. a single-table inventory tracker), or a basic automation connecting two existing tools.</p>
<p><strong>Tier 2 — $30,000–$80,000:</strong> A SaaS MVP with authentication, a database, a billing integration, and a handful of core screens. This is the most common starting point for businesses building a real product.</p>
<p><strong>Tier 3 — $80,000–$150,000+:</strong> Multi-tenant platforms, marketplaces, or internal systems replacing several existing tools at once, with multiple integrations and user roles.</p>
<h3>Build vs. no-code vs. custom</h3>
<p>No-code tools (Bubble, Softr, Glide) are genuinely cheaper for very simple internal tools and can be the right call under $5,000. But they hit a ceiling fast: once you need custom logic, real performance, or to integrate something the platform doesn't support, you either rebuild from scratch or pay an increasing "workaround tax." For anything you expect to still be using in two years, custom development on a standard stack (like Next.js and PostgreSQL) is usually cheaper over the life of the product.</p>
<h3>What's not included in most quotes</h3>
<p>Hosting (typically $20–$200/month depending on scale), domain and email costs, third-party subscription fees (payment processors, transactional email, analytics), and ongoing maintenance. Budget roughly 10–20% of the build cost per year for updates, bug fixes, and small improvements.</p>`,
    faq: [
      {
        question: 'How much does a simple web app cost for a small business?',
        answer: 'A simple web app — a landing page with a working form, or a single-purpose internal tool — typically costs $5,000 to $15,000 with a small development team.',
      },
      {
        question: 'How long does it take to build an MVP?',
        answer: 'A focused MVP with core features usually takes 6 to 12 weeks from kickoff to launch, assuming a dedicated team and a clear scope agreed upfront.',
      },
      {
        question: 'Is no-code cheaper than custom development?',
        answer: 'No-code platforms are cheaper for very simple tools, often under $5,000. Once a project needs custom logic, integrations the platform does not support, or has to scale, custom development on a standard stack becomes cheaper over time.',
      },
      {
        question: 'Do I need to budget for ongoing maintenance?',
        answer: 'Yes. A reasonable budget for maintenance, bug fixes, and small improvements is roughly 10-20% of the original build cost per year, plus hosting costs of $20 to $200 per month depending on scale.',
      },
    ],
  },
  {
    slug: 'ai-agent-vs-chatbot-vs-automation',
    title: "AI agent vs. chatbot vs. automation: what's the difference?",
    date: '2026-05-25',
    tag: 'AI',
    excerpt: "Three terms that get used interchangeably actually solve different problems. Here's how to tell them apart, and which one your business needs.",
    readTime: '5 min',
    content: `<p>A <strong>chatbot</strong> follows scripted conversation flows and answers a limited set of predictable questions. An <strong>automation</strong> executes a fixed sequence of steps with no judgment involved — if X happens, do Y, every time, the same way. An <strong>AI agent</strong> uses a language model to reason about a goal, decide which actions to take, and adapt its approach when the situation doesn't match the script.</p>
<p>The differences matter because each one fits a different problem, costs a different amount to build, and fails in different ways.</p>
<h3>Chatbots: good for narrow, repeatable questions</h3>
<p>A chatbot is essentially a decision tree with a conversational interface. "What are your hours?" leads down one branch, "How do I reset my password?" leads down another. They're cheap to build, predictable, and easy to test — every possible path can be mapped out in advance.</p>
<p>The limitation: anything outside the scripted paths either fails or gets routed to a human. Chatbots don't reason — they match patterns.</p>
<h3>Automations: good for fixed, high-volume processes</h3>
<p>An automation connects systems and moves data between them without a conversational layer at all. New form submission → create CRM contact → send Slack notification → add to email sequence. Tools like n8n and Zapier live here.</p>
<p>Automations are reliable because they're deterministic — the same input always produces the same output. The limitation is the same as their strength: they can't handle a case the workflow wasn't built for.</p>
<h3>AI agents: good for tasks that require judgment</h3>
<p>An AI agent is given a goal and a set of tools (search the web, query a database, send an email, write a file) and figures out the steps itself. Ask it to "review this week's support tickets and draft replies for the ones that match our refund policy," and it reads each ticket, checks it against the policy, and decides case-by-case — something a fixed automation can't do because every ticket is slightly different.</p>
<p>The trade-off: agents are less predictable than automations. The best implementations constrain what the agent can do (which tools it has access to), and add a human review step for anything irreversible or high-stakes.</p>
<h3>Which one does your business need?</h3>
<p>Start with the simplest tool that solves the problem. If the task is the same every time, build an automation — it's cheaper and more reliable. If customers ask a small, stable set of questions, a chatbot covers most of it. Reach for an AI agent when the task involves reading unstructured information (emails, documents, tickets) and making a judgment call that would otherwise require a person.</p>
<p>In practice, most businesses end up with a mix: automations for the data plumbing, a chatbot for FAQ-style support, and one or two AI agents for the judgment-heavy work that used to eat the most staff time.</p>`,
    faq: [
      {
        question: 'Is ChatGPT an AI agent?',
        answer: 'On its own, ChatGPT is a conversational AI model. It becomes an AI agent when it is given access to tools — like the ability to browse, run code, or call APIs — and a goal to pursue using those tools.',
      },
      {
        question: 'Can a chatbot be upgraded into an AI agent?',
        answer: 'Yes. A scripted chatbot can be extended into an AI agent by replacing its decision tree with a language model that has access to your knowledge base and the ability to take actions, such as looking up an order or escalating a ticket.',
      },
      {
        question: 'Which is cheaper to build: a chatbot or an AI agent?',
        answer: 'A simple scripted chatbot is generally cheaper to build than an AI agent because its behavior is fully defined upfront. AI agents cost more to build and test because they need guardrails, tool access, and review steps for unpredictable cases.',
      },
      {
        question: 'Do AI agents replace employees?',
        answer: 'In most small business implementations, AI agents take over repetitive judgment-based tasks like triage, drafting, and qualification, while a person reviews the output. They reduce the volume of routine work rather than replacing decision-makers.',
      },
    ],
  },
  {
    slug: 'how-to-choose-a-software-development-agency',
    title: 'How to choose a software development agency for your small business',
    date: '2026-05-18',
    tag: 'Process',
    excerpt: 'Eight questions that separate a good development partner from a six-month headache, and what the right answers actually sound like.',
    readTime: '7 min',
    content: `<p>The right software development agency for a small business is one that can show you working software within weeks (not months), gives you full ownership of the code and accounts, staffs a small named team instead of rotating juniors, and can explain its pricing in plain numbers before you sign anything. If an agency can't do all four, keep looking.</p>
<h3>1. "Can you show me something similar you've built?"</h3>
<p>A good agency has a portfolio of real, shipped projects relevant to your type of business — not just mockups. Ask to see the live product, not just screenshots.</p>
<h3>2. "Who exactly will be working on this?"</h3>
<p>Watch out for agencies that pitch with senior people and staff with juniors. A small, named team that stays with the project end-to-end produces more consistent results than a rotating cast.</p>
<h3>3. "When do I see the first working version?"</h3>
<p>You should see something real — not a slide deck — within the first two to four weeks. If the answer is "after the design phase, in two months," that's a red flag for scope creep.</p>
<h3>4. "Who owns the code, the domain, and the accounts when we're done?"</h3>
<p>The correct answer is: you do, entirely, from day one. Source code in a repository you control, hosting and domain accounts in your name, and no dependency on the agency's infrastructure to keep your own product running.</p>
<h3>5. "What happens if I want to switch developers later?"</h3>
<p>This is really a question about documentation and code quality. A good agency writes code that another competent developer can pick up within a week, and provides a handoff document explaining how the system works.</p>
<h3>6. "How is pricing structured, and what's not included?"</h3>
<p>Fixed quotes should come with a defined scope — a list of what's built and what isn't. Open-ended "time and materials" billing should come with weekly visibility into hours spent. Either is fine, but vague pricing with no scope is how projects balloon.</p>
<h3>7. "What does support look like after launch?"</h3>
<p>Software needs updates — security patches, dependency upgrades, small fixes. Ask whether that's included, billed hourly, or requires a retainer, and get the rate in writing.</p>
<h3>8. "What's the communication rhythm?"</h3>
<p>Weekly check-ins or demos are the minimum for staying aligned. If updates are sporadic and unscheduled, problems compound before anyone notices.</p>
<h3>Red flags worth walking away from</h3>
<p>Quotes that seem too good to be true for the scope described, reluctance to give you access to your own code or accounts, no clear single point of contact, and pressure to sign before you've seen any working software.</p>`,
    faq: [
      {
        question: 'Should I hire a freelancer or an agency for a small business app?',
        answer: 'A freelancer can work well for small, well-defined tasks, but carries risk if they become unavailable mid-project. An agency with a small, named team offers more continuity and is generally a safer choice for anything you plan to depend on long-term.',
      },
      {
        question: 'What is a reasonable timeline for an MVP?',
        answer: 'Most MVPs with a clearly defined scope take 6 to 12 weeks from kickoff to launch. You should see a working version of core features within the first two to four weeks.',
      },
      {
        question: 'Who should own the code after a project is finished?',
        answer: 'The client should own all source code, domains, and accounts from day one. A development agency should never require ongoing access to its own infrastructure for your product to keep running.',
      },
      {
        question: 'How do I know if a fixed-price quote is realistic?',
        answer: 'A realistic fixed quote comes with a written scope describing exactly what will and will not be built. If a quote has no scope document attached, treat the number as unreliable regardless of how it compares to other quotes.',
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
