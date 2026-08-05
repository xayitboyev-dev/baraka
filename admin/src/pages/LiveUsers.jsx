import React, { useEffect } from 'react';
import { RefreshCcw } from "lucide-react";
import formatPhone from '../helpers/formatPhone';
import axios from "axios";

export default function LiveUsers() {
    const [users, setUsers] = React.useState();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);

        try {
            const response = await axios.get('https://baraka.karvontaxi.uz/live_users');
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

                <div className="flex flex-col gap-2 max-w-xl">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        users?.length ? (
                            users.map((user, index) => (
                                <div key={user.id} className="flex items-center bg-white gap-4 py-2 px-6 border border-slate-200 shadow rounded-xl">
                                    <span className='text-gray-500 w-12 whitespace-nowrap'>#{index + 1}</span>

                                    <img src={user.photo || "/avatar.webp"} alt={user.name} className="w-12 h-12 border-1 border-slate-200 rounded-full object-cover" onError={(e) => { e.target.src = "/avatar.webp"; }} />

                                    <div className="flex flex-col">
                                        <p className="font-semibold truncate w-45">{user.name}</p>
                                        <p className="text-sm text-gray-500">{formatPhone(user.phone).slice(0, -5) + " XX XX"}</p>
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