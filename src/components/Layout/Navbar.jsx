import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Drawer } from 'vaul';
import './Navbar.css';

const Link = ({ to, children, className = '', ...props }) => {
  return (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );
};

const NavLink = ({ to, children, className = '', disabled, ...props }) => {
  return (
    <a href={disabled ? '#' : to} className={`link-box ${disabled ? 'disabled' : ''} ${className}`} {...props}>
      {children}
    </a>
  );
};

const Navbar = () => {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [pathname, setPathname] = useState(typeof window !== 'undefined' ? window.location.pathname : '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const menuToggle = useRef(null);

  useEffect(() => {
    menuToggle.current = gsap.timeline({ paused: true, reversed: true });
    
    menuToggle.current
      .to(".top", {
        duration: 0.25,
        y: 10,
        transformOrigin: "50% 50%",
        ease: "power2.inOut",
      }, "burg")
      .to(".bot", {
        duration: 0.25,
        y: -10,
        transformOrigin: "50% 50%",
        ease: "power2.inOut",
      }, "burg")
      .add("rotate")
      .to(".top", {
        duration: 0.25,
        rotationZ: 45,
        transformOrigin: "50% 50%",
        ease: "power2.inOut",
      }, "rotate")
      .to(".bot", {
        duration: 0.25,
        rotationZ: -45,
        transformOrigin: "50% 50%",
        ease: "power2.inOut",
      }, "rotate");

    return () => {
      if (menuToggle.current) menuToggle.current.kill();
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsDesktopExpanded(false);
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
    if (menuToggle.current && !menuToggle.current.reversed()) {
      menuToggle.current.reverse();
    }
    if (window.lenis) window.lenis.start();
  }, [pathname]);

  // Handle scroll lock with Lenis on mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      if (window.lenis) window.lenis.stop();
    } else {
      if (window.lenis) window.lenis.start();
    }
  }, [isMobileMenuOpen]);

  // GSAP animation for mobile dropdown content links
  useEffect(() => {
    if (activeMobileDropdown !== null) {
      const activeContent = document.querySelector(`.mobile-dropdown:nth-child(${activeMobileDropdown + 1}) .dropdown-content`);
      if (activeContent) {
        const links = activeContent.querySelectorAll('a');
        gsap.fromTo(links,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
        );
      }
    }
  }, [activeMobileDropdown]);

  const toggleDesktopNav = () => {
    const nextState = !isDesktopExpanded;
    setIsDesktopExpanded(nextState);
    if (nextState) {
      menuToggle.current.play();
      if (window.lenis) window.lenis.stop();
    } else {
      menuToggle.current.reverse();
      if (window.lenis) window.lenis.start();
    }
  };

  const toggleMobileDropdown = (index) => {
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  return (
    <>
      <nav className={`navbar ${isDesktopExpanded ? 'expanded' : ''}`} id="navbar" style={{ height: isDesktopExpanded ? '100vh' : '64px' }}>
        <div className="nav-body">
          <Link className="link-style-reset" to="/">
            <div className="nav-brand">
              <img
                src={`${import.meta.env.BASE_URL}images/NEW LOGOS/NAVLOGO.svg`}
                alt="HTL brand logo"
                style={{ height: '36px', width: 'auto', display: 'block' }}
              />
            </div>
          </Link>

          <div
            className="nav-link-btn nav-toggle"
            id="navToggle"
            onClick={toggleDesktopNav}
          >
            <svg
              id="burger"
              width="48"
              height="32"
              viewBox="0 0 56 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect className="top" y="9" width="48" height="6" fill="white" />
              <rect className="bot" y="29" width="48" height="6" fill="white" />
            </svg>
          </div>
        </div>
        <div className={`nav-menu-section ${isDesktopExpanded ? 'show' : ''}`} id="navSection">
          <div className="inner-container">
            <div className="inner-div-nav">
              <div className="menu-box">
                <div className="title-box">
                  <h3>Company</h3>
                </div>
                <div className="menu-list">
                  <NavLink to="/about">About Us</NavLink>
                  <NavLink to="/team">Our Team</NavLink>
                  <NavLink to="/epc">EPC</NavLink>
                  <NavLink to="/approach">Our Approach</NavLink>
                  <NavLink to="/sustainability">Sustainability</NavLink>
                </div>
              </div>
            </div>
            <div className="inner-div-nav">
              <div className="menu-box">
                <div className="title-box">
                  <h3>Services</h3>
                </div>
                <div className="menu-list">
                  <NavLink to="/pharmaceuticals">Pharmaceuticals</NavLink>
                  <NavLink to="/biopharmaceuticals">Biopharmaceuticals</NavLink>
                  <NavLink to="/medical-devices">Medical Devices</NavLink>
                  <NavLink to="/cosmetics">Cosmetics</NavLink>
                  <NavLink to="/industrial-appliances">Industrial Appliances</NavLink>
                </div>
              </div>
            </div>
            <div className="inner-div-nav">
              <div className="menu-box">
                <div className="title-box">
                  <h3>Socials</h3>
                </div>
                <div className="menu-list">
                  <a
                    href="https://www.linkedin.com/company/htlaircon/?originalSubdomain=in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-box"
                    >LinkedIn</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <nav className="mobile-navbar" id="mobileNavbar">
        <div className="mobile-nav-header">
          <div className="mobile-brand">
            <Link to="/">
              <img src={`${import.meta.env.BASE_URL}images/NEW LOGOS/NAVLOGO.svg`} alt="HTL Logo" style={{ height: '28px', width: 'auto', display: 'block' }} />
            </Link>
          </div>

          <Drawer.Root direction="right" open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <Drawer.Trigger asChild>
              <button 
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
                id="mobileMenuToggle"
                aria-label="Toggle navigation menu"
                style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 56 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mobile-burger"
                >
                  <rect className="mobile-top" y="9" width="48" height="6" fill="white" />
                  <rect className="mobile-bot" y="29" width="48" height="6" fill="white" />
                </svg>
              </button>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm" />
              <Drawer.Content className="fixed top-0 right-0 z-[10000] h-full w-[85%] max-w-[380px] bg-[#0d0d0d] text-white flex flex-col focus:outline-none outline-none border-l border-white/10 shadow-elevation-4">
                <Drawer.Close asChild>
                  <button 
                    className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    aria-label="Close menu"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </Drawer.Close>

                <div className="flex flex-col h-full p-6 pt-24 overflow-y-auto">
                  <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
                  <div className="mobile-menu active" style={{ display: 'flex', marginTop: 0, height: 'auto', paddingBottom: 0 }}>
                    <div className="mobile-dropdown">
                      <button className={`dropdown-btn ${activeMobileDropdown === 0 ? 'active' : ''}`} onClick={() => toggleMobileDropdown(0)}>
                        Company
                        <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div className={`dropdown-content ${activeMobileDropdown === 0 ? 'show' : ''}`}>
                        <Link to="/about">About Us</Link>
                        <Link to="/team">Our Team</Link>
                        <Link to="/epc">EPC</Link>
                        <Link to="/approach">Our Approach</Link>
                        <Link to="/sustainability">Sustainability</Link>
                      </div>
                    </div>

                    <div className="mobile-dropdown">
                      <button className={`dropdown-btn ${activeMobileDropdown === 1 ? 'active' : ''}`} onClick={() => toggleMobileDropdown(1)}>
                        Services
                        <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div className={`dropdown-content ${activeMobileDropdown === 1 ? 'show' : ''}`}>
                        <Link to="/pharmaceuticals">Pharmaceuticals</Link>
                        <Link to="/biopharmaceuticals">Biopharmaceuticals</Link>
                        <Link to="/medical-devices">Medical Devices</Link>
                        <Link to="/cosmetics">Cosmetics</Link>
                        <Link to="/industrial-appliances">Industrial Appliances</Link>
                      </div>
                    </div>

                    <div className="mobile-dropdown">
                      <button className={`dropdown-btn ${activeMobileDropdown === 2 ? 'active' : ''}`} onClick={() => toggleMobileDropdown(2)}>
                        Socials
                        <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      <div className={`dropdown-content ${activeMobileDropdown === 2 ? 'show' : ''}`}>
                        <a
                          href="https://www.linkedin.com/company/htlaircon/?originalSubdomain=in"
                          target="_blank"
                          rel="noopener noreferrer"
                        >LinkedIn</a>
                      </div>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
