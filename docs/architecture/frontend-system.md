# Arsitektur Frontend PARTSCOPE

Dokumen ini membedakan bagian yang sudah diimplementasikan dari target migrasi katalog. Landing page, login demo, dataset statis, serta halaman katalog dengan pencarian, filter, sorting, dan pagination lokal sudah tersedia.

## 1. Cakupan

- Landing, tampilan login, dan katalog master spare parts mengikuti halaman PHP Native PARTSCOPE.
- Data katalog disimpan lokal di frontend dan diproses di browser.
- Tidak ada backend/API/database atau autentikasi server dalam cakupan ini.
- Form login hanya mencocokkan satu akun demo statis di browser; tidak membuat sesi aman atau memverifikasi identitas lewat server.

## 2. Stack dan Routing

Stack: React 19, TypeScript, Vite 8, React Router DOM 7, Tailwind CSS 4, shadcn/Radix UI, Lucide React, dan Turborepo.

Route aktif di `src/App.tsx`:

| Route | Implementasi |
| --- | --- |
| `/` | `Guest` layout + `src/pages/landing-home.tsx` |
| `/parts` | `src/pages/parts.tsx` dengan tabel dan pagination |
| `/login` | `src/pages/auth/login.tsx`, di luar `Guest` |
| lainnya | Redirect ke `/` |

Route katalog menggunakan dataset lokal dan tidak memerlukan backend.

## 3. Struktur Frontend

```text
src/
├── App.tsx
├── App.css                    # CSS dasar PARTSCOPE dari PHP
├── main.tsx
├── pages/
│   ├── landing-home.tsx       # Merangkai section landing
│   ├── parts.tsx              # Halaman katalog
│   └── auth/login.tsx         # Form login demo
├── features/landing/
│   ├── hero-section.tsx
│   ├── stats-section.tsx
│   ├── features-section.tsx
│   ├── workflow-section.tsx
│   └── closing-cta.tsx
├── features/app/              # Fitur halaman aplikasi, termasuk katalog parts
├── layouts/guest.tsx          # Header, navigasi, Outlet, footer landing
├── components/
│   ├── common/brand.tsx
│   ├── common/error-boundary.tsx
│   ├── common/data-table.tsx  # Tabel reusable, sorting, dan pagination
│   └── ui/                    # Primitif UI yang tersedia
├── data/parts.ts              # SparePart type + 5,239 static records
├── data/user.ts               # Satu akun demo lokal untuk form login
├── assets/styles/             # Theme landing, auth, dan tuning ukuran
├── assets/img/                # Pattern hexagon
├── hooks/
└── lib/
```

`src/main.tsx` memuat `index.css` untuk Tailwind/shadcn, `App.css` sebagai CSS dasar dari aplikasi PHP, lalu stylesheet landing, auth, dan parts dari `src/assets/styles/`. Pattern hexagon berada di `src/assets/img/`. Struktur section landing dipisah langsung di `features/landing`; halaman hanya bertugas menyusun section. Landing, Login, dan Parts menggunakan komponen UI library seperti Card, Select, Checkbox, Badge, Avatar, Alert, Input, Label, Button, dan Table, dengan class CSS PARTSCOPE untuk mempertahankan desain acuan.

`Guest` hanya dipakai landing. Login dirender sebagai route tersendiri agar tidak mendapat header dan footer landing.

## 4. Katalog dan Model Data Target

Sumber acuan berisi 5.239 baris dengan kolom `source_excel_row`, `hyundai_type`, `brand`, `vehicle_type`, `part_name_original`, `part_description_competitor`, `part_group`, `category`, `estimated_moving`, `part_number`, `price`, `price_source_text`, dan `part_number_status`.

`src/data/parts.ts` memuat tipe domain `SparePart` dan seluruh 5.239 record dalam tuple data lokal yang dipetakan ke object `PARTS` saat modul dimuat. Data berasal dari SQL seed proyek PHP, mencakup nomor baris Excel 2–5240. Nilai kosong dipertahankan sebagai `null`; `price` berbentuk string agar presisi desimal tidak berubah. `brand` adalah merek kendaraan pembanding. Harga sumber tidak mencantumkan mata uang atau tanggal, dan sumber tidak membuktikan kompatibilitas.

Halaman `/parts` mengikuti kerangka header, heading katalog, panel filter, toolbar pencarian/sort, ringkasan hasil, dan footer dari halaman PHP. Data diambil dari `src/data/parts.ts` dan difilter di browser. Tabel delapan kolom memakai komponen Table UI, sorting header, serta pagination yang dapat diatur ke 10, 25, 50, atau 100 baris (10 sebagai default), dengan tombol halaman pertama/sebelumnya/berikutnya/terakhir. Filter mencakup keyword nama/deskripsi/nomor part, atribut kendaraan dan kategori, status, rentang harga, serta keberadaan harga/nomor part.

## 5. Konvensi

- Pisahkan halaman, fitur, layout, komponen bersama, tipe domain, dan data.
- Gunakan komponen UI yang ada jika sesuai; jaga fidelity visual terhadap CSS dan konten PHP.
- Jangan menambahkan stok, rating, harga jual, gambar produk, atau klaim kompatibilitas yang tidak ada pada sumber.
- Pertahankan aksesibilitas form, fokus keyboard, dan perilaku navigasi mobile.
