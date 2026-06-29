import { SCORE_LABELS } from '../../data/smartReport';

export default function RatingControl({ value, onChange }) {
  const score = value ?? 0;

  return (
    <div className="rating-control">
      <div className="rating-slider-row">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={score || 3}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label="评分滑块"
        />
        <strong>{score ? `${score} 分` : '未评分'}</strong>
      </div>

      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map((item) => (
          <button
            type="button"
            key={item}
            className={`rating-button${score === item ? ' active' : ''}`}
            onClick={() => onChange(item)}
          >
            <span>{item}</span>
            {SCORE_LABELS[item]}
          </button>
        ))}
      </div>
    </div>
  );
}
