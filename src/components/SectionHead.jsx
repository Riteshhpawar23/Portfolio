export default function SectionHead({ id, label, children }) {
  return (
    <header className="section-head">
      <p className="label">{label}</p>
      <h2 id={id}>{children}</h2>
    </header>
  );
}
