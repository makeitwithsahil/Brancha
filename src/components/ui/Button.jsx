import { useCallback } from 'react';
import { userPreferences } from '../../utils/storage';

export default function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  trackingId,
  onClick,
  ...props 
}) {
  const baseStyles = 'inline-block font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-center';
  
  const variants = {
    primary: 'bg-[#FF6F61] text-white hover:shadow-lg hover:shadow-[#FF6F61]/30 hover:bg-[#C94A3F]',
    secondary: 'bg-white text-[#1F1F1F] border-2 border-[#EFEDE9] hover:border-[#6B6B6B] hover:bg-[#EFEDE9]'
  };
  
  const sizes = {
    md: 'px-8 py-3 text-[15px]',
    lg: 'px-10 py-4 text-[16px]'
  };

  // Enhanced click handler with optional tracking
  const handleClick = useCallback((e) => {
    // Track button interaction if trackingId is provided
    if (trackingId) {
      try {
        const interactions = userPreferences.get('button_interactions', {});
        interactions[trackingId] = (interactions[trackingId] || 0) + 1;
        userPreferences.update('button_interactions', interactions);
      } catch (err) {
        // Silent fail - tracking is not critical
      }
    }

    // Call original onClick handler
    if (onClick) {
      onClick(e);
    }
  }, [trackingId, onClick]);

  // Check if user prefers reduced motion
  const reducedMotion = userPreferences.get('reducedMotion', false);
  
  // Adjust transition duration for reduced motion preference
  const transitionStyles = reducedMotion 
    ? 'transition-all duration-200 ease-out' 
    : 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]';
  
  const finalBaseStyles = baseStyles.replace(
    'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
    transitionStyles
  );
  
  return (
    <button
      className={`${finalBaseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
