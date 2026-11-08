import { ArrowDown, ArrowUpRight, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { landingContainerClass } from "@/features/landing/container"

const previewFilters = ["HYUNDAI TYPE", "BRAND", "PART GROUP"]

const previewRows = [
  ["01", "Part name", "Nama komponen / deskripsi"],
  ["02", "Part number", "Referensi identifikasi part"],
  ["03", "Vehicle type", "Filter berdasarkan kendaraan"],
]

export function HeroSection() {
  return (
    <section
      className="relative isolate min-h-[740px] overflow-hidden bg-[image:radial-gradient(ellipse_45%_65%_at_88%_16%,#46d5ff80_0%,transparent_78%),_radial-gradient(ellipse_64%_70%_at_47%_95%,#081052c9_0%,transparent_80%),_linear-gradient(111deg,#040a3e_0%,#07165b_24%,#064295_51%,#0088d9_74%,#05b7f3_100%)] text-white max-[900px]:min-h-0"
      id="beranda"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0 z-[-1] bg-[image:linear-gradient(90deg,#050c38a9_0%,#061b57a0_28%,#0332783d_54%,transparent_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[-1] bg-[url(/tech-hex-grid.svg)] bg-cover bg-no-repeat bg-[position:center_48%] opacity-[.86]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[-1] h-[31%] bg-[image:linear-gradient(0deg,#050b3fc4,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-[10%] -right-[5%] z-[-1] h-[82%] w-[48%] bg-[image:radial-gradient(circle,#49edff3d,transparent_68%)] [mix-blend-mode:screen]"
        aria-hidden="true"
      />

      <div className={`${landingContainerClass} relative grid min-h-[714px] grid-cols-[minmax(0,1fr)_minmax(390px,.86fr)] items-center gap-x-[6.5%] pt-[138px] pb-[99px] max-[1180px]:grid-cols-[minmax(0,1fr)_minmax(340px,.8fr)] max-[1180px]:gap-[3%] max-[900px]:block max-[900px]:min-h-0 max-[900px]:pt-[166px] max-[900px]:pb-[114px] max-[700px]:pt-[136px] max-[700px]:pb-[94px]`}>
        <div className="z-[2] w-full max-w-[650px] min-w-0 pb-[6px] max-[900px]:max-w-[750px] max-[700px]:max-w-full">
          <div className="mb-[52px] flex items-center gap-[12px] text-[9px] font-black tracking-[3px] text-[#d1edff] max-[900px]:mb-[38px] max-[700px]:mb-[39px] max-[700px]:gap-[8px] max-[700px]:text-[8px] max-[700px]:tracking-[1.45px]">
            <span className="size-[8px] rounded-full bg-[#5ce2ff] shadow-[0_0_0_5px_#48daff1a,0_0_20px_#5ce2ffb0]" aria-hidden="true" />
            AUTOMOTIVE DATA PLATFORM
            <span className="opacity-[.35]" aria-hidden="true">/</span>
            MVP 01
          </div>
          <p className="mb-[12px] text-[12px] font-[430] tracking-[7px] text-[#d0f2ff] max-[1180px]:tracking-[5px] max-[700px]:mb-[14px] max-[700px]:text-[9px] max-[700px]:tracking-[4.2px]">
            SMARTER DATA. SIMPLER DISCOVERY.
          </p>
          <h1
            className="m-0 whitespace-nowrap text-[clamp(48px,5.3vw,76px)] font-[850] leading-[1.16] tracking-[1.9px] [text-shadow:0_8px_30px_#0719502a] max-[1180px]:text-[clamp(43px,4.4vw,64px)] max-[900px]:text-[clamp(48px,6.7vw,70px)] max-[700px]:whitespace-normal max-[700px]:text-[clamp(36px,8.4vw,58px)] max-[700px]:tracking-[.6px] max-[375px]:text-[34px]"
            id="hero-title"
          >
            <span className="block text-[.7em] font-[330] leading-[1.5] tracking-[8.5px] max-[700px]:tracking-[4.6px] max-[700px]:leading-[1.35]">
              MASTER DATA
            </span>
            <strong className="font-black">
              SPARE <span className="inline text-[1em] font-black tracking-[0] text-[#65e4ff]">PARTS.</span>
            </strong>
          </h1>
          <p className="mt-[25px] mb-[31px] max-w-[530px] text-[14px] font-[420] leading-[2.02] text-[#cfedff] max-[900px]:max-w-[630px] max-[700px]:mt-[22px] max-[700px]:max-w-full max-[700px]:text-[12px] max-[700px]:leading-[1.95]">
            Satu platform untuk menemukan informasi spare part kendaraan secara cepat, terstruktur, dan presisi. Telusuri nomor part, kategori, tipe kendaraan, harga referensi, hingga status data.
          </p>
          <div className="flex flex-wrap items-center gap-[14px]">
            <Button
              asChild
              className="inline-flex min-h-[49px] items-center justify-center gap-[30px] rounded-[100px] border-0 bg-[image:linear-gradient(120deg,#00b4f8,#38d7ff)] px-[25px] py-[15px] text-[11px] font-[850] tracking-[1.35px] text-[#052253] shadow-[0_10px_35px_#03b5fe40] transition-[transform_.2s,background_.2s,box-shadow_.2s] whitespace-nowrap hover:bg-[#8beaff] hover:shadow-[0_14px_40px_#04b4fd64] [&_span]:text-[17px] [&_span]:font-[650] [&:hover]:-translate-y-0.5 motion-reduce:transition-none max-[700px]:min-h-[45px] max-[700px]:gap-[15px] max-[700px]:px-[19px] max-[700px]:py-[13px] max-[700px]:text-[10px] max-[375px]:gap-[8px] max-[375px]:px-[13px]"
            >
              <Link to="/login">
                Jelajahi katalog <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <a
              className="inline-flex min-h-[49px] items-center justify-center gap-[30px] rounded-[100px] border border-[#aadfff79] bg-[#ffffff09] px-[25px] py-[15px] text-[11px] font-[850] tracking-[1.35px] text-[#f4fdff] transition-[transform_.2s,background_.2s,box-shadow_.2s] whitespace-nowrap hover:bg-[#ffffff24] [&_svg]:size-[17px] [&:hover]:-translate-y-0.5 motion-reduce:transition-none max-[700px]:min-h-[45px] max-[700px]:gap-[15px] max-[700px]:px-[19px] max-[700px]:py-[13px] max-[700px]:text-[10px] max-[375px]:gap-[8px] max-[375px]:px-[13px]"
              href="#fitur"
            >
              Kenali fitur <ArrowDown aria-hidden="true" />
            </a>
          </div>
          <div className="mt-[55px] flex flex-wrap items-center gap-[11px] text-[8px] font-[780] tracking-[1.5px] text-[#bdedff9c] max-[900px]:mt-[33px] max-[700px]:mt-[36px] max-[700px]:gap-[9px] max-[700px]:text-[7px] max-[700px]:leading-[1.8]">
            <span className="size-[6px] rounded-full bg-[#34cfff] shadow-[0_0_15px_#39d7ff]" aria-hidden="true" />
            SECURE ACCESS
            <span className="size-[3px] rounded-full bg-[#bee9ff65]" aria-hidden="true" />
            SEARCH-READY DATABASE
            <span className="size-[3px] rounded-full bg-[#bee9ff65]" aria-hidden="true" />
            REFERENCE DATA
          </div>
        </div>

        <div
          className="relative flex min-h-[440px] w-full min-w-0 max-w-full items-center justify-center p-[12px_18px_0_25px] max-[900px]:mx-auto max-[900px]:mt-[28px] max-[900px]:min-h-[435px] max-[900px]:max-w-[570px] max-[700px]:mt-[50px] max-[700px]:min-h-0 max-[700px]:py-[20px] max-[700px]:px-0"
          aria-label="Ringkasan data awal pada platform"
        >
          <div className="absolute left-1/2 top-1/2 size-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9ce5ff22] shadow-[inset_0_0_0_65px_#70eaff05,inset_0_0_0_135px_#9feeff08,0_0_90px_#27d4ff0f] after:absolute after:inset-[42px] after:rounded-full after:border after:border-dashed after:border-[#d9f9ff28] max-[700px]:size-[385px]" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 grid size-[182px] -translate-x-1/2 -translate-y-1/2 place-items-center text-[#a5eaff24]">
              <svg className="size-[182px]" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <path d="M31 40 60 23l29 17v38L60 96 31 78V40Z" stroke="currentColor" strokeWidth="2" />
                <path d="m31 40 29 17 29-17M60 57v39M31 78l29-21 29 21" stroke="currentColor" strokeWidth="2" />
                <circle cx="60" cy="57" r="6" fill="currentColor" />
              </svg>
            </div>
          </div>

          <Card className="relative z-[2] mt-[35px] w-[min(100%,478px)] min-w-0 max-w-full gap-0 overflow-hidden rounded-[15px] border-[#b6eaff57] bg-[image:linear-gradient(145deg,#061849d9,#071a4dd9_78%,#063779c7)] p-0 shadow-[0_22px_72px_#00113b78,0_0_36px_#1fd2ff1b,inset_0_1px_#ffffff1a] [backdrop-filter:blur(17px)] max-[1180px]:w-full max-[700px]:m-0">
            <div className="flex items-center justify-between border-b border-[#c8eeff1e] bg-[#ffffff0b] p-[16px_19px] text-[8px] font-[850] tracking-[1.6px] text-[#92defa] max-[700px]:p-[13px] max-[700px]:text-[7px]">
              <span className="flex gap-[5px]" aria-hidden="true">
                <i className="size-[6px] rounded-full border border-[#b6e6ff83]" />
                <i className="size-[6px] rounded-full border border-[#b6e6ff83]" />
                <i className="size-[6px] rounded-full border border-[#b6e6ff83]" />
              </span>
              LIVE CATALOG PREVIEW
              <span className="text-[#5db4e2]">MD / 001</span>
            </div>
            <div className="px-[26px] pt-[27px] pb-[14px] text-[9px] font-[780] tracking-[2.4px] text-[#93e3ff] max-[700px]:px-[17px] max-[700px]:pt-[21px] max-[700px]:pb-[12px]">
              MASTER DATA EXPLORER
            </div>
            <div className="mx-[25px] flex h-[48px] items-center gap-[12px] rounded-[8px] border border-[#5cd2ff6b] bg-[#bbf2ff12] px-[14px] text-[10px] text-[#9cdbfa] max-[700px]:mx-[16px] max-[700px]:px-[11px] max-[700px]:text-[9px]">
              <Search className="size-[17px] shrink-0" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">Nama part, nomor part, tipe kendaraan...</span>
              <kbd className="ml-auto opacity-[.6]">⌘ F</kbd>
            </div>
            <div className="flex flex-wrap gap-[7px] px-[25px] pt-[14px] pb-[21px] max-[700px]:px-[16px] max-[700px]:pt-[13px] max-[700px]:pb-[18px]">
              {previewFilters.map((filter) => (
                <span className="rounded-[3px] border border-[#83d8ff37] bg-[#6acfff13] px-[9px] py-[7px] text-[8px] tracking-[.7px] text-[#9ddffe] max-[700px]:text-[7px]" key={filter}>
                  {filter}
                </span>
              ))}
            </div>
            <div className="mx-[25px] h-px bg-[#c1e9ff1d] max-[700px]:mx-[16px]" />
            {previewRows.map(([number, title, description]) => (
              <div className="flex items-center gap-[14px] px-[25px] py-[12px] text-[#effbff] max-[700px]:gap-[10px] max-[700px]:px-[16px] max-[700px]:py-[10px]" key={number}>
                <span className="grid size-[32px] shrink-0 place-items-center rounded-[7px] border border-[#67cfff38] bg-[#3ea9ee1b] text-[10px] font-black text-[#6adfff]">
                  {number}
                </span>
                <span className="flex min-w-0 flex-col gap-[4px]">
                  <b className="text-[11px] tracking-[.2px]">{title}</b>
                  <small className="text-[9px] text-[#a4c9e7] max-[700px]:text-[8px]">{description}</small>
                </span>
                <span className="ml-auto text-[16px] text-[#7ddeff]" aria-hidden="true">↗</span>
              </div>
            ))}
            <div className="mt-[13px] flex items-center gap-[8px] border-t border-[#c5eaff1c] bg-[#00c0ff0a] px-[25px] py-[15px] text-[8px] tracking-[1.2px] text-[#b6ecff] max-[700px]:px-[16px] max-[700px]:py-[14px] max-[700px]:text-[7px] max-[375px]:[&>span:last-child]:hidden">
              <span className="size-[6px] rounded-full bg-[#33ddfa] shadow-[0_0_8px_#61daff]" aria-hidden="true" />
              REFERENSI MASTER DATA
              <span className="ml-auto opacity-[.68]">VIEW ONLY</span>
            </div>
          </Card>

          <div className="absolute top-[26px] right-[-11px] z-[3] rounded-[9px] border border-[#cdf4ff75] bg-[#e2faffed] px-[19px] pt-[15px] pb-[17px] text-[#07366d] shadow-[0_18px_38px_#00113f5b] max-[1180px]:right-[-12px] max-[900px]:right-0 max-[700px]:top-[-26px] max-[700px]:right-[-6px] max-[700px]:px-[13px] max-[700px]:pt-[11px] max-[700px]:pb-[12px]">
            <span className="block text-[8px] font-[850] tracking-[1.7px]">INITIAL DATASET</span>
            <strong className="mt-[8px] block text-[26px] leading-none tracking-[-1.5px] max-[700px]:text-[20px]">
              5.239 <small className="text-[10px] font-bold tracking-normal max-[700px]:text-[9px]">records</small>
            </strong>
            <i className="mt-[11px] block h-[3px] w-full rounded-[2px] bg-[image:linear-gradient(90deg,#00a8f4_72%,#b9d6e0_72%)]" />
          </div>
        </div>
      </div>

      <div className={`${landingContainerClass} absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center justify-between border-t border-[#c3ebff25] py-[23px] text-[8px] font-[760] tracking-[1.8px] text-[#c5eaffb6] [&_i]:mx-[8px] [&_i]:inline-block [&_i]:h-px [&_i]:w-[26px] [&_i]:align-middle [&_i]:bg-[#aff4ff8f] [&_a:hover]:text-white [&_a_span]:ml-[7px] [&_a_span]:text-[#6be3ff] max-[700px]:py-[17px] max-[700px]:text-[7px] max-[700px]:[&>a]:hidden`}>
        <span>01 <i /> CATALOG INTELLIGENCE STARTS HERE</span>
        <a href="#fitur">
          SCROLL TO EXPLORE <ArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
