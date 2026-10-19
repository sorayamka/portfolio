"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr } from "@react-three/drei";
import { Mascot } from "./mascot";

/**
 * Модель приносит свою текстуру и PBR-материал, поэтому свет должен быть
 * настоящим: одного ambient мало, а Environment даёт блики и отражения,
 * без которых металл читается плоским.
 */
function Rig() {
  return (
    <>
      <ambientLight intensity={0.35} />

      {/* ключ сверху-справа */}
      <directionalLight position={[4, 6, 6]} intensity={1.5} color="#ffffff" />
      {/* заполняющий слева, чтобы тень не проваливалась в чёрное */}
      <directionalLight position={[-5, 2, 4]} intensity={0.5} color="#b9c8ff" />
      {/* контровой снизу-сзади — отделяет силуэт от чёрного фона */}
      <directionalLight position={[-2, -3, -5]} intensity={0.7} color="#8fb4ff" />

      <Environment resolution={256} frames={1}>
        {/* верхняя софтбокс-панель */}
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[0, 5, 4]} rotation={[-Math.PI / 2, 0, 0]} scale={[12, 8, 1]} />
        {/* фронтальный блик */}
        <Lightformer form="rect" intensity={0.7} color="#ffffff" position={[0, 1, 6]} scale={[7, 4, 1]} />
        {/* боковые полосы — подчёркивают объём */}
        <Lightformer form="rect" intensity={1.2} color="#dfe7ff" position={[-6, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 5, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#ffffff" position={[6, 1, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 5, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <Mascot />
      </Suspense>
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.15, 11], fov: 30, near: 0.1, far: 100 }}
      style={{ pointerEvents: "none" }}
    >
      <Rig />
    </Canvas>
  );
}
