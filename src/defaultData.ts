import { Slide, Settings } from './types';

export const defaultSettings: Settings = {
  marqueeText: [
    "SELAMAT DATANG DI LAYANAN INFORMASI DIGITAL KOPERASI JASA ADARO KARYA MANDIRI",
    "MITRA FINANSIAL TERPERCAYA ANDA SEJAK 1995",
    "HOTLINE SIMPAN PINJAM: 082152386718",
    "KOPKARINDO TRAVEL & UMROH: 085248626532",
    "VOUCHER BELANJA MARIZA MART: 08115510107",
    "DOWNLOAD APLIKASI KOPKAR AKM DI GOOGLE PLAY STORE SEKARANG!"
  ],
  widgetEnabled: true,
  widgetTitle: "INFO PENTING",
  widgetText: "Jam Layanan: Senin - Jumat (08:00 - 16:00) | Update Saldo setiap akhir bulan.",
  appsScriptUrl: ""
};

export const defaultSlides: Slide[] = [
  {
    id: 1,
    type: "hero",
    title: "Mitra Finansial Terpercaya Anda Sejak 1995",
    subtitle: "Berperan Aktif Menciptakan Anggota Sejahtera",
    visual: "logo"
  },
  {
    id: 2,
    type: "about",
    title: "Kopkar Adaro Karya Mandiri",
    subtitle: "Badan Hukum: 2128/BH/IX Tanggal 31 Juli 1995",
    visions: ["Berperan aktif menciptakan anggota sejahtera"],
    missions: [
      "Membangun dan mengembangkan potensi ekonomi karyawan",
      "Menjadi koperasi yang terbaik di Indonesia",
      "Menjaga tingkat kesehatan koperasi secara konsisten"
    ]
  },
  {
    id: 3,
    type: "history",
    title: "Jejak Langkah & Kepengurusan",
    subtitle: "Perjalanan Dedikasi Sejak 1995",
    timeline: [
      { year: "1995 - 1998", title: "Iswan Sujarwo", description: "Pembentukan Koperasi & Awal Simpan Pinjam" },
      { year: "1999 - 2001", title: "Al Sukis", description: "Ekspansi Supplier Kebutuhan PT Adaro" },
      { year: "2002 - 2006", title: "Marthayadi", description: "Ekspansi & Pembentukan CV. Maju Bersama" },
      { year: "2007 - 2012", title: "M. Ismail", description: "Perubahan Status Menjadi PT Maju Bersama Kopkarindo" },
      { year: "2013 - 2015", title: "Firmansyah", description: "Pertumbuhan Aset & Pembukaan Adamart di Kelanis" },
      { year: "2016 - 2021", title: "Kadarisman", description: "Pertambahan Anggota Hingga 1.000+ Orang" },
      { year: "2022 - 2024", title: "Ageng Prasongko", description: "Digitalisasi Aplikasi & Tranformasi Koperasi Jasa" }
    ]
  },
  {
    id: 4,
    type: "management",
    title: "Pengelola Koperasi",
    subtitle: "Dedikasi Manajerial (1995 - Sekarang)",
    timeline: [
      { year: "1995 - 2002", title: "Auvianve Chairul Anam", description: "" },
      { year: "2003 - 2006", title: "Akhmad Husaini", description: "" },
      { year: "2006 - 2007", title: "Irwan Budi Ansyari", description: "" },
      { year: "2007 - 2009", title: "Winda Ayu Swastika", description: "" },
      { year: "2009 - Sekrg", title: "Fedrik Christian Adi C.", description: "Manajer" }
    ]
  },
  {
    id: 5,
    type: "business",
    title: "Portofolio Bisnis Usaha",
    subtitle: "Fokus Layanan Pembiayaan & Jasa",
    highlights: [
      "Pinjaman Koperasi",
      "Pinjaman Konsumtif",
      "Pinjaman Modal Usaha",
      "Pembiayaan Perjalanan Wisata",
      "Pembiayaan Umroh & Wisata Religi",
      "Pembiayaan Voucher Belanja"
    ]
  },
  {
    id: 6,
    type: "savings",
    title: "Tumbuhkan Dana Anda Bersama Kami",
    services: [
      {
        name: "Simpanan Sukarela",
        description: "Imbal Jasa 0,5% per bulan (6% per tahun). Bebas ditarik bertahap."
      },
      {
        name: "Simpanan Berjangka",
        description: "Minimal Rp 50 Juta dengan Imbal Jasa 6% per tahun. Tenor mulai 6 bulan."
      }
    ]
  },
  {
    id: 7,
    type: "loans",
    title: "Solusi Kebutuhan Finansial Anda",
    subtitle: "Melayani Pinjaman Koperasi, Konsumtif & Modal Usaha",
    highlights: [
      "Jasa Ringan 1,15% - 1,5% Per Bulan",
      "Tenor Panjang Hingga 60 Bulan",
      "Biaya Admin 0,25% & Asuransi 1%"
    ]
  },
  {
    id: 8,
    type: "extra",
    title: "Lebih Dari Sekadar Simpan Pinjam",
    services: [
      {
        name: "Kopkarindo Travel & Umroh",
        description: "Pembiayaan Wisata Keluarga, Religi & Umroh (Cicilan ringan 1,5% s/d 24 bln)",
        icon: "plane"
      },
      {
        name: "Voucher Belanja",
        description: "Bekerjasama dengan Mariza Mart untuk sembako & kebutuhan harian",
        icon: "shopping-cart"
      }
    ]
  },
  {
    id: 9,
    type: "app",
    title: "Koperasi Dalam Genggaman!",
    description: "Gunakan Aplikasi Android Kopkar Adaro Karya Mandiri dengan sistem Armadillo Akunting",
    qr_code: "placeholder",
    mockup: "smartphone"
  },
  {
    id: 10,
    type: "contact",
    title: "Hubungi Pusat Layanan Kami",
    contacts: [
      { department: "Simpan Pinjam", number: "082152386718" },
      { department: "Voucher & Ekstra", number: "08115510107" },
      { department: "Perjalanan Wisata", number: "085248626532" }
    ],
    socials: [
      { department: "Telepon", number: "(0526) 2023593" },
      { department: "Email", number: "kopkar.adaro@gmail.com" },
      { department: "Instagram", number: "@kopkar_adaro" }
    ],
    address: "Komp. Swadharma Jalur II Blok Mawar RT IV, Mabuun, Tabalong, Kalsel"
  },
  {
    id: 11,
    type: "flyer",
    title: "INFORMASI & PENGUMUMAN",
    subtitle: "Ruang Untuk Flyer, Gambar Promosi, Atau Berita Terbaru",
    imageUrl: ""
  }
];
