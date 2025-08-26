import React from 'react';
    import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();

      const footerLinks = {
        Product: [
          { name: 'Features', href: '#features' },
          { name: 'Pricing', href: '#pricing' },
          { name: 'Demo', href: '#demo' },
          { name: 'API Documentation', href: '#' }
        ],
        Company: [
          { name: 'About Us', href: '#' },
          { name: 'Careers', href: '#' },
          { name: 'Blog', href: '#' },
          { name: 'Press Kit', href: '#' }
        ],
        Support: [
          { name: 'Help Center', href: '#' },
          { name: 'Contact Us', href: '#contact' },
          { name: 'Status Page', href: '#' },
          { name: 'Community', href: '#' }
        ],
        Legal: [
          { name: 'Privacy Policy', href: '#' },
          { name: 'Terms of Service', href: '#' },
          { name: 'Cookie Policy', href: '#' },
          { name: 'GDPR', href: '#' }
        ]
      };

      const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#' },
        { name: 'Twitter', icon: Twitter, href: '#' },
        { name: 'Instagram', icon: Instagram, href: '#' },
        { name: 'LinkedIn', icon: Linkedin, href: '#' },
        { name: 'GitHub', icon: Github, href: '#' }
      ];

      const scrollToSection = (sectionId) => {
        if (sectionId.startsWith('#')) {
          const element = document.getElementById(sectionId.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

      return (
        <footer className="bg-gray-900 dark:bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {/* Company Info */}
              <div className="col-span-2">
                <h3 className="text-2xl font-bold text-violet-400 mb-4">
                  Add Store Wizard
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Simplifying e-commerce store setup for businesses worldwide. 
                  Launch your online store in minutes, not months.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-semibold text-white mb-4">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className="text-gray-300 hover:text-violet-400 transition-colors duration-200 text-left"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                  © {currentYear} Add Store Wizard. All rights reserved.
                </div>
                
              </div>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;