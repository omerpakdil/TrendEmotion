import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Home = (): JSX.Element => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"
      />

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="sm:text-center lg:text-left"
                >
                  <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
                      {t('home.hero.title1')}
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-white">
                      {t('home.hero.title2')}
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    {t('home.hero.description')}
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    {user ? (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-md shadow"
                      >
                        <Link
                          to="/dashboard"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                        >
                          {t('home.hero.dashboardButton')}
                        </Link>
                      </motion.div>
                    ) : (
                      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-md shadow"
                        >
                          <Link
                            to="/register"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                          >
                            {t('home.hero.getStartedButton')}
                          </Link>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-md shadow"
                        >
                          <Link
                            to="/login"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                          >
                            {t('auth.login')}
                          </Link>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </main>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-800/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:text-center"
            >
              <h2 className="text-base text-primary-400 font-semibold tracking-wide uppercase">{t('home.features.subtitle')}</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                {t('home.features.title')}
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                {t('home.features.description')}
              </p>
            </motion.div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: t('home.features.realtime.title'),
                    description: t('home.features.realtime.description'),
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )
                  },
                  {
                    title: t('home.features.trends.title'),
                    description: t('home.features.trends.description'),
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    )
                  },
                  {
                    title: t('home.features.alerts.title'),
                    description: t('home.features.alerts.description'),
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    )
                  },
                  {
                    title: t('home.features.analytics.title'),
                    description: t('home.features.analytics.description'),
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    )
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="relative p-6 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-primary-500 to-primary-400 text-white">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {feature.icon}
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                        <p className="mt-2 text-base text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800/10 backdrop-blur-lg py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {[
                { label: t('home.stats.activeUsers.label'), value: t('home.stats.activeUsers.value') },
                { label: t('home.stats.marketsAnalyzed.label'), value: t('home.stats.marketsAnalyzed.value') },
                { label: t('home.stats.dailyAnalysis.label'), value: t('home.stats.dailyAnalysis.value') },
                { label: t('home.stats.accuracyRate.label'), value: t('home.stats.accuracyRate.value') }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-700 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 text-center"
                >
                  <p className="text-3xl font-bold text-primary-400">{stat.value}</p>
                  <p className="text-gray-300 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-800/30 to-primary-900/30 backdrop-blur-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">{t('home.cta.title')}</span>
              <span className="block text-primary-400">{t('home.cta.subtitle')}</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              {user ? (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex rounded-md shadow"
                >
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300"
                  >
                    {t('home.hero.dashboardButton')}
                  </Link>
                </motion.div>
              ) : (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex rounded-md shadow"
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300"
                  >
                    {t('home.hero.getStartedButton')}
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900/50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('home.footer.product.title')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/features" className="text-base text-gray-300 hover:text-white">{t('home.footer.product.features')}</Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-base text-gray-300 hover:text-white">{t('home.footer.product.pricing')}</Link>
                  </li>
                  <li>
                    <Link to="/docs" className="text-base text-gray-300 hover:text-white">{t('home.footer.product.docs')}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('home.footer.company.title')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-300 hover:text-white">{t('home.footer.company.about')}</Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-gray-300 hover:text-white">{t('home.footer.company.blog')}</Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-base text-gray-300 hover:text-white">{t('home.footer.company.careers')}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('home.footer.support.title')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/help" className="text-base text-gray-300 hover:text-white">{t('home.footer.support.help')}</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-gray-300 hover:text-white">{t('home.footer.support.contact')}</Link>
                  </li>
                  <li>
                    <Link to="/status" className="text-base text-gray-300 hover:text-white">{t('home.footer.support.status')}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('home.footer.legal.title')}</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-base text-gray-300 hover:text-white">{t('home.footer.legal.privacy')}</Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base text-gray-300 hover:text-white">{t('home.footer.legal.terms')}</Link>
                  </li>
                  <li>
                    <Link to="/security" className="text-base text-gray-300 hover:text-white">{t('home.footer.legal.security')}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
              <div className="flex space-x-6 md:order-2">
                {/* Social Links */}
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                {t('home.footer.copyright')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}; 