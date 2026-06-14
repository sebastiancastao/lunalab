import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ECL = {
  bg: '#050507',
  ink: '#f2f1ee',
  mute: 'rgba(242,241,238,0.55)',
  accent: '#a06bff',
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: ECL.bg,
          color: ECL.ink,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: ECL.ink,
              position: 'relative',
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: ECL.bg,
                top: -6,
                right: -12,
              }}
            />
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 6 }}>LUNA LAB</div>
        </div>

        <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 66, lineHeight: 1.15, maxWidth: 920 }}>
            Software built for small teams
          </div>
          <div style={{ fontSize: 66, lineHeight: 1.15, color: ECL.accent, fontStyle: 'italic' }}>
            with large orbits.
          </div>
        </div>

        <div style={{ marginTop: 32, fontSize: 28, color: ECL.mute, maxWidth: 820 }}>
          Web apps, AI agents, automations and mobile apps for small businesses.
        </div>
      </div>
    ),
    { ...size }
  );
}
