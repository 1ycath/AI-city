import NavIcon from '../icons/NavIcon';
import './StatCard.css';

export default function StatCard({ label, value, unit, trend, trendUp, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className="stat-card-icon">
          <NavIcon name={icon} />
        </div>
      </div>
      <div className="stat-card-value">
        {value}
        <span className="stat-card-unit">{unit}</span>
      </div>
      <div className="stat-card-footer">
        <span className={`stat-card-trend ${trendUp ? 'up' : 'down'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
        <span className="stat-card-trend-label">较昨日</span>
      </div>
    </article>
  );
}
