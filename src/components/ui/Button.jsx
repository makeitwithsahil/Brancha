export default function Button({ children, className = '', variant = 'primary', size = 'md', ...props }) {
  const baseStyles = 'inline-block font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-center';
  
  const variants = {
    primary: 'bg-[#FF6F61] text-white hover:shadow-lg hover:shadow-[#FF6F61]/30 hover:bg-[#C94A3F]',
    secondary: 'bg-white text-[#1F1F1F] border-2 border-[#EFEDE9] hover:border-[#6B6B6B] hover:bg-[#EFEDE9]'
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