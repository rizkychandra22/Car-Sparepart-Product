import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { landingContainerClass } from "@/features/landing/container"

const steps = [
  ["01", "Login ke platform", "Masuk dengan akun yang sudah disediakan administrator."],
  ["02", "Cari berdasarkan kriteria", "Gunakan kata kunci, merek, tipe kendaraan, nomor part, kategori, atau status."],
  ["03", "Tinjau hasil pencarian", "Lihat data dalam tabel, urutkan hasil, dan jelajahi semua record."],
]

export function WorkflowSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[image:linear-gradient(110deg,#061440_0%,#092969_70%,#0a5ba5_100%)] pt-[109px] pb-[115px] text-white max-[700px]:py-[77px]"
      id="alur"
      aria-labelledby="workflow-title"
    >
      <div
        className="pointer-events-none absolute inset-0 z-[-1] bg-[url(/tech-hex-grid.svg)] bg-cover bg-[position:top_center] opacity-[.35]"
        aria-hidden="true"
      />
      <div className={`${landingContainerClass} grid grid-cols-2 items-center gap-[11%] max-[900px]:gap-[6%] max-[700px]:block`}>
        <div>
          <p className="mb-[21px] text-[10px] font-[850] tracking-[2.5px] text-[#62ddff]">
            02 / HOW IT WORKS
          </p>
          <h2
            className="mb-[23px] text-[clamp(37px,4.5vw,60px)] font-extrabold leading-[1.19] tracking-[-2px] [&_span]:text-[#70dfff] max-[700px]:text-[clamp(38px,7.7vw,50px)]"
            id="workflow-title"
          >
            Dari data mentah
            <br />
            menjadi <span>informasi.</span>
          </h2>
          <p className="mb-[27px] max-w-[400px] text-[13px] leading-[1.9] text-[#bfdef4]">
            Alur sederhana untuk menampilkan dan menemukan referensi spare part lintas kendaraan.
          </p>
          <Button
            asChild
            className="inline-flex min-h-[49px] items-center justify-center gap-[30px] rounded-[100px] border-0 bg-[image:linear-gradient(120deg,#00b4f8,#38d7ff)] px-[25px] py-[15px] text-[11px] font-[850] tracking-[1.35px] text-[#052253] shadow-[0_10px_35px_#03b5fe40] transition-[transform_.2s,background_.2s,box-shadow_.2s] whitespace-nowrap hover:bg-[#8beaff] hover:shadow-[0_14px_40px_#04b4fd64] [&_span]:text-[17px] [&_span]:font-[650] [&:hover]:-translate-y-0.5 motion-reduce:transition-none max-[700px]:min-h-[45px] max-[700px]:gap-[15px] max-[700px]:px-[19px] max-[700px]:py-[13px] max-[700px]:text-[10px]"
          >
            <Link to="/login">
              Masuk ke sistem <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-0 flex flex-col rounded-[10px] border border-[#a1dcff4c] bg-[#04173f94] [backdrop-filter:blur(8px)] max-[700px]:mt-[39px]">
          {steps.map(([number, title, description]) => (
            <div
              className="grid grid-cols-[45px_1fr] gap-[15px] border-b border-[#c6e8ff2e] p-[28px_30px] last:border-0 max-[700px]:p-[22px_20px]"
              key={number}
            >
              <span className="text-[17px] font-[850] text-[#55d9ff]">{number}</span>
              <div>
                <h3 className="mb-[7px] text-[17px]">{title}</h3>
                <p className="m-0 text-[11px] leading-[1.8] text-[#a8cde9]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
