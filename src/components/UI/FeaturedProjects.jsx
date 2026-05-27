import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Microsoft",
    location: "Hyderbad",
    service: "Fitout",
    area: "1.4L Sq.Ft.",
    image: "/images/projects/home-projects/Microsoft.webp",
    description: "Delivered advanced fitout for Microsoft’s 140,000 sq.ft. Hyderabad office, empowering a global technology leader with sophisticated, high-performance workspace built for efficiency and innovation."
  },
  {
    name: "Qualcomm",
    location: "Bangalore & HYD",
    service: "HVAC",
    area: "11L Sq.Ft.",
    image: "/images/projects/home-projects/Qualcomm.webp",
    description: "We delivered VRV and fitout HVAC systems across 11,40,000 sq.ft. for Qualcomm, a global leader in semiconductor and telecommunications technology, in Bangalore and Hyderabad."
  },
  {
    name: "Foxconn",
    location: "Bangalore",
    service: "MEP",
    area: "0.8M Sq.Ft.",
    image: "/images/projects/home-projects/Foxconn.webp",
    description: "Delivered advanced MEP solutions for Foxconn’s 0.8 million sq.ft. Bangalore manufacturing facility, empowering the world’s largest electronics manufacturer with scalable, high-efficiency infrastructure."
  },
  {
    name: "Giga Factory",
    location: "Gujrat",
    service: "HVAC",
    area: "0.8M Sq.Ft.",
    image: "/images/projects/home-projects/Giga factory.webp",
    description: "Cleanroom-grade MEP systems executed across 8 lakh sq.ft. in Jamnagar for India’s largest 5 GW solar PV manufacturing facility, delivering scalable, high-efficiency infrastructure."
  },
  {
    name: "Ctrl S",
    location: "Mumbai",
    service: "MEP",
    area: "4.5L Sq.Ft",
    image: "/images/projects/all projects/All Images/CtrlS-Mumbai-Phase-II-Datacenter-which-was-built-in-a-record-time-of-120-days-1.jpg",
    description: "Tier 4 Hyperscaler DC infrastructure delivered across 7 phases for Asia's Largest Data Centre Provider"
  }
];

// Lightened black linear/radial gradient overlay
const hoverBgGradient = {
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 82%, rgba(0, 0, 0, 0.75) 100%), radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.18) 49%, rgba(0, 0, 0, 0.38) 66%, rgba(0, 0, 0, 0.55) 105%)'
};

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize Embla only for mobile screens
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    align: 'start',
    active: isMobile
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger for Desktop pinning and scrolling
  useGSAP(() => {
    if (isMobile || !containerRef.current || !sectionRef.current) return;

    const inner = containerRef.current;
    
    // Calculate total horizontal scroll distance
    const getScrollDistance = () => {
      return inner.scrollWidth - window.innerWidth + 120;
    };

    const pin = gsap.to(inner, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    ScrollTrigger.refresh();

    return () => {
      pin.scrollTrigger?.kill();
      pin.kill();
    };
  }, { dependencies: [isMobile], scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full md:h-screen flex flex-col justify-center bg-white overflow-hidden py-16 md:py-0 z-10"
    >
      <div className="w-full mx-auto px-5 md:px-20 mb-8">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight">
          Featured Projects
        </h2>
      </div>

      {/* Viewport container */}
      <div 
        ref={isMobile ? emblaRef : null} 
        className="w-full overflow-hidden md:overflow-visible py-8 -my-8"
      >
        <div 
          ref={containerRef}
          className="flex gap-8 pl-5 md:pl-20 pr-5 md:pr-20 w-max"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="featured-project-card-new flex-shrink-0 relative w-[300px] sm:w-[425px] h-[450px] sm:h-[540px] rounded-2xl bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06),_0px_10px_20px_rgba(0,0,0,0.04),_0px_20px_35px_rgba(0,0,0,0.03)] group overflow-hidden"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image filling 105% height of card space with cover fit explicitly */}
              <img
                src={project.image}
                alt={`${project.name} project image`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '105%',
                  objectFit: 'cover'
                }}
                className="transition-transform duration-705 group-hover:scale-105 z-0"
                loading="lazy"
              />

              {/* Exact Hover Overlay Layout and Style from the Main Project */}
              <div 
                style={hoverBgGradient}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-305 z-20 p-6 flex flex-col justify-between text-white"
              >
                <div className="w-full">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-[28px] font-medium tracking-tight leading-none">{project.name}</h2>
                      <h5 className="text-[16px] text-white/80">{project.location}</h5>
                    </div>
                    <div className="flex flex-col items-end gap-4 text-right">
                      <div className="text-[16px] font-medium">{project.service}</div>
                      <div className="text-[16px] text-white/80">{project.area}</div>
                    </div>
                  </div>
                </div>
                <div className="bottom-container">
                  <p className="text-[20px] font-normal text-white/85 tracking-[-0.4px] leading-[24.6px]">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* bottom label with glassmorphism (layered on top of fill image, hides on hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-white/20 flex justify-between items-center z-10 group-hover:opacity-0 group-hover:pointer-events-none transition-all duration-300">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 font-medium">{project.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-xs font-semibold text-gray-800 tracking-wider uppercase px-2 py-0.5 bg-black/5 rounded-md">
                    {project.service}
                  </span>
                  <p className="text-sm text-gray-600 font-medium">{project.area}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* More Projects Card */}
          <motion.a
            href="/projects"
            className="featured-project-card-new flex-shrink-0 relative w-[300px] sm:w-[425px] h-[450px] sm:h-[540px] rounded-2xl bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center transition-all duration-300 shadow-[0px_2px_8px_rgba(0,0,0,0.03)]"
            whileHover={{ y: -8, backgroundColor: "#f3f4f6" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center p-6">
              <p className="text-lg font-semibold tracking-wider text-gray-800 uppercase">
                More Projects
              </p>
              <span className="inline-block mt-3 text-2xl text-gray-600">→</span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
