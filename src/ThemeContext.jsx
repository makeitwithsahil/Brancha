import { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentTheme } from './themeConfig';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const location = useLocation();
  
  const theme = useMemo(() => {
    return getCurrentTheme(location.pathname);
  }, [location.pathname]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
