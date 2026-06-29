export default function ResultCard({ title, summary, items = [], notice, actions }) {
  return (
    <section className="smart-result-card">
      <div className="smart-result-header">
        <span className="smart-result-dot" />
        <div>
          <h3>{title}</h3>
          {summary && <p>{summary}</p>}
        </div>
      </div>

      {!!items.length && (
        <div className="smart-result-grid">
          {items.map((item) => (
            <div className="smart-result-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      )}

      {notice && <div className="smart-result-notice">{notice}</div>}

      {actions && <div className="smart-actions">{actions}</div>}
    </section>
  );
}
