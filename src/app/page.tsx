export default function Home() {
  return (
    <main className="shell">
      <header className="header"><span className="brand">Makkahwi<span className="brandAccent"> AI</span></span><span className="eyebrow">A conversational interface to Suhaib</span></header>
      <div className="backdrop" aria-hidden="true">
        <div className="backdropCard"><span>PROJECT / 01</span><strong>Semesteer</strong><p>School information platform</p></div>
        <div className="backdropCard"><span>FOCUS</span><strong>Full-stack development</strong><p>React · Next.js · Node.js</p></div>
        <div className="backdropCard"><span>EDUCATION</span><strong>Malaysia</strong><p>International Islamic University Malaysia</p></div>
      </div>
      <section className="hero" aria-labelledby="hero-title">
        <p className="kicker">MEET SUHAIB AHMAD</p>
        <h1 id="hero-title">The person behind<br /><em>the projects.</em></h1>
        <p className="lead">Makkahwi AI will let you explore Suhaib’s work, experience, and ideas through a grounded conversation.</p>
        <div className="promptPreview"><span>Ask about my work, projects, experience...</span><span className="arrow" aria-hidden="true">↗</span></div>
        <p className="phaseNote">The conversation experience is being built. The public knowledge base is ready for the next phase.</p>
      </section>
      <footer className="footer"><span>Built around real work and cited knowledge.</span><span>ai.suhaib.dev</span></footer>
    </main>
  );
}
