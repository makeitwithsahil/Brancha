export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}