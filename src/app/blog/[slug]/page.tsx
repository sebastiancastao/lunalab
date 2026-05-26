import Link from 'next/link';
import { posts, getPost } from '../posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

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
  const id = `cm-${size}-post`;
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

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Luna Lab`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const px = 'clamp(20px, 5.5vw, 80px)';
  const maxW = `calc(740px + clamp(40px, 11vw, 160px) * 2)`;

  return (
    <div style={{ background: ECL.bg, color: ECL.ink, fontFamily: SANS, minHeight: '100vh' }}>
      <style>{`
        .ll-prose p  { margin: 0 0 20px; font-size: 17px; line-height: 1.7; color: ${ECL.mute}; font-family: ${SANS}; }
        .ll-prose h3 { margin: 44px 0 16px; font-family: ${SERIF}; font-style: italic; font-weight: 400; font-size: clamp(22px, 2.5vw, 30px); letter-spacing: -0.015em; color: ${ECL.ink}; }
        .ll-prose ul { margin: 0 0 20px; padding-left: 0; list-style: none; }
        .ll-prose li { padding: 10px 0 10px 24px; border-bottom: 1px solid ${ECL.hair}; position: relative; font-size: 16px; line-height: 1.6; color: ${ECL.mute}; font-family: ${SANS}; }
        .ll-prose li::before { content: '—'; position: absolute; left: 0; color: ${ECL.accent}; }
        .ll-prose strong { color: ${ECL.ink}; font-weight: 500; }
      `}</style>

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
        <Link href="/blog" style={{
          color: ECL.mute, fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M12 7H2M6 11l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All posts
        </Link>
      </nav>

      {/* Post header */}
      <div style={{ padding: `clamp(110px, 16vh, 160px) ${px} 0`, maxWidth: maxW }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: ECL.accent, border: `1px solid ${ECL.accent}44`,
            borderRadius: 999, padding: '3px 10px',
          }}>
            {post.tag}
          </span>
          <span style={{ width: 1, height: 12, background: ECL.faint }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: ECL.mute }}>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span style={{ width: 1, height: 12, background: ECL.faint }} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: ECL.mute }}>
            {post.readTime} read
          </span>
        </div>

        <h1 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
          <em style={{ fontStyle: 'italic' }}>{post.title}</em>
        </h1>

        <p style={{ marginTop: 28, fontSize: 18, lineHeight: 1.55, color: ECL.mute, maxWidth: 600 }}>
          {post.excerpt}
        </p>

        <div style={{ width: '100%', height: 1, background: ECL.hair, marginTop: 56 }} />
      </div>

      {/* Post body */}
      <div
        className="ll-prose"
        style={{ padding: `clamp(48px, 6vh, 72px) ${px} clamp(80px, 12vh, 120px)`, maxWidth: maxW }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${ECL.hair}`, padding: `clamp(40px, 6vh, 60px) ${px}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <Link href="/blog" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          color: ECL.mute, fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em',
          textTransform: 'uppercase', textDecoration: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M12 7H2M6 11l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All posts
        </Link>
        <Link href="/#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: ECL.ink, border: `1px solid ${ECL.faint}`,
          fontFamily: SANS, fontSize: 14,
          padding: '10px 18px', borderRadius: 999, textDecoration: 'none',
        }}>
          Start a project
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
