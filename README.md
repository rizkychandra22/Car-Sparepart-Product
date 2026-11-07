# PARTSCOPE — Frontend Migration

Proyek ini adalah frontend React + Vite yang sedang disiapkan untuk migrasi tampilan aplikasi **PARTSCOPE** dari PHP Native. Target migrasi adalah mempertahankan tampilan dan alur halaman sumber, sambil mengganti implementasi frontend ke React. Migrasi ini tidak mencakup backend.

> **Status:** fondasi React sudah tersedia, tetapi halaman dan data yang sekarang masih berupa prototipe toko suku cadang. Katalog PARTSCOPE dan data sumber 5.239 baris belum dimigrasikan. Lihat [roadmap migrasi](docs/tasks/roadmap.md) untuk progres dan task berikutnya.

## Batas Cakupan

- Frontend saja: React, routing, komponen, styling, dan interaksi di browser.
- Data katalog ditargetkan disimpan lokal dalam modul TypeScript atau berkas JSON; tidak ada API atau database pada hasil migrasi ini.
- Tampilan yang menjadi acuan adalah halaman PHP PARTSCOPE: landing page, login, dan katalog master data.
- Login pada frontend hanya simulasi navigasi. Tanpa backend, halaman tidak dapat memverifikasi akun atau melindungi data.
- Fitur toko online seperti keranjang, checkout, pembayaran, rating, harga jual, dan stok gudang tidak termasuk target migrasi saat ini.

## Kondisi Implementasi Saat Ini

- `src/App.tsx` memakai React Router dengan route `/`, `/login`, dan `/dashboard`; halaman dimuat dengan `React.lazy` dan `Suspense`.
- `src/pages/web.tsx` adalah storefront mock dengan pencarian, filter kategori/brand, sorting, kartu produk, dan detail produk.
- `src/constans/products.ts` berisi 8 produk mock bertipe `Product`, bukan data master dari Excel PARTSCOPE.
- `src/constans/categories.ts` berisi 6 kategori storefront dengan jumlah contoh.
- Login mengarahkan ke dashboard dengan simulasi jeda. Dashboard menampilkan metrik inventaris dari data mock.
- `CartProvider`, keranjang, dan checkout masih menjadi bagian prototipe yang ada; semuanya di luar lingkup migrasi yang ditetapkan.

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

Versi dependensi dan script otoritatif berada di [package.json](package.json). Direktori `src/constans` memakai ejaan yang sudah ada di kode; perubahan nama dapat dilakukan terpisah bila memang dibutuhkan.

## Struktur Direktori

```text
src/
├── App.tsx                 # Router, provider global, lazy route
├── main.tsx                # Entry point React
├── pages/                  # Storefront, login, dashboard
├── layouts/                # Layout halaman publik
├── components/
│   ├── common/             # ProductCard, cart, checkout, ErrorBoundary
│   └── ui/                 # Primitif UI
├── constans/               # Data mock produk dan kategori saat ini
├── context/                # State keranjang
├── types/                  # Tipe produk, order, keranjang
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
