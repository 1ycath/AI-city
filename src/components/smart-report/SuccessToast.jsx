export default function SuccessToast({ message }) {
  if (!message) return null;

  return (
    <div className="smart-success" role="status">
      <span className="smart-success-icon">✓</span>
      {message}
    </div>
  );
}
