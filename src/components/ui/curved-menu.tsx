"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export interface iNavItem {
  heading: string;
  href: string;
  subheading?: string;
  imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
  setIsActive: (isActive: boolean) => void;
  index: number;
}

interface iCurvedNavbarProps {
  setIsActive: (isActive: boolean) => void;
  navItems: iNavItem[];
}

export interface iHeaderProps {
  navItems?: iNavItem[];
  footer?: React.ReactNode;
}

const transitionEase = [0.76, 0, 0.24, 1] as const;

const MENU_SLIDE_ANIMATION: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: transitionEase } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: transitionEase },
  },
};

export const defaultNavItems: iNavItem[] = [
  {
    heading: "Products",
    href: "#products",
    subheading: "Fume extractor products",
  },
  {
    heading: "How it works",
    href: "#how-it-works",
    subheading: "Process emission to discharge",
  },
  {
    heading: "Applications",
    href: "#applications",
    subheading: "Process-specific solutions",
  },
  {
    heading: "Engineering",
    href: "#engineering",
    subheading: "Engineering before quotation",
  },
  {
    heading: "FAQs",
    href: "#faq",
    subheading: "Common questions & answers",
  },
  {
    heading: "Get a quote",
    href: "#contact",
    subheading: "Request engineered quotation",
  },
];

const CustomFooter: React.FC = () => {
  return (
    <div className="flex w-full text-sm justify-between items-center text-slate-700 px-7 sm:px-10 py-5 border-t border-black/10">
      <a href="tel:+917904469219" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-primary-blue">
        <Phone size={14} className="text-emerald-600" /> +91 79044 69219
      </a>
      <a href="mailto:info@napcen.com" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-primary-blue">
        <Mail size={14} className="text-primary-blue" /> info@napcen.com
      </a>
    </div>
  );
};

const NavLink: React.FC<iNavLinkProps> = ({
  heading,
  href,
  setIsActive,
  index,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleClick = () => {
    setIsActive(false);
  };

  return (
    <motion.div
      onClick={handleClick}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-black/15 py-3 sm:py-4 transition-colors duration-500 uppercase"
    >
      <Link ref={ref} onMouseMove={handleMouseMove} href={href} className="w-full">
        <div className="relative flex items-center">
          <div className="flex flex-row gap-1">
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: -8 },
              }}
              transition={{
                type: "spring",
                staggerChildren: 0.05,
                delayChildren: 0.15,
              }}
              className="relative z-10 block text-2xl sm:text-3xl font-light text-[#0f1b3a] transition-colors duration-500 tracking-tight"
            >
              {heading.split("").map((letter, i) => {
                return (
                  <motion.span
                    key={i}
                    variants={{
                      initial: { x: 0 },
                      whileHover: { x: 8 },
                    }}
                    transition={{ type: "spring" }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                );
              })}
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Curve: React.FC = () => {
  const [height, setHeight] = useState(800);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);
      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curve: Variants = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: transitionEase },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: transitionEase },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full pointer-events-none"
      style={{ fill: "#ffffff" }}
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
};

const CurvedNavbar: React.FC<
  iCurvedNavbarProps & { footer?: React.ReactNode }
> = ({ setIsActive, navItems, footer }) => {
  return (
    <motion.div
      variants={MENU_SLIDE_ANIMATION}
      initial="initial"
      animate="enter"
      exit="exit"
      className="h-[100dvh] w-screen max-w-[360px] sm:max-w-[420px] fixed right-0 top-0 z-[60] bg-white shadow-2xl overflow-hidden flex flex-col justify-between"
    >
      <div className="h-full pt-16 flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col gap-2 mt-4 px-7 sm:px-10">
          <section className="bg-transparent mt-0">
            <div className="mx-auto w-full">
              {navItems.map((item, index) => {
                return (
                  <NavLink
                    key={item.href}
                    {...item}
                    setIsActive={setIsActive}
                    index={index + 1}
                  />
                );
              })}
            </div>
          </section>
        </div>
        {footer}
      </div>
      <Curve />
    </motion.div>
  );
};

export const Header: React.FC<iHeaderProps> = ({
  navItems = defaultNavItems,
  footer = <CustomFooter />,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          aria-label={isActive ? "Close menu" : "Open menu"}
          onClick={handleClick}
          className="fixed right-3 top-3 z-[70] w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md md:hidden transition-all active:scale-95"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between items-center pointer-events-none">
            <span
              className={`block h-0.5 w-6 bg-[#0f1b3a] transition-all duration-300 ${
                isActive ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-[#0f1b3a] transition-all duration-300 ${
                isActive ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-[#0f1b3a] transition-all duration-300 ${
                isActive ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <>
            {/* Backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsActive(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
            />
            <CurvedNavbar
              setIsActive={setIsActive}
              navItems={navItems}
              footer={footer}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
