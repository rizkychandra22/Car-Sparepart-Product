# Roadmap Migrasi Frontend PARTSCOPE

Roadmap ini mencatat pekerjaan untuk mengganti halaman PHP Native PARTSCOPE dengan frontend React + Vite. Ini bukan rencana membangun toko online atau backend baru.

## Status Proyek

- Fondasi React/Vite, routing, komponen UI, dan prototype katalog sudah ada.
- Migrasi halaman PARTSCOPE dan pemindahan dataset master belum dimulai.
- Prototype saat ini memakai 8 produk mock serta fitur storefront, keranjang, checkout, login simulasi, dan dashboard inventaris. Fitur tersebut bukan representasi sumber PHP dan berada di luar target migrasi.

## Batas Target

1. Pertahankan tampilan dan alur frontend dari aplikasi PHP Native yang menjadi acuan.
2. Pindahkan landing page, tampilan login, dan katalog spare parts ke React.
3. Simpan seluruh data spare parts secara lokal sebagai TypeScript/JSON; proses pencarian dan filter dilakukan di browser.
4. Tidak membangun atau menghubungkan PHP, MySQL, API, autentikasi server, transaksi, pembayaran, maupun manajemen stok.
5. Login, jika tampil, hanya menjadi simulasi akses/navigasi dan tidak boleh dipresentasikan sebagai pengamanan akun.

## Fase 0 — Baseline dan Pemetaan *(Review selesai, migrasi belum mulai)*

- [x] Tinjau struktur dan route React yang sudah tersedia.
- [x] Tinjau sumber PHP: landing, login, katalog, filter, sorting, pagination, CSS, dan model data.
- [x] Tetapkan ruang lingkup frontend-only dengan data lokal.
- [ ] Tetapkan halaman PHP yang menjadi acuan visual final. Rekomendasi: hasil aplikasi PHP (`app/Views` + `public/assets`); preview mandiri dipakai sebagai referensi tambahan karena tampilan katalog berbeda.
- [ ] Simpan/catat ukuran viewport dan screenshot acuan landing, login, katalog desktop, dan katalog mobile.
- [ ] Tetapkan path route React final untuk landing, login demo, dan katalog (misalnya `/`, `/login`, `/parts`).

## Fase 1 — Data Master dan Tipe Domain

- [ ] Siapkan dataset lengkap 5.239 baris dari sumber Excel/SQL yang sudah diverifikasi.
- [ ] Tambahkan tipe domain spare part tersendiri; jangan gunakan `Product` storefront untuk master data.
- [ ] Petakan semua kolom sumber: `source_excel_row`, `hyundai_type`, `brand`, `vehicle_type`, `part_name_original`, `part_description_competitor`, `part_group`, `category`, `estimated_moving`, `part_number`, `price`, `price_source_text`, dan `part_number_status`.
- [ ] Pertahankan nilai kosong sebagai kosong/`null`; jangan membuat harga, nomor part, stok, rating, gambar, atau kecocokan baru.
- [ ] Simpan data sebagai modul TypeScript atau JSON lokal dan dokumentasikan sumber serta cara memperbaruinya.
- [ ] Bentuk pilihan filter dari nilai dataset yang sebenarnya.

Catatan data: sumber berisi 169 nama komponen, 31 vehicle type, 8 brand, dan 9 part group. `brand` adalah merek kendaraan pembanding. Harga tidak menyertakan mata uang maupun tanggal survei; kompatibilitas tidak boleh disimpulkan dari pasangan kendaraan pada baris data.

## Fase 2 — Shell Aplikasi dan Halaman

- [ ] Ubah route `/` menjadi landing PARTSCOPE dan siapkan route katalog React.
- [ ] Porting struktur layout bersama: header, navigasi, footer, dan identitas brand.
- [ ] Porting landing dengan konten, aset hexagon, hierarki visual, dan layout responsif yang sesuai sumber.
- [ ] Pertahankan halaman login secara visual jika termasuk scope final, dengan penjelasan bahwa login hanya demo dan tanpa validasi backend.
- [ ] Ganti atau keluarkan route dashboard stok dari alur target; dashboard tersebut tidak ada pada scope PHP yang ditinjau.
- [ ] Atur fallback route agar pengguna diarahkan ke halaman yang tepat.

## Fase 3 — Katalog dan Interaksi

- [ ] Implementasikan pencarian nama komponen, deskripsi kompetitor, dan nomor part.
- [ ] Implementasikan filter Hyundai Type, Brand, Vehicle Type, Part Group, kategori, estimated moving, dan status nomor part.
- [ ] Implementasikan pencarian nomor part, rentang harga, filter “memiliki harga”, dan filter “memiliki nomor part”.
- [ ] Implementasikan sorting urutan sumber, nama A–Z, brand A–Z, harga terendah, dan harga tertinggi.
- [ ] Implementasikan pagination 25 baris, penghitung hasil, reset filter, dan empty state.
- [ ] Pertahankan filter drawer di mobile, termasuk backdrop, tombol tutup, dan perilaku keyboard.
- [ ] Tampilkan tabel desktop dan layout data yang terbaca di layar kecil.
- [ ] Pertimbangkan sinkronisasi filter dan halaman ke query string agar URL dapat dibagikan dan navigasi browser berfungsi.

## Fase 4 — Fidelity, Aksesibilitas, dan Penutupan Migrasi

- [ ] Cocokkan tiap halaman terhadap screenshot acuan pada viewport desktop dan mobile.
- [ ] Verifikasi label form, fokus keyboard, state drawer, empty state, dan teks alternatif aset.
- [ ] Pastikan tidak ada klaim yang tidak didukung sumber: harga pasar terkini, mata uang, kompatibilitas, stok aktual, atau autentikasi nyata.
- [ ] Hapus keterkaitan prototipe yang tidak dipakai oleh hasil migrasi (cart context, checkout, data storefront) setelah halaman target menggantikannya.
- [ ] Perbarui README dan dokumen arsitektur mengikuti implementasi yang sudah jadi.
- [ ] Jalankan build, lint, dan typecheck setelah perubahan implementasi.

## Ditunda / Di Luar Scope

Hal-hal berikut tidak dijadwalkan dalam migrasi ini: API/backend, database, login aman, akun pengguna, CRUD, stok gudang, keranjang belanja, checkout, payment gateway, webhook, notifikasi, dan integrasi VIN. Jika scope berubah, buat keputusan dan roadmap baru sebelum implementasi.
