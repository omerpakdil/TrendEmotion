import { createContext, useContext, useState, useEffect } from 'react';
import { user as userApi } from '../services/api';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Önce localStorage'dan tema tercihini kontrol et
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      document.documentElement.className = savedTheme;
      return savedTheme;
    }
    
    // Sistem tercihini kontrol et
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.className = 'light';
      return 'light';
    }
    document.documentElement.className = 'dark';
    return 'dark';
  });

  useEffect(() => {
    // Kullanıcı tercihini yükle
    const loadTheme = async () => {
      try {
        const profile = await userApi.getProfile();
        const savedTheme = profile.theme as Theme;
        if (savedTheme) {
          setThemeState(savedTheme);
          document.documentElement.className = savedTheme;
          localStorage.setItem('theme', savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    void loadTheme();

    // Sistem tema değişikliğini dinle
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setThemeState(newTheme);
      document.documentElement.className = newTheme;
      localStorage.setItem('theme', newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = async (newTheme: Theme) => {
    try {
      await userApi.updateProfile({ theme: newTheme });
      setThemeState(newTheme);
      document.documentElement.className = newTheme;
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 