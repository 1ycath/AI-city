import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AMapLoader from '@amap/amap-jsapi-loader';
import { AMAP_KEY } from '../../config/amap';
import './AmapView.css';

const STATUS_COLORS = {
  normal: '#34d399',
  warning: '#fbbf24',
  alert: '#f87171',
};

const FLY_ZOOM = 14;
const FLY_DURATION = 600;

export default function AmapView({ center, zoom, zones }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeZoneId, setActiveZoneId] = useState(null);

  const goToBuilding = useCallback(
    (zoneId) => {
      navigate(`/building/${zoneId}`);
    },
    [navigate],
  );

  const flyToZone = useCallback((zone) => {
    setActiveZoneId(zone.id);
    mapRef.current?.setZoomAndCenter(
      FLY_ZOOM,
      [zone.lng, zone.lat],
      false,
      FLY_DURATION,
    );
  }, []);

  useEffect(() => {
    if (!containerRef.current || !AMAP_KEY) {
      setError('未配置高德地图 Key，请检查 .env.local');
      setLoading(false);
      return;
    }

    let destroyed = false;

    AMapLoader.load({
      key: AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
    })
      .then((AMap) => {
        if (destroyed) return;

        const map = new AMap.Map(containerRef.current, {
          viewMode: '3D',
          zoom,
          center,
          mapStyle: 'amap://styles/darkblue',
          pitch: 35,
          rotation: 0,
        });

        map.addControl(new AMap.Scale());
        map.addControl(
          new AMap.ToolBar({
            position: { right: '16px', bottom: '16px' },
          }),
        );

        const markers = zones.map((zone) => {
          const marker = new AMap.Marker({
            position: [zone.lng, zone.lat],
            title: zone.building?.name ?? `${zone.id} ${zone.name}`,
            content: `<div style="
              width:14px;height:14px;border-radius:50%;
              background:${STATUS_COLORS[zone.status]};
              border:2px solid rgba(255,255,255,0.8);
              box-shadow:0 0 10px ${STATUS_COLORS[zone.status]};
              cursor:pointer;
            "></div>`,
            offset: new AMap.Pixel(-7, -7),
          });

          marker.setLabel({
            direction: 'top',
            offset: new AMap.Pixel(0, -4),
            content: `<div style="
              padding:2px 8px;background:rgba(10,14,23,0.9);
              border:1px solid rgba(56,189,248,0.3);border-radius:4px;
              color:#e2e8f0;font-size:11px;font-family:monospace;
              white-space:nowrap;cursor:pointer;
            ">${zone.id}</div>`,
          });

          marker.on('click', () => goToBuilding(zone.id));

          return marker;
        });

        map.add(markers);
        mapRef.current = map;
        markersRef.current = markers;
        setLoading(false);
      })
      .catch((err) => {
        if (!destroyed) {
          setError(err?.message ?? '地图加载失败');
          setLoading(false);
        }
      });

    return () => {
      destroyed = true;
      markersRef.current = [];
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [center, zoom, zones, goToBuilding]);

  return (
    <div className="amap-view">
      <div ref={containerRef} className="amap-container" />
      {!loading && !error && (
        <div className="amap-overlay">
          {zones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              className={`amap-zone-tag${activeZoneId === zone.id ? ' active' : ''}`}
              onClick={() => flyToZone(zone)}
              title={`定位至 ${zone.building?.name ?? zone.name}`}
            >
              <span className={`amap-zone-dot ${zone.status}`} />
              {zone.id} {zone.building?.name ?? zone.name}
            </button>
          ))}
        </div>
      )}
      {loading && (
        <div className="amap-status">
          <div>
            <div className="spinner" />
            地图加载中…
          </div>
        </div>
      )}
      {error && (
        <div className="amap-status error">
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}
