import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import './styles/tokens.css';
import './styles/site.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');
// The build ships ready-made HTML. The dev server starts empty.
if (root.firstElementChild) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
