export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readTime: string;
  content: string;
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
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
