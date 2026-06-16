import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navItems, getBuildingById, APP_NAME } from '../../data/mock';
import './TopBar.css';

function formatTime(date) {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function getPageLabel(pathname) {
  const buildingMatch = pathname.match(/^\/building\/(.+)$/);
  if (buildingMatch) {
    const zone = getBuildingById(buildingMatch[1]);
    return zone ? `建筑详情 · ${zone.building.name}` : '建筑详情';
  }
  return navItems.find((item) => item.path === pathname)?.label ?? '总览看板';
}

export default function TopBar() {
  const location = useLocation();
  const [time, setTime] = useState(() => formatTime(new Date()));
  const pageLabel = getPageLabel(location.pathname);

  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

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
