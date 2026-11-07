# Roadmap Migrasi Frontend PARTSCOPE

Daftar tugas ini mengikuti kondisi working tree. Membuat file placeholder belum berarti halaman, route, atau dataset telah dimigrasikan.

## Scope

- Pindahkan landing, tampilan login, dan katalog master data dari PHP Native ke React + Vite.
- Pertahankan tampilan/alur sumber PHP dan gunakan data lokal 5.239 baris.
- Tidak membuat backend/API/database, autentikasi server, transaksi, checkout, pembayaran, atau inventaris.
- Login frontend hanya demo navigasi, bukan sistem keamanan.

## Status Sekarang

- [x] Review ulang struktur React dan file yang berubah.
- [x] Hapus file storefront lama dari working tree.
- [x] Buat placeholder `src/pages/landing/home.tsx`, `src/pages/app/index-parts.tsx`, dan `src/data/parts.ts`.
- [ ] Isi file placeholder dengan halaman dan dataset.
- [ ] Sambungkan ulang `App.tsx` dan layout; referensi saat ini masih mengarah ke modul yang sudah dihapus.

## Fase 0 — Acuan dan Keputusan

- [x] Tetapkan batas frontend-only dan data lokal.
- [ ] Tetapkan hasil aplikasi PHP (`app/Views` + `public/assets`) sebagai sumber visual final; preview mandiri hanya referensi tambahan karena tampilan katalog berbeda.
- [ ] Catat screenshot landing, login, katalog desktop, dan katalog mobile beserta ukuran viewport.
- [ ] Putuskan route target. Rekomendasi: `/`, `/login`, `/parts`.

## Fase 1 — Data Master

- [ ] Siapkan dataset terverifikasi berisi 5.239 baris di `src/data/parts.ts` atau JSON lokal.
- [ ] Definisikan tipe `SparePart` sesuai kolom sumber, bukan tipe produk toko.
- [ ] Petakan: `source_excel_row`, `hyundai_type`, `brand`, `vehicle_type`, `part_name_original`, `part_description_competitor`, `part_group`, `category`, `estimated_moving`, `part_number`, `price`, `price_source_text`, dan `part_number_status`.
- [ ] Pertahankan nilai kosong; jangan membuat stok, rating, harga pasar, gambar, atau kompatibilitas yang tidak ada.
- [ ] Bentuk opsi filter dari nilai unik dataset.

## Fase 2 — Router, Layout, dan Halaman

- [ ] Perbarui `src/App.tsx`; hapus import `pages/web`, `pages/dashboard`, dan `CartProvider` yang sudah tidak tersedia.
- [ ] Ganti `src/layouts/guest.tsx` yang masih bergantung pada cart, checkout, dan konten AutoPart Central.
- [ ] Implementasikan landing di `src/pages/landing/home.tsx`.
- [ ] Sesuaikan halaman login PARTSCOPE dan perilakunya menjadi simulasi frontend di `src/pages/auth/login.tsx`.
- [ ] Implementasikan katalog di `src/pages/app/index-parts.tsx`.
- [ ] Atur fallback route dan tautan antarhalaman.
- [ ] Periksa `App.css`, `index.css`, dan aset yang akan dipakai untuk menghindari gaya starter yang tak terpakai.

## Fase 3 — Fitur Katalog

- [ ] Keyword search: nama, deskripsi kompetitor, nomor part.
- [ ] Filter: Hyundai Type, Brand, Vehicle Type, Part Group, kategori, estimated moving, status.
- [ ] Filter nomor part, batas harga, memiliki harga, dan memiliki nomor part.
- [ ] Sorting: sumber, nama A–Z, brand A–Z, harga rendah/tinggi.
- [ ] Pagination 25 baris, jumlah hasil, reset filter, dan empty state.
- [ ] Filter drawer mobile dengan backdrop, tombol tutup, dan dukungan keyboard.
- [ ] Tabel desktop serta tata letak data responsif.
- [ ] Pertimbangkan query string untuk pencarian, filter, sorting, dan pagination.

## Fase 4 — Pemeriksaan dan Penutupan

- [ ] Cocokkan tampilan dengan screenshot acuan di desktop dan mobile.
- [ ] Periksa label form, fokus keyboard, empty state, dan teks alternatif.
- [ ] Pastikan UI tidak mengklaim harga pasar/mata uang, kompatibilitas, stok, atau autentikasi nyata tanpa dasar.
- [ ] Hapus dependensi storefront lama yang tak lagi digunakan setelah route baru berjalan.
- [ ] Jalankan build, lint, dan typecheck setelah implementasi.
- [ ] Perbarui README dan dokumen arsitektur mengikuti hasil akhir.

## Di Luar Scope

Backend/API, database, login aman, akun, CRUD, stok gudang, keranjang, checkout, pembayaran, webhook, notifikasi, dan integrasi VIN ditunda kecuali scope diubah secara eksplisit.
