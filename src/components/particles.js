// Dots that gather into one word, then the next. No libraries, just a 2D canvas.

// To add a word, add a line. italic shows it in red. lines splits a long word so it stays readable.
export const WORDS = [
  { text: 'LLM' },
  { text: 'RAG' },
  { text: 'agents', italic: true },
  { text: 'LangChain', lines: ['Lang', 'Chain'] },
  { text: 'PyTorch', lines: ['Py', 'Torch'] },
  { text: 'QLoRA', italic: true },
  { text: 'NLP' },
];

const HOLD = 3000; // ms each word is shown
const STIFFNESS = 0.02;
const DAMPING = 0.82;
const FRAME = 1000 / 60;

// A fixed scatter per dot, so every visit looks the same
const noise = (i, seed) => {
  const n = Math.sin((i + 1) * seed) * 43758.5453;
  return n - Math.floor(n);
};

// Turns a word into the points that draw it
function sample({ text, italic, lines = [text] }, width, height, step) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });

  // Measures the lines as one block at a given font size
  const layout = (size) => {
    context.font = `${italic ? 'italic ' : ''}400 ${size}px "Instrument Serif", Georgia, serif`;
    const boxes = lines.map((line) => context.measureText(line));
    const baseline = (i) => i * size * 0.9;
    const top = Math.min(...boxes.map((box, i) => baseline(i) - box.actualBoundingBoxAscent));
    const bottom = Math.max(...boxes.map((box, i) => baseline(i) + box.actualBoundingBoxDescent));
    const wide = Math.max(...boxes.map((box) => box.actualBoundingBoxLeft + box.actualBoundingBoxRight));
    return { boxes, baseline, top, wide, tall: bottom - top };
  };

  const trial = layout(100);
  const room = lines.length > 1 ? 0.88 : 0.78;
  const { boxes, baseline, top, tall } = layout(100 * Math.min((width * 0.9) / trial.wide, (height * room) / trial.tall));

  // The serif has hairlines that would fall between dots without this
  context.lineWidth = step * 0.45;
  context.lineJoin = 'round';
  lines.forEach((line, i) => {
    const x = (width + boxes[i].actualBoundingBoxLeft - boxes[i].actualBoundingBoxRight) / 2;
    const y = (height - tall) / 2 - top + baseline(i);
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
  });

  const { data } = context.getImageData(0, 0, width, height);
  const points = [];
  for (let py = step / 2; py < height; py += step) {
    for (let px = step / 2; px < width; px += step) {
      if (data[(Math.floor(py) * width + Math.floor(px)) * 4 + 3] > 120) points.push(px, py);
    }
  }
  return points;
}

export function createParticles(canvas, onWord) {
  const context = canvas.getContext('2d');
  if (!context) return null;

  let width = 0;
  let height = 0;
  let step = 4;
  let targets = [];
  let dots = [];
  let word = 0;
  let running = false;
  let frame = 0;
  let timer = 0;
  let last = 0;
  let changedAt = 0;
  let pointer = null;
  let ink = '';
  let accent = '';

  function readColours() {
    const css = getComputedStyle(canvas);
    ink = css.getPropertyValue('--text').trim();
    accent = css.getPropertyValue('--accent').trim();
  }

  // Tiny squares read as dots at this size and stay smooth on slow phones
  function draw() {
    context.clearRect(0, 0, width, height);
    const size = step * 0.66;
    const allAccent = Boolean(WORDS[word].italic);
    for (const red of [false, true]) {
      context.fillStyle = red ? accent : ink;
      for (const dot of dots) {
        if ((allAccent || dot.red) === red) context.fillRect(dot.x - size / 2, dot.y - size / 2, size, size);
      }
    }
  }

  function aim() {
    const points = targets[word];
    const count = points.length / 2;
    dots.forEach((dot, i) => {
      const at = (i % count) * 2;
      dot.tx = points[at];
      dot.ty = points[at + 1];
    });
  }

  function move(now) {
    frame = 0;
    const time = Math.min((now - last) / FRAME || 1, 3);
    last = now;
    const reach = width * 0.14;
    let moving = false;

    for (const dot of dots) {
      if (now - changedAt < dot.delay) {
        moving = true;
      } else {
        dot.vx += (dot.tx - dot.x) * STIFFNESS * time;
        dot.vy += (dot.ty - dot.y) * STIFFNESS * time;
      }
      if (pointer) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < reach) {
          const push = (1 - distance / reach) * 1.8 * time;
          dot.vx += (dx / distance) * push;
          dot.vy += (dy / distance) * push;
        }
      }
      const friction = DAMPING ** time;
      dot.vx *= friction;
      dot.vy *= friction;
      dot.x += dot.vx * time;
      dot.y += dot.vy * time;
      if (Math.abs(dot.vx) + Math.abs(dot.vy) + Math.abs(dot.tx - dot.x) + Math.abs(dot.ty - dot.y) > 0.3) moving = true;
    }

    draw();
    // Once the word has formed there is nothing to do until the next one
    if (running && moving) frame = requestAnimationFrame(move);
  }

  function wake() {
    if (!running || frame) return;
    last = performance.now();
    frame = requestAnimationFrame(move);
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      word = (word + 1) % WORDS.length;
      changedAt = performance.now();
      onWord?.(WORDS[word].text);
      aim();
      wake();
      schedule();
    }, HOLD);
  }

  function resize() {
    const box = canvas.getBoundingClientRect();
    const w = Math.round(box.width);
    const h = Math.round(box.height);
    if (!w || !h || (w === width && h === height)) return;

    width = w;
    height = h;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    step = Math.max(3.4, w / 116);
    targets = WORDS.map((item) => sample(item, w, h, step));
    const count = Math.max(...targets.map((points) => points.length / 2));
    const first = dots.length === 0;
    dots = Array.from({ length: count }, (_, i) => ({
      x: noise(i, 12.9898) * w,
      y: noise(i, 78.233) * h,
      tx: 0,
      ty: 0,
      vx: 0,
      vy: 0,
      delay: noise(i, 39.425) * 260,
      red: noise(i, 93.989) < 0.12,
    }));
    aim();
    // After a resize the word stays formed instead of scattering again
    if (!first) dots.forEach((dot) => Object.assign(dot, { x: dot.tx, y: dot.ty }));

    changedAt = performance.now();
    readColours();
    draw();
    onWord?.(WORDS[word].text);
    wake();
  }

  resize();

  return {
    resize,
    recolour() {
      readColours();
      draw();
    },
    point(x, y) {
      pointer = { x, y };
      wake();
    },
    release() {
      pointer = null;
      wake();
    },
    setRunning(value) {
      if (value === running) return;
      running = value;
      if (value) {
        wake();
        schedule();
      } else {
        clearTimeout(timer);
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    destroy() {
      running = false;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    },
  };
}
