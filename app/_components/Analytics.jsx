"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-B7LPKJK516";

export default function Analytics() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const trigger = () => setLoad(true);
    const events = ["scroll", "mousemove", "touchstart", "keydown", "click"];
    events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
    const t = setTimeout(trigger, 8000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      clearTimeout(t);
    };
  }, []);

  if (!load) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
