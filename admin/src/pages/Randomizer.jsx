import React, { useEffect } from 'react';
import { RefreshCcw } from "lucide-react";
import formatPhone from '../helpers/formatPhone';
import Confetti from 'react-confetti-boom';
import axios from "axios";

export default function Randomizer() {
  const [stats, setStats] = React.useState();
  const [users, setUsers] = React.useState();
  const [randomUser, setRandomUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [minReferral, setMinReferral] = React.useState('');
  const [maxReferral, setMaxReferral] = React.useState('');
  const [minReferralRandom, setMinReferralRandom] = React.useState('');
  const [maxReferralRandom, setMaxReferralRandom] = React.useState('');
  const [intervalId, setIntervalId] = React.useState(null);
  const counterRef = React.useRef();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const params = { _ts: Date.now() }; // prevent caching
    if (search?.length) params.search = search;
    if (minReferral?.length) params.min = minReferral;
    if (maxReferral?.length) params.max = maxReferral;

    try {
      const [usersResponse, statsResponse] = await Promise.all([axios.get('https://baraka.karvontaxi.uz/users', { params }), axios.get('https://baraka.karvontaxi.uz/stats')]);
      setUsers(usersResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    };

    setLoading(false);
  };

  async function onRandomize() {
    if (!users?.length) return;

    // Stop
    if (intervalId) {
      if (randomUser) {
        clearInterval(intervalId);
        setIntervalId(null);

        if (counterRef.current) {
          counterRef.current.textContent = randomUser?.orderId || 0;
        };
      };

      return;
    };

    // Start
    const newIntervalId = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * (1400 - 10 + 1)) + 10;
      if (counterRef.current) {
        counterRef.current.textContent = randomNumber;
      };
    }, 50);

    setRandomUser(null);
    setIntervalId(newIntervalId);

    const params = { _ts: Date.now() }; // prevent caching
    if (search?.length) params.search = search;
    if (minReferralRandom?.length) params.min = minReferralRandom;
    if (maxReferralRandom?.length) params.max = maxReferralRandom;

    const { data } = await axios.get('https://baraka.karvontaxi.uz/users/random', { params });
    setRandomUser(data);

  };

  return (
    <div className="users flex justify-center gap-6">
      <div className="h-screen overflow-auto w-xl flex flex-col gap-6 p-10">
        <h1 className='text-2xl text-slate-900 font-semibold'>Ishtirokchilar ro'yxati</h1>

        <div className="filter flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ism bo'yicha qidirish"
            className="border bg-white border-slate-300 rounded-xl px-3 py-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-4">
            <input
              type="number"
              inputMode='decimal'
              placeholder="Min referral"
              className="border bg-white flex-1 border-slate-300 rounded-xl px-3 py-2"
              onChange={(e) => setMinReferral(e.target.value)}
            />
            <input
              type="number"
              inputMode='decimal'
              placeholder="Max referral"
              className="border bg-white flex-1 border-slate-300 rounded-xl px-3 py-2"
              onChange={(e) => setMaxReferral(e.target.value)}
            />
          </div>

          <button onClick={fetchData} className="flex justify-center items-center gap-1 cursor-pointer  bg-blue-600 text-white rounded-xl px-6 py-2">Filter <RefreshCcw size={16} className="ml-2" /></button>

          {/* <div className="relative">
          <select className="border border-slate-300 rounded-xl px-3 py-2 pr-16 appearance-none mt-4">
            <option value="">Min referral</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
          <ChevronDown size={22} color='gray' className="absolute right-1 top-1 mt-6 mr-4 text-slate-400" />
        </div> */}
        </div>

        <div className="flex flex-col gap-2 max-w-xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            users?.length ? (
              users.map((user) => (
                <div key={user.id} className="flex items-center bg-white gap-4 py-2 px-6 border border-slate-200 shadow rounded-xl">
                  <span className='text-gray-500 w-12 whitespace-nowrap'>#{user.orderId}</span>

                  <img src={user.photo || "/avatar.webp"} alt={user.name} className="w-12 h-12 border-1 border-slate-200 rounded-full object-cover" onError={(e) => { e.target.src = "/avatar.webp"; }} />

                  <div className="flex flex-col">
                    <p className="font-semibold truncate w-45">{user.name}</p>
                    <p className="text-sm text-gray-500">{formatPhone(user.phoneNumber).slice(0, -5) + " XX XX"}</p>
                  </div>
                  <p className="text-slate-600 ml-auto font-bold mr-2">{user.referralsCount}</p>
                </div>
              ))
            ) : (
              <p>Ishtirokchilar topilmadi.</p>
            )
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 items-center h-screen justify-between p-10">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Randomizer</h2>
          <p>Barcha ishtirokchilar: {stats?.registeredUsers || 0}</p>
        </div>

        <div className="flex flex-col gap-10 items-center">
          {/* <div className="flex gap-4">
            <input
              type="number"
              inputMode='decimal'
              placeholder="Min referral"
              className="border bg-white flex-1 w-34 border-slate-300 rounded-xl px-3 py-2"
              onChange={(e) => setMinReferralRandom(e.target.value)}
            />
            <input
              type="number"
              inputMode='decimal'
              placeholder="Max referral"
              className="border bg-white flex-1 w-34 border-slate-300 rounded-xl px-3 py-2"
              onChange={(e) => setMaxReferralRandom(e.target.value)}
            />
          </div> */}

          {randomUser && !intervalId && (
            // <div className="flex flex-col items-center gap-2 border-1 border-slate-100 rounded-4xl py-4 px-12 shadow">
            //   <img src={randomUser.photo || "/avatar.webp"} alt={randomUser.name} className="w-24 h-24 border-1 border-slate-200 rounded-full object-cover" onError={(e) => { e.target.src = "/avatar.webp"; }} />
            //   <p className="font-semibold text-xl">{randomUser.name}</p>
            //   <p className="text-gray-500">{formatPhone(randomUser.phoneNumber)}</p>
            //   <p className="text-slate-600 font-bold">Referrals: {randomUser.referralsCount}</p>
            // </div>
            <div className="relative flex flex-col items-center overflow-hidden min-h-30 gap-2 border-1 border-slate-200 rounded-4xl py-4 px-12 shadow-xl">
              <Confetti particleCount={40} colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0', '#57ff73ff', '#57ff4bff', '#8eff84ff', '#b0ffb0ff', '#5768ffff', '#4b72ffff', '#84daffff', '#ff6716ff']} y={0} shapeSize={40} style={{ position: "absolute", opacity: 0.7, width: "200%", height: "100%", top: 0, left: -135 }} />

              <img src={randomUser.photo || "/avatar.webp"} alt={randomUser.name} className="w-24 h-24 border-1 border-slate-200 rounded-full object-cover" onError={(e) => { e.target.src = "/avatar.webp"; }} />
              <p className="font-semibold text-xl">{randomUser.name}</p>
              <p className="text-gray-500">{formatPhone(randomUser.phoneNumber).slice(0, -5) + " XX XX"}</p>
              <p className="text-slate-600 font-bold">Referrals: {randomUser.referralsCount}</p>
            </div>
          )}

          <h2 ref={counterRef} className='text-[50px] font-semibold random'>123</h2>


          <button onClick={onRandomize} className={`flex justify-center items-center gap-1 cursor-pointer ${intervalId ? 'bg-red-600' : 'bg-green-600'} text-white rounded-xl px-8 py-2`}>{intervalId ? 'Stop' : 'Start'}</button>
        </div>

        <div className="w-full flex justify-between items-center">
        </div>
      </div>
    </div>
  );
};