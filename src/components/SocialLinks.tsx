import React from 'react';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import { SocialLink } from '../types';

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/Ninja-Atmos',
    color: 'hover:text-gray-300',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/suvam0961/',
    color: 'hover:text-blue-400',
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/suvam__biswas/',
    color: 'hover:text-pink-400',
  },
  {
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/Suvam0961',
    color: 'hover:text-blue-500',
  },
];

const SocialLinks: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github size={24} />;
      case 'linkedin':
        return <Linkedin size={24} />;
      case 'instagram':
        return <Instagram size={24} />;
      case 'facebook':
        return <Facebook size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center mt-16 mb-8 z-20">
      <div className="flex flex-row gap-4 bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 border border-gray-700/50">
        {socialLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-400 ${link.color} transition-all duration-300 transform hover:scale-125 hover:rotate-12 group relative`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards',
            }}
          >
            <div className="relative">
              {getIcon(link.icon)}
              <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300 blur-xl" />
            </div>
            <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-gray-800 text-gray-100 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;