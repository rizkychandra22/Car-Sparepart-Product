# Arsitektur Frontend PARTSCOPE

Dokumen ini mencatat kondisi working tree setelah penggantian struktur storefront dan target arsitektur migrasi. File halaman/data baru sudah dibuat, tetapi masih kosong. Karena itu, target di bawah ini belum dianggap sebagai implementasi yang selesai.

## 1. Cakupan Migrasi

- Memindahkan landing page, tampilan login, dan katalog master spare parts dari PHP Native ke React.
- Menjaga layout, teks, identitas visual, dan perilaku responsif sesuai halaman PHP acuan.
- Menyimpan 5.239 baris data secara lokal di frontend; pencarian dan filter dijalankan di browser.
- Tidak menambahkan backend, database, API, autentikasi server, keranjang, checkout, pembayaran, atau manajemen stok.
- Login, jika dipertahankan, hanya berupa demonstrasi navigasi dan bukan pengamanan akses.

## 2. Stack dan Status Routing

Stack proyek yang tercatat di `package.json`: React 19, TypeScript, Vite 8, React Router DOM 7, Tailwind CSS 4, shadcn/Radix UI, Lucide React, Sonner, dan Turborepo.

`src/App.tsx` belum diperbarui setelah penghapusan storefront. Saat ini file tersebut masih mendeklarasikan `/`, `/login`, dan `/dashboard`, tetapi mengimpor halaman lama (`@/pages/web`, `@/pages/dashboard`) dan `CartProvider` yang sudah tidak ada di working tree. `src/layouts/guest.tsx` juga masih mengimpor konteks cart dan komponen common yang telah dihapus. Jadi route yang dideklarasikan belum menjadi route aplikasi yang tersambung.

Path route target belum diputuskan. Rekomendasi awal: `/` untuk landing, `/login` untuk tampilan login demo, dan `/parts` untuk katalog.

## 3. Struktur Working Tree Saat Ini

```text
src/
├── App.tsx                     # Masih berisi router/import lama; perlu diperbarui
├── main.tsx                    # Entry point React
├── pages/
│   ├── app/index-parts.tsx     # File baru, saat ini kosong
│   ├── landing/home.tsx        # File baru, saat ini kosong
│   └── auth/login.tsx          # Halaman login lama AutoPart Central
├── layouts/guest.tsx           # Layout lama dengan dependensi storefront yang dihapus
├── components/
│   ├── common/error-boundary.tsx
│   └── ui/                     # Komponen UI yang tersedia
├── data/parts.ts               # File baru, saat ini kosong
├── hooks/use-mobile.ts
├── lib/utils.ts
└── index.css                   # Tailwind dan token desain
```

Folder `context/`, `types/`, dan `constans/` serta halaman/data storefront lama sudah dihapus dari working tree. File `src/App.css` dan aset awal Vite/React masih ada; cek pemakaiannya saat membangun halaman baru.

## 4. Kontrak Data Target

Sumber acuan adalah dataset PARTSCOPE sebanyak 5.239 baris dari Excel/SQL. Buat tipe domain `SparePart` tersendiri; jangan menghidupkan kembali tipe `Product` storefront yang mengharuskan stok, rating, gambar, harga jual, atau compatibility.

Kolom sumber yang perlu dipertahankan:

| Field | Keterangan |
| --- | --- |
| `source_excel_row` | Nomor baris asal |
| `hyundai_type` | Kendaraan acuan |
| `brand` | Merek kendaraan pembanding, bukan produsen spare part |
| `vehicle_type` | Tipe kendaraan pembanding |
| `part_name_original` | Nama komponen |
| `part_description_competitor` | Deskripsi part pembanding |
| `part_group`, `category` | Klasifikasi sumber |
| `estimated_moving` | Nilai moving sumber |
| `part_number` | Nomor part |
| `price`, `price_source_text` | Nilai dan teks harga sumber |
| `part_number_status` | Status nomor part |

Nilai yang kosong harus tetap kosong/`null`. Harga tidak memiliki mata uang atau tanggal survei; jangan tambahkan simbol atau klaim harga pasar. Sumber tidak membuktikan kompatibilitas part lintas kendaraan. Ringkasan dataset: 169 nama komponen, 31 vehicle type, 8 brand, 9 part group.

Tempat yang sudah disiapkan untuk data ialah `src/data/parts.ts`. File tersebut masih kosong, jadi belum ada kontrak tipe, importer, atau record yang aktif.

## 5. Perilaku Katalog Target

- Keyword search pada nama komponen, deskripsi kompetitor, dan nomor part.
- Filter Hyundai Type, Brand, Vehicle Type, Part Group, kategori, estimated moving, dan status.
- Filter nomor part, rentang harga, hanya memiliki harga, dan hanya memiliki nomor part.
- Sorting urutan sumber, nama A–Z, brand A–Z, harga terendah/tertinggi.
- Pagination 25 baris, ringkasan jumlah hasil, empty state, reset, serta filter drawer mobile.
- Tabel desktop dan tampilan data yang terbaca di layar kecil.

Semua operasi tersebut dihitung di browser dari data lokal. Query string dapat dipakai untuk menjaga filter/halaman di URL dan mendukung navigasi browser.

## 6. Batas dan Konvensi

- Pisahkan halaman, layout, komponen bersama, tipe domain, dan data.
- Pakai komponen `src/components/ui/` yang ada bila cocok; styling tetap harus mengikuti sumber PHP, bukan tampilan storefront lama.
- Gunakan tipe eksplisit dan jangan menambahkan atribut yang tidak tersedia di sumber.
- Pertahankan aksesibilitas label form, keyboard, fokus, dan drawer.
- Roadmap adalah checklist progres; tandai task selesai hanya ketika kode terkait benar-benar tersedia dan tersambung.
