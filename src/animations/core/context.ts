import gsap from 'gsap';

export function createAnimationContext(scope?: Element | string | object, func?: gsap.ContextFunc): gsap.Context {
  return gsap.context(func || (() => {}), scope);
}
