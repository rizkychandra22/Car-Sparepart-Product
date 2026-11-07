# PARTSCOPE — Frontend Migration

Proyek ini adalah frontend React + Vite yang sedang disiapkan untuk migrasi tampilan aplikasi **PARTSCOPE** dari PHP Native. Target migrasi adalah mempertahankan tampilan dan alur halaman sumber, sambil mengganti implementasi frontend ke React. Migrasi ini tidak mencakup backend.

> **Status saat ini:** landing page dan login PARTSCOPE sudah diimplementasikan. Katalog dan data 5.239 baris belum dimigrasikan. Lihat [roadmap migrasi](docs/tasks/roadmap.md).

## Batas Cakupan

- Frontend saja: React, routing, komponen, styling, dan interaksi di browser.
- Data katalog ditargetkan disimpan lokal dalam modul TypeScript atau berkas JSON; tidak ada API atau database pada hasil migrasi ini.
- Tampilan yang menjadi acuan adalah halaman PHP PARTSCOPE: landing page, login, dan katalog master data.
- Login pada frontend hanya simulasi navigasi. Tanpa backend, halaman tidak dapat memverifikasi akun atau melindungi data.
- Fitur toko online seperti keranjang, checkout, pembayaran, rating, harga jual, dan stok gudang tidak termasuk target migrasi saat ini.

## Kondisi Implementasi Saat Ini

- `/` memakai `src/layouts/guest.tsx` dan `src/pages/landing-home.tsx`; login `/login` dirender terpisah tanpa Guest layout.
- Landing dipecah menjadi section langsung di `src/features/landing/` (hero, statistik, fitur, alur, dan CTA).
- `src/pages/auth/login.tsx` memakai komponen Input, Label, Button, serta ikon Lucide. Submit memberi tahu bahwa autentikasi belum tersedia.
- CSS dan aset hexagon dari PHP disalin ke `src/styles/` untuk mempertahankan desain PARTSCOPE.
- Katalog `src/pages/index-parts.tsx` dan data `src/data/parts.ts` masih kosong. Data 5.239 baris dan perilaku katalog belum dimigrasikan.

Detail arsitektur dan perbedaan model data tercatat di [frontend-system.md](docs/architecture/frontend-system.md).

## Tech Stack

| Bagian | Teknologi yang terpasang |
| --- | --- |
| UI | React 19, TypeScript |
| Dev server dan build | Vite 8, plugin React |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4, shadcn, Radix UI |
| Ikon dan notifikasi | Lucide React, Sonner |
| Task runner | Turborepo |

Versi dependensi dan script otoritatif berada di [package.json](package.json). Data katalog ditargetkan berada di `src/data/`; folder `src/constans/` sudah tidak ada pada struktur saat ini.

## Struktur Direktori

```text
src/
├── App.tsx                 # Router, provider global, lazy route
├── main.tsx                # Entry point React
├── pages/
│   ├── landing-home.tsx    # Komposisi landing
│   ├── index-parts.tsx     # Placeholder halaman katalog
│   └── auth/login.tsx      # Login demo tanpa backend
├── features/landing/       # Section landing dalam file terpisah
├── layouts/guest.tsx       # Layout landing, navigasi, dan footer
├── components/
│   ├── common/             # Saat ini hanya ErrorBoundary
│   └── ui/                 # Primitif UI
├── data/parts.ts           # Placeholder data katalog, belum diisi
├── styles/                 # CSS acuan PHP, tuning ukuran, dan aset hexagon
├── hooks/                  # Hook bersama
├── lib/                    # Utilitas
└── index.css               # Tailwind dan token desain
docs/
├── architecture/           # Kondisi arsitektur dan target migrasi
└── tasks/                  # Checklist pekerjaan migrasi
```

## Menjalankan Proyek

Prasyarat: Node.js dan npm sesuai `packageManager` di `package.json`.

```bash
npm install
npm run dev
```

Perintah pengembangan lain:

```bash
npm run build       # Build TypeScript dan Vite melalui Turborepo
npm run lint        # ESLint melalui Turborepo
npm run typecheck   # Pemeriksaan tipe TypeScript
npm run preview     # Sajikan hasil build dari dist/
```

## Dokumentasi

- [Arsitektur frontend dan kontrak data target](docs/architecture/frontend-system.md)
- [Roadmap dan task migrasi](docs/tasks/roadmap.md)
