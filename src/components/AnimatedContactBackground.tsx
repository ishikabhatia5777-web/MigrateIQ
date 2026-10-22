import React, { useEffect, useRef } from 'react';

export const AnimatedContactBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      glowColor: string;
      alpha: number;
      pulseSpeed: number;
      pulseAngle: number;
    }

    const colors = [
      { fill: 'rgba(6, 182, 212, ', glow: 'rgba(6, 182, 212, 0.8)' },   // Cyan
      { fill: 'rgba(59, 130, 246, ', glow: 'rgba(59, 130, 246, 0.8)' },  // Blue
      { fill: 'rgba(139, 92, 246, ', glow: 'rgba(139, 92, 246, 0.8)' },  // Purple
      { fill: 'rgba(14, 165, 233, ', glow: 'rgba(14, 165, 233, 0.8)' },  // Sky
      { fill: 'rgba(99, 102, 241, ', glow: 'rgba(99, 102, 241, 0.8)' },  // Indigo
    ];

    // Responsive particle count
    const particleCount = width < 768 ? 40 : 80;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorScheme = colors[Math.floor(Math.random() * colors.length)];
      const baseRadius = Math.random() * 2 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: baseRadius,
        baseRadius,
        color: colorScheme.fill,
        glowColor: colorScheme.glow,
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    // Mouse coordinates for interactive effect
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    const connectionDistance = 130;
    const mouseConnectDistance = 170;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Pulse size & glow
        p.pulseAngle += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseAngle) * 0.7;

        // Interaction with mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw particle with luminous glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Connect to mouse with bright laser line
        if (dist < mouseConnectDistance) {
          const mouseAlpha = (1 - dist / mouseConnectDistance) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${mouseAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distP = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (distP < connectionDistance) {
            const lineAlpha = (1 - distP / connectionDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Subtle dual tone gradient line
            const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            grad.addColorStop(0, `${p.color}${lineAlpha})`);
            grad.addColorStop(1, `${p2.color}${lineAlpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Deep Cosmic Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,35,74,0.6),rgba(3,7,18,1))]" />

      {/* 2. Animated Aurora Glow Blobs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 lg:w-[32rem] lg:h-[32rem] rounded-full bg-cyan-500/20 blur-[110px] animate-aurora-1"
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 lg:w-[36rem] lg:h-[36rem] rounded-full bg-blue-600/25 blur-[120px] animate-aurora-2"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-[28rem] lg:h-[28rem] rounded-full bg-purple-600/18 blur-[100px] animate-aurora-3"
      />

      {/* 3. Subtle Cyber Tech Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 30%, transparent 85%)',
        }}
      />

      {/* 4. Scanning Cyber Light Beam */}
      <div 
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-cyber-beam pointer-events-none"
      />

      {/* 5. Interactive Particle & Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* 6. Soft Vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.7)_100%)] pointer-events-none" />
    </div>
  );
};
