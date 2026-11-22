import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import {
  siDjango, siDocker, siFlask, siGit, siHuggingface, siLangchain, siLinux,
  siMysql, siNumpy, siPandas, siPython, siPytorch, siScikitlearn, siTensorflow,
} from 'simple-icons';
import { Brand } from './Icons.jsx';

// Each name sits with its own icon, so a label can't end up under the wrong logo
const LOGOS = [
  [siPython, 'Python'], [siPytorch, 'PyTorch'], [siTensorflow, 'TensorFlow'], [siLangchain, 'LangChain'],
  [siHuggingface, 'Hugging Face'], [siScikitlearn, 'Scikit-learn'], [siPandas, 'Pandas'], [siNumpy, 'NumPy'],
  [siDjango, 'Django'], [siFlask, 'Flask'], [siDocker, 'Docker'], [siGit, 'Git'], [siMysql, 'MySQL'], [siLinux, 'Linux'],
];

export default function LogoRow() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="logos" data-paused={paused}>
      <div className="logos-window">
        <div className="logos-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="logos-set" aria-hidden={copy === 1 || undefined}>
              {LOGOS.map(([icon, name]) => <li key={name}><Brand icon={icon} size={24} /><span>{name}</span></li>)}
            </ul>
          ))}
        </div>
      </div>
      <button type="button" className="icon-button logos-pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play logo animation' : 'Pause logo animation'}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
