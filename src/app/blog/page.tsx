import Link from 'next/link';
import { posts } from './posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Luna Lab',
  description: 'Thoughts on software, AI agents, and building products that last.',
};

const ECL = {
  bg: '#050507',
  ink: '#f2f1ee',
  mute: 'rgba(242,241,238,0.55)',
  faint: 'rgba(242,241,238,0.18)',
  hair: 'rgba(242,241,238,0.10)',
  accent: '#a06bff',
};

const SERIF = 'var(--font-serif), Georgia, serif';
const SANS  = 'var(--font-sans), system-ui, sans-serif';
const MONO  = 'var(--font-mono), ui-monospace, monospace';

function CrescentMark({ size = 22 }: { size?: number }) {
  const id = `cm-${size}-blog`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-label="Luna Lab" style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <mask id={id}>
          <rect width="32" height="32" fill="black" />
          <circle cx="16" cy="16" r="13" fill="white" />
          <circle cx="22" cy="13" r="11.5" fill="black" />
        </mask>
      </defs>
      <rect width="32" height="32" fill={ECL.ink} mask={`url(#${id})`} />
    </svg>
  );
}

export default function BlogPage() {
  const px = 'clamp(20px, 5.5vw, 80px)';

  return (
    <div style={{ background: ECL.bg, color: ECL.ink, fontFamily: SANS, minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 72, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `0 ${px}`,
        background: `${ECL.bg}ee`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${ECL.hair}`,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: ECL.ink }}>
          <CrescentMark size={22} />
          <span style={{ fontFamily: SANS, fontWeight: 500, letterSpacing: '0.06em', fontSize: 13 }}>LUNA&nbsp;LAB</span>
        </Link>
        <Link href="/" style={{
          color: ECL.mute, fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M12 7H2M6 11l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </Link>
      </nav>

      {/* Header */}
      <div style={{ padding: `clamp(110px, 16vh, 160px) ${px} clamp(60px, 8vh, 80px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <span style={{ width: 28, height: 1, background: ECL.accent, flexShrink: 0 }} />
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: ECL.accent }}>
            Transmissions
          </span>
        </div>
        <h1 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
          Dispatches from<br />
          <em style={{ fontStyle: 'italic', color: ECL.mute }}>the lab</em>.
        </h1>
        <p style={{ marginTop: 24, maxWidth: 500, fontSize: 16, lineHeight: 1.55, color: ECL.mute, margin: '24px 0 0' }}>
          Thoughts on software, AI agents, and building products that last.
        </p>
      </div>

      {/* Post list */}
      <div style={{ padding: `0 ${px} clamp(80px, 12vh, 120px)` }}>
        <div style={{ borderTop: `1px solid ${ECL.hair}` }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
              <article style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(20px, 4vw, 64px)',
                padding: 'clamp(28px, 4vh, 48px) 0',
                borderBottom: `1px solid ${ECL.hair}`,
              }}>
                {/* Meta */}
                <div style={{ flexShrink: 0, minWidth: 'clamp(90px, 12vw, 160px)' }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: ECL.mute, display: 'block' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span style={{
                    display: 'inline-block', marginTop: 10,
                    fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: ECL.accent, border: `1px solid ${ECL.accent}44`,
                    borderRadius: 999, padding: '3px 8px',
                  }}>
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.015em', color: ECL.ink }}>
                    <em style={{ fontStyle: 'italic' }}>{post.title}</em>
                  </h2>
                  <p style={{ margin: '12px 0 0', color: ECL.mute, fontSize: 15, lineHeight: 1.55, maxWidth: 600 }}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Read arrow */}
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: ECL.mute, whiteSpace: 'nowrap' }}>
                    {post.readTime}
                  </span>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: `1px solid ${ECL.faint}`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: ECL.mute, flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: `32px ${px}`,
        borderTop: `1px solid ${ECL.hair}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CrescentMark size={18} />
          <span style={{ fontFamily: SANS, fontWeight: 500, letterSpacing: '0.06em', fontSize: 13 }}>LUNA&nbsp;LAB</span>
          <span style={{ width: 1, height: 12, background: ECL.faint, margin: '0 4px' }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: ECL.mute }}>
            © 2026 · Made between LA &amp; elsewhere
          </span>
        </div>
        <Link href="/" style={{ color: ECL.mute, fontFamily: SANS, fontSize: 13, textDecoration: 'none' }}>
          Back to home
        </Link>
      </footer>
    </div>
  );
}
