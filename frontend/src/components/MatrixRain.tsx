import React, { useEffect, useRef, useState } from 'react';

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  // Keypress listener for Konami Code
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp",
      "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight",
      "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          setIsActive(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Matrix Rain Canvas Rendering
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    document.body.classList.add('matrix-active');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const columns = Math.floor(width / 20) + 1;
    const yPositions = Array(columns).fill(0);

    const matrix = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0F0';
      ctx.font = '15pt monospace';

      yPositions.forEach((y, colIndex) => {
        const text = String.fromCharCode(1e2 + Math.random() * 33);
        const x = colIndex * 20;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[colIndex] = 0;
        } else {
          yPositions[colIndex] = y + 20;
        }
      });
    };

    const intervalId = setInterval(matrix, 30);

    // Stop Matrix rain after 10 seconds
    const timeoutId = setTimeout(() => {
      setIsActive(false);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('matrix-active');
      ctx.clearRect(0, 0, width, height);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      id="matrix-canvas"
      className="fixed top-0 left-0 w-full h-full z-[999] pointer-events-auto opacity-100"
    />
  );
};
