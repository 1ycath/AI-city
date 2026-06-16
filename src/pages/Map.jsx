import { useEffect, useMemo, useState } from 'react';
import AmapView from '../components/map/AmapView';
import { computeMapViewport, fetchMapZones } from '../services/buildings';
import './Map.css';

export default function Map() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMapZones()
      .then(setZones)
      .catch((err) => setError(err.message ?? '加载地图点位失败'))
      .finally(() => setLoading(false));
  }, []);

  const viewport = useMemo(() => computeMapViewport(zones), [zones]);

  return (
    <div className="page">
      <h2 className="page-title">城市地图</h2>
      <p className="page-subtitle">
        高德 JSAPI · 建筑点位来自 Supabase 数据库
        {!loading && !error && ` · 共 ${zones.length} 处`}
      </p>
      {error && (
        <p className="map-error">{error}</p>
      )}
      <div className="map-container">
        {loading ? (
          <div className="map-empty">地图点位加载中…</div>
        ) : zones.length === 0 ? (
          <div className="map-empty">
            暂无建筑坐标数据，请先在「建筑信息」页添加含经纬度的建筑。
          </div>
        ) : (
          <AmapView
            center={viewport.center}
            zoom={viewport.zoom}
            zones={zones}
          />
        )}
      </div>
    </div>
  );
}
