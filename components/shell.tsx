"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LangProvider } from "./lang-provider";
import { Loader } from "./loader";
import { Cursor } from "./cursor";
import { SmoothScroll } from "./smooth-scroll";
import { ScrollRail } from "./scroll-progress";
import { TopBar } from "./top-bar";
import { view } from "@/lib/scroll";

const SEEN = "ivan-loader-seen";

function Chrome({ ready, onReady, children }: { ready: boolean; onReady: () => void; children: ReactNode }) {
  return (
    <>
      <Loader onDone={onReady} />
      <SmoothScroll />
      <Cursor />
      <ScrollRail />
      <TopBar />
      {children}
    </>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  const handleReady = useCallback(() => {
    view.ready = true;
    setReady(true);
  }, []);

  useEffect(() => {
    // загрузчик один раз за сессию: переходы между страницами не перезапускают его
    if (sessionStorage.getItem(SEEN)) {
      view.ready = true;
      setReady(true);
      return;
    }
    sessionStorage.setItem(SEEN, "1");
  }, []);

  return (
    <LangProvider>
      <Chrome ready={ready} onReady={handleReady}>{children}</Chrome>
    </LangProvider>
  );
}