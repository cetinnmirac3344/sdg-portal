 

 Projeyi Neden Seçtim 

 

Ödev konuları arasından 5. madde olan "Sürdürülebilir Kalkınma Hedefleri Portalı"nı seçtim. Aslında başta biraz kararsız kalmıştım ama BM'nin 17 tane hedefi var ve bunları görselleştirmek bana ilginç geldi. Hem de Dünya Bankası'nın açık API'si var, ordan veri çekebileceğimi gördüm. 

 

 Ne Kullandım 

 

Projeyi React ile yaptım. Sebebi daha önce biraz React görmüştüm ve component mantığı hoşuma gidiyor. CSS tarafında Tailwind CSS kullandım çünkü tek tek css yazmak yerine class isimleriyle halledilebiliyor, bayağı hızlandırıyor işi. 

 

Kullandığım şeyler: 

- React → ana framework, sayfaları componentlere böldüm 

- Vite → projeyi oluşturmak için (create-react-app yerine bunu kullandım çünkü daha hızlı) 

- Tailwind CSS v4 → stillendirme için 

- Axios → API'den veri çekmek için (fetch de olurdu ama axios daha pratik) 

- Recharts → grafik çizmek için (çizgi grafik, sütun grafik) 

- React Router → sayfalar arası geçiş 

- Lucide React → ikonlar için 

- LocalStorage → başarı hikayelerini kaydetmek için (veritabanı kullanmadım) 

 

Veri Kaynağı 

 

Dünya Bankası'nın açık API'sini kullandım. Adresi: `https://api.worldbank.org/v2/` 

 

Mesela Türkiye'nin GSYH verisini çekmek için şöyle bi istek atıyorum: 

``` 

https://api.worldbank.org/v2/country/TUR/indicator/NY.GDP.MKTP.CD?format=json&per_page=5 

``` 

Bu bana son 5 yılın verisini json olarak dönüyor. 

 

 Dashboard için çektiğim veriler 

 

- GSYH → `NY.GDP.MKTP.CD` 

- Enflasyon → `FP.CPI.TOTL.ZG` 

- Döviz kuru → `PA.NUS.FCRF` 

- İşsizlik → `SL.UEM.TOTL.ZS` 

 

 17 SDG hedefi için kullandığım gösterge kodları 

 

Her hedef için Dünya Bankası'nda en uygun göstergeyi bulmaya çalıştım. Bazıları tam birebir uymuyor ama en yakın olanı seçtim: 

 

1. Yoksulluğa Son → `SI.POV.DDAY` (günlük 2.15$ altında yaşayanlar) 

2. Açlığa Son → `SN.ITK.DEFC.ZS` (yetersiz beslenme) 

3. Sağlık → `SP.DYN.LE00.IN` (ortalama yaşam süresi) 

4. Eğitim → `SE.PRM.CMPT.ZS` (ilkokul bitirme oranı) 

5. Cinsiyet Eşitliği → `SG.GEN.PARL.ZS` (mecliste kadın oranı) 

6. Temiz Su → `SH.H2O.BASW.ZS` (temiz suya erişim) 

7. Temiz Enerji → `EG.ELC.ACCS.ZS` (elektriğe erişim) 

8. Ekonomik Büyüme → `SL.UEM.TOTL.ZS` (işsizlik, ters çevirdim) 

9. Sanayi → `NV.IND.TOTL.ZS` (sanayinin gsyh payı) 

10. Eşitsizlik → `SI.POV.GINI` (gini katsayısı, ters çevirdim) 

11. Şehirler → `SP.URB.TOTL.IN.ZS` (kentsel nüfus) 

12. Sorumlu Tüketim → `EG.FEC.RNEW.ZS` (yenilenebilir enerji) 

13. İklim → `EN.ATM.CO2E.PC` (co2 emisyonu, ters) 

14. Sudaki Yaşam → `ER.MRN.PTMR.ZS` (korunan deniz alanı) 

15. Karasal Yaşam → `AG.LND.FRST.ZS` (orman alanı) 

16. Barış → `VC.IHR.PSRC.P5` (cinayet oranı, ters) 

17. Ortaklıklar → `IT.NET.USER.ZS` (internet kullanım oranı) 

 

"Ters" dediğim şey şu: mesela işsizlik yüksekse bu kötü bi şey, o yüzden skoru hesaplarken ters çevirmem gerekiyor. Düşük işsizlik = yüksek skor olması lazım. Bunu min-max normalizasyonu ile yaptım. 

 

 Proje Yapısı 

 

``` 

sdg-portal/ 

├── src/ 

│   ├── components/ 

│   │   ├── Layout/ 

│   │   │   ├── Navbar.jsx        ← üst bar 

│   │   │   └── Sidebar.jsx       ← sol menü 

│   │   └── UI/ 

│   │       ├── StatCard.jsx      ← istatistik kartları 

│   │       ├── SDGProgressBar.jsx ← hedef kartları 

│   │       ├── DataTable.jsx     ← tablo (arama falan var) 

│   │       └── ModalForm.jsx     ← ekleme/düzenleme formu 

│   ├── pages/ 

│   │   ├── Dashboard.jsx         ← ana sayfa 

│   │   ├── GoalsList.jsx         ← 17 hedef listesi 

│   │   └── StoriesList.jsx       ← başarı hikayeleri 

│   ├── services/ 

│   │   └── api.js                ← api fonksiyonları 

│   ├── utils/ 

│   │   └── sdgData.js            ← hedeflerin isimleri renkleri vs 

│   ├── App.jsx 

│   ├── main.jsx 

│   └── index.css 

├── index.html 

├── vite.config.js 

└── package.json 

``` 

 

Nasıl Yaptım  

 

 1. Proje kurulumu 

 

Terminalde şunları yazdım: 

```bash 

npm create vite@latest sdg-portal -- --template react 

cd sdg-portal 

npm install 

``` 

Sonra gerekli paketleri kurdum: 

```bash 

npm install axios react-router-dom tailwindcss @tailwindcss/vite lucide-react recharts 

``` 

2. Tailwind ayarları 

 

Tailwind v4 kullandığım için biraz uğraştım açıkçası. Eski versiyondaki gibi `tailwind.config.js` ye content falan yazmak yerine `vite.config.js`'e `@tailwindcss/vite` pluginini ekledim. `index.css`'in başına da `@import "tailwindcss"` yazdım. Bunu tailwind'in kendi sitesindeki v4 dokümanından buldum. 

 

 3. Sayfa düzenini oluşturdum 

 

Önce layout'u yaptım. Sol tarafta sidebar var, üstte navbar var. React Router ile 3 sayfa tanımladım: 

- `/` → Dashboard 

- `/goals` → Hedef listesi 

- `/stories` → Başarı hikayeleri 

 

Sidebar'da NavLink kullandım, hangi sayfadaysan o link aktif görünüyor. 

 

 4. API katmanını yazdım (api.js) 

 

Bu dosya en çok uğraştığım kısım oldu. `veriCek()` diye bi fonksiyon yazdım, axios ile dünya bankası apisine istek atıyor. Sonra gelen veriyi `puanHesapla()` fonksiyonuyla 0-100 arasına normalize ediyorum. 

 

Grafikler için de `gecmisVeriCek()` yazdım, bu son 10 yılın verisini çekiyor. 

 

Normalizasyon mantığını istatistik dersinden biliyordum zaten. Min-max formülü: 

``` 

puan = (değer - min) / (max - min) × 100 

``` 

Ters göstergeler için de: 

``` 

puan = (max - değer) / (max - min) × 100 

``` 

 

 5. Dashboard sayfası 

 

Üstte 4 tane kart var (gsyh, enflasyon, kur, işsizlik). Bunların her birinin arkasında büyük bi ikon var, hover yapınca hafif yukarı kalkıyolar. 

 

Altına recharts ile 2 grafik koydum: 

- GSYH için çizgi grafik (LineChart) 

- Enflasyon için sütun grafik (BarChart) 

 

Recharts kullanımını recharts.org daki örneklerden baktım. `ResponsiveContainer` ile sarmalayınca otomatik ekrana uyum sağlıyor. 

 

 6. SDG hedef listesi 

 

17 hedefin her biri için kart yaptım. Kartların üstünde BM'nin resmi logoları var (open-sdg.github.io adresinden çekiyorum). Logo yüklenmezse diye yedek bi tasarım da koydum (fallback). 

 

Ülke filtresi var, dropdown'dan ülke seçince API'ye tekrar istek atılıp o ülkenin skorları geliyor. Tüm Dünya, Türkiye, ABD, Almanya, Çin ve Japonya seçenekleri var. 

 

 7. Başarı hikayeleri (CRUD kısmı) 

 

Bu sayfada tablo var, arama kutusuyla filtrelenebiliyor. CRUD işlemleri şöyle: 

- Ekle: "Yeni Ekle" butonuna basınca modal açılıyor, formu doldurup kaydediyosun 

- Listele: Tablo halinde gösteriliyor + arama var 

- Düzenle: Kalem ikonuna basınca aynı modal açılıp mevcut veriyi düzenliyosun 

- Sil: Çöp kutusu ikonuna basınca onay soruyor sonra siliyor 

 

Verileri localStorage'a kaydettim. Veritabanı kurmadım çünkü projenin amacı frontend odaklıydı. 

 

 8. SEO 

 

index.html'e title, description ve robots meta taglerini ekledim. Dil olarak tr ayarladım. 

 

 Sorunlar ve Çözümler 

 

- Tailwind v4'e geçerken eski config dosyası çalışmadı → migration guide'a baktım, vite pluginine geçtim 

- Bazı ülkelerde api'de veri yoktu → "Veri Yok" etiketi gösterdim 

- API'den gelen veriler farklı ölçeklerdeydi → min-max normalizasyonuyla 0-100'e çevirdim 

- Logo resimleri bazen yüklenmiyodu → onError ile fallback tasarım ekledim 

 

 Neler Öğrendim 

 

- React'te component mantığını daha iyi kavradım 

- API'den veri çekmeyi ve hata yönetimini öğrendim 

- Recharts ile grafik yapmayı öğrendim, aslında düşündüğümden kolaymış 

- Tailwind ile hızlı stil vermeyi öğrendim ama v4'ün dokumanı biraz eksik geldi 

- LocalStorage ile basit CRUD yapılabileceğini gördüm 

 

 Çalıştırmak İçin 

 

```bash 

cd sdg-portal 

npm install 

npm run dev 

``` 

Tarayıcıda `http://localhost:5173` adresinden açılıyor. 

 

 Kaynaklar 

 

- React dokumanı: react.dev 

- Vite: vite.dev 

- Tailwind CSS: tailwindcss.com/docs 

- Dünya Bankası API: datahelpdesk.worldbank.org 

- Recharts: recharts.org 

- Lucide ikonlar: lucide.dev 

- MDN (localStorage): developer.mozilla.org 

- BM SDG sayfası: un.org/sustainabledevelopment 

- SDG logoları: open-sdg.github.io 

- React Router: reactrouter.com 

- Stack Overflow (hata çözümleri için) 

- YouTube (Türkçe React dersleri) 

 

 

 
