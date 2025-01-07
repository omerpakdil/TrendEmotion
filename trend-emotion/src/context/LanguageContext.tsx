import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { user as userApi } from '../services/api';

type Language = 'en' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) return savedLanguage;
    return 'en';
  });

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const profile = await userApi.getProfile();
        const savedLanguage = profile.language as Language;
        if (savedLanguage) {
          setLanguageState(savedLanguage);
          await i18n.changeLanguage(savedLanguage);
          localStorage.setItem('language', savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };

    void loadLanguage();
  }, [i18n]);

  const setLanguage = async (newLanguage: Language) => {
    try {
      await userApi.updateProfile({ language: newLanguage });
      setLanguageState(newLanguage);
      await i18n.changeLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 