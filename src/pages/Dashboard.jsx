import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Percent, Briefcase } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/UI/StatCard';
import { tumDashboardVerileriniCek } from '../services/api';

const Dashboard = () => {
  const [veriler, setVeriler] = useState({
    gdp: null,
    enflasyon: null,
    kur: null,
    issizlik: null,
    gdpGecmis: [],
    enflasyonGecmis: []
  });

  useEffect(() => {
    // api'den verileri getiriyorum
    const verileriGetir = async () => {
      const sonuc = await tumDashboardVerileriniCek();
      setVeriler(sonuc);
    };
    verileriGetir();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Türkiye Makroekonomik Göstergeleri</h1>
          <p className="text-sm text-gray-500 mt-1">Kaynak: Dünya Bankası API (World Bank)</p>
        </div>
      </div>

      {/* ustteki 4 ana kart */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          baslik="Toplam GSYH" 
          deger={veriler.gdp ? veriler.gdp / 1000000000 : null} 
          birim="Milyar $" 
          ikon={DollarSign} 
          renk="text-blue-500" 
          degisim={3.2}
        />
        <StatCard 
          baslik="Enflasyon (TÜFE)" 
          deger={veriler.enflasyon} 
          birim="%" 
          ikon={TrendingUp} 
          renk="text-red-500"
          degisim={-1.5}
        />
        <StatCard 
          baslik="Döviz Kuru (USD/TRY)" 
          deger={veriler.kur} 
          birim="₺" 
          ikon={Percent} 
          renk="text-yellow-500"
          degisim={8.4}
        />
        <StatCard 
          baslik="İşsizlik Oranı" 
          deger={veriler.issizlik} 
          birim="%" 
          ikon={Briefcase} 
          renk="text-purple-500"
          degisim={-0.2}
        />
      </div>
      
      {/* alt kisimdaki grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* cizgi grafik */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">GSYH 10 Yıllık Trend (Milyar $)</h2>
          <div className="h-[300px] w-full">
            {veriler.gdpGecmis && veriler.gdpGecmis.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={veriler.gdpGecmis.map(item => ({...item, deger: item.deger / 1000000000}))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="yil" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    formatter={(deger) => [`${deger.toFixed(2)} Milyar $`, 'GSYH']}
                    labelStyle={{color: '#4B5563', fontWeight: 'bold', marginBottom: '4px'}}
                  />
                  <Line type="monotone" dataKey="deger" stroke="#3B82F6" strokeWidth={4} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">Veri Yükleniyor...</div>
            )}
          </div>
        </div>

        {/* sutun grafik */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Enflasyon Geçmişi (%)</h2>
          <div className="h-[300px] w-full">
            {veriler.enflasyonGecmis && veriler.enflasyonGecmis.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={veriler.enflasyonGecmis}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="yil" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    formatter={(deger) => [`%${deger}`, 'Enflasyon']}
                    cursor={{fill: '#f3f4f6'}}
                  />
                  <Bar dataKey="deger" fill="#EF4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">Veri Yükleniyor...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
