import { ArrowDown, ArrowUpRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className={cn(`
       relative min-h-[740px] overflow-hidden text-[#fff]
      isolate bg-[image:radial-gradient(ellipse_45%_65%_at_88%_16%,#46d5ff80_0%,transparent_78%),_radial-gradient(ellipse_64%_70%_at_47%_95%,#081052c9_0%,transparent_80%),_linear-gradient(111deg,#040a3e_0%,#07165b_24%,#064295_51%,#0088d9_74%,#05b7f3_100%)] [&:before]:[content:""] [&:before]:absolute [&:before]:[inset:0]
      [&:before]:z-[-1] [&:before]:pointer-events-none [&:before]:[background-image:linear-gradient(90deg,#050c38a9_0%,#061b57a0_28%,#0332783d_54%,transparent_100%)] [&:after]:[content:""] [&:after]:absolute
      [&:after]:[inset:auto_0_0] [&:after]:h-[31%] [&:after]:z-[-1] [&:after]:pointer-events-none [&:after]:[background-image:linear-gradient(0deg,#050b3fc4,transparent)]
      [&_h1]:m-0 [&_h1]:font-[850] [&_h1]:text-[clamp(48px,_5.3vw,_76px)] [&_h1]:leading-[1.16] [&_h1]:tracking-[1.9px]
      [&_h1]:whitespace-nowrap [&_h1]:[text-shadow:0_8px_30px_#0719502a] [&_h1_span]:block [&_h1_span]:font-[330] [&_h1_span]:tracking-[8.5px]
      [&_h1_span]:text-[.7em] [&_h1_span]:leading-[1.5] [&_h1_strong]:font-black [&_h1_strong_span]:inline [&_h1_strong_span]:text-[1em] [&_h1_strong_span]:font-black [&_h1_strong_span]:tracking-[0] max-[1180px]:[&_h1]:text-[clamp(43px,_4.4vw,_64px)] max-[900px]:[&_h1]:text-[clamp(48px,_6.7vw,_70px)]
      max-[900px]:min-h-[0] max-[700px]:[&_h1]:text-[clamp(36px,_8.4vw,_58px)] max-[700px]:[&_h1]:tracking-[.6px] max-[700px]:[&_h1]:whitespace-normal max-[700px]:[&_h1_span]:text-[.7em]
      max-[700px]:[&_h1_span]:tracking-[4.6px] max-[700px]:[&_h1_span]:leading-[1.35] max-[375px]:[&_h1]:text-[34px]
    `)} aria-labelledby="hero-title">
      <div className={cn(`
         absolute z-[-1] [inset:0] bg-[url(/tech-hex-grid.svg)]
        bg-no-repeat bg-cover bg-[position:center_48%] opacity-[.86] pointer-events-none
      `)} aria-hidden="true" />
      <div className={cn(`
         absolute z-[-1] [inset:-10%_-5%_auto_auto] w-[48%]
        h-[82%] bg-[image:radial-gradient(circle,#49edff3d,transparent_68%)] [mix-blend-mode:screen] pointer-events-none
      `)} aria-hidden="true" />

      <div className={cn(`
        mx-auto w-[calc(100%_-_104px)] max-w-[1280px] max-[1180px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_38px)] grid
        grid-cols-[minmax(0,1fr)_minmax(390px,.86fr)] gap-x-[6.5%] items-center relative min-h-[714px]
        pt-[138px] pb-[99px] max-[1180px]:grid-cols-[minmax(0,1fr)_minmax(340px,.8fr)] max-[1180px]:gap-[3%] max-[900px]:block
        max-[900px]:min-h-[0] max-[900px]:pt-[166px] max-[900px]:pb-[114px] max-[700px]:pt-[136px] max-[700px]:pb-[94px]
       w-[min(calc(100%_-_104px),_1280px)] max-[1180px]:w-[min(calc(100%_-_64px),_1280px)] max-[700px]:w-[min(calc(100%_-_38px),_1280px)]`)}>
        <div className={cn(`
           z-2 w-full max-w-[650px] min-w-0 pb-[6px] max-[900px]:max-w-[750px] max-[700px]:max-w-full
        `)}>
          <div className={cn(`
             flex items-center gap-[12px] text-[#d1edff]
            text-[9px] tracking-[3px] font-black mb-[52px] max-[900px]:mb-[38px]
            max-[700px]:text-[8px] max-[700px]:tracking-[1.45px] max-[700px]:gap-[8px] max-[700px]:mb-[39px]
          `)}><span className={cn(`
             w-[8px] h-[8px] rounded-full bg-[#5ce2ff]
            shadow-[0_0_0_5px_#48daff1a,0_0_20px_#5ce2ffb0]
          `)} /> AUTOMOTIVE DATA PLATFORM <span className={cn(`
             opacity-[.35]
          `)}>/</span> MVP 01</div>
          <p className={cn(`
             text-[12px] tracking-[7px] font-[430] text-[#d0f2ff]
            m-[0_0_12px] max-[1180px]:tracking-[5px] max-[700px]:text-[9px] max-[700px]:tracking-[4.2px] max-[700px]:mb-[14px]
          `)}>SMARTER DATA. SIMPLER DISCOVERY.</p>
          <h1 id="hero-title"><span>MASTER DATA</span><strong>SPARE <span className="text-[#65e4ff]">PARTS.</span></strong></h1>
          <p className={cn(`
             max-w-[530px] text-[13px] font-[420] leading-[1.95]
            text-[#cfedff] m-[25px_0_31px] max-[900px]:max-w-[630px] text-[14px] leading-[2.02] max-[700px]:max-w-full max-[700px]:text-[12px] max-[700px]:leading-[1.95]
            max-[700px]:mt-[22px]
          `)}>Satu platform untuk menemukan informasi spare part kendaraan secara cepat, terstruktur, dan presisi. Telusuri nomor part, kategori, tipe kendaraan, harga referensi, hingga status data.</p>
          <div className={cn(`
             flex gap-[14px] items-center flex-wrap
          `)}>
            <Button asChild className={cn(`
                border-0 shadow-none hover:bg-transparent
              inline-flex items-center justify-center gap-[30px] p-[15px_25px]
              min-h-[49px] rounded-[100px] text-[11px] font-[850] tracking-[1.35px]
              whitespace-nowrap transition-[transform_.2s,background_.2s,box-shadow_.2s] [border:1px_solid_transparent] [&:hover]:[transform:translateY(-2px)] [&_span]:text-[17px]
              [&_span]:font-[650] max-[700px]:p-[13px_19px] max-[700px]:text-[10px] max-[700px]:gap-[15px] max-[700px]:min-h-[45px] max-[375px]:gap-[8px] max-[375px]:px-[13px]
              motion-reduce:transition-none bg-[image:linear-gradient(120deg,#00b4f8,#38d7ff)] text-[#052253] shadow-[0_10px_35px_#03b5fe40] [&:hover]:bg-[#8beaff]
              [&:hover]:shadow-[0_14px_40px_#04b4fd64]
            `)}>
              <Link to="/login">Jelajahi katalog <ArrowUpRight aria-hidden="true" /></Link>
            </Button>
            <a href="#fitur" className={cn(`
                inline-flex items-center justify-center
              gap-[30px] p-[15px_25px] min-h-[49px] rounded-[100px] text-[11px]
              font-[850] tracking-[1.35px] whitespace-nowrap transition-[transform_.2s,background_.2s,box-shadow_.2s] [border:1px_solid_transparent]
              [&:hover]:[transform:translateY(-2px)] [&_span]:text-[17px] [&_span]:font-[650] max-[700px]:p-[13px_19px] max-[700px]:text-[10px]
              max-[700px]:gap-[15px] max-[700px]:min-h-[45px] max-[375px]:gap-[8px] max-[375px]:px-[13px] motion-reduce:transition-none [border:1px_solid_#aadfff79] bg-[#ffffff09]
              text-[#f4fdff] [&:hover]:bg-[#ffffff24]
            `)}>Kenali fitur <ArrowDown aria-hidden="true" /></a>
          </div>
          <div className={cn(`
             flex items-center flex-wrap gap-[11px]
            mt-[55px] text-[#bdedff9c] text-[8px] font-[780] tracking-[1.5px]
            max-[900px]:mt-[33px] max-[700px]:leading-[1.8] max-[700px]:mt-[36px] max-[700px]:gap-[9px] max-[700px]:text-[7px]
          `)}>
            <span className={cn(`
               w-[6px] h-[6px] bg-[#34cfff] rounded-full
              shadow-[0_0_15px_#39d7ff]
            `)} /> SECURE ACCESS <span className={cn(`
               w-[3px] h-[3px] rounded-full bg-[#bee9ff65]
            `)} /> SEARCH-READY DATABASE <span className={cn(`
               w-[3px] h-[3px] rounded-full bg-[#bee9ff65]
            `)} /> REFERENCE DATA
          </div>
        </div>

        <div className={cn(`
          relative flex justify-center items-center w-full max-w-full min-w-0
          p-[12px_18px_0_25px] min-h-[440px] max-[900px]:min-h-[435px] max-[900px]:max-w-[570px] max-[900px]:m-[28px_auto_0]
          max-[700px]:min-h-[0] max-[700px]:p-[20px_0] max-[700px]:mt-[50px]
        `)} aria-label="Ringkasan data awal pada platform">
          <div className={cn(`
             absolute w-[540px] h-[540px] [border:1px_solid_#9ce5ff22]
            rounded-full [top:50%] [left:50%] [transform:translate(-50%,-50%)] shadow-[inset_0_0_0_65px_#70eaff05,inset_0_0_0_135px_#9feeff08,0_0_90px_#27d4ff0f]
            [&:after]:[content:""] [&:after]:absolute [&:after]:[inset:42px] [&:after]:[border:1px_dashed_#d9f9ff28] [&:after]:rounded-full
            max-[700px]:w-[385px] max-[700px]:h-[385px]
          `)} aria-hidden="true">
            <div className={cn(`
               w-[182px] h-[182px] text-[#a5eaff24] absolute
              grid place-items-center [top:50%] [left:50%] [transform:translate(-50%,-50%)]
              [&_svg]:w-[182px] [&_svg]:h-[182px]
            `)}><svg viewBox="0 0 120 120" fill="none"><path d="M31 40 60 23l29 17v38L60 96 31 78V40Z" stroke="currentColor" strokeWidth="2"/><path d="m31 40 29 17 29-17M60 57v39M31 78l29-21 29 21" stroke="currentColor" strokeWidth="2"/><circle cx="60" cy="57" r="6" fill="currentColor"/></svg></div>
          </div>
          <Card className={cn(`
             gap-0 p-0 ring-0 relative
            z-2 w-[min(100%,_478px)] max-w-full min-w-0 mt-[35px] overflow-hidden [border:1px_solid_#b6eaff57]
            rounded-[15px] bg-[image:linear-gradient(145deg,#061849d9,#071a4dd9_78%,#063779c7)] shadow-[0_22px_72px_#00113b78,0_0_36px_#1fd2ff1b,inset_0_1px_#ffffff1a] [backdrop-filter:blur(17px)] max-[1180px]:w-full max-[700px]:max-w-full
            max-[700px]:m-0
          `)}>
            <div className={cn(`
               flex items-center justify-between p-[16px_19px]
              bg-[#ffffff0b] [border-bottom:1px_solid_#c8eeff1e] text-[#92defa] text-[8px] tracking-[1.6px]
              font-[850] [&>span:first-child]:flex [&>span:first-child]:gap-[5px] [&_i]:w-[6px] [&_i]:h-[6px]
              [&_i]:[border:1px_solid_#b6e6ff83] [&_i]:rounded-full max-[700px]:p-[13px] max-[700px]:text-[7px]
            `)}><span><i/><i/><i/></span> LIVE CATALOG PREVIEW <span className={cn(`
               text-[#5db4e2]
            `)}>MD / 001</span></div>
            <div className={cn(`
               p-[27px_26px_14px] text-[9px] font-[780] text-[#93e3ff]
              tracking-[2.4px] max-[700px]:p-[21px_17px_12px]
            `)}>MASTER DATA EXPLORER</div>
            <div className={cn(`
               m-[0_25px] flex items-center gap-[12px]
              h-[48px] [border:1px_solid_#5cd2ff6b] rounded-[8px] bg-[#bbf2ff12] p-[0_14px]
              text-[#9cdbfa] text-[10px] whitespace-nowrap [&_svg]:shrink-0 [&_span]:overflow-hidden
              [&_span]:text-ellipsis [&_kbd]:ml-[auto] [&_kbd]:opacity-[.6] max-[700px]:m-[0_16px] max-[700px]:p-[0_11px]
              max-[700px]:text-[9px]
            `)}><Search aria-hidden="true"/><span>Nama part, nomor part, tipe kendaraan...</span><kbd>⌘ F</kbd></div>
            <div className={cn(`
               p-[14px_25px_21px] flex flex-wrap gap-[7px]
              [&_span]:p-[7px_9px] [&_span]:rounded-[3px] [&_span]:[border:1px_solid_#83d8ff37] [&_span]:text-[#9ddffe] [&_span]:bg-[#6acfff13]
              [&_span]:text-[8px] [&_span]:tracking-[.7px] max-[700px]:p-[13px_16px_18px] max-[700px]:[&_span]:text-[7px]
            `)}><span>HYUNDAI TYPE</span><span>BRAND</span><span>PART GROUP</span></div>
            <div className={cn(`
               m-[0_25px] h-[1px] bg-[#c1e9ff1d] max-[700px]:m-[0_16px]
            `)} />
            <div className={cn(`
               flex items-center gap-[14px] p-[12px_25px]
              text-[#effbff] [&>span:nth-child(2)]:flex [&>span:nth-child(2)]:flex-col [&>span:nth-child(2)]:gap-[4px] [&_b]:text-[11px]
              [&_b]:tracking-[.2px] [&_small]:text-[9px] [&_small]:text-[#a4c9e7] max-[700px]:p-[10px_16px] max-[700px]:gap-[10px]
              max-[700px]:[&_small]:text-[8px]
            `)}><span className={cn(`
               grid place-items-center w-[32px] h-[32px]
              [border:1px_solid_#67cfff38] rounded-[7px] bg-[#3ea9ee1b] text-[#6adfff] text-[10px]
              font-black shrink-0
            `)}>01</span><span><b>Part name</b><small>Nama komponen / deskripsi</small></span><span className={cn(`
               ml-[auto] text-[16px] text-[#7ddeff]
            `)}>↗</span></div>
            <div className={cn(`
               flex items-center gap-[14px] p-[12px_25px]
              text-[#effbff] [&>span:nth-child(2)]:flex [&>span:nth-child(2)]:flex-col [&>span:nth-child(2)]:gap-[4px] [&_b]:text-[11px]
              [&_b]:tracking-[.2px] [&_small]:text-[9px] [&_small]:text-[#a4c9e7] max-[700px]:p-[10px_16px] max-[700px]:gap-[10px]
              max-[700px]:[&_small]:text-[8px]
            `)}><span className={cn(`
               grid place-items-center w-[32px] h-[32px]
              [border:1px_solid_#67cfff38] rounded-[7px] bg-[#3ea9ee1b] text-[#6adfff] text-[10px]
              font-black shrink-0
            `)}>02</span><span><b>Part number</b><small>Referensi identifikasi part</small></span><span className={cn(`
               ml-[auto] text-[16px] text-[#7ddeff]
            `)}>↗</span></div>
            <div className={cn(`
               flex items-center gap-[14px] p-[12px_25px]
              text-[#effbff] [&>span:nth-child(2)]:flex [&>span:nth-child(2)]:flex-col [&>span:nth-child(2)]:gap-[4px] [&_b]:text-[11px]
              [&_b]:tracking-[.2px] [&_small]:text-[9px] [&_small]:text-[#a4c9e7] max-[700px]:p-[10px_16px] max-[700px]:gap-[10px]
              max-[700px]:[&_small]:text-[8px]
            `)}><span className={cn(`
               grid place-items-center w-[32px] h-[32px]
              [border:1px_solid_#67cfff38] rounded-[7px] bg-[#3ea9ee1b] text-[#6adfff] text-[10px]
              font-black shrink-0
            `)}>03</span><span><b>Vehicle type</b><small>Filter berdasarkan kendaraan</small></span><span className={cn(`
               ml-[auto] text-[16px] text-[#7ddeff]
            `)}>↗</span></div>
            <div className={cn(`
               mt-[13px] flex items-center gap-[8px]
              p-[15px_25px] [border-top:1px_solid_#c5eaff1c] bg-[#00c0ff0a] text-[#b6ecff] text-[8px]
              tracking-[1.2px] [&_span:last-child]:ml-[auto] [&_span:last-child]:opacity-[.68] max-[700px]:p-[14px_16px] max-[700px]:text-[7px]
              max-[375px]:[&>span:last-child]:hidden
            `)}><span className={cn(`
               w-[6px] h-[6px] rounded-full bg-[#33ddfa]
              shadow-[0_0_8px_#61daff]
            `)}/> REFERENSI MASTER DATA <span>VIEW ONLY</span></div>
          </Card>
          <div className={cn(`
             absolute z-3 [right:-11px] [top:26px]
            p-[15px_19px_17px] [border:1px_solid_#cdf4ff75] rounded-[9px] bg-[#e2faffed] text-[#07366d]
            shadow-[0_18px_38px_#00113f5b] [&>span]:block [&>span]:text-[8px] [&>span]:font-[850] [&>span]:tracking-[1.7px]
            [&_strong]:block [&_strong]:text-[26px] [&_strong]:mt-[8px] [&_strong]:leading-[1] [&_strong]:tracking-[-1.5px]
            [&_small]:text-[10px] [&_small]:tracking-[0] [&_small]:font-bold [&_i]:block [&_i]:h-[3px]
            [&_i]:w-full [&_i]:rounded-[2px] [&_i]:[background-image:linear-gradient(90deg,#00a8f4_72%,#b9d6e0_72%)] [&_i]:mt-[11px] max-[1180px]:[right:-12px]
            max-[900px]:[right:0] max-[700px]:[top:-26px] max-[700px]:[right:-6px] max-[700px]:p-[11px_13px_12px] max-[700px]:[&_strong]:text-[20px]
            max-[700px]:[&_small]:text-[9px]
          `)}><span>INITIAL DATASET</span><strong>5.239 <small>records</small></strong><i/></div>
        </div>
      </div>

      <div className={cn(`
        mx-auto w-[calc(100%_-_104px)] max-w-[1280px] max-[1180px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_38px)] absolute
        [bottom:0] [left:50%] [transform:translateX(-50%)] w-full items-center
        p-[23px_0] [border-top:1px_solid_#c3ebff25] text-[#c5eaffb6] text-[8px] font-[760]
        tracking-[1.8px] [&_i]:inline-block [&_i]:w-[26px] [&_i]:h-[1px] [&_i]:bg-[#aff4ff8f]
        [&_i]:align-middle [&_i]:m-[0_8px] [&_a:hover]:text-[#fff] [&_a_span]:text-[#6be3ff] [&_a_span]:ml-[7px]
        max-[700px]:text-[7px] max-[700px]:p-[17px_0] max-[700px]:[&>a]:hidden
       w-[min(calc(100%_-_104px),_1280px)] max-[1180px]:w-[min(calc(100%_-_64px),_1280px)] max-[700px]:w-[min(calc(100%_-_38px),_1280px)]`)}><span>01 <i/> CATALOG INTELLIGENCE STARTS HERE</span><a href="#fitur">SCROLL TO EXPLORE <ArrowDown aria-hidden="true"/></a></div>
    </section>
  )
}
