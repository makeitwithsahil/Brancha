export default function Container({ children, className = '', ...props }) {
  return (
    <div
      className={`max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}