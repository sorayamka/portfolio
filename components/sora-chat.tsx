"use client";

import { useEffect, useRef, useState } from "react";

const reply = "You’re in! Your payment is confirmed. Lesson 01 and the community invite are ready below.";

export function SoraChat() {
  const ref = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setElapsed(10000); return; }
      const start = performance.now();
      const tick = (now: number) => {
        setElapsed(now - start);
        if (now - start < 8500) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .25 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  const count = Math.max(0, Math.min(reply.length, Math.floor((elapsed - 4000) / 28)));
  return (
    <div className="sora-chat-demo" ref={ref} lang="en">
    <div className="sora-chat" aria-label="Example conversation about enrolling in a course">
      <div className="sora-chat-bar"><span className="sora-chat-back" aria-hidden>‹</span><span className="sora-chat-avatar">s</span><div><strong>Sora Academy</strong><span>course assistant · online</span></div><span className="sora-chat-menu" aria-hidden>···</span></div>
      <div className="sora-chat-messages">
        <span className="sora-chat-date">Today</span>
        <div className="sora-bubble sora-bubble--in">Hey! Is the Python course beginner-friendly?<small>10:24</small></div>
        <div className="sora-bubble sora-bubble--out">Absolutely. We start from zero, then build a real Telegram bot together.<small>10:24 <span>✓✓</span></small></div>
        <div className="sora-course">
          <div className="sora-course-cover"><span>LEARN BY BUILDING</span><strong>Python.<br />From zero<br /><em>to shipped.</em></strong><div className="sora-course-code" aria-hidden>{"</>"}</div><span>12 LESSONS · 3 PROJECTS</span></div>
          <div className="sora-course-action"><span aria-hidden>↗</span> Full course · $49</div>
        </div>
        <div className="sora-chat-ending">
          {elapsed < 2000 && <div className="sora-typing" aria-label="Student is typing"><i /><i /><i /></div>}
          {elapsed >= 2000 && <div className="sora-bubble sora-bubble--in sora-message-enter">Sounds good. Just paid — what’s next?<small>10:26</small></div>}
          {elapsed >= 2600 && elapsed < 4000 && <div className="sora-typing sora-typing--out" aria-label="Sora is typing"><i /><i /><i /></div>}
          {elapsed >= 4000 && <div className="sora-bubble sora-bubble--out sora-message-enter">{reply.slice(0, count)}{count < reply.length && <span className="sora-type-caret" aria-hidden />}<small>10:26 <span>✓✓</span></small></div>}
          {elapsed >= 4000 + reply.length * 28 + 400 && <div className="sora-access sora-message-enter"><span>✓ Access unlocked</span><strong>Start learning <span aria-hidden>↗</span></strong></div>}
        </div>
      </div>
      <div className="sora-chat-input" aria-hidden><span>＋</span><span>Message</span><span>↑</span></div>
    </div>
    <p className="sora-demo-caption">Illustrative demo conversation — for presentation purposes only.</p>
    </div>
  );
}
