'use client';

import { memo, useEffect, useState, useRef, useMemo } from 'react';
import { Shield, Clock, CheckCircle, Mail, Rocket } from 'lucide-react';
import Image from 'next/image';
import { useContactForm } from '@/hooks/useContactForm';

// ─── Design tokens ────────────────────────────────────────────
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
const SKETCHFAB_VIEWER_API_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
const MOON_MODEL_UID = '4db2273f6dd943b8ad7fa5e3b1b2431a';
const MOON_POSTER_URL = 'https://media.sketchfab.com/models/4db2273f6dd943b8ad7fa5e3b1b2431a/thumbnails/ad92c0da5f0941e58466218f127c48b9/8ec27d6792654960aedc76365e08524b.jpeg';

type SketchfabApi = {
  addEventListener: (event: string, callback: () => void) => void;
  load: (callback?: () => void) => void;
  start: () => void;
};

type SketchfabClient = {
  init: (
    uid: string,
    options: {
      autostart?: 0 | 1;
      preload?: 0 | 1;
      transparent?: 0 | 1;
      ui_controls?: 0 | 1;
      ui_infos?: 0 | 1;
      ui_inspector?: 0 | 1;
      ui_stop?: 0 | 1;
      ui_watermark?: 0 | 1;
      ui_watermark_link?: 0 | 1;
      success: (api: SketchfabApi) => void;
      error: () => void;
    }
  ) => void;
};

type SketchfabConstructor = new (iframe: HTMLIFrameElement) => SketchfabClient;

declare global {
  interface Window {
    Sketchfab?: SketchfabConstructor;
    __sketchfabViewerPromise?: Promise<SketchfabConstructor>;
  }
}

function loadSketchfabViewer() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Sketchfab viewer can only load in the browser.'));
  }

  if (window.Sketchfab) return Promise.resolve(window.Sketchfab);
  if (window.__sketchfabViewerPromise) return window.__sketchfabViewerPromise;

  window.__sketchfabViewerPromise = new Promise<SketchfabConstructor>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${SKETCHFAB_VIEWER_API_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.Sketchfab) resolve(window.Sketchfab);
        else reject(new Error('Sketchfab viewer script loaded without a global constructor.'));
      }, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Sketchfab viewer script.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = SKETCHFAB_VIEWER_API_URL;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window.Sketchfab) resolve(window.Sketchfab);
      else reject(new Error('Sketchfab viewer script loaded without a global constructor.'));
    };
    script.onerror = () => reject(new Error('Failed to load Sketchfab viewer script.'));
    document.head.appendChild(script);
  });

  return window.__sketchfabViewerPromise;
}

// ─── Seeded RNG (stable starfield) ───────────────────────────
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Shared UI atoms ─────────────────────────────────────────
function CrescentMark({ size = 28, color = ECL.ink }: { size?: number; color?: string }) {
  const id = `cm-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-label="Luna Lab" style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <mask id={id}>
          <rect width="32" height="32" fill="black" />
          <circle cx="16" cy="16" r="13" fill="white" />
          <circle cx="22" cy="13" r="11.5" fill="black" />
        </mask>
      </defs>
      <rect width="32" height="32" fill={color} mask={`url(#${id})`} />
    </svg>
  );
}

function MonoLabel({
  children,
  color = ECL.mute,
  size = 11,
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color,
      }}
    >
      {children}
    </span>
  );
}

const Starfield = memo(function Starfield({ count = 200 }: { count?: number }) {
  const stars = useMemo(() => {
    const rng = mulberry32(17);
    return Array.from({ length: count }, () => ({
      cx: `${rng() * 100}%`,
      cy: `${rng() * 100}%`,
      r: 0.4 + rng() * 1.3,
      o: 0.1 + rng() * 0.65,
      dur: `${2 + rng() * 5}s`,
    }));
  }, [count]);

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.o}>
          <animate
            attributeName="opacity"
            values={`${s.o};${(s.o * 0.2).toFixed(2)};${s.o}`}
            dur={s.dur}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
});

function MissionClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const label = now
    ? `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`
    : '--:--:-- UTC';
  return <MonoLabel color={ECL.mute}>{label}</MonoLabel>;
}

const MoonHero = memo(function MoonHero() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewerReady, setViewerReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let revealTimeout = 0;

    loadSketchfabViewer()
      .then((Sketchfab) => {
        const iframe = iframeRef.current;
        if (!iframe || cancelled) return;

        const client = new Sketchfab(iframe);
        client.init(MOON_MODEL_UID, {
          autostart: 1,
          preload: 1,
          transparent: 1,
          ui_controls: 0,
          ui_infos: 0,
          ui_inspector: 0,
          ui_stop: 0,
          ui_watermark: 0,
          ui_watermark_link: 0,
          success(api) {
            if (cancelled) return;
            api.addEventListener('viewerready', () => {
              revealTimeout = window.setTimeout(() => {
                if (!cancelled) setViewerReady(true);
              }, 120);
            });
            api.load();
            api.start();
          },
          error() {},
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (revealTimeout) window.clearTimeout(revealTimeout);
    };
  }, []);

  return (
    <div
      className="hidden sm:block"
      style={{
        position: 'absolute',
        right: 'clamp(20px, 5vw, 48px)',
        top: 'clamp(90px, 12vh, 150px)',
        width: 'clamp(200px, 32vw, 480px)',
        height: 'clamp(200px, 32vw, 480px)',
      }}
    >
      <div style={{ position: 'absolute', inset: 'clamp(-60px, -13vw, -130px)', borderRadius: '50%', border: `1px solid ${ECL.hair}` }} />
      <div style={{ position: 'absolute', inset: 'clamp(-30px, -6.5vw, -65px)', borderRadius: '50%', border: `1px dashed ${ECL.hair}` }} />
      <div style={{ position: 'absolute', inset: 'clamp(-60px, -13vw, -130px)', animation: 'ecl-orbit 26s linear infinite', transformOrigin: '50% 50%' }}>
        <div style={{ position: 'absolute', left: '50%', top: '-4px', width: 8, height: 8, background: ECL.accent, borderRadius: '50%', boxShadow: `0 0 20px ${ECL.accent}`, transform: 'translateX(-50%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 'clamp(-30px, -6.5vw, -65px)', animation: 'ecl-orbit 42s linear infinite reverse' }}>
        <div style={{ position: 'absolute', left: '50%', top: '-2px', width: 4, height: 4, background: ECL.ink, borderRadius: '50%', opacity: 0.6, transform: 'translateX(-50%)' }} />
      </div>
      <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', background: `radial-gradient(circle at 86% 45%, ${ECL.accent}4a 0%, ${ECL.accent}00 60%)`, pointerEvents: 'none', filter: 'blur(6px)' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#0c0b12', overflow: 'hidden', boxShadow: `0 0 100px ${ECL.accent}28` }}>
        {/* Direct image fetch keeps the poster ahead of iframe startup work. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden="true"
          src={MOON_POSTER_URL}
          fetchPriority="high"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: viewerReady ? 0 : 1,
            transition: 'opacity 450ms ease',
            pointerEvents: 'none',
          }}
        />
        <iframe
          ref={iframeRef}
          title="Moon 3D viewer"
          style={{
            position: 'absolute',
            width: '120%',
            height: '120%',
            top: '-10%',
            left: '-10%',
            border: 'none',
            opacity: viewerReady ? 1 : 0,
            visibility: viewerReady ? 'visible' : 'hidden',
            transition: 'opacity 450ms ease',
            pointerEvents: viewerReady ? 'auto' : 'none',
          }}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
      </div>
    </div>
  );
});

// ─── Service cell ─────────────────────────────────────────────
interface ServiceItem {
  idx: string;
  title: string;
  tag: string;
  body: string;
  stack: string;
}

function ServiceCell({ s, borderRight }: { s: ServiceItem; borderRight: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: 'clamp(24px, 3vw, 40px) clamp(18px, 2.5vw, 32px)',
        borderRight: borderRight ? `1px solid ${ECL.hair}` : 'none',
        transition: 'background 350ms ease',
        background: hover ? 'rgba(160,107,255,0.04)' : 'transparent',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <MonoLabel color={ECL.accent}>{s.idx}</MonoLabel>
        <MonoLabel color={ECL.faint}>{s.tag}</MonoLabel>
      </div>
      <h3
        style={{
          margin: 'clamp(28px, 4vw, 56px) 0 0',
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: 'clamp(22px, 2.5vw, 36px)',
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          color: ECL.ink,
        }}
      >
        <em style={{ fontStyle: 'italic' }}>{s.title}</em>
      </h3>
      <p style={{ margin: '14px 0 0', color: ECL.mute, fontFamily: SANS, fontSize: 15, lineHeight: 1.55 }}>
        {s.body}
      </p>
      <div style={{ flex: 1 }} />
      <div
        style={{
          marginTop: 22,
          paddingTop: 16,
          borderTop: `1px solid ${ECL.hair}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <MonoLabel color={ECL.mute}>{s.stack}</MonoLabel>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: `1px solid ${hover ? ECL.accent : ECL.faint}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hover ? ECL.accent : ECL.mute,
            transition: 'all 250ms ease',
            transform: hover ? 'translateX(4px)' : 'none',
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// ─── Work card ────────────────────────────────────────────────
interface WorkProject {
  idx: string;
  client: string;
  kind: string;
  title: string;
  hint: string;
  result: string;
  year: string;
  color: string;
  image?: string;
  video?: string;
  poster?: string;
}

function WorkCard({ project: p, tall }: { project: WorkProject; tall: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        height: tall ? 380 : 300,
        overflow: 'hidden',
        border: `1px solid ${ECL.hair}`,
        borderRadius: 4,
        cursor: 'pointer',
      }}
    >
      {/* Media */}
      {p.video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={p.poster ? encodeURI(p.poster) : undefined}
          src={encodeURI(p.video)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
            transition: 'transform 700ms cubic-bezier(.2,.7,.3,1)',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      ) : p.image ? (
        <Image
          src={p.image}
          alt={p.client}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity: 0.55,
            transition: 'transform 700ms cubic-bezier(.2,.7,.3,1)',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `repeating-linear-gradient(135deg, ${p.color}22 0 14px, ${p.color}11 14px 28px), #0a0a0e`,
            transition: 'transform 700ms cubic-bezier(.2,.7,.3,1)',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      )}
      {/* Color gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(120deg, ${p.color}55 0%, rgba(5,5,7,0.1) 50%, rgba(5,5,7,0.88) 100%)`,
        }}
      />

      {/* Top row */}
      <div style={{ position: 'absolute', left: 28, top: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <MonoLabel color={ECL.ink}>{p.idx}</MonoLabel>
        <span style={{ width: 20, height: 1, background: ECL.faint }} />
        <MonoLabel color={ECL.mute}>{p.kind}</MonoLabel>
      </div>
      <div style={{ position: 'absolute', right: 28, top: 28 }}>
        <MonoLabel color={ECL.mute}>{p.year}</MonoLabel>
      </div>

      {/* Default: client name */}
      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 28,
          transition: 'transform 400ms ease, opacity 400ms ease',
          transform: hover ? 'translateY(-90px)' : 'translateY(0)',
          opacity: hover ? 0 : 1,
        }}
      >
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 3.8vw, 52px)',
            lineHeight: 1,
            letterSpacing: '-0.015em',
            color: ECL.ink,
          }}
        >
          {p.client}
        </div>
        <div style={{ marginTop: 8 }}>
          <MonoLabel color={ECL.mute} size={10}>Hover to reveal →</MonoLabel>
        </div>
      </div>

      {/* Hover reveal */}
      <div
        style={{
          position: 'absolute',
          left: 28,
          right: 28,
          bottom: 28,
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 350ms ease, transform 350ms ease',
        }}
      >
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(20px, 2.8vw, 38px)',
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            maxWidth: 700,
            color: ECL.ink,
          }}
        >
          {p.title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 14,
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div style={{ color: ECL.mute, fontFamily: SANS, fontSize: 14, maxWidth: 500, lineHeight: 1.45 }}>
            {p.hint}
          </div>
          <MonoLabel color={ECL.accent} size={11}>{p.result}</MonoLabel>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);
  const { formData, isSubmitting, submitStatus, handleInputChange, handleSubmit } = useContactForm();

  useEffect(() => {
    try {
      const s = localStorage.getItem('lang');
      if (s === 'es') setLang('es');
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);

  useEffect(() => {
    const el = heroRef.current;
    const glow = heroGlowRef.current;
    if (!el || !glow) return;
    let rafId = 0;
    let nextX = 0;
    let nextY = 0;

    const updateGlow = () => {
      rafId = 0;
      glow.style.transform = `translate3d(${nextX - 240}px, ${nextY - 240}px, 0)`;
      glow.style.opacity = '1';
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      nextX = e.clientX - r.left;
      nextY = e.clientY - r.top;
      if (!rafId) rafId = window.requestAnimationFrame(updateGlow);
    };
    const onLeave = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      glow.style.opacity = '0';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const en = lang === 'en';

  const navItems = [
    { id: 'work',     label: en ? 'Work'    : 'Trabajo',   href: '#work'     },
    { id: 'services', label: en ? 'Services': 'Servicios', href: '#services' },
    { id: 'process',  label: en ? 'Process' : 'Proceso',   href: '#process'  },
    { id: 'contact',  label: en ? 'Contact' : 'Contacto',  href: '#contact'  },
    { id: 'blog',     label: 'Blog',                        href: '/blog'     },
  ];

  const projects: WorkProject[] = [
    {
      idx: 'W-01', client: 'AI Productivity App',
      kind: en ? 'Web app · Productivity' : 'App web · Productividad',
      title: en ? 'AI chatbots, auto-scheduling and Calendar integration.' : 'Chatbots IA, programación automática e integración Calendar.',
      hint: en ? 'AI productivity app featuring AI chatbots, auto-scheduling, and Google Calendar integration.' : 'App de productividad con chatbots IA, auto-programación e integración con Google Calendar.',
      result: 'AI · Automation', year: '2025', color: '#4f35a0',
      video: '/Grabación 2025-06-05 082816.mp4',
      poster: '/Captura de pantalla 2025-06-19 182335.png',
    },
    {
      idx: 'W-02', client: 'Real Estate AI',
      kind: en ? 'Web app · Real estate' : 'App web · Inmobiliaria',
      title: en ? 'AI-rated properties for quality of living.' : 'Propiedades evaluadas con IA para calidad de vida.',
      hint: en ? 'Platform that uses AI to rate the environment of a property — security, entertainment, nature, and traffic.' : 'Plataforma que usa IA para evaluar el entorno de propiedades: seguridad, entretenimiento, naturaleza y tráfico.',
      result: en ? 'AI · Real estate' : 'IA · Inmobiliaria', year: '2024', color: '#1e5cab',
      image: '/Captura de pantalla 2024-08-27 144922.png',
    },
    {
      idx: 'W-03', client: 'Transpaservic',
      kind: en ? 'Mobile · Operations' : 'Móvil · Operaciones',
      title: en ? 'Mobile-first dispatch for transport teams.' : 'Despacho mobile-first para transporte.',
      hint: en ? 'Mobile-first operations dashboard: scanning, approvals, and ticket generation integrated with driver ops.' : 'Dashboard móvil: escaneo, aprobaciones y tickets integrado con operaciones de conductores.',
      result: en ? 'Mobile · Transport' : 'Móvil · Transporte', year: '2025', color: '#2a5c2a',
      image: '/Captura de pantalla 2025-08-12 093338.png',
    },
    {
      idx: 'W-04', client: 'PetuLap',
      kind: en ? 'Web · E-commerce' : 'Web · E-commerce',
      title: en ? 'Electronics catalog optimized for lead capture.' : 'Catálogo de electrónica optimizado para leads.',
      hint: en ? 'Landing and catalog site for refurbished laptops, optimized for lead capture and WhatsApp contact.' : 'Sitio catálogo para laptops reacondicionadas, optimizado para captura de leads y contacto por WhatsApp.',
      result: en ? 'E-commerce · Leads' : 'E-commerce · Leads', year: '2025', color: '#5c3a1e',
      image: '/Captura de pantalla 2025-08-12 095946.png',
    },
    {
      idx: 'W-05', client: 'BP Ventures',
      kind: en ? 'Web app · Finance' : 'App web · Finanzas',
      title: en ? 'Multi-company invoicing with full status tracking.' : 'Facturación multi-empresa con seguimiento completo.',
      hint: en ? 'Multi-company invoicing dashboard with filtering, status tracking, and invoice actions for finance teams.' : 'Dashboard de facturación multi-empresa con filtros, seguimiento de estado y acciones para equipos de finanzas.',
      result: en ? 'Finance · SaaS' : 'Finanzas · SaaS', year: '2025', color: '#1e4a5c',
      image: '/Captura de pantalla 2025-08-12 100524.png',
    },
    {
      idx: 'W-06', client: 'Aura Admin',
      kind: en ? 'Web app · Admin' : 'App web · Admin',
      title: en ? 'Unified console for AI chats and client records.' : 'Consola unificada para chats IA y clientes.',
      hint: en ? 'Administration panel for managing AI assistant chats, client records, and system monitoring in a unified dashboard.' : 'Panel de administración para chats IA, registros de clientes y monitoreo del sistema.',
      result: en ? 'AI · Admin' : 'IA · Admin', year: '2025', color: '#3a1e5c',
      image: '/Captura de pantalla 2025-08-12 103906.png',
    },
    {
      idx: 'W-07', client: 'Palletization Sim',
      kind: en ? 'Web app · Logistics' : 'App web · Logística',
      title: en ? 'Warehouse simulator for palletization planning.' : 'Simulador de paletización para almacenes.',
      hint: en ? 'Calculates how many cartons fit on a pallet based on carton geometry and dry-van or refrigerated capacity constraints.' : 'Calcula cuántos cartones caben en un pallet según geometría y restricciones de furgón seco o refrigerado.',
      result: en ? 'Logistics · Ops' : 'Logística · Ops', year: '2025', color: '#3a4a1e',
      video: '/Grabación 2025-08-11 172552.mp4',
      poster: '/Captura de pantalla 2025-06-19 182335.png',
    },
    {
      idx: 'W-08', client: 'Dealer Analytics',
      kind: en ? 'Web app · Analytics' : 'App web · Analítica',
      title: en ? 'Real-time KPIs and dealer performance tracking.' : 'KPIs en tiempo real y rendimiento de concesionarios.',
      hint: en ? 'Real-time KPIs, sales, credit, and inventory tracking with advanced filtering for automotive dealerships.' : 'KPIs en tiempo real, ventas, crédito e inventario con filtros avanzados para distribuidoras automotrices.',
      result: en ? 'Analytics · SaaS' : 'Analítica · SaaS', year: '2025', color: '#1e3a5c',
      video: '/Grabación 2025-08-12 084414.mp4',
      poster: '/Captura de pantalla 2025-06-19 182335.png',
    },
  ];

  const services: ServiceItem[] = [
    {
      idx: 'S-01',
      title: en ? 'Web applications' : 'Aplicaciones web',
      tag: 'Apps',
      body: en
        ? 'Production-grade SaaS, portals and dashboards. Built on stacks you can actually hire for.'
        : 'SaaS de nivel productivo, portales y dashboards. Construidos con tecnologías confiables.',
      stack: 'Next · Postgres · Stripe',
    },
    {
      idx: 'S-02',
      title: en ? 'AI agents' : 'Agentes IA',
      tag: 'Agents',
      body: en
        ? 'Custom agents wired into your tools. Inbox triage, lead qualifying, support copilots, internal RAG.'
        : 'Agentes personalizados en tus herramientas. Triaje de correos, calificación de leads, RAG interno.',
      stack: 'Claude · OpenAI · Tools',
    },
    {
      idx: 'S-03',
      title: en ? 'Automations' : 'Automatizaciones',
      tag: 'Ops',
      body: en
        ? "Quiet pipelines that take work off your plate — billing, onboarding, reporting, tool sync."
        : 'Pipelines silenciosos que alivian tu carga — facturación, onboarding, reportes, sincronización.',
      stack: 'n8n · Zapier · API',
    },
    {
      idx: 'S-04',
      title: en ? 'Mobile apps' : 'Apps móviles',
      tag: 'Native',
      body: en
        ? 'iOS and Android from prototype to App Store. One codebase, native feel, real shipping cadence.'
        : 'iOS y Android del prototipo al App Store. Un codebase, sensación nativa, lanzamientos reales.',
      stack: 'Expo · Swift · Kotlin',
    },
  ];

  const steps = [
    {
      n: '01', t: en ? 'Brief' : 'Brief',
      d: en
        ? 'A 45-minute call. We learn the business, you learn how we work. Free, no decks.'
        : 'Una llamada de 45 minutos. Conocemos tu negocio, tú conoces cómo trabajamos. Sin presentaciones.',
    },
    {
      n: '02', t: en ? 'Shape' : 'Diseño',
      d: en
        ? 'Two weeks of prototyping. You see the actual product on a real device before we commit.'
        : 'Dos semanas de prototipado. Ves el producto real en un dispositivo antes de comprometerte.',
    },
    {
      n: '03', t: en ? 'Build' : 'Desarrollo',
      d: en
        ? '4–10 week sprints with a fixed, named crew. Weekly demos. No mystery weeks.'
        : 'Sprints de 4–10 semanas con un equipo fijo. Demos semanales. Sin semanas de misterio.',
    },
    {
      n: '04', t: en ? 'Orbit' : 'Órbita',
      d: en
        ? "We hand off, or we stay on retainer to keep it running. Always your code, always your call."
        : 'Entregamos o seguimos en retainer. Siempre tu código, siempre tu decisión.',
    },
  ];

  const inputStyle: React.CSSProperties = {
    background: 'rgba(242,241,238,0.04)',
    border: `1px solid ${ECL.hair}`,
    borderRadius: 6,
    padding: '11px 14px',
    color: ECL.ink,
    fontFamily: SANS,
    fontSize: 14,
    outline: 'none',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: ECL.mute,
    display: 'block',
    marginBottom: 6,
  };

  const px = 'clamp(20px, 5.5vw, 80px)';
  const sectionPad = `clamp(60px, 9vh, 120px) ${px}`;

  return (
    <div style={{ background: ECL.bg, color: ECL.ink, fontFamily: SANS, overflowX: 'hidden' }}>

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 72, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `0 ${px}`,
          background: `${ECL.bg}ee`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${ECL.hair}`,
        }}
      >
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: ECL.ink, flexShrink: 0 }}>
          <CrescentMark size={22} />
          <span style={{ fontFamily: SANS, fontWeight: 500, letterSpacing: '0.06em', fontSize: 13 }}>LUNA&nbsp;LAB</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 32 }}>
          {navItems.map((it) => (
            <a key={it.id} href={it.href}
              style={{ color: ECL.ink, fontFamily: SANS, fontSize: 14, textDecoration: 'none', opacity: 0.9 }}>
              {it.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, borderRadius: 999, border: `1px solid ${ECL.faint}`, padding: '3px 4px' }}>
            {(['en', 'es'] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  padding: '5px 11px', borderRadius: 999,
                  background: lang === l ? ECL.ink : 'transparent',
                  color: lang === l ? ECL.bg : ECL.ink,
                  border: 'none', cursor: 'pointer',
                  fontFamily: SANS, fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  transition: 'all 200ms',
                }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: ECL.ink, fontFamily: SANS, fontSize: 14,
              padding: '9px 16px', border: `1px solid ${ECL.faint}`, borderRadius: 999,
              textDecoration: 'none',
            }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: ECL.accent, boxShadow: `0 0 8px ${ECL.accent}` }} />
            {en ? 'Begin transmission' : 'Iniciar transmisión'}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8 }}
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: 'block', width: 22, height: 1.5, background: ECL.ink, borderRadius: 2 }} />
            ))}
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 72, left: 0, right: 0, zIndex: 49,
          background: `${ECL.bg}f2`, backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${ECL.hair}`,
          padding: `24px ${px} 32px`,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {navItems.map((it) => (
              <a key={it.id} href={it.href} onClick={() => setMobileOpen(false)}
                style={{ color: ECL.ink, fontFamily: SANS, fontSize: 20, textDecoration: 'none' }}>
                {it.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: 8, paddingTop: 16, borderTop: `1px solid ${ECL.hair}` }}>
              {(['en', 'es'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  style={{
                    padding: '8px 16px', borderRadius: 999,
                    background: lang === l ? ECL.ink : 'transparent',
                    color: lang === l ? ECL.bg : ECL.ink,
                    border: `1px solid ${ECL.faint}`,
                    cursor: 'pointer', fontFamily: SANS, fontSize: 13, fontWeight: 500,
                    textTransform: 'uppercase',
                  }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: ECL.bg }}
      >
        <MoonHero />

        <Starfield count={220} />

        {/* Cursor-follow glow */}
        <div
          ref={heroGlowRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ECL.accent}44, ${ECL.accent}00 65%)`,
            opacity: 0,
            transform: 'translate3d(-240px, -240px, 0)',
            transition: 'opacity 400ms ease',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            willChange: 'transform, opacity',
          }}
        />

        {/* Headline block */}
        <div style={{
          position: 'relative', zIndex: 3,
          padding: `clamp(100px, 14vh, 160px) ${px} clamp(80px, 10vh, 120px)`,
          maxWidth: `min(720px, ${lang === 'es' ? '90vw' : '58vw'})`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <span style={{ width: 28, height: 1, background: ECL.accent, flexShrink: 0 }} />
            <MonoLabel color={ECL.accent} size={11}>
              {en ? 'Mission 026 · Studio status: online' : 'Misión 026 · Estudio: en línea'}
            </MonoLabel>
          </div>

          <h1 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{en ? 'Software built' : 'Software para'}</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{en ? 'for small teams' : 'equipos pequeños'}</span>
            <span style={{ display: 'block' }}>
              {en ? 'with ' : 'con '}
              <em style={{ fontStyle: 'italic', color: ECL.accent }}>{en ? 'large orbits' : 'grandes órbitas'}</em>.
            </span>
          </h1>

          <p style={{ marginTop: 32, maxWidth: 520, fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.55, color: ECL.mute, fontFamily: SANS }}>
            {en
              ? 'Luna Lab is a remote studio building web applications, AI agents, automations and mobile apps for small businesses ready to leave the ground.'
              : 'Luna Lab es un estudio remoto que construye aplicaciones web, agentes IA, automatizaciones y apps móviles para pequeños negocios listos para despegar.'}
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 40, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: ECL.ink, color: ECL.bg,
                fontFamily: SANS, fontSize: 15, fontWeight: 500,
                padding: '14px 22px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '-0.005em',
              }}>
              {en ? 'Start a project' : 'Inicia un proyecto'}
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                color: ECL.ink, border: `1px solid ${ECL.faint}`,
                fontFamily: SANS, fontSize: 15, fontWeight: 400,
                padding: '13px 22px', borderRadius: 999, textDecoration: 'none',
              }}>
              {en ? 'See selected work' : 'Ver trabajo seleccionado'}
            </a>
          </div>
        </div>

        {/* Telemetry bar */}
        <div
          className="hidden sm:flex"
          style={{
            position: 'absolute', left: px, right: px, bottom: 40,
            justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 18, borderTop: `1px solid ${ECL.hair}`, zIndex: 3,
          }}
        >
<MonoLabel color={ECL.mute}>{en ? 'Booking Q3 · 2 slots remaining' : 'Agenda Q3 · 2 espacios disponibles'}</MonoLabel>
          <MissionClock />
        </div>

        <style>{`
          @keyframes ecl-orbit { to { transform: rotate(360deg); } }
        `}</style>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section id="services" style={{ position: 'relative', background: ECL.bg, color: ECL.ink, padding: sectionPad }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 32 }}>
          <div>
            <MonoLabel color={ECL.mute}>02 — {en ? 'Services' : 'Servicios'}</MonoLabel>
            <h2 style={{ margin: '20px 0 0', fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {en ? 'Four payloads.' : 'Cuatro servicios.'}<br />
              <em style={{ fontStyle: 'italic', color: ECL.mute }}>{en ? 'One studio.' : 'Un estudio.'}</em>
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: ECL.mute, fontSize: 16, lineHeight: 1.55, margin: 0, fontFamily: SANS }}>
            {en
              ? "We keep the surface area small on purpose. Every engagement runs through the same crew, so quality doesn't bleed between disciplines."
              : 'Mantenemos el área de servicio pequeña a propósito. Cada proyecto pasa por el mismo equipo para que la calidad no se diluya.'}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', borderTop: `1px solid ${ECL.hair}` }}>
          {services.map((s, i) => (
            <ServiceCell key={s.idx} s={s} borderRight={i < services.length - 1} />
          ))}
        </div>
      </section>

      {/* ── WORK ──────────────────────────────────────────── */}
      <section id="work" style={{ position: 'relative', background: ECL.bg, color: ECL.ink, padding: sectionPad }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <MonoLabel color={ECL.mute}>03 — {en ? 'Selected work' : 'Trabajo seleccionado'}</MonoLabel>
            <h2 style={{ margin: '20px 0 0', fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {en ? 'Shipped this' : 'Entregado este'}{' '}
              <em style={{ fontStyle: 'italic', color: ECL.mute }}>{en ? 'cycle' : 'ciclo'}</em>.
            </h2>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {projects.map((p, i) => (
            <WorkCard key={p.idx} project={p} tall={i === 1} />
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section id="process" style={{ position: 'relative', background: ECL.bg, color: ECL.ink, padding: sectionPad, borderTop: `1px solid ${ECL.hair}` }}>
        <div style={{ marginBottom: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <MonoLabel color={ECL.mute}>04 — {en ? 'Process' : 'Proceso'}</MonoLabel>
            <h2 style={{ margin: '20px 0 0', fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {en ? 'Pre-flight to' : 'Del despegue a la'}{' '}
              <em style={{ fontStyle: 'italic', color: ECL.mute }}>{en ? 'orbit' : 'órbita'}</em>
              {en ? ', in four phases.' : ', en cuatro fases.'}
            </h2>
          </div>
          <MonoLabel color={ECL.faint}>{en ? 'Avg. duration · 8 weeks' : 'Duración promedio · 8 semanas'}</MonoLabel>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              padding: 'clamp(28px, 3vw, 40px) clamp(18px, 2.5vw, 32px)',
              borderLeft: `1px solid ${ECL.hair}`,
              borderRight: i === steps.length - 1 ? `1px solid ${ECL.hair}` : 'none',
              position: 'relative',
              minHeight: 260,
            }}>
              <MonoLabel color={ECL.accent} size={13}>{s.n} / 04</MonoLabel>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.015em', marginTop: 56 }}>
                {s.t}
              </div>
              <p style={{ marginTop: 16, color: ECL.mute, fontFamily: SANS, fontSize: 15, lineHeight: 1.55 }}>{s.d}</p>
              {/* Trajectory dot */}
              <div style={{ position: 'absolute', top: 68, left: -4, width: 8, height: 8, borderRadius: '50%', background: ECL.accent, boxShadow: `0 0 12px ${ECL.accent}` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT / CTA ─────────────────────────────────── */}
      <section id="contact" style={{ position: 'relative', background: ECL.bg, color: ECL.ink, padding: `clamp(80px, 12vh, 160px) ${px} clamp(40px, 6vh, 80px)`, overflow: 'hidden' }}>
        {/* Soft arc glow */}
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          width: '180vw', height: '90vw',
          transform: 'translateX(-50%)', borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 10%, rgba(160,107,255,0.12), rgba(160,107,255,0) 55%)',
          pointerEvents: 'none',
        }} />

        {/* CTA headline */}
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <MonoLabel color={ECL.accent}>05 — {en ? 'Begin transmission' : 'Iniciar transmisión'}</MonoLabel>
          <h2 style={{ margin: '32px 0 0', fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(40px, 7.5vw, 108px)', lineHeight: 1, letterSpacing: '-0.025em' }}>
            {en ? "Let's build something" : 'Construyamos algo'}<br />
            <em style={{ fontStyle: 'italic', color: ECL.accent }}>{en ? 'worth orbiting' : 'que valga la órbita'}</em>.
          </h2>
          <p style={{ marginTop: 32, fontSize: 18, color: ECL.mute, maxWidth: 540, marginInline: 'auto', lineHeight: 1.55 }}>
            {en
              ? "Drop us a line and we'll schedule the brief call within 48 hours."
              : 'Escríbenos y agendaremos la llamada en menos de 48 horas.'}
          </p>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            {[
              { Icon: Shield, label: en ? 'Confidential' : 'Confidencial' },
              { Icon: Clock,  label: en ? 'Pay when satisfied' : 'Paga cuando estés satisfecho' },
            ].map(({ Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', border: `1px solid ${ECL.hair}`, borderRadius: 999 }}>
                <Icon style={{ width: 13, height: 13, color: ECL.accent }} />
                <MonoLabel color={ECL.mute} size={10}>{label}</MonoLabel>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ maxWidth: 640, margin: '60px auto 0', position: 'relative' }}>
          <div style={{ border: `1px solid ${ECL.hair}`, borderRadius: 12, padding: 'clamp(24px, 4vw, 44px)', background: 'rgba(242,241,238,0.02)' }}>
            <h3 style={{ margin: '0 0 28px', fontFamily: SERIF, fontStyle: 'italic', fontSize: 26, fontWeight: 400, color: ECL.ink }}>
              {en ? 'Start Your Mission' : 'Comienza tu misión'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="name" style={labelStyle}>{en ? 'Your Name' : 'Tu nombre'}</label>
                  <input type="text" id="name" name="name" value={formData.name}
                    onChange={handleInputChange} placeholder="John Smith"
                    required disabled={isSubmitting} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input type="email" id="email" name="email" value={formData.email}
                    onChange={handleInputChange} placeholder="john@company.com"
                    required disabled={isSubmitting} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="budget" style={labelStyle}>Budget</label>
                  <select id="budget" name="budget" value={formData.budget}
                    onChange={handleInputChange} required disabled={isSubmitting} style={inputStyle}>
                    <option value="">Select Range</option>
                    <option value="5k-15k">$5k - $15k</option>
                    <option value="15k-50k">$15k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor="projectType" style={labelStyle}>{en ? 'Project Type' : 'Tipo de proyecto'}</label>
                  <select id="projectType" name="projectType" value={formData.projectType}
                    onChange={handleInputChange} required disabled={isSubmitting} style={inputStyle}>
                    <option value="">Select Type</option>
                    <option value="web-app">Web Application</option>
                    <option value="mobile-app">Mobile Application</option>
                    <option value="website">Website</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="message" style={labelStyle}>{en ? 'Project Details' : 'Detalles del proyecto'}</label>
                <textarea
                  id="message" name="message" value={formData.message}
                  onChange={handleInputChange} rows={4}
                  placeholder={en ? 'Describe your project vision, goals, and requirements...' : 'Describe tu visión, objetivos y requisitos...'}
                  required disabled={isSubmitting}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {submitStatus.type && (
                <div style={{
                  padding: '12px 16px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10,
                  background: submitStatus.type === 'success' ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                  border: `1px solid ${submitStatus.type === 'success' ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}`,
                  color: submitStatus.type === 'success' ? '#86efac' : '#fca5a5',
                }}>
                  {submitStatus.type === 'success'
                    ? <CheckCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                    : <Mail style={{ width: 16, height: 16, flexShrink: 0 }} />}
                  <span style={{ fontSize: 14 }}>{submitStatus.message}</span>
                </div>
              )}

              <button
                type="submit" disabled={isSubmitting}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: ECL.accent, color: ECL.bg, border: 'none',
                  fontFamily: SANS, fontWeight: 500, fontSize: 15,
                  padding: '15px 28px', borderRadius: 999,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  transition: 'opacity 200ms',
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{ width: 18, height: 18, border: `2px solid ${ECL.bg}44`, borderTopColor: ECL.bg, borderRadius: '50%', animation: 'ecl-spin 0.8s linear infinite' }} />
                    {en ? 'Launching...' : 'Enviando...'}
                  </>
                ) : (
                  <>
                    <Rocket style={{ width: 18, height: 18 }} />
                    {en ? 'Launch Project' : 'Lanzar proyecto'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Moon attribution (Sketchfab terms) */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: ECL.faint }}>
          3D Moon model by{' '}
          <a href="https://sketchfab.com/shooter24994" target="_blank" rel="nofollow" style={{ color: ECL.mute, textDecoration: 'none' }}>Akshat</a>
          {' on '}
          <a href="https://sketchfab.com" target="_blank" rel="nofollow" style={{ color: ECL.mute, textDecoration: 'none' }}>Sketchfab</a>
        </p>

        {/* Footer */}
        <footer style={{
          position: 'relative', marginTop: 100, paddingTop: 32,
          borderTop: `1px solid ${ECL.hair}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CrescentMark size={18} />
            <span style={{ fontFamily: SANS, fontWeight: 500, letterSpacing: '0.06em', fontSize: 13 }}>LUNA&nbsp;LAB</span>
            <span style={{ width: 1, height: 12, background: ECL.faint, margin: '0 4px' }} />
            <MonoLabel color={ECL.mute}>© 2026 · Made between LA &amp; elsewhere</MonoLabel>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {navItems.map((it) => (
              <a key={it.id} href={it.href} style={{ color: ECL.mute, fontFamily: SANS, fontSize: 13, textDecoration: 'none' }}>
                {it.label}
              </a>
            ))}
          </div>
          <MonoLabel color={ECL.faint}>v 2.6 · build 0419</MonoLabel>
        </footer>

        <style>{`@keyframes ecl-spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    </div>
  );
}
