import React, { useState, useEffect } from 'react';
import { sdgGoals } from '../utils/sdgData';
import SDGProgressBar from '../components/UI/SDGProgressBar';
import { hedefleriCek } from '../services/api';
import { Globe } from 'lucide-react';

const ULKELER = [
  { kod: 'WLD', isim: 'Tüm Dünya' },
  { kod: 'TUR', isim: 'Türkiye' },
  { kod: 'USA', isim: 'Amerika Birleşik Devletleri' },
  { kod: 'DEU', isim: 'Almanya' },
  { kod: 'CHN', isim: 'Çin' },
  { kod: 'JPN', isim: 'Japonya' }
];

const GoalsList = () => {
  const [seciliUlke, setSeciliUlke] = useState('WLD');
  const [ilerlemeVerisi, setIlerlemeVerisi] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    // baska ulke secilince bastan yukluyoruz
    const verileriYukle = async () => {
      setYukleniyor(true);
      try {
        const skorlar = await hedefleriCek(seciliUlke);
        
        // sabit verilerle apiden gelenleri birlestirdim
        const guncelListe = sdgGoals.map(hedef => ({
          ...hedef,
          ilerleme: skorlar[hedef.id] ? skorlar[hedef.id].ilerleme : 0,
          veriVarMi: skorlar[hedef.id] ? skorlar[hedef.id].veriVarMi : false
        }));
        
        setIlerlemeVerisi(guncelListe);
      } catch (hata) {
        console.error("veri yuklenirken patladı:", hata);
      } finally {
        setYukleniyor(false);
      }
    };

    verileriYukle();
  }, [seciliUlke]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">SDG Hedef Listesi</h1>
          <p className="text-sm text-gray-500 mt-1">Dünya Bankası verilerine göre güncel ilerleme durumu</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
          <Globe className="text-gray-400 ml-2" size={20} />
          <select 
            className="bg-transparent border-none outline-none text-gray-700 font-medium py-1 pr-4 cursor-pointer focus:ring-0"
            value={seciliUlke}
            onChange={(e) => setSeciliUlke(e.target.value)}
          >
            {ULKELER.map(ulke => (
              <option key={ulke.kod} value={ulke.kod}>
                {ulke.isim}
              </option>
            ))}
          </select>
        </div>
      </div>

      {yukleniyor ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A97D9]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ilerlemeVerisi.map(hedef => (
            <div key={hedef.id} className="relative">
              <SDGProgressBar 
                id={hedef.id}
                baslik={`${hedef.id}. ${hedef.title}`}
                aciklama={hedef.description}
                yuzde={hedef.ilerleme}
                renkKodu={hedef.hex}
                ikonAdi={hedef.icon}
              />
              {!hedef.veriVarMi && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-red-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-red-100 z-10">
                  Veri Yok
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsList;
