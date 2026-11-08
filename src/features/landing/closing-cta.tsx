import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { landingContainerClass } from "@/features/landing/container"

export function ClosingCta() {
  return (
    <section className="bg-[#e4f7ff] pt-[65px] pb-[28px] max-[700px]:pt-[55px]">
      <div className={`${landingContainerClass} flex items-center justify-between gap-[50px] max-[700px]:items-start max-[700px]:flex-col max-[700px]:gap-[23px]`}>
        <div>
          <span className="text-[9px] font-black tracking-[2px] text-[#007bc6]">
            READY TO DISCOVER?
          </span>
          <h2 className="mt-[16px] mb-0 text-[clamp(27px,3.2vw,44px)] leading-[1.2] tracking-[-1.7px] max-[700px]:text-[34px]">
            Temukan informasi part
            <br />
            yang Anda butuhkan.
          </h2>
        </div>
        <Button
          asChild
          className="inline-flex min-h-[49px] items-center justify-center gap-[30px] rounded-[100px] border-0 bg-[#061f59] px-[25px] py-[15px] text-[11px] font-[850] tracking-[1.35px] text-white shadow-none transition-[transform_.2s,background_.2s,box-shadow_.2s] whitespace-nowrap hover:bg-[#061f59] hover:shadow-[0_12px_26px_#07377a22] [&_span]:text-[17px] [&_span]:font-[650] [&:hover]:-translate-y-0.5 motion-reduce:transition-none max-[700px]:min-h-[45px] max-[700px]:gap-[15px] max-[700px]:px-[19px] max-[700px]:py-[13px] max-[700px]:text-[10px]"
        >
          <Link to="/login">
            Buka master data <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
      <p className={`${landingContainerClass} mt-[56px] text-[10px] leading-[1.8] text-[#66849a] max-[700px]:mt-[38px]`}>
        Catatan: data awal berasal dari spreadsheet dan belum merupakan jaminan kecocokan part maupun validasi harga pasar. Mata uang dan tanggal harga belum tercantum pada sumber.
      </p>
    </section>
  )
}
