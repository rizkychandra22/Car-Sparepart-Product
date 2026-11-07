import { Search, SlidersHorizontal, TableProperties } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

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
    <section className={cn(`
       p-[117px_0_125px] bg-[image:linear-gradient(180deg,#f9fcff,#fff)] max-[700px]:p-[77px_0_85px]
    `)} id="fitur" aria-labelledby="features-title">
      <div className={cn(`
        mx-auto block w-[min(calc(100%_-_104px),_1280px)] max-[1180px]:w-[min(calc(100%_-_64px),_1280px)] max-[700px]:w-[min(calc(100%_-_38px),_1280px)]
      `)}>
        <div className={cn(`
           flex justify-between gap-[72px] items-end
          mb-[44px] [&_h2]:text-[clamp(36px,_4vw,_57px)] [&_h2]:font-[820] [&_h2]:leading-[1.2] [&_h2]:tracking-[-2px]
          [&_h2]:m-0 [&_h2_span]:text-[#078ccf] [&>p]:max-w-[348px] [&>p]:text-[#667d96] [&>p]:leading-[1.92]
          [&>p]:text-[13px] [&>p]:m-[0_0_4px] max-[900px]:gap-[26px] max-[900px]:items-start max-[700px]:flex-col
          max-[700px]:mb-[31px] max-[700px]:[&_h2]:text-[clamp(34px,7vw,43px)] max-[700px]:[&_h2]:tracking-[-1px] max-[700px]:[&>p]:max-w-[570px]
        `)}>
          <div><p className={cn(`
             m-[0_0_21px] text-[#087acb] text-[10px] font-[850]
            tracking-[2.5px]
          `)}>01 / PLATFORM CAPABILITIES</p><h2 id="features-title">Pencarian yang <span>lebih cerdas.</span><br />Data yang lebih jelas.</h2></div>
          <p>Tak perlu lagi menelusuri spreadsheet yang panjang. Jelajahi data spare part dalam tampilan yang rapi, dengan filter sesuai atribut dari sumber data.</p>
        </div>
        <div className={cn(`
           grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[16px] max-[700px]:grid-cols-[1fr]
          max-[700px]:gap-[13px]
        `)}>
          {features.map(({ number, title, description, footer, Icon }) => (
            <Card className={cn(`
              gap-0 ring-0 min-h-[308px] rounded-[12px]
              p-[28px_27px_25px] flex flex-col [border:1px_solid_#dfebf2] bg-[image:linear-gradient(160deg,#fff,#f7fbff)]
              shadow-[0_15px_32px_#0b498609] [&:nth-child(2)]:[background-image:linear-gradient(160deg,#eaf8ff,#f7fcff)] [&:nth-child(2)]:border-[#c5e7fa] [&_h3]:text-[21px] [&_h3]:tracking-[-.5px]
              [&_h3]:m-[24px_0_11px] [&_p]:text-[#6b8093] [&_p]:leading-[1.85] [&_p]:text-[12px] [&_p]:mb-[26px]
              max-[700px]:min-h-[258px] [&_h3]:mt-[22px]
            `)} key={number} role="article">
              <div className={cn(`
                 flex justify-between [align-items:flex-start] text-[#067ec7]
                [&>span]:text-[9px] [&>span]:tracking-[1.8px] [&>span]:font-black [&_svg]:w-[42px] [&_svg]:h-[42px]
              `)}><span>{number}</span><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className={cn(`
                 mt-[auto] pt-[19px] [border-top:1px_solid_#e2edf2] flex
                justify-between text-[#0575c0] text-[9px] tracking-[1.6px] font-black
                [&_span]:text-[15px]
              `)}>{footer}<span aria-hidden="true">↗</span></span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
