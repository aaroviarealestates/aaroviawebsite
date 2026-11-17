"use client";

import { useEffect } from "react";

const legacyScripts = [
  "/js/jquery-3.7.1.min.js",
  "/js/bootstrap.min.js",
  "/js/validator.min.js",
  "/js/swiper-bundle.min.js",
  "/js/jquery.waypoints.min.js",
  "/js/jquery.counterup.min.js",
  "/js/isotope.min.js",
  "/js/jquery.magnific-popup.min.js",
  "/js/SmoothScroll.js",
  "/js/parallaxie.js",
  "/js/gsap.min.js",
  "/js/magiccursor.js",
  "/js/SplitText.js",
  "/js/ScrollTrigger.min.js",
  "/js/jquery.mb.YTPlayer.min.js",
  "/js/wow.min.js",
  "/js/function.js",
];

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Unable to load site enhancement script: ${src}`));
    document.body.appendChild(script);
  });
}

export default function ScriptsLoader() {
  useEffect(() => {
    let cancelled = false;
    let idleCallbackId: number | undefined;
    let fallbackTimeoutId: number | undefined;
    const requestIdle = Reflect.get(window, "requestIdleCallback") as
      | ((callback: () => void, options?: { timeout: number }) => number)
      | undefined;
    const cancelIdle = Reflect.get(window, "cancelIdleCallback") as
      | ((id: number) => void)
      | undefined;

    const loadLegacyScripts = async () => {
      try {
        for (const src of legacyScripts) {
          if (cancelled) return;
          await loadScript(src);
        }
      } catch (error) {
        console.error("Site enhancement scripts did not finish loading.", error);
      }
    };

    const scheduleScripts = () => {
      if (cancelled) return;
      if (requestIdle) {
        idleCallbackId = requestIdle(loadLegacyScripts, { timeout: 2000 });
      } else {
        fallbackTimeoutId = window.setTimeout(loadLegacyScripts, 0);
      }
    };

    if (document.readyState === "complete") {
      scheduleScripts();
    } else {
      window.addEventListener("load", scheduleScripts, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleScripts);
      if (idleCallbackId !== undefined && cancelIdle) {
        cancelIdle(idleCallbackId);
      }
      if (fallbackTimeoutId !== undefined) {
        window.clearTimeout(fallbackTimeoutId);
      }
    };
  }, []);

  return null;
}
