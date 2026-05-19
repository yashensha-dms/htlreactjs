import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './Navbar.css';

const NavLink = ({ to, children, className = '', disabled, ...props }) => {
  return (
    <Link to={disabled ? '#' : to} className={`link-box ${disabled ? 'disabled' : ''} ${className}`} {...props}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHamburgerActive, setIsMobileHamburgerActive] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const { pathname } = useLocation();

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

  useEffect(() => {
    setIsDesktopExpanded(false);
    setIsMobileMenuOpen(false);
    setIsMobileHamburgerActive(false);
    setActiveMobileDropdown(null);
    gsap.set("#mobileNavbar", { clearProps: "height" });
    if (menuToggle.current && !menuToggle.current.reversed()) {
      menuToggle.current.reverse();
    }
    if (window.lenis) window.lenis.start();
  }, [pathname]);

  // GSAP animation for mobile menu entrance
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(".mobile-menu", 
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(".mobile-dropdown", 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.08, 
          ease: "power2.out",
          delay: 0.05 
        }
      );
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

  const toggleMobileNav = () => {
    if (!isMobileMenuOpen) {
      // Opening
      setIsMobileMenuOpen(true);
      setIsMobileHamburgerActive(true);
      if (window.lenis) window.lenis.stop();
      
      const startHeight = window.innerWidth <= 480 ? "65px" : "70px";
      gsap.fromTo("#mobileNavbar", 
        { height: startHeight },
        { height: "100vh", duration: 0.45, ease: "power3.out" }
      );
    } else {
      // Closing
      setIsMobileHamburgerActive(false);
      setActiveMobileDropdown(null);
      
      const targetHeight = window.innerWidth <= 480 ? "65px" : "70px";
      gsap.to("#mobileNavbar", {
        height: targetHeight,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          setIsMobileMenuOpen(false);
          if (window.lenis) window.lenis.start();
          // Clear GSAP inline height style so it doesn't lock sticky height
          gsap.set("#mobileNavbar", { clearProps: "height" });
        }
      });
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
      <nav className={`mobile-navbar ${isMobileMenuOpen ? 'menu-active' : ''}`} id="mobileNavbar">
        <div className="mobile-nav-header">
          <div className="mobile-brand">
            <Link to="/">
              <img src={`${import.meta.env.BASE_URL}images/NEW LOGOS/NAVLOGO.svg`} alt="HTL Logo" style={{ height: '28px', width: 'auto', display: 'block' }} />
            </Link>
          </div>

          <div className={`mobile-menu-toggle ${isMobileHamburgerActive ? 'active' : ''}`} id="mobileMenuToggle" onClick={toggleMobileNav}>
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
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} id="mobileMenu">
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
                >LinkedIn</a
              >
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
