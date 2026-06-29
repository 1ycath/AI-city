import { useState } from 'react';

export default function IssueSelector({ item, selected = [], onToggle, onClose }) {
  const [activeCategory, setActiveCategory] = useState(item.categories[0]?.name ?? '');
  const category = item.categories.find((entry) => entry.name === activeCategory) ?? item.categories[0];

  return (
    <div className="issue-modal-overlay" onClick={onClose}>
      <div
        className="issue-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="issue-selector-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="issue-modal-header">
          <div>
            <h3 id="issue-selector-title">选择具体问题</h3>
            <p>{item.title}</p>
          </div>
          <button type="button" className="smart-icon-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="issue-selector-body">
          <div className="issue-category-list">
            {item.categories.map((entry) => (
              <button
                type="button"
                key={entry.name}
                className={`issue-category${entry.name === activeCategory ? ' active' : ''}`}
                onClick={() => setActiveCategory(entry.name)}
              >
                {entry.name}
              </button>
            ))}
          </div>

          <div className="issue-option-panel">
            <h4>{category.name}</h4>
            <div className="issue-options">
              {category.issues.map((issue) => {
                const checked = selected.includes(issue);
                return (
                  <button
                    type="button"
                    key={issue}
                    className={`issue-option${checked ? ' selected' : ''}`}
                    onClick={() => onToggle(issue)}
                  >
                    {issue}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="issue-modal-footer">
          <span>已选择 {selected.length} 项</span>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            完成选择
          </button>
        </div>
      </div>
    </div>
  );
}
