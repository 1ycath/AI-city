import './HierarchyTabs.css';

export default function HierarchyTabs({ levels, activeLevel, onChange }) {
  return (
    <div className="hierarchy-tabs">
      {levels.map((level, index) => (
        <button
          key={level.id}
          type="button"
          className={`hierarchy-tab${activeLevel === level.id ? ' active' : ''}`}
          onClick={() => onChange(level.id)}
        >
          <span className="hierarchy-tab-index">{index + 1}</span>
          {level.label}
        </button>
      ))}
    </div>
  );
}
