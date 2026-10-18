import { useEffect, useRef } from 'react';

/**
 * 星空背景（依据用户上传的 uiverse.io starfield 提示词实现）：
 * - 底部径向渐变：radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)
 * - 三层星点：1px 为主 / 少量 2px / 极少数 3px，白色点缓慢向上漂移（对应 50s/100s/150s 一圈）
 * - 部分星点轻微闪烁，营造深邃星空
 * - 响应式：星点按视口大小自适应生成；尊重 prefers-reduced-motion
 */
export default function BackgroundAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let w = 0;
    let h = 0;

    type Star = { x: number; y: number; v: number; size: number; alpha: number; tw: boolean; phase: number };
    let stars: Star[] = [];

    const makeStars = () => {
      const count = Math.floor((w * h) / 5200);
      stars = Array.from({ length: count }, () => {
        const r = Math.random();
        const size = r < 0.04 ? 3 : r < 0.16 ? 2 : 1; // 3px 极少、2px 少量、1px 为主
        return {
          x: Math.random() * w,
          y: Math.random() * (h + 1600) - 800,
          v: 12 + Math.random() * 40, // px/s 上移速度（缓慢漂移）
          size,
          alpha: 0.4 + Math.random() * 0.6,
          tw: Math.random() < 0.08, // 约 8% 星点闪烁（性能优化：减少逐帧透明度计算）
          phase: Math.random() * Math.PI * 2
        };
      });
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    };

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;

      for (const s of stars) {
        s.y -= s.v * dt;
        if (s.y < -12) {
          s.y = h + 12;
          s.x = Math.random() * w;
        }
        let a = s.alpha;
        if (s.tw) a *= 0.55 + 0.45 * Math.sin(t * 2 + s.phase);
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 底部径向渐变：深空蓝 → 黑 */}
      <div className="bg-starfield absolute inset-0" />
      {/* 三层星点 canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
