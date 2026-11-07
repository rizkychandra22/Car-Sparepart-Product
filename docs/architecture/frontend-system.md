# Arsitektur Frontend PARTSCOPE

Dokumen ini membedakan **implementasi React yang ada saat ini** dari **target migrasi**. Perubahan selanjutnya mengikuti batas cakupan yang disampaikan: memigrasikan halaman frontend dari PHP Native ke React + Vite, mempertahankan tampilan, dan menyimpan data katalog secara statis di frontend.

## 1. Cakupan Target

Target migrasi:

- Landing page PARTSCOPE.
- Halaman login sebagai tampilan/demo akses; tidak ada autentikasi sungguhan tanpa backend.
- Katalog master data spare parts dengan pencarian, filter, pengurutan, dan pagination.
- Responsivitas, identitas visual, konten, dan perilaku antarmuka mengikuti halaman PHP yang menjadi acuan.
- Dataset tetap di frontend sebagai data lokal TypeScript/JSON.

Di luar target saat ini: server PHP, MySQL, REST API, manajemen akun, proteksi rute berbasis server, keranjang, transaksi, pembayaran, stok gudang, dan fitur CRUD. Jangan menyatakan fitur yang hanya simulasi sebagai operasi nyata.

## 2. Teknologi dan Routing yang Ada

Stack yang tercatat di `package.json`:

| Lapisan | Teknologi |
| --- | --- |
| UI dan bahasa | React 19, TypeScript |
| Dev server/build | Vite 8, `@vitejs/plugin-react` |
| Routing | `react-router-dom` 7 |
| Styling | Tailwind CSS 4, shadcn, Radix UI |
| Ikon | Lucide React |
| Notifikasi | Sonner |
| Orkestrasi task | Turborepo |

`src/App.tsx` saat ini membungkus aplikasi dengan `ErrorBoundary`, `CartProvider`, `TooltipProvider`, `Toaster`, `BrowserRouter`, dan `Suspense`. Route yang tersedia:

| Route saat ini | Implementasi |
| --- | --- |
| `/` | `src/pages/web.tsx` — storefront contoh |
| `/login` | `src/pages/auth/login.tsx` — simulasi login |
| `/dashboard` | `src/pages/dashboard.tsx` — dashboard stok mock |

Route katalog PARTSCOPE (misalnya `/parts`) belum dibuat. Penetapan route final dicatat sebagai keputusan implementasi pada [roadmap](../tasks/roadmap.md).

## 3. Struktur Saat Ini dan Arah Penataan

```text
src/
├── App.tsx
├── main.tsx
├── pages/
├── layouts/
├── components/
│   ├── common/
│   └── ui/
├── constans/        # Saat ini berisi mock produk dan kategori storefront
├── context/         # Saat ini terutama state keranjang
├── types/           # Product, cart, dan order untuk prototipe toko
├── hooks/
├── lib/
└── index.css
```

Pola yang disarankan untuk fitur PARTSCOPE:

- Halaman berada di `src/pages/`; bagian layout bersama berada di `src/layouts/` atau `src/components/common/` sesuai tanggung jawab.
- Komponen UI yang dapat digunakan ulang berada di `src/components/`; komponen primitif yang dihasilkan shadcn tetap di `src/components/ui/`.
- Data katalog dan opsi filter berada pada satu modul data terpusat, menggunakan folder `src/constans/` yang sudah dipakai (atau folder bernama `constants` bila nanti ada task untuk merapikan ejaannya).
- Definisi tipe katalog dipisahkan dari tipe produk toko saat ini. Jangan memaksakan data sumber masuk ke tipe `Product` yang memiliki harga jual, stok, rating, gambar, dan compatibility buatan.
- Pencarian, filter, sorting, pagination, dan status panel filter dikelola sebagai state frontend. Context global hanya ditambah jika ada kebutuhan lintas halaman.

## 4. Perbedaan Model Data

### Model yang ada sekarang

`src/types/product.ts` mendefinisikan tipe `Product` untuk storefront, dengan properti seperti `price`, `originalPrice`, `stock`, `rating`, `reviewsCount`, `imageUrl`, dan `compatibility`. `src/constans/products.ts` saat ini memuat **8** entri mock. Data ini tidak merepresentasikan master data PARTSCOPE.

### Data sumber PARTSCOPE yang dituju

Sumber PHP yang ditinjau menggunakan dataset **5.239** baris dari `part_master_data.xlsx`. Kolom yang perlu dipertahankan dalam migrasi:

| Field sumber | Catatan migrasi |
| --- | --- |
| `source_excel_row` | Nomor baris asal; berguna untuk penelusuran |
| `hyundai_type` | Kendaraan acuan |
| `brand` | Merek kendaraan pembanding, bukan produsen part |
| `vehicle_type` | Tipe kendaraan pembanding |
| `part_name_original` | Nama komponen sumber |
| `part_description_competitor` | Deskripsi part pembanding, dapat kosong |
| `part_group`, `category` | Klasifikasi sumber, dapat kosong |
| `estimated_moving` | Nilai moving dari sumber, dapat kosong |
| `part_number` | Nomor part, dapat kosong |
| `price`, `price_source_text` | Nilai dan teks harga sumber; dapat kosong |
| `part_number_status` | Status nomor part, dapat kosong |

Dataset mencatat 169 nama komponen, 31 vehicle type, 8 brand, dan 9 part group. Angka harga tidak dilengkapi mata uang atau tanggal survei; tampilkan sebagai nilai sumber dan jangan menambahkan asumsi mata uang. Data sumber juga tidak membuktikan kompatibilitas antar kendaraan.

### Kontrak frontend yang perlu dibuat

Task migrasi perlu memperkenalkan tipe domain tersendiri (misalnya `SparePart`) dan memuat dataset penuh dalam modul TypeScript atau JSON. Pertahankan nilai kosong sebagai `null`/nilai kosong secara konsisten. Untuk harga, pilih representasi yang tidak mengubah nilai sumber; bila memakai string desimal, konversi hanya saat perlu membandingkan atau memformat.

Opsi filter perlu dibentuk dari nilai unik yang memang terdapat di dataset atau ditetapkan berdasarkan aturan PHP lama. Hindari memakai `CATEGORIES` storefront saat ini sebagai taksonomi sumber tanpa pemetaan yang disepakati.

## 5. Perilaku Katalog Acuan

Perilaku yang harus dipetakan dari halaman PHP meliputi:

- Pencarian kata kunci dalam nama komponen, deskripsi kompetitor, dan nomor part.
- Filter exact match: Hyundai Type, Brand, Vehicle Type, Part Group, kategori, estimated moving, dan status nomor part.
- Pencarian nomor part, batas harga minimum/maksimum, hanya data dengan harga, dan hanya data dengan nomor part.
- Sorting: urutan baris sumber, nama A–Z, brand A–Z, harga terendah, dan harga tertinggi.
- Pagination 25 baris per halaman, ringkasan jumlah hasil, keadaan hasil kosong, reset filter, dan filter drawer pada layar kecil.
- Tampilan tabel desktop dan kartu/label data pada layar kecil.

Di React, filter dapat dihitung di browser dari dataset lokal. Simpan hanya state yang dibutuhkan; pertimbangkan query string untuk pencarian/filter/pagination agar URL bisa dibagikan dan tombol kembali/maju browser tetap berguna.

## 6. Tampilan dan Konten

Sumber utama untuk layout dan konten adalah halaman PHP PARTSCOPE beserta CSS/asetnya. Sebelum styling diporting, task migrasi harus menetapkan screenshot/versi tampilan yang menjadi acuan—khususnya karena ada halaman preview mandiri yang tampilannya tidak identik dengan katalog PHP.

Pertahankan hierarki visual, teks, warna, spacing, tabel, filter panel, status, dan perilaku responsif. Tailwind dan komponen shadcn yang sudah ada boleh dipakai untuk struktur/aksesibilitas, tetapi jangan mengubah tampilan hanya agar menyerupai storefront mock saat ini.

## 7. Prinsip Implementasi

1. Pisahkan data, transformasi/filter, komponen, dan route.
2. Gunakan tipe domain eksplisit; hindari `any`.
3. Jangan mengarang atribut atau klaim bisnis yang tidak ada di data sumber.
4. Jaga aksesibilitas form, label, keyboard, dan drawer mobile.
5. Jangan menambah dependensi jika kemampuan React, browser, atau komponen yang ada sudah mencukupi.
6. Perbarui roadmap ketika task selesai dan tandai batasan yang masih terbuka.
