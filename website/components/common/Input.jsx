export default function Input({ label, error, type = 'text', className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="form-label">
          {label}
          {props.required && <span className="text-red-600"> *</span>}
        </label>
      )}
      <input
        type={type}
        className={`form-input ${error ? 'ring-2 ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
