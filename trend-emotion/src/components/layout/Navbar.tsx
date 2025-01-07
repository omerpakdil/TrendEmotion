import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        langDropdownRef.current && 
        !langDropdownRef.current.contains(event.target as Node) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate('/');
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  return (
    <nav className="relative z-50">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/85 to-transparent backdrop-blur-lg" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
      
      <div className="relative border-b border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200"
                >
                  TrendEmotion
                </motion.span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-6">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
                    {t('navigation.dashboard')}
                  </Link>
                  <Link to="/watchlist" className="text-gray-300 hover:text-white transition-colors duration-200">
                    {t('navigation.watchlist')}
                  </Link>
                  <Link to="/analysis" className="text-gray-300 hover:text-white transition-colors duration-200">
                    {t('navigation.analysis')}
                  </Link>

                  {/* Language Selector */}
                  <div className="relative">
                    <button
                      ref={langButtonRef}
                      onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white"
                    >
                      <span>{getCurrentLanguage().flag}</span>
                      <span>{getCurrentLanguage().code.toUpperCase()}</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isLanguageOpen && (
                        <motion.div
                          ref={langDropdownRef}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 shadow-xl"
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => handleLanguageChange(lang.code)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200 flex items-center space-x-3"
                            >
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                              {lang.code === i18n.language && (
                                <svg className="w-4 h-4 ml-auto text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <button
                        ref={buttonRef}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-300">{user.name}</span>
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Profile Dropdown */}
                      <AnimatePresence>
                        {isProfileOpen && (
                          <motion.div
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 shadow-xl"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200"
                            >
                              {t('navigation.profile')}
                            </Link>
                            <Link
                              to="/notifications"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200"
                            >
                              {t('profile.tabs.notifications')}
                            </Link>
                            <div className="border-t border-gray-700/50 my-1"></div>
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50 transition-colors duration-200"
                            >
                              {t('auth.logout')}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-6">
                  {/* Language Selector for non-logged in users */}
                  <div className="relative">
                    <button
                      ref={langButtonRef}
                      onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white"
                    >
                      <span>{getCurrentLanguage().flag}</span>
                      <span>{getCurrentLanguage().code.toUpperCase()}</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isLanguageOpen && (
                        <motion.div
                          ref={langDropdownRef}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 shadow-xl"
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => handleLanguageChange(lang.code)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200 flex items-center space-x-3"
                            >
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                              {lang.code === i18n.language && (
                                <svg className="w-4 h-4 ml-auto text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Link
                      to="/register"
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('auth.register')}
                    </Link>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.01 }} 
                    whileTap={{ scale: 0.99 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600/30 to-primary-400/30 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                    <Link
                      to="/login"
                      className="relative px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary-600/90 to-primary-500/90 hover:from-primary-500/90 hover:to-primary-400/90 transition-all duration-300 shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 flex items-center space-x-2"
                    >
                      <span>{t('auth.login')}</span>
                      <svg 
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.2 }}
        className="sm:hidden overflow-hidden relative"
      >
        {/* Mobile menu background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/90 backdrop-blur-lg" />
        
        <div className="relative px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              {/* User Profile Section in Mobile */}
              <div className="px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/30 mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {t('navigation.dashboard')}
              </Link>
              <Link
                to="/watchlist"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {t('navigation.watchlist')}
              </Link>
              <Link
                to="/analysis"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {t('navigation.analysis')}
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {t('navigation.profile')}
              </Link>
              <Link
                to="/notifications"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {t('profile.tabs.notifications')}
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-gray-800/50 transition-all duration-200"
              >
                {t('auth.logout')}
              </motion.button>

              {/* Language Selector in Mobile Menu */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-400 mb-2">{t('common.language')}</div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                        lang.code === i18n.language
                          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                          : 'text-gray-300 hover:bg-gray-800/50'
                      } transition-all duration-200`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-1">
              {/* Language Selector in Mobile Menu */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-400 mb-2">{t('common.language')}</div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                        lang.code === i18n.language
                          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                          : 'text-gray-300 hover:bg-gray-800/50'
                      } transition-all duration-200`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50"
              >
                {t('auth.register')}
              </Link>
              <motion.div whileTap={{ scale: 0.95 }} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <Link
                  to="/login"
                  className="relative block px-3 py-2 rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/20 flex items-center justify-between"
                >
                  <span>{t('auth.login')}</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
}; 