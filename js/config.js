/**
 * =============================================
 *   PORTFOLIO CONFIG — EDIT SINI SEMUA KONTEN
 * =============================================
 * Tinggal ubah teks di dalam tanda kutip "..."
 * Jangan hapus tanda koma, kurung, atau titik koma
 */

const CONFIG = {

  // ── INFO PRIBADI ───────────────────────────
  name: "GK_TW",
  tagline: "Minecraft 3D Animator",
  bio: "Halo! Saya seorang animator Minecraft yang suka bikin konten cinematic, horror, dan action. Semua karya di sini dibuat murni dari kreativitas sendiri.",

  // ── SOCIAL MEDIA (isi link, kosongkan "" kalau tidak punya) ──
  social: {
    youtube:   "",         // contoh: "https://youtube.com/@namakamudisiniy"
    instagram: "",         // contoh: "https://instagram.com/namakamu"
    twitter:   "",         // contoh: "https://twitter.com/namakamu"
    tiktok:    "",         // contoh: "https://tiktok.com/@namakamu"
  },

  // ── STATUS KOMISI ──────────────────────────
  commissionOpen: false,   // ganti true kalau buka komisi
  commissionNote: "Saat ini saya belum membuka komisi. Stay tuned!",

  // ── KARYA / PORTFOLIO ──────────────────────
  // Tambah atau hapus item sesuai kebutuhan
  works: [
    {
      title: "The Backrooms",
      description: "Animasi survival horror bertema Backrooms. Karakter pemain menjelajahi lorong kuning misterius dan bertemu entity.",
      image: "img/thumbnailbackrooms.png",
      tag: "Horror · Cinematic",
    },
    {
      title: "Group Shot",
      description: "Render group 3 karakter dengan latar dunia Minecraft klasik. Menampilkan tiga skin dengan gaya berbeda.",
      image: "img/gk_tw.png",
      tag: "Character · Render",
    },
    {
      title: "Village Scene",
      description: "Animasi dramatis bertema desa dengan villager dan pillagaer. Suasana tegang di sudut desa yang sunyi.",
      image: "img/edited.png",
      tag: "Cinematic · Story",
    },
    // Contoh cara tambah karya baru:
    // {
    //   title: "Judul Karya",
    //   description: "Deskripsi singkat karya ini.",
    //   image: "img/nama-file-gambar.png",
    //   tag: "Kategori",
    // },
  ],

  // ── SKILL / KEAHLIAN ──────────────────────
  skills: [
    "Minecraft 3D Animation",
    "Cinematic Rendering",
    "Character Design",
    "Horror Atmosphere",
    "Scene Composition",
    "Motion & FX",
  ],

  // ── FOOTER ────────────────────────────────
  footerText: "Dibuat dengan ❤️ oleh GK_TW",
};
