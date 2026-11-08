import { landingContainerClass } from "@/features/landing/container"

const stats = [
  ["5.239", "RECORD SPARE PART"],
  ["169", "JENIS KOMPONEN"],
  ["31", "TIPE KENDARAAN"],
]

const statClassName =
  "flex flex-col gap-[11px] border-l border-[#7ecbff38] pl-[30px] [&_strong]:text-[35px] [&_strong]:font-extrabold [&_strong]:tracking-[-1.4px] [&_span]:text-[9px] [&_span]:font-extrabold [&_span]:tracking-[1.1px] [&_span]:text-[#a9d8ff] max-[900px]:pl-[20px] max-[700px]:pl-[12px] max-[700px]:[&_strong]:text-[clamp(21px,6vw,31px)] max-[700px]:[&_span]:text-[7px] max-[700px]:[&_span]:leading-[1.55]"

export function StatsSection() {
  return (
    <section
      className="border-t border-[#5dc9ff50] bg-[#05194e] text-white"
      id="data"
      aria-label="Ringkasan data awal"
    >
      <div className={`${landingContainerClass} grid min-h-[159px] grid-cols-[1.8fr_repeat(3,1fr)] items-center gap-[18px] max-[900px]:grid-cols-[repeat(3,1fr)] max-[900px]:py-[31px] max-[900px]:gap-y-[30px] max-[700px]:gap-[5px]`}>
        <div className="flex flex-col gap-[12px] max-[900px]:col-span-full max-[700px]:mb-[18px] [&_span]:text-[9px] [&_span]:font-[850] [&_span]:tracking-[2.4px] [&_span]:text-[#67d7ff] [&_strong]:text-[17px] [&_strong]:font-[580] [&_strong]:leading-[1.5] max-[700px]:[&_strong]:text-[16px]">
          <span>THE DATA / 001</span>
          <strong>
            Referensi yang tersusun.
            <br />
            Pencarian yang lebih mudah.
          </strong>
        </div>
        {stats.map(([value, label]) => (
          <div className={statClassName} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
