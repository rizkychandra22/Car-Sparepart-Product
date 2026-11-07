# Arsitektur Frontend PARTSCOPE

Dokumen ini membedakan bagian yang sudah diimplementasikan dari target migrasi katalog. Landing page, login demo, dan dataset statis sudah tersedia; halaman serta interaksi katalog masih menjadi pekerjaan berikutnya.

## 1. Cakupan

- Landing, tampilan login, dan katalog master spare parts mengikuti halaman PHP Native PARTSCOPE.
- Data katalog disimpan lokal di frontend dan diproses di browser.
- Tidak ada backend/API/database atau autentikasi server dalam cakupan ini.
- Form login hanya demonstrasi frontend; tidak memverifikasi akun.

## 2. Stack dan Routing

Stack: React 19, TypeScript, Vite 8, React Router DOM 7, Tailwind CSS 4, shadcn/Radix UI, Lucide React, dan Turborepo.

Route aktif di `src/App.tsx`:

| Route | Implementasi |
| --- | --- |
| `/` | `Guest` layout + `src/pages/landing-home.tsx` |
| `/login` | `src/pages/auth/login.tsx`, di luar `Guest` |
| lainnya | Redirect ke `/` |

Katalog belum tersambung ke route.

## 3. Struktur Frontend

```text
src/
├── App.tsx
├── main.tsx
├── pages/
│   ├── landing-home.tsx       # Merangkai section landing
│   ├── index-parts.tsx        # Placeholder katalog, masih kosong
│   └── auth/login.tsx         # Form login demo
├── features/landing/
│   ├── hero-section.tsx
│   ├── stats-section.tsx
│   ├── features-section.tsx
│   ├── workflow-section.tsx
│   └── closing-cta.tsx
├── layouts/guest.tsx          # Header, navigasi, Outlet, footer landing
├── components/
│   ├── common/brand.tsx
│   ├── common/error-boundary.tsx
│   └── ui/                    # Primitif UI yang tersedia
├── data/parts.ts              # SparePart type + 5,239 static records
├── styles/css/                # CSS acuan PHP dan tuning ukuran landing
├── styles/img/                # Pattern hexagon
├── hooks/
└── lib/
```

`src/main.tsx` memuat stylesheet `app.css` dan `home-tech.css` yang diambil dari aplikasi PHP untuk mempertahankan gaya visual, lalu `landing-tuning.css` untuk sedikit mengecilkan skala layout. Struktur section landing dipisah langsung di `features/landing`; halaman hanya bertugas menyusun section. Login menggunakan komponen Input, Label, dan Button dari UI React yang tersedia serta ikon Lucide.

`Guest` hanya dipakai landing. Login dirender sebagai route tersendiri agar tidak mendapat header dan footer landing.

## 4. Katalog dan Model Data Target

Sumber acuan berisi 5.239 baris dengan kolom `source_excel_row`, `hyundai_type`, `brand`, `vehicle_type`, `part_name_original`, `part_description_competitor`, `part_group`, `category`, `estimated_moving`, `part_number`, `price`, `price_source_text`, dan `part_number_status`.

`src/data/parts.ts` memuat tipe domain `SparePart` dan seluruh 5.239 record dalam tuple data lokal yang dipetakan ke object `PARTS` saat modul dimuat. Data berasal dari SQL seed proyek PHP, mencakup nomor baris Excel 2–5240. Nilai kosong dipertahankan sebagai `null`; `price` berbentuk string agar presisi desimal tidak berubah. `brand` adalah merek kendaraan pembanding. Harga sumber tidak mencantumkan mata uang atau tanggal, dan sumber tidak membuktikan kompatibilitas.

Perilaku katalog yang perlu dimigrasikan: pencarian nama/deskripsi/nomor part; filter Hyundai Type, Brand, Vehicle Type, Part Group, kategori, moving, status, rentang harga, serta keberadaan harga/nomor; sorting; pagination 25 baris; ringkasan hasil; empty state; reset; filter drawer mobile; dan layout responsif.

## 5. Konvensi

- Pisahkan halaman, fitur, layout, komponen bersama, tipe domain, dan data.
- Gunakan komponen UI yang ada jika sesuai; jaga fidelity visual terhadap CSS dan konten PHP.
- Jangan menambahkan stok, rating, harga jual, gambar produk, atau klaim kompatibilitas yang tidak ada pada sumber.
- Pertahankan aksesibilitas form, fokus keyboard, dan perilaku navigasi mobile.
