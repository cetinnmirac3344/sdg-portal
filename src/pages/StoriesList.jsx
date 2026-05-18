import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../components/UI/DataTable';
import ModalForm from '../components/UI/ModalForm';
import { sdgGoals } from '../utils/sdgData';

const StoriesList = () => {
  const [hikayeler, setHikayeler] = useState([]);
  const [modalAcik, setModalAcik] = useState(false);
  const [duzenlenenHikaye, setDuzenlenenHikaye] = useState(null);

  // localstoragedan hikayeleri aliyoruz
  useEffect(() => {
    const kayitliHikayeler = localStorage.getItem('sdgStories');
    const ornekVeri = [
      { id: '1', baslik: 'Okullarda Sıfır Atık', hedefId: '12', aciklama: 'Geri dönüşüm projesi...', yazar: 'Milli Eğitim Bakanlığı', tarih: '10.05.2026' },
      { id: '2', baslik: 'Kadın Girişimcilere Destek', hedefId: '5', aciklama: 'Kırsaldaki kadınlara mikro kredi...', yazar: 'KOSGEB', tarih: '12.05.2026' },
    ];

    if (kayitliHikayeler) {
      const ayrilmis = JSON.parse(kayitliHikayeler);
      // Eski ingilizce formatta kalmis veri varsa (goalId vb.) temizle ve ornek veriyi goster
      if (ayrilmis.length > 0 && !ayrilmis[0].baslik) {
        setHikayeler(ornekVeri);
        localStorage.setItem('sdgStories', JSON.stringify(ornekVeri));
      } else {
        setHikayeler(ayrilmis);
      }
    } else {
      setHikayeler(ornekVeri);
      localStorage.setItem('sdgStories', JSON.stringify(ornekVeri));
    }
  }, []);

  // yeni kayit ekleme veya guncelleme
  const kaydet = (gelenVeri) => {
    let yeniListe;
    if (duzenlenenHikaye) {
      yeniListe = hikayeler.map(h => h.id === gelenVeri.id ? gelenVeri : h);
    } else {
      yeniListe = [gelenVeri, ...hikayeler];
    }
    setHikayeler(yeniListe);
    localStorage.setItem('sdgStories', JSON.stringify(yeniListe));
    setDuzenlenenHikaye(null);
  };

  const duzenle = (hikaye) => {
    setDuzenlenenHikaye(hikaye);
    setModalAcik(true);
  };

  const sil = (id) => {
    if (window.confirm('Bu hikayeyi silmek istediğinize emin misiniz?')) {
      const yeniListe = hikayeler.filter(h => h.id !== id);
      setHikayeler(yeniListe);
      localStorage.setItem('sdgStories', JSON.stringify(yeniListe));
    }
  };

  const yeniEkleAc = () => {
    setDuzenlenenHikaye(null);
    setModalAcik(true);
  };

  const kolonlar = [
    { baslik: 'Başlık', veriKey: 'baslik' },
    { 
      baslik: 'İlgili Hedef', 
      veriKey: 'hedefId',
      render: (satir) => {
        const hedef = sdgGoals.find(g => g.id.toString() === satir.hedefId.toString());
        return (
          <span 
            className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: hedef ? hedef.hex : '#9CA3AF' }}
          >
            {hedef ? `${hedef.id}. ${hedef.title}` : 'Bilinmeyen'}
          </span>
        );
      }
    },
    { baslik: 'Yazar/Kurum', veriKey: 'yazar' },
    { baslik: 'Tarih', veriKey: 'tarih' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Başarı Hikayeleri</h1>
          <p className="text-sm text-gray-500 mt-1">SDG projeleri ve yerel başarılar</p>
        </div>
        <button 
          onClick={yeniEkleAc}
          className="bg-[#0A97D9] hover:bg-[#087DB5] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Yeni Ekle</span>
        </button>
      </div>

      <DataTable 
        veri={hikayeler} 
        kolonlar={kolonlar} 
        duzenleFonk={duzenle} 
        silFonk={sil} 
      />

      <ModalForm 
        acikMi={modalAcik}
        kapat={() => setModalAcik(false)}
        kaydet={kaydet}
        mevcutVeri={duzenlenenHikaye}
      />
    </div>
  );
};

export default StoriesList;
