function Section({ title, children }) {
  return (
    <section className="section">

      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <div className="section-body">
        {children}
      </div>

    </section>
  );
}

export default Section;
