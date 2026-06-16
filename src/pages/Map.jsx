import AmapView from '../components/map/AmapView';
import { mapConfig, mapZones } from '../data/mock';
import './Map.css';

export default function Map() {
  return (
    <div className="page">
      <h2 className="page-title">城市地图</h2>
      <p className="page-subtitle">高德 JSAPI · 区域监测点位可视化</p>
      <div className="map-container">
        <AmapView
          center={mapConfig.center}
          zoom={mapConfig.zoom}
          zones={mapZones}
        />
      </div>
    </div>
  );
}
