import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { WORDS, createParticles } from './particles.js';

export default function ParticleWords() {
  const box = useRef(null);
  const canvas = useRef(null);
  const engine = useRef(null);
  const [live, setLive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [awake, setAwake] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(motion.matches);
    const updateTab = () => setAwake(!document.hidden);
    updateMotion();
    updateTab();

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(box.current);
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateTab);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateTab);
    };
  }, []);

  // Nothing is drawn until the visitor scrolls here
  useEffect(() => {
    if (!visible || reduced || engine.current) return;
    let cancelled = false;
    const start = () => {
      if (cancelled || engine.current) return;
      engine.current = createParticles(canvas.current, (word) => {
        box.current.dataset.word = word;
      });
      if (engine.current) setLive(true);
    };
    // The dots are traced from the font, so it has to be loaded first
    Promise.all([
      document.fonts.load('400 100px "Instrument Serif"'),
      document.fonts.load('italic 400 100px "Instrument Serif"'),
    ]).then(start, start);
    return () => {
      cancelled = true;
    };
  }, [visible, reduced]);

  useEffect(() => {
    if (!live) return;
    const size = new ResizeObserver(() => engine.current.resize());
    size.observe(canvas.current);
    const theme = new MutationObserver(() => engine.current.recolour());
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      size.disconnect();
      theme.disconnect();
    };
  }, [live]);

  useEffect(() => () => {
    engine.current?.destroy();
    engine.current = null;
  }, []);

  const moving = live && !reduced;
  const running = moving && visible && awake && !paused;

  useEffect(() => {
    engine.current?.setRunning(running);
  }, [running]);

  function point(event) {
    const area = canvas.current.getBoundingClientRect();
    engine.current?.point(event.clientX - area.left, event.clientY - area.top);
  }
  const release = () => engine.current?.release();

  return (
    <div ref={box} className="particles" data-live={moving} data-running={running}>
      {/* What shows without JavaScript, without canvas or with reduced motion */}
      <p className="particles-still" aria-hidden="true">
        {WORDS.map((word) => (word.italic ? <em key={word.text}>{word.text}</em> : <span key={word.text}>{word.text}</span>))}
      </p>
      <canvas
        ref={canvas}
        aria-hidden="true"
        onPointerMove={point}
        onPointerDown={point}
        onPointerLeave={release}
        onPointerCancel={release}
        onPointerUp={(event) => event.pointerType !== 'mouse' && release()}
      />
      {moving && (
        <button
          type="button"
          className="icon-button particles-pause"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? 'Play word animation' : 'Pause word animation'}
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
