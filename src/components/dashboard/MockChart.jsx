import './MockChart.css';

function normalize(values) {
  const max = Math.max(...values);
  return values.map((v) => (max > 0 ? (v / max) * 100 : 0));
}

export default function MockChart({ title = '运行趋势 · 24h', labels, series }) {
  const energyValues = series[0]?.values ?? [];
  const flowValues = series[1]?.values ?? [];
  const energyHeights = normalize(energyValues);
  const flowHeights = normalize(flowValues);

  return (
    <section className="mock-chart">
      <div className="mock-chart-header">
        <h3 className="mock-chart-title">{title}</h3>
        <div className="mock-chart-legend">
          <span className="legend-item">
            <span className="legend-dot energy" />
            {series[0]?.name}
          </span>
          <span className="legend-item">
            <span className="legend-dot flow" />
            {series[1]?.name}
          </span>
        </div>
      </div>
      <div className="chart-body">
        <div className="chart-y-axis">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>
        <div className="chart-area">
          {labels.map((label, i) => (
            <div key={label} className="chart-column">
              <div className="chart-bars">
                <div
                  className="chart-bar energy"
                  style={{ height: `${energyHeights[i]}%` }}
                  title={`${energyValues[i]}`}
                />
                <div
                  className="chart-bar flow"
                  style={{ height: `${flowHeights[i]}%` }}
                  title={`${flowValues[i]}`}
                />
              </div>
              <span className="chart-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
