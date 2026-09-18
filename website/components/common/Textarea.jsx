export default function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="form-label">
          {label}
          {props.required && <span className="text-red-600"> *</span>}
        </label>
      )}
      <textarea
        className={`form-input min-h-[120px] resize-y ${error ? 'ring-2 ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
