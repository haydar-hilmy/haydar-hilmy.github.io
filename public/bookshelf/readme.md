# BookShelf App

## Deskripsi
BookShelf App adalah aplikasi web sederhana untuk mengelola daftar buku yang telah dibaca dan belum dibaca. Aplikasi ini dibuat menggunakan HTML, CSS, dan JavaScript dengan `localStorage` sebagai penyimpanan data secara dinamis. Proyek ini merupakan bagian dari tugas untuk beasiswa **IDCamp 2024** yang diselenggarakan oleh **Dicoding**.

## Fitur
- **Menambahkan Buku**: Pengguna dapat menambahkan buku baru ke daftar.
- **Menghapus Buku**: Pengguna dapat menghapus buku dari daftar.
- **Menandai Buku**: Pengguna dapat menandai apakah buku sudah selesai dibaca atau belum.
- **Penyimpanan Dinamis**: Menggunakan `localStorage` untuk menyimpan data buku, sehingga data tetap ada meskipun halaman di-refresh atau browser ditutup.

## Teknologi yang Digunakan
- **HTML5**: Struktur dasar aplikasi.
- **CSS3**: Styling halaman aplikasi.
- **JavaScript (ES6)**: Logika aplikasi dan manajemen event.
- **localStorage**: Menyimpan dan mengambil data secara lokal di browser.

## Cara Kerja
1. Pengguna dapat menambahkan buku baru dengan mengisi judul, penulis, tahun terbit, dan status buku (sudah selesai atau belum).
2. Buku yang ditambahkan akan ditampilkan dalam daftar "Belum Selesai Dibaca" atau "Selesai Dibaca" berdasarkan statusnya.
3. Pengguna dapat memindahkan buku dari daftar "Belum Selesai Dibaca" ke "Selesai Dibaca" atau sebaliknya dengan menekan tombol "Selesai" atau "Belum Selesai".
4. Buku juga dapat dihapus dari daftar menggunakan tombol "Hapus".
5. Semua data buku disimpan di `localStorage` sehingga tidak hilang saat aplikasi di-refresh.

## Instalasi
Tidak perlu instalasi khusus, cukup ikuti langkah berikut untuk menjalankan aplikasi:
1. Masuk ke link ini, klik file html dan js nya, lalu didownload
   ```bash
   https://github.com/haydar-hilmy/haydar-hilmy.github.io/tree/main/bookshelf
