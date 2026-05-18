import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { sdgGoals } from '../../utils/sdgData';

const ModalForm = ({ acikMi, kapat, kaydet, mevcutVeri }) => {
  const [formDegerleri, setFormDegerleri] = useState({
    baslik: '',
    hedefId: '',
    aciklama: '',
    yazar: ''
  });

  // mevcut veri gelirse formu dolduruyoruz
  useEffect(() => {
    if (mevcutVeri) {
      setFormDegerleri(mevcutVeri);
    } else {
      setFormDegerleri({ baslik: '', hedefId: '', aciklama: '', yazar: '' });
    }
  }, [mevcutVeri, acikMi]);

  if (!acikMi) return null;

  const formuGonder = (e) => {
    e.preventDefault();
    kaydet({
      ...formDegerleri,
      id: mevcutVeri ? mevcutVeri.id : Date.now().toString(),
      tarih: mevcutVeri ? mevcutVeri.tarih : new Date().toLocaleDateString('tr-TR')
    });
    kapat();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">
            {mevcutVeri ? 'Hikayeyi Düzenle' : 'Yeni Başarı Hikayesi'}
          </h3>
          <button onClick={kapat} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={formuGonder} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A97D9] focus:border-[#0A97D9] outline-none"
              placeholder="Hikaye başlığı"
              value={formDegerleri.baslik}
              onChange={(e) => setFormDegerleri({...formDegerleri, baslik: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">İlgili Hedef (SDG)</label>
            <select 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A97D9] focus:border-[#0A97D9] outline-none"
              value={formDegerleri.hedefId}
              onChange={(e) => setFormDegerleri({...formDegerleri, hedefId: e.target.value})}
            >
              <option value="">Hedef Seçin...</option>
              {sdgGoals.map(hedef => (
                <option key={hedef.id} value={hedef.id}>{hedef.id}. {hedef.title}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Yazar / Kurum</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A97D9] focus:border-[#0A97D9] outline-none"
              placeholder="Kim tarafından eklendi?"
              value={formDegerleri.yazar}
              onChange={(e) => setFormDegerleri({...formDegerleri, yazar: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea 
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A97D9] focus:border-[#0A97D9] outline-none resize-none"
              placeholder="Hikaye detayları..."
              value={formDegerleri.aciklama}
              onChange={(e) => setFormDegerleri({...formDegerleri, aciklama: e.target.value})}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={kapat}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              İptal
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-white bg-[#0A97D9] hover:bg-[#087DB5] rounded-lg font-medium transition-colors"
            >
              {mevcutVeri ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
