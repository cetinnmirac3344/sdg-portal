import axios from 'axios';

const BASE_URL = 'https://api.worldbank.org/v2';

// Temel 4 gosterge
const GOSTERGELER = {
  GDP: 'NY.GDP.MKTP.CD',
  INFLATION: 'FP.CPI.TOTL.ZG',
  EXCHANGE: 'PA.NUS.FCRF',
  UNEMPLOYMENT: 'SL.UEM.TOTL.ZS',
};

// 17 hedef icin indikatörler (bazıları tam uymasa da en yakınını sectim)
const HEDEF_GOSTERGELERI = {
  1: { code: 'SI.POV.DDAY', ters: true, min: 0, max: 20 },
  2: { code: 'SN.ITK.DEFC.ZS', ters: true, min: 0, max: 20 },
  3: { code: 'SP.DYN.LE00.IN', ters: false, min: 50, max: 85 },
  4: { code: 'SE.PRM.CMPT.ZS', ters: false, min: 50, max: 100 },
  5: { code: 'SG.GEN.PARL.ZS', ters: false, min: 0, max: 50 },
  6: { code: 'SH.H2O.BASW.ZS', ters: false, min: 40, max: 100 },
  7: { code: 'EG.ELC.ACCS.ZS', ters: false, min: 40, max: 100 },
  8: { code: 'SL.UEM.TOTL.ZS', ters: true, min: 0, max: 20 },
  9: { code: 'NV.IND.TOTL.ZS', ters: false, min: 10, max: 50 },
  10: { code: 'SI.POV.GINI', ters: true, min: 20, max: 60 },
  11: { code: 'SP.URB.TOTL.IN.ZS', ters: false, min: 20, max: 100 },
  12: { code: 'EG.FEC.RNEW.ZS', ters: false, min: 0, max: 50 },
  13: { code: 'EN.ATM.CO2E.PC', ters: true, min: 0, max: 15 },
  14: { code: 'ER.MRN.PTMR.ZS', ters: false, min: 0, max: 30 },
  15: { code: 'AG.LND.FRST.ZS', ters: false, min: 0, max: 60 },
  16: { code: 'VC.IHR.PSRC.P5', ters: true, min: 0, max: 15 },
  17: { code: 'IT.NET.USER.ZS', ters: false, min: 10, max: 100 },
};

// gelen degeri 0-100 arasi nota ceviriyorum
const puanHesapla = (deger, min, max, ters) => {
  if (deger === null || deger === undefined) return null;
  
  let puan = 0;
  if (ters) {
    puan = ((max - deger) / (max - min)) * 100;
  } else {
    puan = ((deger - min) / (max - min)) * 100;
  }

  if (puan > 100) return 100;
  if (puan < 0) return 0;
  return Math.round(puan);
};

// tek bi veriyi api'den ceken fonksiyon
export const veriCek = async (kod, ulke = 'TUR') => {
  try {
    const cevap = await axios.get(`${BASE_URL}/country/${ulke}/indicator/${kod}`, {
      params: { format: 'json', per_page: 5 }
    });

    if (cevap.data && cevap.data[1]) {
      const guncelVeri = cevap.data[1].find(item => item.value !== null);
      return guncelVeri ? guncelVeri.value : null;
    }
    return null;
  } catch (hata) {
    console.error("veri cekilirken hata cikti:", hata);
    return null;
  }
};

// ana sayfa icin 4 veriyi birden cekme
export const tumDashboardVerileriniCek = async () => {
  const [gdp, enflasyon, kur, issizlik] = await Promise.all([
    veriCek(GOSTERGELER.GDP),
    veriCek(GOSTERGELER.INFLATION),
    veriCek(GOSTERGELER.EXCHANGE),
    veriCek(GOSTERGELER.UNEMPLOYMENT)
  ]);
  
  // grafikler icin gecmis veriler
  const [gdpGecmis, enflasyonGecmis] = await Promise.all([
    gecmisVeriCek(GOSTERGELER.GDP),
    gecmisVeriCek(GOSTERGELER.INFLATION)
  ]);

  return { gdp, enflasyon, kur, issizlik, gdpGecmis, enflasyonGecmis };
};

// yillara gore gecmis verileri cekmek icin
export const gecmisVeriCek = async (kod, ulke = 'TUR', yilSayisi = 10) => {
  try {
    const cevap = await axios.get(`${BASE_URL}/country/${ulke}/indicator/${kod}`, {
      params: { format: 'json', per_page: yilSayisi }
    });

    if (cevap.data && cevap.data[1]) {
      const veriler = cevap.data[1]
        .filter(item => item.value !== null)
        .map(item => ({
          yil: item.date,
          deger: Number(item.value.toFixed(2))
        }))
        .reverse();
        
      return veriler;
    }
    return [];
  } catch (hata) {
    console.error("gecmis veride hata:", hata);
    return [];
  }
};

// 17 hedefin hepsini cek
export const hedefleriCek = async (ulke = 'WLD') => {
  const isler = Object.entries(HEDEF_GOSTERGELERI).map(async ([hedefId, ayar]) => {
    const hamDeger = await veriCek(ayar.code, ulke);
    const skor = puanHesapla(hamDeger, ayar.min, ayar.max, ayar.ters);
    
    return {
      id: parseInt(hedefId),
      ilerleme: skor !== null ? skor : 0,
      veriVarMi: skor !== null
    };
  });

  const sonuclar = await Promise.all(isler);
  
  // arrayi objeye donusturuyorum rahat kullanmak icin
  return sonuclar.reduce((toplam, mevcut) => {
    toplam[mevcut.id] = mevcut;
    return toplam;
  }, {});
};
