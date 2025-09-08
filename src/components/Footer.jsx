import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} <span className="font-semibold text-gray-800 dark:text-gray-200">Thanaphat</span>. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {[
              { name: "GitHub", url: "https://github.com/ertyu007" },
              { name: "YouTube", url: "https://www.youtube.com/@amazingwuji" },
              { name: "Facebook", url: "https://www.facebook.com/ertyu.kukre" },
              { name: "Line", url: "https://line.me/ti/p/eUc-v4Xhcb" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Portfolio built with React and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;