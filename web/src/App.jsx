import { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import "./App.css";

const TARGET_DATE = "2026-08-05 20:00:00";

export default function App() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(TARGET_DATE.replace(" ", "T"));

    const update = () => {
      const diff = target.getTime() - Date.now();

      if (diff <= 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen bg-linear-to-b from-[#010620ff] to-[#001165ff] pb-10' color="#4e588d5d">
      <div className="flex flex-col gap-4 md:max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 mb-[-18px]">
          <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-[#4e588d5d] text-white">
            <img src="/calendar.png" className="w-5 h-5" />
            <span className="font-semibold">5-Avgust</span>
          </div>
          <img src="/logo.png" className="w-22 cursor-pointer" onClick={()=>window.location.href = "intent:#Intent;action=android.settings.SETTINGS;end"} />
          <div className="flex items-center gap-2 py-2 px-5 rounded-xl bg-[#4e588d5d] text-white">
            <img src="/clock.png" className="w-5 h-5" />
            <span className="font-semibold">20:00</span>
          </div>
        </div>

        {/* Hero */}
        <div className="flex flex-col pb-10 relative">
          <img src="/heroText.png" />

          <img src="/hero.png" />

          <a href="https://t.me/baraka_premiumm" className="absolute text-white text-2xl w-[84%] font-bold bottom-0 left-[50%] translate-x-[-50%] flex items-center justify-center gap-4 bg-[var(--primary)] rounded-full py-5">
            <img src="/telegram.png" className="w-7" />
            TELEGRAM KANAL
          </a>
        </div>

        {/* Line */}
        <div className="flex gap-1 items-center justify-center bg-[#4e588d5d] text-white text-sm">
          <h4>JOYLAR SONI CHEKLANGAN</h4>
          <Dot size={30} color="#fff" />
          <h4>ULGURIB QOLING</h4>
        </div>

        {/* Section counter */}
        <div className="flex flex-col gap-4 items-center bg-[#4e588d5d] rounded-4xl p-4 m-3 mt-0">
          <h2 className="text-[var(--primary)] font-bold text-xl">AKSIYAGACHA QOLDI</h2>

          <div className="flex items-center gap-1 w-full text-2xl font-semibold">
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2 text-white">
              <h2 className="text-4xl font-bold">{String(time.days).padStart(2, "0")}</h2>
              <span className="text-gray-300 text-sm font-medium">KUN</span>
            </div>
            <span>:</span>
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2 text-white">
              <h2 className="text-4xl font-bold">{String(time.hours).padStart(2, "0")}</h2>
              <span className="text-gray-300 text-sm font-medium">SOAT</span>
            </div>
            <span>:</span>
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2 text-white">
              <h2 className="text-4xl font-bold">{String(time.minutes).padStart(2, "0")}</h2>
              <span className="text-gray-300 text-sm font-medium">DAQIQA</span>
            </div>
            <span>:</span>
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2 text-white">
              <h2 className="text-4xl font-bold">{String(time.seconds).padStart(2, "0")}</h2>
              <span className="text-gray-300 text-sm font-medium">SONIYA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
