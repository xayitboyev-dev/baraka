import { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import "./App.css";

const BOT_TOKEN = "8925060597:AAHCm35W3slmpxlGmI2xmTTgSRApFj5LMes";
const CHAT_ID = "-1004330768512";
const TARGET_DATE = "2026-08-05 20:00:00";

export default function App() {
  const [loading, setLoading] = useState();
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

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await axios({
        method: "post",
        url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        params: {
          chat_id: CHAT_ID,
          text: `<b>🔔 New Lead</b>\n\nIsm: ${formData.get("name")}\nTelefon: ${formData.get("phone").replaceAll(" ", "")}`,
          parse_mode: "HTML",
        },
      });

      toast.success("Yuborildi");
      e.target.reset();

      setTimeout(() => {
        window.location.href = "https://t.me/baraka_premiumm";
      }, 500);
    } catch (error) {
      toast.error(error.response?.data || error.message);
    };


    setLoading(false);
  };

  return (
    <div className='min-h-screen'>
      <div className="flex flex-col gap-4 md:max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 mb-[-18px]" style={{ background: "#93b8de" }}>
          <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white">
            <img src="/calendar.png" className="w-5 h-5" />
            <span className="font-semibold">5-Avgust</span>
          </div>
          <img src="/logo.png" className="w-22" />
          <div className="flex items-center gap-2 py-2 px-5 rounded-xl bg-white">
            <img src="/clock.png" className="w-5 h-5" />
            <span className="font-semibold">20:00</span>
          </div>
        </div>

        {/* Hero */}
        <div className="flex flex-col mb-20" style={{ background: "linear-gradient(to bottom, #93b8de, #93b8de, #93b8de, transparent)" }}>
          {/* <h2 className="roboto-condensed-bold text-center text-3xl font-bold text-white">OLMALIQ SHAHRIDA</h2>
          <h2 className="roboto-condensed-bold text-center text-4xl text-[var(--primary)] font-bold bg-gradient-to-b from-orange-500 via-yellow-500 to-orange-500 bg-clip-text">3 900 000 so‘mdan</h2>
          <h2 className="roboto-condensed-bold text-center text-3xl font-bold text-white">XONADON XARID QILING</h2> */}
          <img src="/heroText.png" className="translate-y-12 z-10" />

          <div className="relative">
            <img src="/hero2.png" className="w-full" />
            <form onSubmit={onFormSubmit} className="absolute flex flex-col w-[90%] shadow bottom-[-70px] left-[50%] translate-x-[-50%] gap-2 bg-white rounded-2xl p-4 pt-3">
              <h2 className="text-center text-xl font-bold">Ariza qoldirish</h2>
              <input type="text" name="name" className="p-3 bg-white border-1 border-[var(--primary)] rounded-2xl placeholder:text-gray-400" placeholder="Ismingiz" />
              <input type="text" name="phone" className="p-3 bg-white border-1 border-[var(--primary)] rounded-2xl" placeholder="Telefon" defaultValue={"+998"} inputMode="decimal" />
              <button type="submit" disabled={loading} className="p-4 bg-[var(--primary)] rounded-2xl text-white">{loading ? "Loading..." : "Yuborish"}</button>
            </form>
          </div>
        </div>

        {/* Line */}
        <div className="flex gap-1 items-center justify-center bg-white text-sm">
          <h4>JOYLAR SONI CHEKLANGAN</h4>
          <Dot size={30} color="#000" />
          <h4>ULGURIB QOLING</h4>
        </div>

        {/* Section counter */}
        <div className="flex flex-col gap-4 items-center bg-white rounded-4xl p-4 m-3 mt-0">
          <h2 className="text-[var(--primary)] font-bold text-xl">AKSIYAGACHA QOLDI</h2>

          <div className="flex items-center gap-1 w-full text-2xl font-semibold">
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2">
              <h2 className="text-4xl font-bold">{String(time.days).padStart(2, "0")}</h2>
              <span className="text-gray-500 text-sm font-medium">KUN</span>
            </div>
            <span>:</span>
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2">
              <h2 className="text-4xl font-bold">{String(time.hours).padStart(2, "0")}</h2>
              <span className="text-gray-500 text-sm font-medium">SOAT</span>
            </div>
            <span>:</span>
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2">
              <h2 className="text-4xl font-bold">{String(time.minutes).padStart(2, "0")}</h2>
              <span className="text-gray-500 text-sm font-medium">DAQIQA</span>
            </div>
            <span>:</span>
            <div className="flex flex-col gap-1 items-center flex-1 border-1 border-[var(--primary)] rounded-3xl py-2">
              <h2 className="text-4xl font-bold">{String(time.seconds).padStart(2, "0")}</h2>
              <span className="text-gray-500 text-sm font-medium">SONIYA</span>
            </div>
          </div>
        </div>

        {/* Section gifts */}
        <div className="flex flex-col gap-4 items-center bg-white rounded-4xl m-3 mt-0 p-2">
          <div className="flex items-center gap-2 mt-2">
            <h2 className="text-[var(--primary)] font-bold text-xl">MAXSUS SOVG'ALAR</h2>
            <img src="/gift.png" className="w-7" />
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="flex flex-col gap-2 items-center py-2 bg-gray-100 rounded-3xl">
              <img src="/gifts/onix.png" className="w-25 h-18" />
              <h4 className="text-gray-600 text-xs">ONIX MASHINASI</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-2 bg-gray-100 rounded-3xl">
              <img src="/gifts/tv.png" className="w-18 h-18" />
              <h4 className="text-gray-600 text-xs">TELEVIZOR</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-2 bg-gray-100 rounded-3xl">
              <img src="/gifts/freezer.png" className="w-18 h-18" />
              <h4 className="text-gray-600 text-xs">MUZLATGICH</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-2 bg-gray-100 rounded-3xl">
              <img src="/gifts/conditioner.png" className="w-18 h-18" />
              <h4 className="text-gray-600 text-xs">KONDITSIONER</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-2 bg-gray-100 rounded-3xl">
              <img src="/gifts/cleaner.png" className="w-18 h-18" />
              <h4 className="text-gray-600 text-xs">CHANG YUTGICH</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-2 bg-gray-100 rounded-3xl">
              <img src="/gifts/toaster.png" className="w-18 h-18" />
              <h4 className="text-gray-600 text-xs">MINI PECH</h4>
            </div>
          </div>
        </div>

        {/* Section waiting */}
        <div className="flex flex-col gap-4 items-center bg-white rounded-4xl m-3 mt-0 p-2">
          <div className="flex items-center gap-2 mt-2">
            <h2 className="text-[var(--primary)] font-bold text-xl">SIZNI KUTMOQDA</h2>
            <img src="/gift.png" className="w-7" />
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="flex flex-col gap-2 items-center py-4 bg-gray-100 rounded-3xl">
              <img src="/percent.png" className="w-10 h-10" />
              <h4 className="text-gray-600 text-xs text-center">BOSHLANG'ICH TO'LOVSIZ</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-4 bg-gray-100 rounded-3xl">
              <img src="/date.png" className="w-10 h-10" />
              <h4 className="text-gray-600 text-xs text-center">BO'LIB TO'LASH IMKONIYATI</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-4 bg-gray-100 rounded-3xl">
              <img src="/percentage.png" className="w-10 h-10" />
              <h4 className="text-gray-600 text-xs text-center">FOIZLAR VA PENYALARSIZ</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-4 bg-gray-100 rounded-3xl">
              <img src="/place.png" className="w-10 h-10" />
              <h4 className="text-gray-600 text-xs text-center">BOLALAR MAYDONCHASI</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-4 bg-gray-100 rounded-3xl">
              <img src="/parking.png" className="w-10 h-10" />
              <h4 className="text-gray-600 text-xs text-center">AVTO <br /> TURARGOH</h4>
            </div>
            <div className="flex flex-col gap-2 items-center py-4 bg-gray-100 rounded-3xl">
              <img src="/lift.png" className="w-10 h-10" />
              <h4 className="text-gray-600 text-xs text-center">ZAMONAVIY <br /> LIFT</h4>
            </div>
          </div>
        </div>

        {/* Footer */}
        <a href="https://t.me/baraka_premiumm" className="text-white text-2xl mx-3 mt-0 mb-6 font-bold flex items-center justify-center gap-4 bg-[var(--primary)] rounded-full py-5">
          <img src="/telegram.png" className="w-7" />
          TELEGRAM KANAL
        </a>
      </div>
    </div>
  );
};