export function SoraChat() {
  return (
    <div className="sora-chat" lang="en" aria-label="Example conversation about enrolling in a course">
      <div className="sora-chat-bar"><span className="sora-chat-back" aria-hidden>‹</span><span className="sora-chat-avatar">s</span><div><strong>Sora Academy</strong><span>course assistant · online</span></div><span className="sora-chat-menu" aria-hidden>···</span></div>
      <div className="sora-chat-messages">
        <span className="sora-chat-date">Today</span>
        <div className="sora-bubble sora-bubble--in">Hey! Is the Python course beginner-friendly?<small>10:24</small></div>
        <div className="sora-bubble sora-bubble--out">Absolutely. We start from zero, then build a real Telegram bot together.<small>10:24 <span>✓✓</span></small></div>
        <div className="sora-course">
          <div className="sora-course-cover"><span>LEARN BY BUILDING</span><strong>Python.<br />From zero<br /><em>to shipped.</em></strong><div className="sora-course-code" aria-hidden>{"</>"}</div><span>12 LESSONS · 3 PROJECTS</span></div>
          <div className="sora-course-action"><span aria-hidden>↗</span> Full course · $49</div>
        </div>
        <div className="sora-bubble sora-bubble--in">Sounds good. Just paid — what’s next?<small>10:26</small></div>
        <div className="sora-bubble sora-bubble--out">You’re in! Your payment is confirmed. Lesson 01 and the community invite are ready below.<small>10:26 <span>✓✓</span></small></div>
        <div className="sora-access"><span>✓ Access unlocked</span><strong>Start learning <span aria-hidden>↗</span></strong></div>
      </div>
      <div className="sora-chat-input" aria-hidden><span>＋</span><span>Message</span><span>↑</span></div>
    </div>
  );
}
