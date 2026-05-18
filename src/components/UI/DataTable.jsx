import React, { useState } from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';

const DataTable = ({ veri, kolonlar, duzenleFonk, silFonk }) => {
  const [aramaKelimesi, setAramaKelimesi] = useState('');

  // arama yapinca filtreliyoruz
  const filtrelenmisVeri = veri.filter(eleman => 
    Object.values(eleman).some(deger => 
      String(deger).toLowerCase().includes(aramaKelimesi.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* arama kutusu */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="relative w-64">
          <input 
            type="text" 
            placeholder="Tabloda ara..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A97D9] focus:border-[#0A97D9] outline-none text-sm transition-shadow"
            value={aramaKelimesi}
            onChange={(e) => setAramaKelimesi(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="text-sm text-gray-500">
          Toplam {filtrelenmisVeri.length} kayıt
        </div>
      </div>

      {/* asil tablo */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              {kolonlar.map((kolon, index) => (
                <th key={index} className="px-6 py-4 font-semibold">{kolon.baslik}</th>
              ))}
              <th className="px-6 py-4 text-right font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filtrelenmisVeri.length > 0 ? (
              filtrelenmisVeri.map((satir) => (
                <tr key={satir.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  {kolonlar.map((kolon, index) => (
                    <td key={index} className="px-6 py-4">
                      {kolon.render ? kolon.render(satir) : satir[kolon.veriKey]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => duzenleFonk(satir)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => silFonk(satir.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={kolonlar.length + 1} className="px-6 py-8 text-center text-gray-500">
                  Sonuç bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
