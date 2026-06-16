import './EntityPicker.css';

export default function EntityPicker({ entities, activeId, onChange }) {
  if (entities.length <= 1) return null;

  return (
    <div className="entity-picker">
      {entities.map((entity) => (
        <button
          key={entity.id}
          type="button"
          className={`entity-chip${activeId === entity.id ? ' active' : ''}`}
          onClick={() => onChange(entity.id)}
        >
          {entity.name}
        </button>
      ))}
    </div>
  );
}
