# PARTSCOPE — Frontend Migration

Proyek ini adalah frontend React + Vite yang sedang disiapkan untuk migrasi tampilan aplikasi **PARTSCOPE** dari PHP Native. Target migrasi adalah mempertahankan tampilan dan alur halaman sumber, sambil mengganti implementasi frontend ke React. Migrasi ini tidak mencakup backend.

> **Status saat ini:** struktur lama storefront sedang diganti. File halaman landing dan katalog serta modul data baru sudah dibuat, tetapi ketiganya masih kosong. Router dan layout belum disambungkan ke struktur baru, dan data 5.239 baris belum dimigrasikan. Lihat [roadmap migrasi](docs/tasks/roadmap.md).

## Batas Cakupan

- Frontend saja: React, routing, komponen, styling, dan interaksi di browser.
- Data katalog ditargetkan disimpan lokal dalam modul TypeScript atau berkas JSON; tidak ada API atau database pada hasil migrasi ini.
- Tampilan yang menjadi acuan adalah halaman PHP PARTSCOPE: landing page, login, dan katalog master data.
- Login pada frontend hanya simulasi navigasi. Tanpa backend, halaman tidak dapat memverifikasi akun atau melindungi data.
- Fitur toko online seperti keranjang, checkout, pembayaran, rating, harga jual, dan stok gudang tidak termasuk target migrasi saat ini.

## Kondisi Implementasi Saat Ini

- Halaman baru: `src/pages/landing/home.tsx` dan `src/pages/app/index-parts.tsx`; keduanya masih file kosong.
- Data baru: `src/data/parts.ts`; file ini masih kosong dan belum berisi tipe atau dataset.
- `src/App.tsx` masih mengimpor `src/pages/web`, `src/pages/dashboard`, serta `CartProvider`; target lama itu sudah tidak ada di working tree. Route belum disesuaikan dengan struktur baru.
- `src/layouts/guest.tsx` juga masih bergantung pada cart dan komponen common yang telah dihapus.
- `src/pages/auth/login.tsx` masih berisi UI AutoPart Central dan simulasi login yang menuju `/dashboard`; belum disesuaikan dengan tampilan login PARTSCOPE.
- Tipe storefront lama dan data produk/kategori lama sudah dihapus dari working tree.

Ini adalah kondisi transisi, belum aplikasi migrasi yang tersambung. Task penyambungan dicatat di roadmap.

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

Versi dependensi dan script otoritatif berada di [package.json](package.json). Data baru direncanakan di `src/data/`; folder `src/constans/` sudah tidak ada pada struktur saat ini.

## Struktur Direktori

```text
src/
├── App.tsx                 # Router, provider global, lazy route
├── main.tsx                # Entry point React
├── pages/
│   ├── app/index-parts.tsx # Placeholder halaman katalog
│   ├── landing/home.tsx    # Placeholder landing page
│   └── auth/login.tsx      # Login lama, belum disesuaikan
├── layouts/                # Guest layout lama, masih perlu disesuaikan
├── components/
│   ├── common/             # Saat ini hanya ErrorBoundary
│   └── ui/                 # Primitif UI
├── data/parts.ts           # Placeholder data katalog, belum diisi
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
