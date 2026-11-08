import { Search, SlidersHorizontal, TableProperties } from "lucide-react"
import { Card } from "@/components/ui/card"
import { landingContainerClass } from "@/features/landing/container"

const features = [
  {
    number: "01 / SEARCH",
    title: "Cari spare part",
    description: "Telusuri katalog berdasarkan nama komponen, deskripsi, atau nomor part secara cepat.",
    footer: "KEYWORD SEARCH",
    Icon: Search,
  },
  {
    number: "02 / FILTER",
    title: "Filter multi-kriteria",
    description: "Pilih Hyundai Type, Brand, Vehicle Type, Part Group, kategori, status, atau rentang harga.",
    footer: "PRECISION FILTERS",
    Icon: SlidersHorizontal,
  },
  {
    number: "03 / VIEW",
    title: "Data lengkap dalam tabel",
    description: "Lihat informasi spare part terstruktur, urutkan hasil, dan telusuri referensi setiap baris.",
    footer: "STRUCTURED CATALOG",
    Icon: TableProperties,
  },
]

export function FeaturesSection() {
  return (
    <section
      className="bg-[image:linear-gradient(180deg,#f9fcff,#fff)] pt-[117px] pb-[125px] max-[700px]:pt-[77px] max-[700px]:pb-[85px]"
      id="fitur"
      aria-labelledby="features-title"
    >
      <div className={landingContainerClass}>
        <div className="mb-[44px] flex items-end justify-between gap-[72px] max-[900px]:items-start max-[900px]:gap-[26px] max-[700px]:mb-[31px] max-[700px]:flex-col">
          <div>
            <p className="mb-[21px] text-[10px] font-[850] tracking-[2.5px] text-[#087acb]">
              01 / PLATFORM CAPABILITIES
            </p>
            <h2
              className="m-0 text-[clamp(36px,4vw,57px)] font-[820] leading-[1.2] tracking-[-2px] [&_span]:text-[#078ccf] max-[700px]:text-[clamp(34px,7vw,43px)] max-[700px]:tracking-[-1px]"
              id="features-title"
            >
              Pencarian yang <span>lebih cerdas.</span>
              <br />
              Data yang lebih jelas.
            </h2>
          </div>
          <p className="mb-[4px] max-w-[348px] text-[13px] leading-[1.92] text-[#667d96] max-[700px]:max-w-[570px]">
            Tak perlu lagi menelusuri spreadsheet yang panjang. Jelajahi data spare part dalam tampilan yang rapi, dengan filter sesuai atribut dari sumber data.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[16px] max-[700px]:grid-cols-1 max-[700px]:gap-[13px]">
          {features.map(({ number, title, description, footer, Icon }) => (
            <Card
              className="flex min-h-[308px] flex-col gap-0 rounded-[12px] border-[#dfebf2] bg-[image:linear-gradient(160deg,#fff,#f7fbff)] p-[28px_27px_25px] shadow-[0_15px_32px_#0b498609] [&_h3]:mt-[22px] [&_h3]:mb-[11px] [&_h3]:text-[21px] [&_h3]:tracking-[-.5px] [&_p]:mb-[26px] [&_p]:text-[12px] [&_p]:leading-[1.85] [&_p]:text-[#6b8093] [&:nth-child(2)]:border-[#c5e7fa] [&:nth-child(2)]:bg-[image:linear-gradient(160deg,#eaf8ff,#f7fcff)] max-[700px]:min-h-[258px]"
              key={number}
              role="article"
            >
              <div className="flex items-start justify-between text-[#067ec7] [&_svg]:size-[42px] [&>span]:text-[9px] [&>span]:font-black [&>span]:tracking-[1.8px]">
                <span>{number}</span>
                <Icon aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="mt-auto flex justify-between border-t border-[#e2edf2] pt-[19px] text-[9px] font-black tracking-[1.6px] text-[#0575c0] [&_span]:text-[15px]">
                {footer}
                <span aria-hidden="true">↗</span>
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
