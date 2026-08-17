import { ImageResponse } from 'next/og';

export const alt = 'Die Together Guide — Monsters. Maps. Loot. Get your crew home.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '58px 66px',
          color: '#f2e8cf',
          background:
            'radial-gradient(circle at 88% 10%, rgba(72,182,167,.28), transparent 34%), radial-gradient(circle at 5% 90%, rgba(216,168,78,.16), transparent 30%), #071014',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#071014',
              background: '#f0c978',
              borderRadius: 50,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            DT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#7fd4c8', fontSize: 16, letterSpacing: 4 }}>
              INDEPENDENT FIELD GUIDE
            </span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>DIE TOGETHER GUIDE</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 970 }}>
          <span style={{ color: '#f0c978', fontSize: 25, marginBottom: 18 }}>
            EARLY ACCESS · AUG 18
          </span>
          <span style={{ fontSize: 70, fontWeight: 800, lineHeight: 0.98, letterSpacing: -4 }}>
            Last Pirates: Die Together Guide
          </span>
          <span style={{ color: '#d7d4c4', fontSize: 30, marginTop: 24 }}>
            Monsters. Maps. Loot. Get your crew home.
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9db0ac', fontSize: 15 }}>
          <span>SOURCE-CHECKED · PRE-EA BUILD CONTEXT</span>
          <span>DIETOGETHERGUIDE.SHOP</span>
        </div>
      </div>
    ),
    size,
  );
}
