import { Link, useParams } from 'react-router-dom';
import ModelViewer from '../components/viewer/ModelViewer';
import { getBuildingById, STATUS_LABELS } from '../data/mock';
import './BuildingDetail.css';

export default function BuildingDetail() {
  const { id } = useParams();
  const zone = getBuildingById(id);

  if (!zone) {
    return (
      <div className="page building-not-found">
        <h2>未找到建筑</h2>
        <p>编号「{id}」不存在，请从地图重新选择。</p>
        <Link to="/map" className="building-back">
          ← 返回地图
        </Link>
      </div>
    );
  }

  const { building } = zone;

  return (
    <div className="page">
      <Link to="/map" className="building-back">
        ← 返回地图
      </Link>
      <div className="building-detail">
        <aside className="building-info">
          <div className="building-info-card">
            <h2 className="building-name">{building.name}</h2>
            <div className="building-zone">
              {zone.id} · {zone.name}
            </div>
            <p className="building-desc">{building.description}</p>
          </div>
          <div className="building-meta">
            <h4>基本信息</h4>
            <div className="meta-row">
              <span className="meta-label">建筑 ID</span>
              <span className="meta-value">{zone.id}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">运行状态</span>
              <span className={`status-badge ${zone.status}`}>
                {STATUS_LABELS[zone.status]}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-label">楼层</span>
              <span className="meta-value">{building.floors} 层</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">建筑面积</span>
              <span className="meta-value">{building.area}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">建成年份</span>
              <span className="meta-value">{building.builtYear}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">坐标</span>
              <span className="meta-value">
                {zone.lng.toFixed(4)}, {zone.lat.toFixed(4)}
              </span>
            </div>
          </div>
        </aside>
        <section className="building-viewer-panel">
          <h4>3D 建筑模型</h4>
          <ModelViewer url={building.modelUrl} />
        </section>
      </div>
    </div>
  );
}
