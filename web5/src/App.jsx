import phonePattern from "./helpers/phonePattern";
import { toast } from "react-toastify";
import axios from "axios";
import './App.css';
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await axios({
        method: "post",
        url: `https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/sendMessage`,
        params: {
          chat_id: import.meta.env.VITE_CHAT_ID,
          text: `<b>🔔 New Lead</b>\n\nIsm: ${formData.get("name")}\nTelefon: +998${formData.get("phone").replaceAll(" ", "")}`,
          parse_mode: "HTML",
          message_thread_id: import.meta.env.VITE_THREAD_ID
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
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center bg-[linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url('/images/background.jpg')]" >
      {/* <img src="/images/decoration.png" alt="happy new year" className='absolute w-full md:w-md md:left-[50%] md:translate-x-[-50%] top-[-44px] left-0' /> */}

      <form onSubmit={onSubmit} className="flex flex-col items-center w-full p-4 md:w-md gap-4">
        <img src="/images/logo.png" alt="logo" className='w-34 h-34 outline-1 outline-gray-700 rounded-full' />
        <h1 className='text-2xl text-white hidden'>Baraka Premium</h1>
        <h2 className='text-xl text-white mb-2'>Ma'lumotlaringizni qoldiring</h2>

        <input type="text" name='name' placeholder='Ismingiz' className='text-white placeholder:text-gray-500 pl-4 block w-full h-12 outline-1 outline-yellow-700 focus:outline-yellow-500 rounded-xl' minLength={3} required />
        <div className="relative w-full">
          <label htmlFor="phone" className='absolute top-[50%] translate-y-[-50%] left-4 text-white'>+998</label>
          <input type="text" inputMode="decimal" onChange={phonePattern} id='phone' name='phone' placeholder='Telefon raqam' className='text-white placeholder:text-gray-500 pl-15 block w-full h-12 outline-1 outline-yellow-700 focus:outline-yellow-500 rounded-xl' maxLength={12} required />
        </div>

        <button type="submit" className='cursor-pointer w-full h-12 text-white hover:bg-yellow-400 bg-yellow-500 rounded-xl'>Yuborish</button>

        <a href='https://t.me/barakapremiumbot' className="flex gap-2 items-center mt-4 border-b-1 border-gray-400 pb-1 pr-3">
          <img src="/images/telegram.webp" className='w-8 h-8' />
          <span className='font-light text-gray-300'>Konkursda ishtirok etish</span>
        </a>
      </form>

    </div >
  );
};

export default App;