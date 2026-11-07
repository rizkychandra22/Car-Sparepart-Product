import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function ClosingCta() {
  return (
    <section className={cn(`
       p-[69px_0_28px] bg-[#e4f7ff] [&_h2]:text-[clamp(26px,_3.1vw,_42px)] [&_h2]:tracking-[-1.7px]
      [&_h2]:leading-[1.2] [&_h2]:m-[16px_0_0] max-[700px]:pt-[55px] max-[700px]:[&_h2]:text-[34px] pt-[65px]
    `)}>
      <div className={cn(`
        w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))]
        max-[740px]:w-[min(calc(100%_-_36px),var(--max))] flex justify-between gap-[12px] items-center
        gap-[50px] [&_span]:text-[9px] [&_span]:font-black [&_span]:tracking-[2px] [&_span]:text-[#007bc6]
        max-[700px]:[align-items:flex-start] max-[700px]:flex-col max-[700px]:gap-[23px]
       w-[min(calc(100%_-_104px),_1280px)] max-[1180px]:w-[min(calc(100%_-_64px),_1280px)] max-[700px]:w-[min(calc(100%_-_38px),_1280px)]`)}>
        <div><span>READY TO DISCOVER?</span><h2>Temukan informasi part<br />yang Anda butuhkan.</h2></div>
        <Button asChild className={cn(`
            border-0 shadow-none hover:bg-[#061f59]
          inline-flex items-center justify-center gap-[30px] p-[15px_25px]
          min-h-[49px] rounded-[100px] text-[11px] font-[850] tracking-[1.35px]
          whitespace-nowrap transition-[transform_.2s,background_.2s,box-shadow_.2s] [border:1px_solid_transparent] [&:hover]:[transform:translateY(-2px)] [&_span]:text-[17px]
          [&_span]:font-[650] max-[700px]:p-[13px_19px] max-[700px]:text-[10px] max-[700px]:gap-[15px] max-[700px]:min-h-[45px]
          motion-reduce:transition-none bg-[#061f59] text-[#fff] [&:hover]:shadow-[0_12px_26px_#07377a22]
        `)}>
          <Link to="/login">Buka master data <ArrowUpRight aria-hidden="true" /></Link>
        </Button>
      </div>
      <p className={cn(`
        w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))]
        max-[740px]:w-[min(calc(100%_-_36px),var(--max))] flex justify-between gap-[12px] text-[10px]
        mt-[56px] leading-[1.8] text-[#66849a] max-[700px]:mt-[38px]
       w-[min(calc(100%_-_104px),_1280px)] max-[1180px]:w-[min(calc(100%_-_64px),_1280px)] max-[700px]:w-[min(calc(100%_-_38px),_1280px)]`)}>Catatan: data awal berasal dari spreadsheet dan belum merupakan jaminan kecocokan part maupun validasi harga pasar. Mata uang dan tanggal harga belum tercantum pada sumber.</p>
    </section>
  )
}
