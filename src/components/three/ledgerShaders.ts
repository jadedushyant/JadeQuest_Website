// Shared vertex logic: rest grid ↔ Merkle tree, idle drift, hold compression,
// pointer repulsion and the intro fly-in.
const displace = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uHold;
  uniform float uBurst;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uMouseStrength;

  attribute vec3 aTarget;
  attribute float aRandom;

  varying float vGlow;
  varying float vAlpha;

  vec3 displace(vec3 base) {
    vec3 p = mix(base, aTarget, uBurst);
    float phase = aRandom * 6.2831;

    // Idle drift, small enough to read as "alive" rather than "floating".
    p.x += sin(uTime * 0.5 + phase + base.y * 0.8) * 0.035;
    p.y += cos(uTime * 0.4 + phase + base.x * 0.8) * 0.035;

    // Hold: everything is pulled into a trembling core.
    float h = uHold * uHold;
    vec3 jitter = vec3(sin(uTime * 22.0 + aRandom * 40.0), cos(uTime * 19.0 + aRandom * 31.0), 0.0) * 0.05;
    p = mix(p, p * 0.12 + jitter, h * 0.85);

    // Pointer pushes nearby particles aside; they settle back when it leaves.
    vec2 d = p.xy - uMouse;
    float dist = length(d);
    float f = (1.0 - smoothstep(0.0, 1.8, dist)) * uMouseStrength * (1.0 - uHold);
    p.xy += (d / max(dist, 0.001)) * f * 0.55;

    // Intro: particles arrive from depth.
    p.z -= (1.0 - uIntro) * (6.0 + aRandom * 10.0);

    vGlow = max(f, h);
    vAlpha = uIntro * (1.0 - uScroll * 0.85);
    return p;
  }
`;

export const pointsVertex = /* glsl */ `
  uniform float uPixelRatio;
  uniform float uSize;
  ${displace}
  void main() {
    vec4 mv = modelViewMatrix * vec4(displace(position), 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (1.0 + vGlow * 1.2 + uBurst * 0.4) * (8.0 / -mv.z);
  }
`;

export const pointsFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uBurst;
  varying float vGlow;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.15, d);
    vec3 col = mix(uColor, uAccent, clamp(vGlow + uBurst * 0.7, 0.0, 1.0));
    gl_FragColor = vec4(col, a * vAlpha * (0.5 + vGlow * 0.5));
  }
`;

export const linesVertex = /* glsl */ `
  ${displace}
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displace(position), 1.0);
  }
`;

export const linesFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uBurst;
  varying float vGlow;
  varying float vAlpha;
  void main() {
    vec3 col = mix(uColor, uAccent, clamp(vGlow + uBurst, 0.0, 1.0));
    gl_FragColor = vec4(col, vAlpha * (0.16 + vGlow * 0.4 + uBurst * 0.35));
  }
`;
