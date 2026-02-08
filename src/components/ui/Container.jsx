import { useMemo } from 'react';
import { userPreferences } from '../../utils/storage';

export default function Container({ 
  children, 
  className = '', 
  adaptive = true,
  ...props 
}) {
  // Get user's device/connection preferences
  const lowBandwidth = useMemo(() => {
    if (!adaptive) return false;
    const connectionType = userPreferences.get('connectionType');
    return connectionType === 'slow-2g' || connectionType === '2g';
  }, [adaptive]);

  // Adjust padding based on connection speed
  // On slow connections, slightly reduce padding to show more content above fold
  const paddingClasses = useMemo(() => {
    if (!adaptive || !lowBandwidth) {
      return 'px-6 lg:px-12 xl:px-16';
    }
    return 'px-4 lg:px-10 xl:px-14';
  }, [adaptive, lowBandwidth]);
  
  return (
    <div
      className={`max-w-[1440px] mx-auto ${paddingClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
