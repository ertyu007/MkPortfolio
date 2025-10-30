// Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ertyu007",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.092 24 17.592 24 12.298c0-6.627-5.373-12-12-12z" />
        </svg>
      )
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@amazingwuji",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      )
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/ertyu.kukre",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: "Line",
      url: "https://line.me/ti/p/eUc-v4Xhcb",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 15.003906 7.6660156 C 19.720906 7.6660156 23.558594 10.780375 23.558594 14.609375 C 23.558594 16.142375 22.964609 17.523813 21.724609 18.882812 C 19.929609 20.948812 15.916906 23.464609 15.003906 23.849609 C 14.091906 24.233609 14.225719 23.604672 14.261719 23.388672 C 14.283719 23.260672 14.384766 22.65625 14.384766 22.65625 C 14.413766 22.43725 14.442469 22.099812 14.355469 21.882812 C 14.258469 21.645813 13.880563 21.520937 13.601562 21.460938 C 9.4895625 20.916937 6.4472656 18.041375 6.4472656 14.609375 C 6.4472656 10.781375 10.286906 7.6660156 15.003906 7.6660156 z M 12.626953 12.910156 C 12.375953 12.910156 12.171875 13.107656 12.171875 13.347656 L 12.171875 16.652344 C 12.171875 16.894344 12.375953 17.089844 12.626953 17.089844 C 12.877953 17.089844 13.082031 16.893344 13.082031 16.652344 L 13.082031 13.347656 C 13.082031 13.107656 12.877953 12.910156 12.626953 12.910156 z M 14.5625 12.910156 C 14.5175 12.910156 14.470781 12.915641 14.425781 12.931641 C 14.248781 12.991641 14.128906 13.157703 14.128906 13.345703 L 14.128906 16.650391 C 14.128906 16.892391 14.3225 17.089844 14.5625 17.089844 C 14.8025 17.089844 14.996094 16.890391 14.996094 16.650391 L 14.996094 14.605469 L 16.679688 16.914062 C 16.760687 17.024063 16.889391 17.089844 17.025391 17.089844 C 17.072391 17.089844 17.118109 17.082406 17.162109 17.066406 C 17.340109 17.006406 17.460938 16.840344 17.460938 16.652344 L 17.457031 16.652344 L 17.457031 13.347656 C 17.457031 13.107656 17.263391 12.910156 17.025391 12.910156 C 16.787391 12.910156 16.591797 13.107656 16.591797 13.347656 L 16.591797 15.392578 L 14.908203 13.085938 C 14.827203 12.975938 14.6985 12.910156 14.5625 12.910156 z M 18.929688 12.910156 C 18.678688 12.910156 18.474609 13.107656 18.474609 13.347656 L 18.474609 14.998047 L 18.474609 15 L 18.474609 16.650391 C 18.474609 16.892391 18.678687 17.089844 18.929688 17.089844 L 20.654297 17.089844 C 20.906297 17.089844 21.111328 16.892344 21.111328 16.652344 C 21.111328 16.412344 20.905297 16.216797 20.654297 16.216797 L 19.384766 16.216797 L 19.384766 15.435547 L 20.654297 15.435547 C 20.906297 15.435547 21.111328 15.24 21.111328 15 C 21.111328 14.758 20.905297 14.5625 20.654297 14.5625 L 19.384766 14.564453 L 19.384766 13.783203 L 20.654297 13.783203 C 20.906297 13.783203 21.111328 13.588656 21.111328 13.347656 C 21.111328 13.107656 20.905297 12.910156 20.654297 12.910156 L 18.929688 12.910156 z M 9.34375 12.912109 C 9.09275 12.912109 8.8886719 13.106656 8.8886719 13.347656 L 8.8886719 16.652344 C 8.8886719 16.894344 9.09275 17.089844 9.34375 17.089844 L 11.068359 17.089844 C 11.320359 17.089844 11.522438 16.893297 11.523438 16.654297 C 11.523437 16.414297 11.319359 16.21875 11.068359 16.21875 L 9.7988281 16.21875 L 9.7988281 13.347656 C 9.7988281 13.107656 9.59475 12.912109 9.34375 12.912109 z"></path>
        </svg>
      )
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30 py-12 mt-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} <span className="font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Thanaphat</span>. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/30 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Built with React, Framer Motion, and Tailwind CSS. <br />Hosted on Netlify. 
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;