import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={cn("h-8 w-auto", className)}
    {...props}
  >
    <path
      d="M12 2L2 22h20L12 2zm0 4.55L17.52 20H6.48L12 6.55z"
      fill="hsl(var(--primary))"
    />
    <path
      d="M12 6.5C9.5 6.5 7.5 8.5 7.5 11c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-2.5-2-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5S10.62 8.5 12 8.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill="hsl(var(--accent))"
    />
    <path
      d="M11 11.5h2v4h-2z"
      fill="hsl(var(--secondary))"
    />
  </svg>
);
export default Logo;
