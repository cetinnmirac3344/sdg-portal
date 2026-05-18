import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({ baslik, deger, birim, ikon: Ikon, renk, degisim }) => {
  // renk kodunu arka plan ve text icin parcaliyorum
  const isBlue = renk.includes('blue');
  const isRed = renk.includes('red');
  const isYellow = renk.includes('yellow');
  
  let arkaplanSinifi = isBlue ? 'from-blue-50 to-blue-100/50 text-blue-600' :
                       isRed ? 'from-red-50 to-red-100/50 text-red-600' :
                       isYellow ? 'from-yellow-50 to-yellow-100/50 text-yellow-600' :
                       'from-purple-50 to-purple-100/50 text-purple-600';

  let ikonArkaplan = isBlue ? 'bg-blue-100 text-blue-600' :
                     isRed ? 'bg-red-100 text-red-600' :
                     isYellow ? 'bg-yellow-100 text-yellow-600' :
                     'bg-purple-100 text-purple-600';

  return (
    <div className={`bg-gradient-to-br ${arkaplanSinifi} rounded-2xl p-6 shadow-sm border border-white/50 hover:shadow-lg transition-all transform hover:-translate-y-1 relative overflow-hidden`}>
      {/* arkadaki dev ikon */}
      <div className="absolute -right-4 -top-4 opacity-10 transform rotate-12">
        <Ikon size={120} />
      </div>

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-semibold opacity-70 mb-2">{baslik}</p>
          <h3 className="text-3xl font-bold">
            {deger !== null ? (
              <>
                {deger.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                <span className="text-base font-normal opacity-70 ml-1">{birim}</span>
              </>
            ) : (
              <span className="text-gray-400 text-lg">Yükleniyor...</span>
            )}
          </h3>
        </div>
        <div className={`p-4 rounded-xl ${ikonArkaplan} shadow-sm`}>
          <Ikon size={32} />
        </div>
      </div>
      
      {degisim !== undefined && deger !== null && (
        <div className="mt-6 flex items-center text-sm relative z-10 bg-white/40 inline-flex px-3 py-1.5 rounded-full backdrop-blur-sm">
          {degisim > 0 ? (
            <span className="text-green-600 flex items-center font-bold">
              <TrendingUp size={16} className="mr-1" />
              +{degisim}%
            </span>
          ) : degisim < 0 ? (
            <span className="text-red-600 flex items-center font-bold">
              <TrendingDown size={16} className="mr-1" />
              {degisim}%
            </span>
          ) : (
            <span className="text-gray-600 flex items-center font-bold">
              <Minus size={16} className="mr-1" />
              0%
            </span>
          )}
          <span className="text-gray-600 opacity-70 ml-2 font-medium">geçen yıla göre</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
