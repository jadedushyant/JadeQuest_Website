import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Background the logo sits on: navy lettering on light, warm white on dark */
  tone?: "dark" | "light" | "stone";
  className?: string;
  priority?: boolean;
};

/**
 * Official JadeQuest wordmark (public/brand). The light-lettered file is
 * generated from the original for dark backgrounds; the gradient ring is kept.
 */
export function Logo({ tone = "dark", className, priority }: LogoProps) {
  const onDark = tone === "dark";
  return (
    <Image
      src={onDark ? "/brand/jadequest-logo-light.png" : "/brand/jadequest-logo.png"}
      alt="JadeQuest"
      width={1600}
      height={345}
      priority={priority}
      sizes="160px"
      className={cn("h-7 w-auto", className)}
    />
  );
}
