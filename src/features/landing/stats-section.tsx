import { cn } from "@/lib/utils"

export function StatsSection() {
  return (
    <section className={cn(`
       bg-[#05194e] text-[#fff] [border-top:1px_solid_#5dc9ff50]
    `)} id="data" aria-label="Ringkasan data awal">
      <div className={cn(`
        w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))]
        max-[740px]:w-[min(calc(100%_-_36px),var(--max))] flex justify-between gap-[12px] min-h-[159px]
        grid grid-cols-[1.8fr_repeat(3,1fr)] items-center gap-[18px] max-[900px]:grid-cols-[repeat(3,1fr)]
        max-[900px]:p-[31px_0] max-[900px]:gap-y-[30px] max-[700px]:grid-cols-[repeat(3,1fr)] max-[700px]:gap-[5px]
       w-[min(calc(100%_-_104px),_1280px)] max-[1180px]:w-[min(calc(100%_-_64px),_1280px)] max-[700px]:w-[min(calc(100%_-_38px),_1280px)]`)}>
        <div className={cn(`
           flex flex-col gap-[12px] [&_span]:text-[9px]
          [&_span]:tracking-[2.4px] [&_span]:text-[#67d7ff] [&_span]:font-[850] [&_strong]:text-[17px] [&_strong]:font-[580]
          [&_strong]:leading-[1.5] max-[900px]:[grid-column:1/-1] max-[700px]:mb-[18px] max-[700px]:[&_strong]:text-[16px]
        `)}><span>THE DATA / 001</span><strong>Referensi yang tersusun.<br />Pencarian yang lebih mudah.</strong></div>
        <div className={cn(`
           [border-left:1px_solid_#7ecbff38] pl-[30px] flex flex-col
          gap-[11px] [&_strong]:text-[35px] [&_strong]:tracking-[-1.4px] [&_strong]:font-extrabold [&_span]:text-[#a9d8ff]
          [&_span]:tracking-[1.1px] [&_span]:text-[9px] [&_span]:font-extrabold max-[900px]:pl-[20px] max-[700px]:pl-[12px]
          max-[700px]:[&_strong]:text-[clamp(21px,6vw,31px)] max-[700px]:[&_span]:text-[7px] max-[700px]:[&_span]:leading-[1.55]
        `)}><strong>5.239</strong><span>RECORD SPARE PART</span></div>
        <div className={cn(`
           [border-left:1px_solid_#7ecbff38] pl-[30px] flex flex-col
          gap-[11px] [&_strong]:text-[35px] [&_strong]:tracking-[-1.4px] [&_strong]:font-extrabold [&_span]:text-[#a9d8ff]
          [&_span]:tracking-[1.1px] [&_span]:text-[9px] [&_span]:font-extrabold max-[900px]:pl-[20px] max-[700px]:pl-[12px]
          max-[700px]:[&_strong]:text-[clamp(21px,6vw,31px)] max-[700px]:[&_span]:text-[7px] max-[700px]:[&_span]:leading-[1.55]
        `)}><strong>169</strong><span>JENIS KOMPONEN</span></div>
        <div className={cn(`
           [border-left:1px_solid_#7ecbff38] pl-[30px] flex flex-col
          gap-[11px] [&_strong]:text-[35px] [&_strong]:tracking-[-1.4px] [&_strong]:font-extrabold [&_span]:text-[#a9d8ff]
          [&_span]:tracking-[1.1px] [&_span]:text-[9px] [&_span]:font-extrabold max-[900px]:pl-[20px] max-[700px]:pl-[12px]
          max-[700px]:[&_strong]:text-[clamp(21px,6vw,31px)] max-[700px]:[&_span]:text-[7px] max-[700px]:[&_span]:leading-[1.55]
        `)}><strong>31</strong><span>TIPE KENDARAAN</span></div>
      </div>
    </section>
  )
}
