import { NavLink } from 'react-router-dom';
import { navItems, APP_NAME } from '../../data/mock';
import NavIcon from '../icons/NavIcon';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>{APP_NAME}</h1>
        <span>城市 · 街区 · 社区 · 住房</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
          >
            <NavIcon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className="status-dot" />
        系统在线 · 延迟 12ms
      </div>
    </aside>
  );
}
