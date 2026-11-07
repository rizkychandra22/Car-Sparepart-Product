import { Link } from "react-router-dom"

interface BrandProps {
  to?: string
  className?: string
}

export function Brand({ to = "/", className = "" }: BrandProps) {
  return (
    <Link to={to} className={`brand ${className}`} aria-label="PARTSCOPE - Beranda">
      <span className="brand-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 9h9.2c4.8 0 6.8 2.3 6.8 7s-2 7-6.8 7H9V9Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M13.8 16H24" stroke="#C7F568" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      <span className="brand-name-wrap">
        <span className="brand-name">PARTSCOPE<span className="brand-dot">.</span></span>
        <span className="brand-caption">AUTOMOTIVE DATA PLATFORM</span>
      </span>
    </Link>
  )
}
