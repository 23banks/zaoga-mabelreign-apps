export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-ink hover:shadow-lg hover:shadow-primary/25 disabled:bg-gray-400 disabled:shadow-none',
    accent: 'bg-accent text-ink hover:brightness-110 hover:shadow-lg hover:shadow-accent/30 disabled:bg-gray-300',
    secondary: 'bg-white text-primary border border-gray-300 hover:border-primary hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500',
    danger: 'bg-danger text-white hover:brightness-110 disabled:opacity-60',
    ghost: 'text-primary hover:bg-primary/10',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="inline-block w-4 h-4 mr-2 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
