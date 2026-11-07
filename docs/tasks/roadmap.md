# Roadmap Migrasi Frontend PARTSCOPE

Checklist pengembangan frontend React + Vite dari aplikasi PHP Native. Perubahan backend tidak termasuk.

## Cakupan

- Pertahankan tampilan halaman PHP PARTSCOPE.
- Pindahkan landing, login sebagai demo UI, dan katalog data master.
- Simpan dataset 5.239 baris secara lokal; pencarian dan filter berjalan di browser.
- Tidak membangun API, database, autentikasi nyata, transaksi, checkout, pembayaran, atau manajemen stok.

## Progres

- [x] Tinjau aplikasi PHP dan struktur proyek React.
- [x] Hapus storefront mock lama dari working tree.
- [x] Implementasikan landing page dan pecah kontennya menjadi section terpisah langsung di `src/features/landing/`.
- [x] Refactor `Guest` menjadi layout landing dengan navigasi mobile dan footer PARTSCOPE.
- [x] Implementasikan login demo terpisah dari `Guest`; gunakan Input, Label, Button, dan ikon Lucide.
- [x] Sambungkan route `/` dan `/login`; hapus provider cart/dashboard dari `App.tsx`.
- [x] Gunakan kembali CSS dan aset hexagon dari frontend PHP sebagai acuan desain.
- [x] Sesuaikan skala landing sedikit lebih kecil tanpa mengubah layout dan palet utama.
- [x] Impor 5.239 record sumber ke `src/data/parts.ts` sebagai mock frontend bertipe.
- [ ] Implementasikan halaman katalog dan sambungkan route katalog.
- [ ] Implementasikan pencarian/filter katalog di browser.

## Fase 0 — Referensi Visual

- [x] Tetapkan aplikasi PHP (`app/Views` dan `public/assets`) sebagai sumber utama landing dan login.
- [ ] Catat screenshot dan viewport landing, login, dan katalog pada desktop serta mobile.
- [ ] Tetapkan path route katalog final.

## Fase 1 — Data Master

- [x] Siapkan 5.239 baris dataset terverifikasi di `src/data/parts.ts` dari SQL seed sumber.
- [x] Buat tipe `SparePart` dan pemetaan semua kolom sumber.
- [x] Pertahankan nilai kosong; jangan menambahkan stok, rating, harga pasar, atau kompatibilitas.
- [ ] Bentuk opsi filter dari nilai dataset.

Kolom sumber: `source_excel_row`, `hyundai_type`, `brand`, `vehicle_type`, `part_name_original`, `part_description_competitor`, `part_group`, `category`, `estimated_moving`, `part_number`, `price`, `price_source_text`, dan `part_number_status`. Brand adalah kendaraan pembanding; harga tidak mencantumkan mata uang/tanggal.

## Fase 2 — Katalog dan Interaksi

- [ ] Bangun katalog di `src/pages/index-parts.tsx` dengan komponen kecil di feature katalog.
- [ ] Implementasikan keyword search nama, deskripsi, dan nomor part.
- [ ] Implementasikan filter Hyundai Type, Brand, Vehicle Type, Part Group, kategori, estimated moving, status, nomor part, rentang harga, memiliki harga, dan memiliki nomor part.
- [ ] Implementasikan sorting urutan sumber, nama A–Z, brand A–Z, harga rendah/tinggi.
- [ ] Implementasikan pagination 25 baris, jumlah hasil, reset filter, dan empty state.
- [ ] Implementasikan filter drawer mobile dan tabel/layout responsif.
- [ ] Pertimbangkan query string untuk state pencarian, filter, sorting, dan halaman.

## Fase 3 — Pemeriksaan

- [ ] Cocokkan landing dan login dengan screenshot acuan pada desktop/mobile.
- [ ] Periksa fokus keyboard, label form, status pesan, dan menu mobile.
- [ ] Pastikan login jelas ditandai sebagai demo tanpa autentikasi backend.
- [ ] Jalankan build, lint, dan typecheck setelah implementasi katalog.
- [ ] Perbarui README dan arsitektur saat fitur katalog selesai.
