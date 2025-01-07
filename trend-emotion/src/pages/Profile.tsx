import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { user as userApi } from '../services/api';
import { toast } from 'react-hot-toast';
import type { UserProfile, UserProfileResponse } from '../types/auth';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  language: string;
  theme: string;
  notificationSettings: Record<string, boolean>;
  securitySettings: Record<string, string | boolean>;
}

const LANGUAGES = [
  { code: 'en', name: 'profile.preferences.language.en' },
  { code: 'es', name: 'profile.preferences.language.es' },
  { code: 'fr', name: 'profile.preferences.language.fr' },
  { code: 'de', name: 'profile.preferences.language.de' }
] as const;

export function Profile(): JSX.Element {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    language: 'en',
    theme: 'dark',
    notificationSettings: {},
    securitySettings: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await userApi.getProfile();
        const userProfile: UserProfile = {
          ...response,
          notificationSettings: typeof response.notificationSettings === 'string'
            ? JSON.parse(response.notificationSettings)
            : {},
          securitySettings: typeof response.securitySettings === 'string'
            ? JSON.parse(response.securitySettings)
            : {}
        };
        setProfile(userProfile);
        setFormData({
          name: userProfile.name,
          email: userProfile.email,
          language: userProfile.language || 'en',
          theme: userProfile.theme || 'dark',
          notificationSettings: userProfile.notificationSettings,
          securitySettings: userProfile.securitySettings
        });
      } catch (error) {
        toast.error(t('common.error'));
        console.error('Error loading profile:', error);
      }
    };

    void loadProfile();
  }, [t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData: Partial<UserProfile> = {
        name: formData.name,
        email: formData.email,
        language: formData.language,
        theme: formData.theme,
        notificationSettings: formData.notificationSettings,
        securitySettings: formData.securitySettings
      };

      const updatedUser = await userApi.updateProfile(updateData);
      if (user) {
        setUser({ ...user, ...updatedUser });
      }
      toast.success(t('common.success'));
    } catch (error) {
      toast.error(t('common.error'));
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      setFormData(prev => ({ ...prev, language: newLanguage }));
      await setLanguage(newLanguage as 'en' | 'es' | 'fr' | 'de');
    } catch (error) {
      toast.error(t('common.error'));
      console.error('Error updating language:', error);
    }
  };

  const handleThemeChange = async (newTheme: string) => {
    try {
      setFormData(prev => ({ ...prev, theme: newTheme }));
      await setTheme(newTheme as 'light' | 'dark');
    } catch (error) {
      toast.error(t('common.error'));
      console.error('Error updating theme:', error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordError(t('profile.security.passwordError.mismatch'));
      return;
    }

    setIsPasswordLoading(true);

    try {
      await userApi.updatePassword(passwordFormData.currentPassword, passwordFormData.newPassword);
      toast.success(t('common.success'));
      setShowPasswordForm(false);
      setPasswordFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      if (error instanceof Error) {
        setPasswordError(error.message);
      } else {
        setPasswordError(t('profile.security.passwordError.incorrect'));
      }
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const renderTabs = () => (
    <div className="flex space-x-4 mb-8">
      <button
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          activeTab === 'general' ? 'bg-primary-600 text-white' : 'button-secondary'
        }`}
        onClick={() => setActiveTab('general')}
      >
        {t('profile.tabs.general')}
      </button>
      <button
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          activeTab === 'security' ? 'bg-primary-600 text-white' : 'button-secondary'
        }`}
        onClick={() => setActiveTab('security')}
      >
        {t('profile.tabs.security')}
      </button>
      <button
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          activeTab === 'notifications' ? 'bg-primary-600 text-white' : 'button-secondary'
        }`}
        onClick={() => setActiveTab('notifications')}
      >
        {t('profile.tabs.notifications')}
      </button>
      <button
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          activeTab === 'preferences' ? 'bg-primary-600 text-white' : 'button-secondary'
        }`}
        onClick={() => setActiveTab('preferences')}
      >
        {t('profile.tabs.preferences')}
      </button>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-app-secondary mb-2">{t('profile.general.fullName')}</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input w-full"
          placeholder={t('profile.general.fullName')}
        />
      </div>
      <div>
        <label className="block text-app-secondary mb-2">{t('profile.general.email')}</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="input w-full"
          placeholder={t('profile.general.email')}
        />
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">{t('profile.security.twoFactor.title')}</h3>
        <p className="text-app-secondary text-sm mb-4">{t('profile.security.twoFactor.description')}</p>
        {/* İki faktörlü doğrulama ayarları buraya gelecek */}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{t('profile.security.sessionTimeout.title')}</h3>
        <select
          value={formData.securitySettings.sessionTimeout as string}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            securitySettings: {
              ...prev.securitySettings,
              sessionTimeout: e.target.value
            }
          }))}
          className="input w-full"
        >
          <option value="15">{t('profile.security.sessionTimeout.15min')}</option>
          <option value="30">{t('profile.security.sessionTimeout.30min')}</option>
          <option value="60">{t('profile.security.sessionTimeout.1hour')}</option>
          <option value="120">{t('profile.security.sessionTimeout.2hours')}</option>
        </select>
      </div>

      {/* Password Change Section */}
      <div className="bg-card-background rounded-xl overflow-hidden">
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowPasswordForm(!showPasswordForm);
          }}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-lg font-medium text-app">{t('profile.security.changePassword')}</h3>
            <p className="text-app-secondary text-sm mt-1">{t('profile.security.passwordDescription')}</p>
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 text-app-secondary transition-transform duration-200 ${showPasswordForm ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {showPasswordForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10"
          >
            <div className="p-6">
              <form onSubmit={handlePasswordChange} className="space-y-5">
                {passwordError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{passwordError}</span>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-app-secondary mb-1">
                      {t('profile.security.currentPassword')}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordFormData.currentPassword}
                        onChange={(e) => setPasswordFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="input w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-app-secondary mb-1">
                      {t('profile.security.newPassword')}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordFormData.newPassword}
                        onChange={(e) => setPasswordFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="input w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-medium text-app-secondary mb-1">
                      {t('profile.security.confirmNewPassword')}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordFormData.confirmPassword}
                        onChange={(e) => setPasswordFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="input w-full"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordFormData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setPasswordError('');
                    }}
                    className="flex-1 button-secondary"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isPasswordLoading}
                    className="flex-1 button-primary"
                  >
                    {isPasswordLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t('common.saving')}</span>
                      </div>
                    ) : t('common.save')}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4">
      {/* Email Notifications */}
      <div className="flex items-start justify-between p-4 rounded-lg bg-card-background">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-app">{t('profile.notifications.email.title')}</h3>
          <p className="text-app-secondary text-sm mt-1">{t('profile.notifications.email.description')}</p>
        </div>
        <div className="ml-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notificationSettings.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notificationSettings: {
                  ...prev.notificationSettings,
                  email: e.target.checked
                }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="flex items-start justify-between p-4 rounded-lg bg-card-background">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-app">{t('profile.notifications.push.title')}</h3>
          <p className="text-app-secondary text-sm mt-1">{t('profile.notifications.push.description')}</p>
        </div>
        <div className="ml-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notificationSettings.push}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notificationSettings: {
                  ...prev.notificationSettings,
                  push: e.target.checked
                }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>

      {/* Price Alerts */}
      <div className="flex items-start justify-between p-4 rounded-lg bg-card-background">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-app">{t('profile.notifications.priceAlerts.title')}</h3>
          <p className="text-app-secondary text-sm mt-1">{t('profile.notifications.priceAlerts.description')}</p>
        </div>
        <div className="ml-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notificationSettings.priceAlerts}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notificationSettings: {
                  ...prev.notificationSettings,
                  priceAlerts: e.target.checked
                }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>

      {/* Sentiment Alerts */}
      <div className="flex items-start justify-between p-4 rounded-lg bg-card-background">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-app">{t('profile.notifications.sentimentAlerts.title')}</h3>
          <p className="text-app-secondary text-sm mt-1">{t('profile.notifications.sentimentAlerts.description')}</p>
        </div>
        <div className="ml-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notificationSettings.sentimentAlerts}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notificationSettings: {
                  ...prev.notificationSettings,
                  sentimentAlerts: e.target.checked
                }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>

      {/* News Digest */}
      <div className="flex items-start justify-between p-4 rounded-lg bg-card-background">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-app">{t('profile.notifications.newsDigest.title')}</h3>
          <p className="text-app-secondary text-sm mt-1">{t('profile.notifications.newsDigest.description')}</p>
        </div>
        <div className="ml-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notificationSettings.newsDigest}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notificationSettings: {
                  ...prev.notificationSettings,
                  newsDigest: e.target.checked
                }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-app-secondary mb-2">{t('profile.preferences.language.title')}</label>
        <div className="grid grid-cols-2 gap-4">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                formData.language === lang.code ? 'bg-primary-600 text-white' : 'button-secondary'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {t(lang.name)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-app-secondary mb-2">{t('profile.preferences.theme.title')}</label>
        <p className="text-app-secondary text-sm mb-4">{t('profile.preferences.theme.description')}</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              formData.theme === 'light' ? 'bg-primary-600 text-white' : 'button-secondary'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            {t('profile.preferences.theme.light')}
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              formData.theme === 'dark' ? 'bg-primary-600 text-white' : 'button-secondary'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            {t('profile.preferences.theme.dark')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{t('profile.title')}</h1>
        <p className="text-app-secondary mb-8">{t('profile.subtitle')}</p>
        
        {renderTabs()}
        
        <form onSubmit={handleSubmit}>
          {activeTab === 'general' && (
            <>
              {renderGeneralTab()}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="button-primary w-full"
                >
                  {isLoading ? t('common.saving') : t('common.save')}
                </button>
              </div>
            </>
          )}
          {activeTab === 'security' && (
            <>
              {renderSecurityTab()}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="button-primary w-full"
                >
                  {isLoading ? t('common.saving') : t('common.save')}
                </button>
              </div>
            </>
          )}
          {activeTab === 'notifications' && (
            <>
              {renderNotificationsTab()}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="button-primary w-full"
                >
                  {isLoading ? t('common.saving') : t('common.save')}
                </button>
              </div>
            </>
          )}
          {activeTab === 'preferences' && renderPreferencesTab()}
        </form>
      </div>
    </div>
  );
} 