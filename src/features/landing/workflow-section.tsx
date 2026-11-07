import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  ["01", "Login ke platform", "Masuk dengan akun yang sudah disediakan administrator."],
  ["02", "Cari berdasarkan kriteria", "Gunakan kata kunci, merek, tipe kendaraan, nomor part, kategori, atau status."],
  ["03", "Tinjau hasil pencarian", "Lihat data dalam tabel, urutkan hasil, dan jelajahi semua record."],
]

export function WorkflowSection() {
  return (
    <section className={cn(`
       relative isolate overflow-hidden p-[109px_0_115px]
      text-[#fff] bg-[image:linear-gradient(110deg,#061440_0%,#092969_70%,#0a5ba5_100%)] max-[700px]:p-[77px_0]
    `)} id="alur" aria-labelledby="workflow-title">
      <div className={cn(`
         absolute [inset:0] z-[-1] opacity-[.35]
        bg-[url(/tech-hex-grid.svg)] bg-cover bg-[position:top_center]
      `)} aria-hidden="true" />
      <div className={cn(`
        w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))]
        max-[740px]:w-[min(calc(100%_-_36px),var(--max))] flex justify-between gap-[12px] grid
        grid-cols-[1fr_1fr] gap-[11%] items-center max-[900px]:gap-[6%] max-[700px]:block
       w-[min(calc(100%_-_104px),_1280px)] max-[1180px]:w-[min(calc(100%_-_64px),_1280px)] max-[700px]:w-[min(calc(100%_-_38px),_1280px)]`)}>
        <div className={cn(`
           [&_h2]:text-[clamp(37px,_4.5vw,_60px)] [&_h2]:leading-[1.19] [&_h2]:tracking-[-2px] [&_h2]:font-extrabold
          [&_h2]:m-[0_0_23px] [&_h2_span]:text-[#70dfff] max-[700px]:[&_h2]:text-[clamp(38px,7.7vw,50px)]
        `)}>
          <p className={cn(`
             m-[0_0_21px] text-[#087acb] text-[10px] font-[850]
            tracking-[2.5px] text-[#62ddff]
          `)}>02 / HOW IT WORKS</p>
          <h2 id="workflow-title">Dari data mentah<br />menjadi <span>informasi.</span></h2>
          <p className="max-w-[400px] mb-[27px] text-[13px] leading-[1.9] text-[#bfdef4]">Alur sederhana untuk menampilkan dan menemukan referensi spare part lintas kendaraan.</p>
          <Button asChild className={cn(`
              border-0 shadow-none hover:bg-transparent
            inline-flex items-center justify-center gap-[30px] p-[15px_25px]
            min-h-[49px] rounded-[100px] text-[11px] font-[850] tracking-[1.35px]
            whitespace-nowrap transition-[transform_.2s,background_.2s,box-shadow_.2s] [border:1px_solid_transparent] [&:hover]:[transform:translateY(-2px)] [&_span]:text-[17px]
            [&_span]:font-[650] max-[700px]:p-[13px_19px] max-[700px]:text-[10px] max-[700px]:gap-[15px] max-[700px]:min-h-[45px]
            motion-reduce:transition-none bg-[image:linear-gradient(120deg,#00b4f8,#38d7ff)] text-[#052253] shadow-[0_10px_35px_#03b5fe40] [&:hover]:bg-[#8beaff]
            [&:hover]:shadow-[0_14px_40px_#04b4fd64]
          `)}>
            <Link to="/login">Masuk ke sistem <ArrowUpRight aria-hidden="true" /></Link>
          </Button>
        </div>
        <div className={cn(`
           flex flex-col [border:1px_solid_#a1dcff4c] rounded-[10px]
          bg-[#04173f94] [backdrop-filter:blur(8px)] [&>div]:grid [&>div]:grid-cols-[45px_1fr] [&>div]:gap-[15px]
          [&>div]:p-[28px_30px] [&>div]:[border-bottom:1px_solid_#c6e8ff2e] [&>div:last-child]:[border-bottom:0] [&>div>span]:text-[#55d9ff] [&>div>span]:text-[17px]
          [&>div>span]:font-[850] [&_h3]:text-[17px] [&_h3]:m-[0_0_7px] [&_p]:text-[#a8cde9] [&_p]:text-[11px]
          [&_p]:m-0 [&_p]:leading-[1.8] max-[700px]:mt-[39px] max-[700px]:[&>div]:p-[22px_20px] [&_>_div]:p-[26px_28px]
        `)}>
          {steps.map(([number, title, description]) => (
            <div key={number}><span>{number}</span><section><h3>{title}</h3><p>{description}</p></section></div>
          ))}
        </div>
      </div>
    </section>
  )
}
