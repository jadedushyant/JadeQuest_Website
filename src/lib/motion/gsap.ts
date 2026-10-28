"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase, Flip, Observer, MotionPathPlugin);
  CustomEase.create("jade", "0.76,0,0.24,1");
  gsap.defaults({ ease: "expo.out", duration: 0.8 });
}

export { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase, Flip, Observer, MotionPathPlugin };
