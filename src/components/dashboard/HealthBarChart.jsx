import './HealthBarChart.css';

export default function HealthBarChart({ title, items }) {
  return (
    <section className="health-chart">
      <h3 className="health-chart-title">{title}</h3>
      <div className="health-chart-list">
        {items.map((item) => (
          <div key={item.label} className="health-chart-row">
            <span className="health-chart-label">{item.label}</span>
            <div className="health-chart-track">
              <div
                className="health-chart-fill"
                style={{ width: `${item.value}%`, background: item.color }}
              />
            </div>
            <span className="health-chart-value">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
