export default function AnalysisLoader({ title, steps = [], activeStep = 0, variant = 'default' }) {
  return (
    <div className={`analysis-loader analysis-loader-${variant}`}>
      <div className="analysis-spinner" />
      <div>
        <h3>{title}</h3>
        <div className="analysis-steps">
          {steps.map((step, index) => (
            <span
              key={step}
              className={`analysis-step${index <= activeStep ? ' active' : ''}`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
