function Layout({ title, children }) {
  return (
    <div className="layout">

      <header className="header">
        <h1>Catálogo de Restauración</h1>
      </header>

      <main className="main-content">

        <section className="page-container">

          <h2>{title}</h2>

          {children}

        </section>

      </main>

      <footer className="footer">
        © 2026 - Parques Nacionales Naturales de Colombia
      </footer>

    </div>
  );
}

export default Layout;
