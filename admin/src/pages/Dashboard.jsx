import React, { useEffect } from 'react';
import { RefreshCcw } from "lucide-react";
import formatPhone from '../helpers/formatPhone';
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [minReferral, setMinReferral] = React.useState('');
  const [maxReferral, setMaxReferral] = React.useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const params = {};
    if (search?.length) params.search = search;
    if (minReferral?.length) params.min = minReferral;
    if (maxReferral?.length) params.max = maxReferral;

    try {
      const response = await axios.get('https://baraka.karvontaxi.uz/users', { params });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    };

    setLoading(false);
  };

  return (
    <div className="users flex flex-col gap-6 justify-center items-center">
      <div className="min-h-screen bg-slate-100 w-xl flex flex-col gap-6 p-10">
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
    </div>
  );
};