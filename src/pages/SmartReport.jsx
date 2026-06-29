import { Link } from 'react-router-dom';
import NavIcon from '../components/icons/NavIcon';
import { SMART_REPORT_FEATURES } from '../data/smartReport';
import './SmartReport.css';

export default function SmartReport() {
  return (
    <div className="page smart-report-page">
      <div className="smart-page-header">
        <div>
          <h2 className="page-title">智能填报</h2>
          <p className="page-subtitle">
            通过语音、图像和交互式表格快速采集城市体检信息，减少人工录入工作，并将识别结果自动归入对应检查条目。
          </p>
        </div>
      </div>

      <div className="smart-feature-grid">
        {SMART_REPORT_FEATURES.map((feature) => (
          <Link className="smart-feature-card" to={feature.path} key={feature.id}>
            <div className="smart-feature-icon">
              <NavIcon name={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <span className="btn btn-primary">{feature.buttonText}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
