<a href="README.md">
  <img src="https://img.shields.io/badge/Language-English-blue?style=flat-square&logo=google-translate&logoColor=white" alt="English">
</a>
<a href="README-TR.md">
  <img src="https://img.shields.io/badge/Language-Türkçe-red?style=flat-square&logo=google-translate&logoColor=white" alt="Türkçe">
</a>

  <br />
  <br />

<div align="center">
  <img src="public/logo.png" width="120" height="120" />
  <br />
  <br />

  <p>
     Yerel klasörlerdeki manga ve romanları okumak için dijital bir kütüphane.
  </p>

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide-FF69B4?style=for-the-badge&logo=lucide&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

  <p>
    <a href="#demo">Demo</a> •
    <a href="#info">Bilgilendirme</a> •
    <a href="#about">Hakkında</a> •
    <a href="#features">Özellikler</a> •
    <a href="#tech">Teknolojiler</a> •
    <a href="#setup">Kurulum</a> •
    <a href="#gallery">Galeri</a> •
    <a href="#license">Lisans</a>
  </p>

  <br />
  <br />
</div>

## <a id="demo"></a> 📷 Demo

- [https://aether-reader.vercel.app/](https://aether-reader.vercel.app/)

## <a id="info"></a> 📌 Bilgilendirme

Depodaki demo kütüphanesi yalnızca kamu malı ve özgür lisanslı eserlerden oluşur. David Revoy'un *Pepper&Carrot* serisi CC BY 4.0 lisansı altındadır. Katsushika Hokusai'nin *Hokusai Manga* ve *One Hundred Views of Mount Fuji* eserleri ile Project Gutenberg'den alınan romanlar kamu malıdır. Kaynaklar, yazarlar ve lisanslar [contents/CREDITS.md](contents/CREDITS.md) dosyasında listelenmiştir.

## <a id="about"></a> 📋 Hakkında

**Aether Reader**, manga ve romanları tek bir yerde toplayan dijital bir kütüphane ve okuma uygulamasıdır. Kütüphaneyi veritabanı veya hesap gerektirmeden doğrudan `contents/` dizinindeki klasörlerden oluşturur.

## <a id="features"></a> ✨ Özellikler

- **Klasör tabanlı kütüphane**: Seriler ve bölümler, herhangi bir veritabanı olmadan klasör ve dosya adlarından okunur.
- **Filtrelenebilir ızgara**: Tümü, manga ve roman arasında geçiş yapın, başlığa göre arayın ve başlığa, bölüm sayısına ya da okuma ilerlemesine göre sıralayın.
- **Okuma ilerlemesi**: Seri kartları ne kadar okuduğunuzu gösterir, okunan bölümler seri sayfasında işaretlenir.
- **Okumaya devam et**: Kütüphanenin üst kısmından en son okuduğunuz bölüme dönün.
- **Genel arama**: `Ctrl + K` tuşlarına basarak tüm serileri kapak görselleri ve klavye gezinmesiyle arayın.
- **Manga ve roman modları**: Manga sayfaları dikey bir şerit hâlinde gösterilir, romanlar ise sade bir metin görünümünde açılır.
- **Bölüm gezinmesi**: Bölümler arasında butonlarla, bölüm seçiciyle ya da `←` ve `→` tuşlarıyla geçiş yapın.
- **Okuyucu başlığı**: Başlık aşağı kaydırırken gizlenir ve bir okuma ilerleme çubuğu gösterir.
- **Metin ayarları**: Romanlar için yazı boyutunu ve yazı tipini değiştirin. Seçiminiz tarayıcıda saklanır.
- **Açık ve koyu tema**: Temayı tek tıkla değiştirin.

## <a id="tech"></a> 🛠️ Teknolojiler

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `shadcn/ui` · `Base UI` · `cmdk` · `next-themes` · `Lucide React`

## <a id="setup"></a> 🚀 Kurulum

### Gereksinimler

- **Node.js** 20 veya daha yeni bir sürüm

### Adım Adım Kurulum

1. **Depoyu klonlayın**

   ```bash
   git clone https://github.com/xkintaro/aether-reader.git
   cd aether-reader
   ```

2. **Bağımlılıkları yükleyin**

   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**

   ```bash
   npm run dev
   ```

Uygulamayı şu adreste açın: [http://localhost:3000](http://localhost:3000).

### İçerik Ekleme

Kütüphanenizi oluşturmak için `contents/` klasörünü şu şekilde düzenleyin:

```text
contents/
├── manga/
│   └── Pepper&Carrot/              ← seri adı
│       ├── cover.webp              ← seri kapağı
│       ├── 01 - Potion of Flight/  ← bölüm, görsellerden oluşan bir klasör
│       │   ├── 01.webp
│       │   └── 02.webp
│       └── 02 - Rainbow Potions/
└── novel/
    └── Frankenstein/               ← seri adı
        ├── cover.webp
        ├── 01 - Letter 1.txt       ← bölüm, düz metin dosyası
        └── 02 - Letter 2.txt
```

- **Manga**: `contents/manga/` içindeki her klasör bir seri, her alt klasör ise bir bölümdür. Bölümdeki görseller `.jpg`, `.jpeg`, `.png` veya `.webp` dosyalarıdır ve doğal sırayla gösterilir, yani `2` numaralı görsel `10` numaralı görselden önce gelir.
- **Romanlar**: `contents/novel/` içindeki her klasör bir seri, her `.txt` dosyası ise bir bölümdür. Boş satırlar paragrafları ayırır.
- **Bölüm adları**: Bölümler adlarına göre doğal sırayla sıralanır. `01 - ` gibi bir ön ek arayüzde gizlenir, yani `07 - A Mad Tea-Party` **A Mad Tea-Party** olarak gösterilir.
- **Kapak**: Seri klasöründeki ilk görsel dosyası kapak olarak kullanılır. Görsel yoksa varsayılan bir kapak gösterilir.

Demo klasörlerini silip kendi içeriklerinizi ekleyebilirsiniz.

## <a id="gallery"></a> 🖼️ Galeri

<img src="md/screenshot-library.jpg" />

<img src="md/screenshot-series.jpg" />

<img src="md/screenshot-novel.jpg" />

## <a id="license"></a> 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

#

<p align="center">
  <sub>❤️ Developed by "Mustafa TAŞAL" (kintaro)</sub>
</p>
