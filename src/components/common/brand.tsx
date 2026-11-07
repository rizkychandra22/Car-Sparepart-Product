import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface BrandProps {
  to?: string
  className?: string
  variant?: "default" | "landing" | "app"
}

export function Brand({ to = "/", className = "", variant = "default" }: BrandProps) {
  const isLanding = variant === "landing"
  const isApp = variant === "app"

  return (
    <Link to={to} className={cn("inline-flex shrink-0 items-center gap-3", isLanding && "text-white", isApp && "gap-3", className)} aria-label="PARTSCOPE - Beranda">
      <span className={cn(
        "flex size-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[var(--ink)] text-[#ecffe4] shadow-[0_4px_10px_#0a192518]",
        isLanding && "size-[37px] rounded-[11px] border border-[#80dcff66] bg-[#ffffff12] shadow-[0_0_28px_#11b4ff2b] max-[700px]:size-[34px]",
        isApp && "size-[38px] rounded-[10px]",
      )} aria-hidden="true">
        <svg className={cn("size-[27px]", isLanding && "size-[25px]")} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 9h9.2c4.8 0 6.8 2.3 6.8 7s-2 7-6.8 7H9V9Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M13.8 16H24" stroke="#C7F568" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col gap-[3px]">
        <span className={cn(
          "text-[17px] font-black leading-none tracking-[-.8px]",
          isLanding && "text-[15px] tracking-[2.9px] text-white max-[700px]:text-[13px] max-[700px]:tracking-[1.75px]",
          isApp && "text-[16px]",
        )}>PARTSCOPE<span className={cn("text-[#42ad95]", isLanding && "text-[#73dfff]")}>.</span></span>
        <span className={cn(
          "whitespace-nowrap text-[7px] font-extrabold tracking-[2px] text-[#99a8b0]",
          isLanding && "mt-[3px] text-[6px] tracking-[2.35px] text-[#d2eaffba] max-[700px]:text-[5px] max-[700px]:tracking-[1.5px]",
        )}>AUTOMOTIVE DATA PLATFORM</span>
      </span>
    </Link>
  )
}
