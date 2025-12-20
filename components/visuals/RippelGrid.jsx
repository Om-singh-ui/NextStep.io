import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import { useTheme } from 'next-themes'; // If using next-themes
// OR if using a custom theme provider, import your useTheme hook

const RippleGrid = ({
  enableRainbow = false,
  gridColor = null, // Default to null to use theme
  rippleIntensity = 0.08,
  gridSize = 12.0,
  gridThickness = 12.0,
  fadeDistance = 1.8,
  vignetteStrength = 2.5,
  glowIntensity = 0.15,
  opacity = 0.7,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1.4,
  className = '',
  background = null // No default background
}) => {
  const containerRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluenceRef = useRef(0);
  const uniformsRef = useRef(null);
  const animationIdRef = useRef(null);
  
  // Use your theme provider - adjust this based on your actual theme setup
  // If using next-themes:
  const { resolvedTheme } = useTheme();
  // OR if using custom theme provider:
  // const { theme } = useThemeContext();
  
  // Get theme-aware grid color
  const getGridColor = () => {
    if (gridColor) return gridColor;
    
    // Use theme-aware colors
    if (resolvedTheme === 'dark') {
      return '#e5e5e5'; // Light gray for dark mode
    }
    return '#3a3a3a'; // Dark gray for light mode
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const hexToRgb = hex => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
        : [1, 1, 1];
    };

    const currentColor = getGridColor();
    
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Set canvas styles
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    canvas.style.zIndex = '0';
    
    containerRef.current.appendChild(canvas);

    const vert = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform bool enableRainbow;
      uniform vec3 gridColor;
      uniform float rippleIntensity;
      uniform float gridSize;
      uniform float gridThickness;
      uniform float fadeDistance;
      uniform float vignetteStrength;
      uniform float glowIntensity;
      uniform float opacity;
      uniform float gridRotation;
      uniform bool mouseInteraction;
      uniform vec2 mousePosition;
      uniform float mouseInfluence;
      uniform float mouseInteractionRadius;
      varying vec2 vUv;

      float pi = 3.141592653589793;

      mat2 rotate(float angle) {
          float s = sin(angle);
          float c = cos(angle);
          return mat2(c, -s, s, c);
      }

      void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= iResolution.x / iResolution.y;

          if (gridRotation != 0.0) {
              uv = rotate(gridRotation * pi / 180.0) * uv;
          }

          float dist = length(uv);
          float func = sin(pi * (iTime - dist * 1.5));
          vec2 rippleUv = uv + uv * func * rippleIntensity * 0.8;

          if (mouseInteraction && mouseInfluence > 0.0) {
              vec2 mouseUv = (mousePosition * 2.0 - 1.0);
              mouseUv.x *= iResolution.x / iResolution.y;
              float mouseDist = length(uv - mouseUv);
              
              float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
              
              float mouseWave = sin(pi * (iTime * 3.0 - mouseDist * 4.0)) * influence;
              rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.5;
          }

          vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
          vec2 b = abs(a);

          float aaWidth = 0.3;
          vec2 smoothB = vec2(
              smoothstep(0.0, aaWidth, b.x),
              smoothstep(0.0, aaWidth, b.y)
          );

          vec3 color = vec3(0.0);
          color += exp(-gridThickness * smoothB.x * (0.8 + 0.3 * sin(pi * iTime * 0.5)));
          color += exp(-gridThickness * smoothB.y * (0.9 + 0.2 * cos(pi * iTime * 0.7)));
          
          // Subtle secondary grid lines
          color += 0.3 * exp(-(gridThickness * 0.3) * smoothB.x);
          color += 0.3 * exp(-(gridThickness * 0.3) * smoothB.y);

          if (glowIntensity > 0.0) {
              color += glowIntensity * exp(-gridThickness * 0.4 * (smoothB.x + smoothB.y));
          }

          // Smooth fade towards edges
          float edgeFade = exp(-2.5 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
          
          // Vignette effect
          vec2 vignetteCoords = vUv - 0.5;
          float vignetteDistance = length(vignetteCoords);
          float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
          vignette = clamp(vignette, 0.0, 1.0);
          
          vec3 finalColor;
          if (enableRainbow) {
              float hue = iTime * 0.2;
              finalColor = 0.5 + 0.5 * cos(6.28318 * (hue + vec3(0.0, 0.33, 0.67)));
          } else {
              finalColor = gridColor;
          }

          float finalFade = edgeFade * vignette;
          float alpha = length(color) * finalFade * opacity;
          
          // Apply smooth alpha fade
          alpha = smoothstep(0.0, 0.5, alpha);
          
          gl_FragColor = vec4(color * finalColor * finalFade * opacity, alpha);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      enableRainbow: { value: enableRainbow },
      gridColor: { value: hexToRgb(currentColor) },
      rippleIntensity: { value: rippleIntensity },
      gridSize: { value: gridSize },
      gridThickness: { value: gridThickness },
      fadeDistance: { value: fadeDistance },
      vignetteStrength: { value: vignetteStrength },
      glowIntensity: { value: glowIntensity },
      opacity: { value: opacity },
      gridRotation: { value: gridRotation },
      mouseInteraction: { value: mouseInteraction },
      mousePosition: { value: [0.5, 0.5] },
      mouseInfluence: { value: 0 },
      mouseInteractionRadius: { value: mouseInteractionRadius }
    };

    uniformsRef.current = uniforms;

    const geometry = new Triangle(gl);
    const program = new Program(gl, { 
      vertex: vert, 
      fragment: frag, 
      uniforms,
      transparent: true
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h);
        uniforms.iResolution.value = [w, h];
      }
    };

    const handleMouseMove = e => {
      if (!mouseInteraction || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));
      targetMouseRef.current = { x, y };
    };

    const handleMouseEnter = () => {
      if (!mouseInteraction) return;
      mouseInfluenceRef.current = 1.0;
    };

    const handleMouseLeave = () => {
      if (!mouseInteraction) return;
      mouseInfluenceRef.current = 0.0;
      targetMouseRef.current = { x: 0.5, y: 0.5 };
    };

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(containerRef.current);
    } else {
      window.addEventListener('resize', resize);
    }
    
    resize();

    if (mouseInteraction && containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    const render = t => {
      uniforms.iTime.value = t * 0.001;

      // Smooth mouse movement
      const lerpFactor = 0.15;
      mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor;
      mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor;

      // Smooth influence changes
      const currentInfluence = uniforms.mouseInfluence.value;
      const targetInfluence = mouseInfluenceRef.current;
      uniforms.mouseInfluence.value += (targetInfluence - currentInfluence) * 0.08;

      uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];

      renderer.render({ scene: mesh });
      animationIdRef.current = requestAnimationFrame(render);
    };

    animationIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', resize);
      }
      
      if (mouseInteraction && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (containerRef.current && containerRef.current.contains(canvas)) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    if (!uniformsRef.current) return;

    const hexToRgb = hex => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
        : [1, 1, 1];
    };

    const currentColor = getGridColor();
    
    uniformsRef.current.enableRainbow.value = enableRainbow;
    uniformsRef.current.gridColor.value = hexToRgb(currentColor);
    uniformsRef.current.rippleIntensity.value = rippleIntensity;
    uniformsRef.current.gridSize.value = gridSize;
    uniformsRef.current.gridThickness.value = gridThickness;
    uniformsRef.current.fadeDistance.value = fadeDistance;
    uniformsRef.current.vignetteStrength.value = vignetteStrength;
    uniformsRef.current.glowIntensity.value = glowIntensity;
    uniformsRef.current.opacity.value = opacity;
    uniformsRef.current.gridRotation.value = gridRotation;
    uniformsRef.current.mouseInteraction.value = mouseInteraction;
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius;
  }, [
    enableRainbow,
    gridColor,
    rippleIntensity,
    gridSize,
    gridThickness,
    fadeDistance,
    vignetteStrength,
    glowIntensity,
    opacity,
    gridRotation,
    mouseInteraction,
    mouseInteractionRadius,
    resolvedTheme // Re-run when theme changes
  ]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full relative ${className}`}
      style={{
        background: background || 'transparent',
        pointerEvents: mouseInteraction ? 'auto' : 'none'
      }}
    />
  );
};

export default RippleGrid;