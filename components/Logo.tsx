/* Custom "Undgun Tsagaan" logo — a minimal horse-head mark + serif wordmark.
   Colors inherit so it adapts to light/dark placements (header vs. footer). */

type LogoProps = {
  className?: string;
  showText?: boolean;
  markColor?: string;
};

export function HorseMark({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Undgun Tsagaan horse mark"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="30" stroke={color} strokeWidth="2" opacity="0.35" />
      {/* Stylised galloping horse head */}
      <path
        d="M22 46c-1-6 0-11 3-15 1.6-2.1 2-3.3 1.6-5.4-.3-1.6.2-3.1 1.5-4.2l.4-.3c.3 1.4.9 2.3 1.9 2.9 1.3.8 2.1-.2 3.6-.2 1.2 0 1.8.7 2.9 1.6 2.6 2 5.2 2.6 8.4 2.6 1.7 0 2.6.9 2.6 2.3 0 1.6-1.4 2.2-2.9 2.6-2 .6-3 1.2-4.2 2.9-1.5 2.1-2.1 4.2-2.3 7-.2 2.7.2 4.6 1 7.6"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mane sweep */}
      <path
        d="M30 21c-2.2-.6-3.8.3-5 2.2-1.3 2-1.2 3.7-.3 5.9"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="33.5" cy="24.5" r="1.1" fill={color} />
    </svg>
  );
}

export default function Logo({
  className = "",
  showText = true,
  markColor = "#C8102E",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <HorseMark className="h-9 w-9 shrink-0" color={markColor} />
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
