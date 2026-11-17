"use client";

import Script from "next/script";

// Loaded in the exact order the original template used, after the page is
// interactive. Each script is the original, unmodified file from the theme.
export default function ScriptsLoader() {
  return (
    <>
      <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/validator.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.slicknav.js" strategy="afterInteractive" />
      <Script src="/js/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.waypoints.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.counterup.min.js" strategy="afterInteractive" />
      <Script src="/js/isotope.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/js/SmoothScroll.js" strategy="afterInteractive" />
      <Script src="/js/parallaxie.js" strategy="afterInteractive" />
      <Script src="/js/gsap.min.js" strategy="afterInteractive" />
      <Script src="/js/magiccursor.js" strategy="afterInteractive" />
      <Script src="/js/SplitText.js" strategy="afterInteractive" />
      <Script src="/js/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.mb.YTPlayer.min.js" strategy="afterInteractive" />
      <Script src="/js/wow.min.js" strategy="afterInteractive" />
      <Script src="/js/function.js" strategy="afterInteractive" />
    </>
  );
}
