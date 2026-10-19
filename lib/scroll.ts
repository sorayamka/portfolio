/** Клиентский mutable-стор: пишет скролл/указатель, читает 3D. */
export const view = {
  /** 0 → 1 на всю длину страницы */
  progress: 0,
  /** прогресс первого экрана, 0 → 1 */
  hero: 0,
  /** px/кадр */
  velocity: 0,
  /** нормализованный указатель, -1..1 */
  pointer: { x: 0, y: 0 },
  /** цель инверсии персонажа: 0 — обычные цвета, 1 — инверсные */
  invert: 0,
  /** true после лоадера */
  ready: false,
};

export function readScroll() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  view.progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
  view.hero = Math.min(1, Math.max(0, y / Math.max(1, window.innerHeight)));
  view.velocity = y - (readScroll.last ?? y);
  readScroll.last = y;
}
readScroll.last = 0;