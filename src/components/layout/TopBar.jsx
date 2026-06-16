import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navItems, APP_NAME } from '../../data/mock';
import { fetchBuildingByIdOrCode } from '../../services/buildings';
import './TopBar.css';

function formatTime(date) {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export default function TopBar() {
  const location = useLocation();
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [buildingName, setBuildingName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const buildingMatch = location.pathname.match(/^\/building\/(.+)$/);
    if (!buildingMatch) {
      setBuildingName('');
      return;
    }

    let cancelled = false;
    fetchBuildingByIdOrCode(buildingMatch[1])
      .then((row) => {
        if (!cancelled) setBuildingName(row?.name ?? '');
      })
      .catch(() => {
        if (!cancelled) setBuildingName('');
      });

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  const buildingMatch = location.pathname.match(/^\/building\/(.+)$/);
  const pageLabel = buildingMatch
    ? buildingName
      ? `建筑详情 · ${buildingName}`
      : '建筑详情'
    : (navItems.find((item) => item.path === location.pathname)?.label ?? '总览看板');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          {APP_NAME} / <strong>{pageLabel}</strong>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-time">{time}</div>
        <div className="topbar-user">
          <span>管理员</span>
          <div className="topbar-avatar">AD</div>
        </div>
      </div>
    </header>
  );
}
