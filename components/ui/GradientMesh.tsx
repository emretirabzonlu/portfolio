"use client";

import { useState, useEffect } from "react";

export default function GradientMesh() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.innerWidth >= 1024);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="blob blob-1" />
      <div className="blob blob-2" />
    </div>
  );
}
