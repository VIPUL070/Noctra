"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "./button";
import NavigationButton from "./navigation-button";
import { ThemeToggleButton } from "../theme-toggle";
import { languages, navItems } from "@/constant/nav";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

const PANEL =
  "pointer-events-auto bg-background/50 border border-border backdrop-blur-xl shadow-2xl text-foreground";

type NavItem = (typeof navItems)[number] & { count?: string };

export default function SkiperNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-2.5">
      <div
        ref={containerRef}
        // full-height column so the menu panel can flex to fill; empty space is click-through
        className="pointer-events-none flex h-[calc(100dvh-50px)] w-full max-w-[410px] flex-col gap-2.5"
      >
        {/* 1 ─ Header bar */}
        <div
          className={`${PANEL} flex h-[50px] shrink-0 items-center justify-between gap-2 rounded-[24px] px-4`}
        >
          {/* Logo / Brand badge */}
          <Link href="/" onClick={() => setIsOpen(false)} className="relative inline-block">
            <Image
              src="/logo-light.png"
              alt="logo"
              width={40}
              height={40}
              unoptimized
              className="block dark:hidden"
            />

            <Image
              src="/logo-dark.png"
              alt="logo"
              width={40}
              height={40}
              unoptimized
              className="hidden dark:block"
            />
          </Link>

          {/* Toggle Button & Theme Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="text-[11px] font-bold h-8 tracking-widest uppercase px-3 rounded-full border-border bg-muted/40 hover:bg-muted text-foreground cursor-pointer select-none"
            >
              {isOpen ? "Close" : "Menu"}
            </Button>

            <ThemeToggleButton className="size-6 rounded-full" />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* 2 ─ Menu list panel (reveals top → bottom) */}
              <motion.nav
                key="menu"
                aria-label="Main"
                initial={{ clipPath: "inset(0% 0% 100% 0% round 18px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 18px)" }}
                exit={{
                  clipPath: "inset(0% 0% 100% 0% round 18px)",
                  transition: { duration: 0.18, ease: EASE },
                }}
                transition={{ duration: 0.28, ease: EASE }}
                className={`${PANEL} relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[18px]`}
              >
                {/* Soft backdrop glow adaptively tuned for light & dark mode */}
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />

                <ul className="relative z-10 flex flex-col items-center gap-1 w-full text-center">
                  {(navItems as NavItem[]).map((item) => (
                    <li key={item.label} className="w-full">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-baseline justify-center gap-2 py-1 text-foreground/80 hover:text-foreground transition-colors"
                      >
                        <span className="text-2xl sm:text-3xl font-black tracking-tighter uppercase transition-transform duration-200 group-hover:scale-105">
                          {item.label}
                        </span>
                        {item.count && (
                          <sup className="text-xs font-bold text-muted-foreground">
                            {item.count}
                          </sup>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>

              {/* 3 ─ Legal links panel */}
              <motion.div
                key="legal"
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.22, duration: 0.25, ease: EASE },
                }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className={`${PANEL} flex h-16 shrink-0 items-center justify-between rounded-[22px] px-5 text-xs text-muted-foreground`}
              >
                <NavigationButton href="#privacy" text="Privacy Policy" />
                <NavigationButton href="#terms" text="Terms of Service" />
              </motion.div>

              {/* 4 ─ Language switcher panel */}
              <motion.div
                key="lang"
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.26, duration: 0.25, ease: EASE },
                }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className={`${PANEL} flex h-[69px] shrink-0 items-center rounded-[22px] px-3.5 text-xs text-muted-foreground`}
              >
                <div className="grid w-full grid-cols-4 gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`py-1.5 rounded-lg text-[11px] font-bold tracking-wider transition-all duration-200 border cursor-pointer ${activeLang === lang
                        ? "border-primary bg-primary/10 text-primary font-extrabold"
                        : "border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}