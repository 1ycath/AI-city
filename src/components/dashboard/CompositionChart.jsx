import './CompositionChart.css';

export default function CompositionChart({ title, items }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="composition-chart">
      <h3 className="composition-chart-title">{title}</h3>
      <div className="composition-chart-body">
        <div className="composition-bars">
          {items.map((item) => {
            const percent = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={item.label} className="composition-row">
                <div className="composition-row-header">
                  <span className="composition-dot" style={{ background: item.color }} />
                  <span className="composition-label">{item.label}</span>
                  <span className="composition-value">
                    {item.value.toLocaleString()}
                  </span>
                </div>
                <div className="composition-track">
                  <div
                    className="composition-fill"
                    style={{ width: `${percent}%`, background: item.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
