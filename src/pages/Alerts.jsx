import { alerts } from '../data/mock';
import './Alerts.css';

export default function Alerts() {
  return (
    <div className="page">
      <h2 className="page-title">告警中心</h2>
      <p className="page-subtitle">实时事件与系统通知</p>
      <div className="alerts-list">
        {alerts.map((alert) => (
          <article key={alert.id} className="alert-item">
            <div className={`alert-level ${alert.level}`} />
            <div className="alert-content">
              <div className="alert-title">{alert.title}</div>
              <div className="alert-meta">
                {alert.time} · {alert.hierarchy}
              </div>
            </div>
            <span className="alert-zone">{alert.zone}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
