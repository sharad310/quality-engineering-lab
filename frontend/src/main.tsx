import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main>
      <p className="eyebrow">QA AUTOMATION PORTFOLIO</p>
      <h1>Quality Engineering Lab</h1>
      <p className="intro">A small shopping app. A place to practice reliable testing.</p>
      <section aria-labelledby="shop-heading">
        <h2 id="shop-heading">The shop is taking shape</h2>
        <p>Product browsing, a cart, and checkout will arrive in future steps.</p>
      </section>
      <section aria-labelledby="lab-heading">
        <h2 id="lab-heading">Start with the foundation</h2>
        <p>React frontend / Express API / SQLite storage / Playwright tests</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
