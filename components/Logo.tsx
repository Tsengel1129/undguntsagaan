import Image from "next/image";

/* "Undgun Tsagaan" logo — circular gold-framed galloping-horse emblem
   (public/images/logo-emblem.png) + serif wordmark. The emblem adapts to
   both light (header) and dark (footer) placements thanks to its
   transparent corners. */

type LogoProps = {
  className?: string;
  showText?: boolean;
  /** kept for backwards-compat; the raster emblem ignores it */
  markColor?: string;
};

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/images/logo-emblem.png"
        alt="Undgun Tsagaan emblem"
        width={44}
        height={44}
        priority
        className="h-11 w-11 shrink-0 rounded-full"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-xl font-semibold tracking-wide">
            Undgun Tsagaan
          </span>
          <span className="eyebrow text-[10px] opacity-60">Өндгөн цагаан</span>
        </span>
      )}
    </span>
  );
}
