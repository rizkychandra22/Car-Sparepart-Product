# Arsitektur & Ketentuan Teknologi AutoPart Central

> **AutoPart Central** — Portal Katalog Suku Cadang Mobil & Manajemen Inventaris Gudang.  
> Dokumen ini menetapkan standar arsitektur, ketentuan teknologi, konvensi kode, dan batasan direktori untuk pengembangan proyek.

---

## 1. Spesifikasi Tech Stack Utama

| Layer / Kebutuhan | Teknologi & Versi | Peran & Alasan Pemilihan |
| :--- | :--- | :--- |
| **Core Framework** | React 19 (`react`, `react-dom`) | Render UI modern dengan arsitektur berbasis komponen dan React hooks terbaru. |
| **Language** | TypeScript 5.8 | Pengetikan statis ketat (*strict typing*) untuk menjamin keamanan kontrak data tanpa runtime error. |
| **Bundler & Build Tool** | Vite 8 (`@vitejs/plugin-react`) | HMR (*Hot Module Replacement*) ultra cepat dan build produksi teroptimasi. |
| **Monorepo / Task Orchestration** | Turborepo v2 (`turbo.json`) | Pipeline eksekusi task (`build`, `lint`, `typecheck`) dengan komputasi caching lokal yang efisien. |
| **CSS Engine** | Tailwind CSS v4 (`@tailwindcss/vite`) | Engine styling performa tinggi berbasis utility classes dan native CSS variables. |
| **Design System / UI Primitives** | shadcn/ui (Radix UI + Nova Preset) | Komponen UI atomik aksesibel (WAI-ARIA compliant) dan mudah dikustomisasi. |
| **Typography** | Geist Variable (`@fontsource-variable/geist`) | Font modern dengan readability optimal di berbagai ukuran layar. |
| **Icons** | Lucide React (`lucide-react`) | Library icon SVG konsisten, ringan, dan tree-shakeable. |
| **Toast Notifications** | Sonner (`sonner`) | Notifikasi pop-up elegan dan reaktif dengan dukungan deduplikasi toast id. |

---

## 2. Standar Pipeline & Perintah Proyek (Turborepo)

Proyek ini telah dikonfigurasi dengan pipeline **Turborepo** pada file [`turbo.json`](file:///D:/!Learn-Programmer/Car-Sparepart-Product/turbo.json). Perintah CLI proyek wajib dijalankan melalui npm script terstandar:

```bash
# Development server (port default: 5173)
npm run dev

# Turborepo Build (menjalankan kompilasi TypeScript dan Vite bundle ter-cache)
npm run build

# Menjalankan build langsung tanpa Turbo (jika diperlukan)
npm run build:task

# Turborepo Lint (menjalankan ESLint ter-cache)
npm run lint

# Menjalankan ESLint langsung
npm run lint:task

# Pengecekan tipe data TypeScript murni
npm run typecheck

# Preview hasil build produksi lokal
npm run preview
```

### Konfigurasi Vite Chunking & Optimasi Bundle
Pada [`vite.config.ts`](file:///D:/!Learn-Programmer/Car-Sparepart-Product/vite.config.ts), manual chunks telah dipisah untuk mencegah bottleneck ukuran file vendor:
- `vendor-icons`: Memuat paket ikon `lucide-react`.
- `vendor-radix`: Memuat kumpulan primitif `@radix-ui/*`.

---

## 3. Struktur Direktori & Aturan Batasan (*Boundary Rules*)

```text
src/
├── components/
│   ├── ui/                 # Primitif UI murni dari shadcn / Radix UI (Button, Card, Dialog, Sheet, dsb.)
│   └── common/             # Komponen presentasi bersama yang dipakai berulang tanpa alur logika bisnis
│       ├── product-card.tsx    # Card etalase produk suku cadang
│       ├── cart-sheet.tsx      # Slide-over laci keranjang belanja
│       ├── checkout-dialog.tsx # Modal dialog konfirmasi pesanan & pembayaran
│       ├── error-boundary.tsx  # Penangkal crash fatal runtime aplikasi
│       └── index.ts            # Central export modul common
├── constans/               # Mock data & konstanta statis terpusat (products, categories)
├── context/                # Global state management berbasis React Context (cart-context)
├── layouts/                # Wrapper tata letak halaman (guest.tsx dengan responsive navbar & mobile drawer)
├── pages/                  # Halaman tampilan per rute (web.tsx, dashboard.tsx, auth/login.tsx)
└── types/                  # Kontrak tipe data TypeScript murni (product.ts, cart.ts, order.ts)
```

### Aturan Ketat Struktur Kode:
1. **Dilarang Menaruh Komponen Presentasi di Luar `components/`**:
   - Komponen visual yang digunakan berkali-kali dan tidak memiliki dependensi alur bisnis khusus wajib ditempatkan di `src/components/common/`.
2. **Kapan Menggunakan `context/`**:
   - Gunakan React Context hanya untuk data yang diakses lintas halaman/komponen berjauhan (contoh: status keranjang belanja yang diakses oleh Navbar, Card Produk, Sheet Keranjang, dan Dialog Checkout).
   - Data lokal suatu halaman harus tetap dikelola dengan `useState` lokal.
3. **Pemisahan Mock Data**:
   - Semua dummy data (daftar sparepart, kategori) wajib terpusat di `src/constans/` agar mudah diganti dengan integrasi REST API di masa mendatang.
4. **Kebijakan TypeScript**:
   - Dilarang keras menggunakan tipe `any` (`@typescript-eslint/no-explicit-any`).
   - Gunakan union types eksplisit untuk filter, status pesanan, dan sorting.

---

## 4. Konvensi Tampilan & UX (*User Experience*)

1. **Responsivitas Mobile Navigation**:
   - Di mode mobile, menu navigasi menggunakan tombol toggle icon hamburger (`Menu` / `X`).
   - Menu dropdown menggunakan card melayang solid (**non-transparan**) dengan background `bg-card`, border tegas `border-2 border-border`, bayangan `shadow-2xl`, serta backdrop gelap (`fixed inset-0 top-16 bg-black/60`) agar tidak samar dan mudah dibaca.
   - Menu otomatis menutup saat tautan diklik atau saat rute berubah.
2. **Elemen Form & Select**:
   - Ukuran `<select>` dropdown disamakan lebarnya pada mode mobile (`flex-1`) dan desktop (`sm:w-48`).
   - Target sentuh (*touch target*) input dan button minimum adalah `h-11` (44px) agar ergonomis.
3. **Tata Letak Card & Badge**:
   - Badge ganda (brand & best-seller) diposisikan berdampingan (kiri dan kanan), bukan bertumpuk atas-bawah.
   - Bagian footer card tombol aksi memiliki jarak atas yang cukup (`pt-3.5`) agar tidak menempel pada garis pemisah card.
4. **Scrollbar Bersih**:
   - Dialog modal, drawer sheet, dan list produk memanfaatkan utility `@utility no-scrollbar` di `src/index.css` agar tampilan rapi tanpa scrollbar bawaan browser yang kaku.
5. **Handling Gambar Eksternal**:
   - Semua tag `<img>` produk wajib memiliki handler fallback `onError` untuk mencegah tampilan gambar rusak jika terjadi kendala pada CDN penyedia gambar.

