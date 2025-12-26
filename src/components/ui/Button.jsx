export default function Button({ children, className = '', variant = 'primary', size = 'md', ...props }) {
  const baseStyles = 'inline-block font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-center';
  
  const variants = {
    primary: 'bg-[#FF6B6B] text-white hover:shadow-lg hover:shadow-[#FF6B6B]/30',
    secondary: 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
  };
  
  const sizes = {
    md: 'px-8 py-3 text-[15px]',
    lg: 'px-10 py-4 text-[16px]'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}