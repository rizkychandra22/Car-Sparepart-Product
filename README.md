# AutoPart Central

> **Portal Katalog Suku Cadang Mobil & Manajemen Inventaris Gudang**  
> Aplikasi modern berbasis React 19, TypeScript, Tailwind CSS v4, dan Turborepo yang dirancang untuk performa tinggi, modularitas, dan pengalaman belanja suku cadang otomotif yang presisi.

---

## 🚀 Fitur Utama

- **Katalog Suku Cadang Presisi**:
  - Filter kategori suku cadang (Pengereman, Mesin, Kelistrikan, Suspensi, Transmisi, Filter & Oli).
  - Filter merk otomotif (Brembo, Denso, Bosch, Gates, Kayaba, Aisin, Motul).
  - Pencarian fleksibel berdasarkan nama komponen, nomor part resmi OEM, atau model mobil (Avanza, Innova, Pajero, dsb.).
  - Sorting produk berdasarkan popularitas, rating, harga terendah, dan harga tertinggi.
- **Kartu Produk Reusable (`ProductCard`)**:
  - Informasi nomor part, rating, status best-seller, kecocokan mobil, harga diskon, dan stok fisik.
  - Handler proteksi gambar rusak (*fallback error handling*).
  - Dialog detail spesifikasi teknis lengkap dengan tabel kompatibilitas kendaraan.
- **Keranjang Belanja Reaktif (`CartContext`)**:
  - Sinkronisasi otomatis ke `localStorage` (data tidak hilang saat refresh).
  - Slide-over drawer laci keranjang (`CartSheet`) dengan pengatur kuantitas.
  - Perhitungan otomatis subtotal, PPN 11%, estimasi ongkos kirim gratis, dan grand total.
  - Notifikasi toast Sonner dengan sistem anti-duplikasi.
- **Checkout & Konfirmasi Pesanan (`CheckoutDialog`)**:
  - Formulir data penerima pesanan dan tipe kendaraan.
  - Pilihan metode pembayaran instan (QRIS, Transfer Bank, COD).
  - Tanda terima ringkasan pesanan dengan nomor order unik.
- **Navigasi Responsif & Mobile UX**:
  - Mode mobile dilengkapi toggle menu floating drawer solid non-transparan dengan backdrop dim yang ramah sentuhan.
  - Indikator menu aktif dengan efek ping dot modern.
- **Panel Autentikasi & Manajemen Gudang**:
  - Halaman login admin (`LoginPage`) dengan show/hide password dan pintasan akun demo.
  - Dashboard stok & inventaris (`DashboardPage`) dengan ringkasan KPI (total SKU, total unit fisik, dan estimasi nilai aset).

---

## 🛠️ Tech Stack & Ekosistem

| Layer | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Library UI terkini dengan fitur hooks & lazy routing |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) | Pengetikan statis ketat tanpa `any` |
| **Build Tool** | [Vite 8](https://vite.dev/) | Bundler modern dengan manual chunk splitting |
| **Pipeline & Cache** | [Turborepo v2](https://turbo.build/repo) | Orkestrasi task kompilasi dan linting ter-cache |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Engine utility-first CSS performa tinggi |
| **Design System** | [shadcn/ui](https://ui.shadcn.com/) (Nova Preset) | Komponen UI atomik berbasis Radix UI |
| **Typography** | [Geist Variable](https://vercel.com/font) | Tipografi bersih dan modern |
| **Icons** | [Lucide React](https://lucide.dev/) | Library icon SVG tree-shakeable |
| **Toaster** | [Sonner](https://sonner.emilkowal.ski/) | Sistem toast notification interaktif |

---

## 📁 Struktur Direktori

```text
Car-Sparepart-Product/
├── docs/                   # Dokumentasi arsitektur dan perencanaan proyek
│   ├── architecture/       # Ketentuan teknis, panduan kode, dan boundary rules
│   │   ├── frontend-system.md
│   │   └── README.md
│   └── planning/           # Rencana pengembangan dan roadmap fitur
│       └── roadmap.md
├── public/                 # Aset statis publik
├── src/
│   ├── components/
│   │   ├── ui/             # Primitif UI atomik shadcn / Radix UI
│   │   └── common/         # Komponen presentasi bersama (ProductCard, CartSheet, CheckoutDialog, dsb.)
│   ├── constans/           # Mock data katalog suku cadang dan kategori terpusat
│   ├── context/            # React Context untuk state keranjang (cart-context)
│   ├── layouts/            # Tata letak utama (guest.tsx dengan responsive navbar & drawer)
│   ├── pages/              # Halaman rute (web.tsx, dashboard.tsx, auth/login.tsx)
│   ├── types/              # Definisi kontrak tipe TypeScript murni
│   ├── App.tsx             # Routing utama dengan React.lazy() & Suspense
│   ├── index.css           # Konfigurasi Tailwind CSS v4 & custom utility
│   └── main.tsx            # Entry point aplikasi
├── package.json            # Dependensi dan script pipeline
├── turbo.json              # Konfigurasi caching Turborepo
└── vite.config.ts          # Konfigurasi Vite & chunking vendor
```

---

## ⚙️ Panduan Menjalankan Proyek

### Prasyarat
- Node.js versi 20.x atau yang lebih baru.
- npm versi 10.x atau 12.x.

### Instalasi Dependensi
```bash
npm install
```

### Development Server
Jalankan server pengembangan lokal:
```bash
npm run dev
```
Akses aplikasi melalui browser di `http://localhost:5173`.

### Eksekusi Task Turborepo

```bash
# Menjalankan build produksi ter-cache oleh Turborepo
npm run build

# Menjalankan ESLint ter-cache oleh Turborepo
npm run lint

# Menjalankan pengecekan tipe data TypeScript murni
npm run typecheck

# Menjalankan preview server lokal dari folder dist/
npm run preview
```

---

## 📚 Dokumentasi Lanjutan

Untuk membaca ketentuan teknis lebih mendalam dan arah pengembangan fitur:
- 📖 **[Ketentuan Arsitektur & Sistem Frontend](docs/architecture/frontend-system.md)**
- 🗺️ **[Roadmap & Rencana Pengembangan Fitur](docs/tasks/roadmap.md)**

---

## 📄 Lisensi
Proyek ini dikembangkan sebagai purwarupa katalog suku cadang mobil dan portofolio profesional. Hak cipta dilindungi undang-undang.
