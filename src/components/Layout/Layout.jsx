import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import ContactForm from '../UI/ContactForm';
import ScrollToTopButton from '../UI/ScrollToTopButton';
import { FormProvider, useForm } from '../../context/FormContext';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LayoutContent = ({ children }) => {
  const { isContactOpen, closeContact } = useForm();
  const [pathname, setPathname] = useState(typeof window !== 'undefined' ? window.location.pathname : '');
  
  // Initialize Lenis
  useSmoothScroll();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    // Ensure scroll to top on route change
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Staggered refresh — catches layout settle, lazy images, and font load
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ContactForm isOpen={isContactOpen} onClose={closeContact} />
      <ScrollToTopButton />
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <FormProvider>
      <LayoutContent>{children}</LayoutContent>
    </FormProvider>
  );
};

export default Layout;
