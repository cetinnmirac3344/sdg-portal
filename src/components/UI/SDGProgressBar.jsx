import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const SDGProgressBar = ({ id, baslik, aciklama, yuzde, renkKodu, ikonAdi }) => {
  const [resimHata, setResimHata] = useState(false);
  
  // lucideden ikonu aliyorum
  const IkonBileseni = Icons[ikonAdi] || Icons.HelpCircle;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* ustteki resim kismi */}
      <div 
        className="w-full aspect-square relative flex items-center justify-center"
        style={{ backgroundColor: resimHata ? renkKodu : 'transparent' }}
      >
        {!resimHata ? (
          <img 
            src={`https://open-sdg.github.io/sdg-translations/assets/img/goals/tr/${id}.png`}
            alt={`${baslik} Logo`}
            className="w-full h-full object-contain"
            onError={() => {
              // resim yuklenmezse diye
              setResimHata(true);
            }}
          />
        ) : (
          // resim yoksa css ile yapilan tasarim
          <div className="flex flex-col items-center justify-center text-white p-4 text-center">
            <span className="text-4xl font-bold opacity-30 absolute top-2 left-2">{id}</span>
            <IkonBileseni size={40} className="mb-2" strokeWidth={1.5} />
            <h3 className="text-lg font-bold leading-tight">{baslik.replace(/^\d+\.\s*/, '')}</h3>
          </div>
        )}
      </div>

      {/* yazi ve bar kismi */}
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <p className="text-gray-500 text-xs mb-3 md:mb-4 flex-1 line-clamp-3 md:line-clamp-4" title={aciklama}>
          {aciklama}
        </p>
        
        {/* bar */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">İlerleme Skoru</span>
            <span 
              className="text-base font-bold leading-none" 
              style={{ color: renkKodu }}
            >
              %{yuzde}
            </span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
            <div 
              className="h-2.5 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${yuzde}%`, backgroundColor: renkKodu }}
            >
              {/* uzerindeki parlama animasyonu */}
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/20" style={{ transform: 'skewX(-20deg) translateX(-150%)', animation: 'shimmer 2s infinite' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDGProgressBar;
