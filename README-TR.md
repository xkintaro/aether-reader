<a href="README.md">
 <img src="https://img.shields.io/badge/Language-English-blue?style=flat-square&logo=google-translate&logoColor=white" alt="English">
</a>
<a href="README-TR.md">
 <img src="https://img.shields.io/badge/Dil-Türkçe-red?style=flat-square&logo=google-translate&logoColor=white" alt="Türkçe">
</a>

  <br />
  <br />

<div align="center">
  <img src="public/logo.png" width="120" height="120" />
  <br />
  <br />

  <p>
    Modern, Hızlı ve Şık Bir Dijital Manga ve Roman Okuma Deneyimi
  </p>

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide-FF69B4?style=for-the-badge&logo=lucide&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

  <p>
    <a href="#features">Özellikler</a> •
    <a href="#technologies">Teknolojiler</a> •
    <a href="#installation">Kurulum</a> •
    <a href="#how-it-works">Nasıl Çalışır?</a> •
    <a href="#demo-content">Demo İçerik</a> •
    <a href="#license">Lisans</a> •
    <a href="#gallery">Galeri</a>
  </p>

  <br />
  <br />
</div>

## 📷 Demo Link

- [https://aether-reader.vercel.app/](https://aether-reader.vercel.app/)

## 📋 <a id="about"></a> Hakkında

**Aether Reader**, mangaları ve romanları tek bir çatı altında toplayan bir dijital kütüphane ve okuma uygulamasıdır.

Kütüphanenizi doğrudan diskteki klasörlerden okur; veritabanı ya da hesap gerekmez. Arayüz, shadcn/ui ve ortak [Aether Theme](https://github.com/xkintaro/aether) ile hazırlanmıştır; sade bir açık ve koyu tema sunar.

## ✨ <a id="features"></a> Özellikler

### Kütüphane
- **Yerel Dosya Sistemi**: Kütüphaneyi klasör adlarından oluşturur, herhangi bir veritabanına ihtiyaç duymaz.
- **Filtrelenebilir Izgara**: Tümü / Manga / Roman arasında geçiş yapın, başlığa göre filtreleyin; başlığa, bölüm sayısına veya okuma ilerlemesine göre sıralayın.
- **Okuma İlerlemesi**: Her seri kartı ne kadar okuduğunuzu gösterir; okunan bölümler seri sayfasında işaretlenir.
- **Kaldığın Yerden Devam Et**: Kütüphanenin en üstünden en son okuduğunuz bölüme anında dönün.
- **Genel Arama**: `Ctrl + K` ile kapaklı sonuçlar ve klavye ile gezinme sunan arama penceresini açın.

### Okuyucu
- **Manga ve Roman Modları**: Manga sayfaları dikey bir şerit halinde, romanlar ise odaklı bir metin görünümünde açılır.
- **Bölüm Geçişleri**: Önceki/sonraki butonları, bölüm seçici ve `←` / `→` klavye kısayolları.
- **Dikkat Dağıtmayan Üst Bar**: Aşağı kaydırırken gizlenir ve okuma ilerleme çubuğunu gösterir.
- **Metin Ayarları**: Romanlar için yazı boyutu ve yazı tipi (Geist / JetBrains Mono) ayarlanabilir; tercih tarayıcıda saklanır.

### Tasarım
- **Açık ve Koyu Tema**: Tek tıkla geçiş; renkler Aether Theme token'larından gelir.
- **Duyarlı (Responsive) Tasarım**: Bilgisayarda, tablette ve telefonda aynı deneyim.

## 🛠️ <a id="technologies"></a> Teknolojiler

### Frontend & Framework
- **Next.js 16**: App Router ve Server Actions ile React web çatısı
- **React 19**: Kullanıcı arayüzleri oluşturmak için kütüphane
- **Tailwind CSS 4**: Yardımcı sınıf tabanlı CSS kütüphanesi
- **TypeScript**: Tip güvenli JavaScript

### UI & Deneyim
- **shadcn/ui (base-nova)**: **Base UI** üzerine kurulu erişilebilir bileşenler
- **[@xkintaro/aether-theme](https://github.com/xkintaro/aether)**: Ortak renk token'ları, tipografi ve fontlar (Geist + JetBrains Mono)
- **cmdk**: Genel aramanın altındaki komut paleti
- **Next Themes**: Açık/koyu tema geçişi
- **Lucide React**: İkon kütüphanesi

## 🚀 <a id="installation"></a> Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### Gereksinimler
- **Node.js** 20 veya üzeri
- **NPM**

### Kurulum Adımları

1.  **Depoyu Klonlayın**
    ```bash
    git clone https://github.com/xkintaro/aether-reader.git
    cd aether-reader
    ```

2.  **Bağımlılıkları Yükleyin**
    ```bash
    npm install
    ```

3.  **Geliştirme Sunucusunu Başlatın**
    ```bash
    npm run dev
    ```

4. Tarayıcınızda `http://localhost:3000` adresine giderek uygulamaya erişin.

## ⚙️ Sistem Nasıl Çalışır? (`/contents` Klasörü) <a id="how-it-works"></a>

Aether Reader tamamen yerel dosya sistemi üzerinden çalışır ve veritabanı gerektirmez. Kütüphanenizi oluşturmak için `contents/` klasörünü şu şekilde düzenleyin:

```text
contents/
├── manga/
│   └── Pepper&Carrot/              ← seri adı
│       ├── cover.webp              ← seri kapağı
│       ├── 01 - Potion of Flight/  ← bölüm (görsellerden oluşan klasör)
│       │   ├── 01.webp
│       │   └── 02.webp
│       └── 02 - Rainbow Potions/
└── novel/
    └── Frankenstein/               ← seri adı
        ├── cover.webp
        ├── 01 - Letter 1.txt       ← bölüm (düz metin dosyası)
        └── 02 - Letter 2.txt
```

### Manga Okumak İçin
Dosyalarınızı `contents/manga/` dizinine ekleyin:
1. Klasör adı **Seri Adı** olarak kullanılır.
2. Her alt klasör bir **Bölüm**dür.
3. Bölüm klasöründeki görseller (`.jpg`, `.jpeg`, `.png`, `.webp`) doğal sırayla gösterilir (`2`, `10`'dan önce gelir).

### Roman Okumak İçin
Dosyalarınızı `contents/novel/` dizinine ekleyin:
1. Klasör adı **Seri Adı** olarak kullanılır.
2. Her `.txt` dosyası bir **Bölüm**dür. Boş satırlar paragrafları ayırır.

### Bölüm Adları
- Bölümler adlarına göre doğal sırayla dizilir.
- `01 - ` gibi bir sıralama ön eki arayüzde gizlenir; yani `07 - A Mad Tea-Party`, **A Mad Tea-Party** olarak görünür.
- `chapter-1` gibi basit adlar da çalışır ve **chapter 1** olarak görünür.

> **Kapak Resmi Ekleme:** Bir seri klasöründeki ilk görsel dosyası (örn. `cover.webp`) o serinin kapağı olarak kullanılır. Yoksa varsayılan bir kapak gösterilir.

## 📚 <a id="demo-content"></a> Demo İçerik

Depo, yalnızca kamu malı ve özgür lisanslı eserlerden oluşan küçük bir demo kütüphaneyle gelir:

- **Manga:** David Revoy'un *Pepper&Carrot*'u (CC BY 4.0), Katsushika Hokusai'nin *Hokusai Manga* ve *Fuji Dağı'nın Yüz Görünümü* eserleri (kamu malı)
- **Roman:** *Alice Harikalar Diyarında*, *Dracula*, *Frankenstein*, *Sherlock Holmes'un Maceraları*, *Dünyalar Savaşı*, *Oz Büyücüsü* ve *Define Adası* (Project Gutenberg, kamu malı)

Kaynaklar, yazarlar ve lisanslar [contents/CREDITS.md](contents/CREDITS.md) dosyasında listelenmiştir. Bu klasörleri silip kendi içeriğinizi ekleyebilirsiniz.

## 📄 Lisans <a id="license"></a>

Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına göz atabilirsiniz. Demo içerik kendi lisansını korur ([contents/CREDITS.md](contents/CREDITS.md) dosyasına bakın).

## 🖼️ Galeri <a id="gallery"></a>

<img src="md/screenshot-library.jpg" width="100%" />

#

<img src="md/screenshot-series.jpg" width="100%" />

#

<img src="md/screenshot-novel.jpg" width="100%" />

#

<p align="center">
  <sub>❤️ Developed by "Mustafa TAŞAL" (kintaro)</sub>
</p>
