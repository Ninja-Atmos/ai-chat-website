import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Globe, Brain, Code, Palette, Rocket, Star, Heart, ArrowRight, Play, Pause, Github, Linkedin, Instagram, Facebook, User, Briefcase } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0.5, y: 0.5 });

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced language models with contextual understanding.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Natural Conversations',
      description: 'Engage in fluid, human-like conversations that feel natural and engaging',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Code & Development',
      description: 'Get help with programming, debugging, and software development tasks',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Creative Assistance',
      description: 'Unlock your creativity with AI-powered brainstorming and content generation',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Real-time Knowledge',
      description: 'Access to up-to-date information from across the web and current events',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-500/20 to-blue-500/20'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Instant responses with cutting-edge performance and minimal latency',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime' },
    { number: '<100ms', label: 'Response Time' },
    { number: '24/7', label: 'Availability' },
    { number: '∞', label: 'Possibilities' }
  ];



  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentFeature(prev => (prev + 1) % features.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, features.length]);

  // Optimized mouse tracking with throttling
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleDelay) return;

      lastTime = currentTime;
      const normalizedX = e.clientX / window.innerWidth;
      const normalizedY = e.clientY / window.innerHeight;

      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Smooth interpolation for mouse position
  useEffect(() => {
    const smoothingFactor = 0.1;
    let animationFrameId: number;

    const smoothUpdate = () => {
      setSmoothMouse(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * smoothingFactor,
        y: prev.y + (mousePosition.y - prev.y) * smoothingFactor
      }));
      animationFrameId = requestAnimationFrame(smoothUpdate);
    };

    animationFrameId = requestAnimationFrame(smoothUpdate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  // Calculate dynamic colors based on smooth mouse position
  const dynamicHue1 = Math.floor(240 + smoothMouse.x * 120); // 240-360 (blue to magenta)
  const dynamicHue2 = Math.floor(280 + smoothMouse.y * 80);  // 280-360 (purple to magenta)
  const dynamicHue3 = Math.floor(200 + smoothMouse.x * smoothMouse.y * 160); // 200-360 (cyan to magenta)

  return (
    <div
      className="w-full relative transition-all duration-1000 ease-out"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: `
          radial-gradient(circle at ${smoothMouse.x * 100}% ${smoothMouse.y * 100}%, 
            hsla(${dynamicHue1}, 70%, 25%, 0.4) 0%,
            hsla(${dynamicHue2}, 60%, 20%, 0.3) 30%,
            transparent 70%
          ),
          linear-gradient(${135 + smoothMouse.x * 90}deg, 
            hsl(${dynamicHue1}, 70%, 15%) 0%, 
            hsl(${dynamicHue2}, 70%, 20%) 25%, 
            hsl(${dynamicHue3}, 70%, 25%) 50%, 
            hsl(${180 + smoothMouse.y * 120}, 70%, 20%) 75%, 
            hsl(${200 + smoothMouse.x * 80}, 70%, 15%) 100%
          ),
          linear-gradient(${45 - smoothMouse.y * 90}deg, 
            rgba(16, 185, 129, ${0.2 + smoothMouse.x * 0.3}) 0%, 
            rgba(20, 184, 166, ${0.1 + smoothMouse.y * 0.4}) 50%, 
            rgba(59, 130, 246, ${0.2 + smoothMouse.x * smoothMouse.y * 0.3}) 100%
          ),
          linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)
        `
      }}
    >
      {/* Dynamic mouse cursor glow */}
      <div
        className="fixed w-96 h-96 rounded-full blur-3xl transition-all duration-700 ease-out pointer-events-none z-0"
        style={{
          left: smoothMouse.x * window.innerWidth - 192,
          top: smoothMouse.y * window.innerHeight - 192,
          background: `radial-gradient(circle, 
            hsla(${dynamicHue1}, 80%, 60%, 0.15) 0%,
            hsla(${dynamicHue2}, 70%, 50%, 0.1) 30%,
            hsla(${dynamicHue3}, 60%, 40%, 0.05) 60%,
            transparent 100%
          )`
        }}
      />

      {/* Enhanced floating shapes with mouse interaction */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-20 left-20 w-32 h-32 rounded-full animate-spin transition-all duration-1000 ease-out"
          style={{
            animationDuration: '20s',
            transform: `translate(${smoothMouse.x * 20}px, ${smoothMouse.y * 20}px) rotate(${smoothMouse.x * 10}deg)`,
            border: `2px solid hsla(${dynamicHue1}, 60%, 60%, 0.3)`,
            boxShadow: `0 0 30px hsla(${dynamicHue1}, 60%, 60%, 0.2)`
          }}
        />
        <div
          className="absolute top-32 right-32 w-24 h-24 rounded-full animate-pulse transition-all duration-800 ease-out"
          style={{
            transform: `translate(${smoothMouse.x * -15}px, ${smoothMouse.y * 15}px)`,
            background: `linear-gradient(45deg, hsla(${dynamicHue2}, 70%, 50%, 0.2), hsla(${dynamicHue3}, 60%, 40%, 0.15))`,
            boxShadow: `0 0 25px hsla(${dynamicHue2}, 70%, 50%, 0.3)`
          }}
        />
        <div
          className="absolute top-1/2 left-10 w-16 h-16 animate-bounce transition-all duration-600 ease-out"
          style={{
            animationDelay: '1s',
            transform: `translate(${smoothMouse.x * 10}px, ${smoothMouse.y * -10}px) rotate(${45 + smoothMouse.x * 5}deg)`,
            border: `2px solid hsla(${dynamicHue3}, 70%, 65%, 0.4)`,
            boxShadow: `0 0 20px hsla(${dynamicHue3}, 70%, 65%, 0.25)`
          }}
        />
        <div
          className="absolute top-1/3 right-32 w-20 h-20 rounded-full animate-pulse transition-all duration-900 ease-out"
          style={{
            animationDelay: '2s',
            transform: `translate(${smoothMouse.x * -20}px, ${smoothMouse.y * -10}px)`,
            background: `linear-gradient(135deg, hsla(${dynamicHue1}, 80%, 55%, 0.2), hsla(${dynamicHue2}, 70%, 45%, 0.15))`,
            boxShadow: `0 0 35px hsla(${dynamicHue1}, 80%, 55%, 0.2)`
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full animate-bounce transition-all duration-700 ease-out"
          style={{
            animationDelay: '0.5s',
            transform: `translate(${smoothMouse.x * -10}px, ${smoothMouse.y * -20}px)`,
            border: `2px solid hsla(${dynamicHue2}, 75%, 60%, 0.35)`,
            boxShadow: `0 0 28px hsla(${dynamicHue2}, 75%, 60%, 0.25)`
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="mb-16 relative">
          {/* Main Title */}
          <div className="relative mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-pulse">
              AI Chat
            </h1>

            {/* Animated subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-light animate-fadeIn px-4">
              Experience the future of conversation
            </p>

            {/* Dynamic floating accent elements with mouse tracking */}
            <div
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-8 h-8 sm:w-12 sm:h-12 rounded-full animate-bounce transition-all duration-500 ease-out"
              style={{
                transform: `translate(${smoothMouse.x * 30}px, ${smoothMouse.y * 20}px)`,
                background: `linear-gradient(45deg, hsl(${dynamicHue1}, 80%, 65%), hsl(${dynamicHue2}, 75%, 60%))`,
                boxShadow: `0 0 25px hsla(${dynamicHue1}, 80%, 65%, 0.4)`
              }}
            />
            <div
              className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-6 h-6 sm:w-10 sm:h-10 rounded-full animate-bounce transition-all duration-700 ease-out"
              style={{
                animationDelay: '0.5s',
                transform: `translate(${smoothMouse.x * -20}px, ${smoothMouse.y * -30}px)`,
                background: `linear-gradient(135deg, hsl(${dynamicHue2}, 85%, 70%), hsl(${dynamicHue3}, 80%, 65%))`,
                boxShadow: `0 0 20px hsla(${dynamicHue2}, 85%, 70%, 0.4)`
              }}
            />
            <div
              className="absolute top-1/2 -right-8 sm:-right-16 w-4 h-4 sm:w-8 sm:h-8 rounded-full animate-bounce transition-all duration-600 ease-out"
              style={{
                animationDelay: '1s',
                transform: `translate(${smoothMouse.x * 25}px, ${smoothMouse.y * -15}px)`,
                background: `linear-gradient(90deg, hsl(${dynamicHue3}, 90%, 75%), hsl(${dynamicHue1}, 85%, 70%))`,
                boxShadow: `0 0 18px hsla(${dynamicHue3}, 90%, 75%, 0.4)`
              }}
            />
          </div>

          {/* Enhanced Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4">
            Step into a world where artificial intelligence meets human creativity.
            Ask questions, explore ideas, and unlock new possibilities with our advanced AI assistant.
          </p>

          {/* Interactive Play/Pause Button */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:text-gray-100 transition-all duration-300 hover:bg-gray-700/80"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : 'Play'} Demo
            </button>
          </div>
        </div>

        {/* Dynamic Feature Showcase */}
        <div className="mb-16 px-4">
          <div className="bg-gradient-to-r from-gray-800/80 via-gray-700/70 to-gray-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${features[currentFeature].bgColor} flex items-center justify-center text-gray-100 shadow-lg transform transition-all duration-500 hover:scale-110`}>
                {features[currentFeature].icon}
              </div>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${features[currentFeature].color} bg-clip-text text-transparent mb-3 transition-all duration-500`}>
              {features[currentFeature].title}
            </h3>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {features[currentFeature].description}
            </p>

            {/* Feature navigation dots with dynamic colors */}
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentFeature ? 'scale-125' : 'hover:scale-110'}`}
                  style={{
                    background: index === currentFeature
                      ? `linear-gradient(45deg, 
                          hsl(${dynamicHue1}, 80%, 60%), 
                          hsl(${dynamicHue2}, 75%, 65%), 
                          hsl(${dynamicHue3}, 70%, 70%)
                        )`
                      : `hsla(${dynamicHue1}, 40%, 50%, 0.3)`,
                    boxShadow: index === currentFeature
                      ? `0 0 15px hsla(${dynamicHue1}, 80%, 60%, 0.6), 0 0 25px hsla(${dynamicHue2}, 75%, 65%, 0.4)`
                      : `0 0 8px hsla(${dynamicHue1}, 40%, 50%, 0.2)`,
                    transform: `scale(${index === currentFeature ? 1.25 : 1}) translateY(${Math.sin((Date.now() / 1000 + index) * 2) * 1}px)`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 px-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards',
              }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${feature.bgColor} bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group cursor-pointer`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards',
              }}
              onClick={() => setCurrentFeature(index)}
            >
              <div className={`text-${feature.color.split('-')[1]}-400 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-gray-100 font-semibold mb-3 text-base sm:text-lg">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mb-16 px-4">
          <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 text-center">Ready to Get Started?</h3>
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto text-center">
              Join thousands of users who are already experiencing the future of AI conversation.
            </p>

            {/* Enhanced CTA Button */}
            <button
              onClick={onStartChat}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-3xl text-lg sm:text-xl"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Button content */}
              <div className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                Start Chatting Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 scale-0 group-active:scale-100 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="mb-12 px-4">
          <div className="text-center mb-6">
            <h4 className="text-base sm:text-lg font-semibold text-gray-300 mb-2">Connect With Me</h4>
            <p className="text-gray-400 text-sm">Follow my journey and stay updated</p>
          </div>
          <div className="flex justify-center">
            <div className="group/container relative flex flex-wrap justify-center gap-4 sm:gap-6 bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl transition-all duration-700 ease-out hover:bg-gray-800/80 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
              {/* macOS-style container glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700 ease-out" />

              <a
                href="https://github.com/Ninja-Atmos"
                target="_blank"
                rel="noopener noreferrer"
                className="group/github relative p-3 bg-gray-700/50 rounded-xl transition-all duration-500 ease-out transform hover:scale-125 hover:-translate-y-2 hover:rotate-3 active:scale-110 active:rotate-1"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(75, 85, 99, 0.5) 0%, 
                    rgba(55, 65, 81, 0.6) 100%
                  )`,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(55, 65, 81, 0.8) 0%, 
                    rgba(31, 41, 55, 0.9) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(75, 85, 99, 0.5) 0%, 
                    rgba(55, 65, 81, 0.6) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }}
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover/github:text-white transition-all duration-500 ease-out group-hover/github:drop-shadow-lg" />
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/github:opacity-100 transition-all duration-500 ease-out whitespace-nowrap backdrop-blur-sm border border-gray-700/50 shadow-xl transform scale-95 group-hover/github:scale-100 group-hover/github:-translate-y-1">
                  GitHub
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/suvam0961/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/linkedin relative p-3 rounded-xl transition-all duration-500 ease-out transform hover:scale-125 hover:-translate-y-2 hover:rotate-[-3deg] active:scale-110 active:rotate-[-1deg]"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(37, 99, 235, 0.5) 0%, 
                    rgba(29, 78, 216, 0.6) 100%
                  )`,
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(29, 78, 216, 0.8) 0%, 
                    rgba(30, 64, 175, 0.9) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(37, 99, 235, 0.5) 0%, 
                    rgba(29, 78, 216, 0.6) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }}
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 group-hover/linkedin:text-white transition-all duration-500 ease-out group-hover/linkedin:drop-shadow-lg" />
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/linkedin:opacity-100 transition-all duration-500 ease-out whitespace-nowrap backdrop-blur-sm border border-gray-700/50 shadow-xl transform scale-95 group-hover/linkedin:scale-100 group-hover/linkedin:-translate-y-1">
                  LinkedIn
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                </span>
              </a>

              <a
                href="https://www.instagram.com/suvam__biswas/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/instagram relative p-3 rounded-xl transition-all duration-500 ease-out transform hover:scale-125 hover:-translate-y-2 hover:rotate-2 active:scale-110 active:rotate-1"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(168, 85, 247, 0.5) 0%, 
                    rgba(236, 72, 153, 0.5) 50%,
                    rgba(251, 146, 60, 0.5) 100%
                  )`,
                  boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(147, 51, 234, 0.8) 0%, 
                    rgba(219, 39, 119, 0.8) 50%,
                    rgba(245, 101, 101, 0.8) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(236, 72, 153, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(168, 85, 247, 0.5) 0%, 
                    rgba(236, 72, 153, 0.5) 50%,
                    rgba(251, 146, 60, 0.5) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }}
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-pink-200 group-hover/instagram:text-white transition-all duration-500 ease-out group-hover/instagram:drop-shadow-lg" />
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/instagram:opacity-100 transition-all duration-500 ease-out whitespace-nowrap backdrop-blur-sm border border-gray-700/50 shadow-xl transform scale-95 group-hover/instagram:scale-100 group-hover/instagram:-translate-y-1">
                  Instagram
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                </span>
              </a>

              <a
                href="https://www.facebook.com/Suvam0961"
                target="_blank"
                rel="noopener noreferrer"
                className="group/facebook relative p-3 rounded-xl transition-all duration-500 ease-out transform hover:scale-125 hover:-translate-y-2 hover:rotate-[-2deg] active:scale-110 active:rotate-[-1deg]"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.5) 0%, 
                    rgba(37, 99, 235, 0.6) 100%
                  )`,
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(37, 99, 235, 0.8) 0%, 
                    rgba(29, 78, 216, 0.9) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(96, 165, 250, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.5) 0%, 
                    rgba(37, 99, 235, 0.6) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }}
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200 group-hover/facebook:text-white transition-all duration-500 ease-out group-hover/facebook:drop-shadow-lg" />
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/facebook:opacity-100 transition-all duration-500 ease-out whitespace-nowrap backdrop-blur-sm border border-gray-700/50 shadow-xl transform scale-95 group-hover/facebook:scale-100 group-hover/facebook:-translate-y-1">
                  Facebook
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                </span>
              </a>

              <a
                href="https://suvamportfolioo.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/portfolio relative p-3 rounded-xl transition-all duration-500 ease-out transform hover:scale-125 hover:-translate-y-2 hover:rotate-1 active:scale-110 active:rotate-0"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(16, 185, 129, 0.5) 0%, 
                    rgba(5, 150, 105, 0.6) 50%,
                    rgba(6, 182, 212, 0.5) 100%
                  )`,
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(5, 150, 105, 0.8) 0%, 
                    rgba(4, 120, 87, 0.9) 50%,
                    rgba(8, 145, 178, 0.8) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(20, 184, 166, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, 
                    rgba(16, 185, 129, 0.5) 0%, 
                    rgba(5, 150, 105, 0.6) 50%,
                    rgba(6, 182, 212, 0.5) 100%
                  )`;
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }}
              >
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-200 group-hover/portfolio:text-white transition-all duration-500 ease-out group-hover/portfolio:drop-shadow-lg" />
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/portfolio:opacity-100 transition-all duration-500 ease-out whitespace-nowrap backdrop-blur-sm border border-gray-700/50 shadow-xl transform scale-95 group-hover/portfolio:scale-100 group-hover/portfolio:-translate-y-1">
                  Portfolio
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center pb-16 sm:pb-32 px-4">
          {/* Creator Credit */}
          <div className="mb-8">
            <div
              className="inline-block relative group/creator cursor-pointer transition-all duration-700 ease-out transform hover:scale-110 hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, 
                  hsla(${dynamicHue1}, 70%, 50%, 0.2) 0%, 
                  hsla(${dynamicHue2}, 60%, 45%, 0.3) 50%, 
                  hsla(${dynamicHue3}, 65%, 55%, 0.2) 100%
                )`,
                backdropFilter: 'blur(12px)',
                border: `1px solid hsla(${dynamicHue1}, 60%, 60%, 0.3)`,
                borderRadius: '16px',
                padding: '12px 24px',
                boxShadow: `0 8px 32px hsla(${dynamicHue1}, 70%, 50%, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-2 h-2 rounded-full animate-pulse transition-all duration-500"
                  style={{
                    background: `linear-gradient(45deg, 
                      hsl(${dynamicHue1}, 80%, 65%), 
                      hsl(${dynamicHue2}, 75%, 70%)
                    )`,
                    boxShadow: `0 0 12px hsla(${dynamicHue1}, 80%, 65%, 0.6)`
                  }}
                />
                <span className="text-base sm:text-lg font-semibold transition-all duration-500 ease-out group-hover/creator:scale-105 bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                  Created By Suvam
                </span>
                <div
                  className="w-2 h-2 rounded-full animate-pulse transition-all duration-500"
                  style={{
                    animationDelay: '0.5s',
                    background: `linear-gradient(45deg, 
                      hsl(${dynamicHue2}, 85%, 70%), 
                      hsl(${dynamicHue3}, 80%, 75%)
                    )`,
                    boxShadow: `0 0 12px hsla(${dynamicHue2}, 85%, 70%, 0.6)`
                  }}
                />
              </div>

              {/* Animated border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover/creator:opacity-100 transition-all duration-700 ease-out pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, 
                    hsla(${dynamicHue1}, 80%, 60%, 0.3) 0%, 
                    hsla(${dynamicHue2}, 75%, 55%, 0.4) 50%, 
                    hsla(${dynamicHue3}, 70%, 65%, 0.3) 100%
                  )`,
                  boxShadow: `0 0 30px hsla(${dynamicHue1}, 80%, 60%, 0.4), 0 0 60px hsla(${dynamicHue2}, 75%, 55%, 0.2)`
                }}
              />

              {/* Floating particles */}
              <div
                className="absolute -top-1 -right-1 w-1 h-1 rounded-full animate-bounce opacity-70 transition-all duration-500"
                style={{
                  background: `hsl(${dynamicHue1}, 90%, 80%)`,
                  boxShadow: `0 0 8px hsla(${dynamicHue1}, 90%, 80%, 0.8)`,
                  animationDelay: '0.2s'
                }}
              />
              <div
                className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full animate-bounce opacity-70 transition-all duration-500"
                style={{
                  background: `hsl(${dynamicHue3}, 90%, 80%)`,
                  boxShadow: `0 0 8px hsla(${dynamicHue3}, 90%, 80%, 0.8)`,
                  animationDelay: '0.7s'
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-100 mb-4">
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm font-medium text-center">Built with modern web technologies</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-gray-200 text-sm font-medium text-center">
            Experience the power of AI conversation today
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;