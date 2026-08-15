import { useState } from "react";
import Icon from "@/components/ui/icon";

const API_URL = "https://functions.poehali.dev/010b391d-4030-45e8-83e1-3a0218d9223b";

interface Booking {
  id: number;
  name: string;
  phone: string;
  expedition: string;
  message: string;
  departure_date: string;
  from_moscow: boolean;
  city: string;
  extra_services: string;
  created_at: string;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `${API_URL}?pwd=${encodeURIComponent(password)}`;
      console.log("Запрос:", url);
      const res = await fetch(url);
      const data = await res.json();
      console.log("Ответ:", res.status, data);
      if (res.ok) {
        setBookings(data.bookings);
        setAuthed(true);
      } else {
        setError(`Неверный пароль (${res.status}): ${JSON.stringify(data)}`);
      }
    } catch (e) {
      setError("Ошибка подключения: " + String(e));
    }
    setLoading(false);
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?pwd=${encodeURIComponent(password)}`);
      const data = await res.json();
      if (res.ok) setBookings(data.bookings);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="font-cormorant text-3xl text-[#e8ddd0] mb-2">Администратор</div>
            <div className="font-golos text-xs text-[#9a8f84] tracking-widest uppercase">Управление заявками</div>
          </div>
          <div className="border border-white/10 p-8 bg-[#1a1f2e]">
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full bg-transparent border border-white/10 px-4 py-3 font-golos text-sm text-[#e8ddd0] placeholder-[#9a8f84]/50 focus:outline-none focus:border-[#4a9db5]/50 mb-4"
            />
            {error && <div className="font-golos text-xs text-red-400 mb-4">{error}</div>}
            <button
              onClick={login}
              disabled={loading}
              className="w-full py-3 bg-[#4a9db5]/20 border border-[#4a9db5]/40 text-[#4a9db5] font-golos text-xs tracking-widest uppercase hover:bg-[#4a9db5]/30 transition-all disabled:opacity-50"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-cormorant text-3xl text-[#e8ddd0]">Заявки</div>
            <div className="font-golos text-xs text-[#9a8f84] mt-1">Всего: {bookings.length}</div>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-[#4a9db5]/30 text-[#4a9db5] font-golos text-xs tracking-widest uppercase hover:bg-[#4a9db5]/10 transition-all disabled:opacity-50"
          >
            <Icon name="RefreshCw" size={12} />
            Обновить
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 text-[#9a8f84] font-golos text-sm">Заявок пока нет</div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((b) => (
              <div key={b.id} className="border border-white/10 bg-[#1a1f2e] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-cormorant text-xl text-[#e8ddd0]">{b.name}</div>
                    <a href={`tel:${b.phone}`} className="font-golos text-sm text-[#4a9db5] hover:underline">{b.phone}</a>
                  </div>
                  <div className="text-right">
                    <div className="font-golos text-xs text-[#9a8f84]">{b.created_at}</div>
                    <div className="font-golos text-xs text-[#c9a96e] mt-1">#{b.id}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="font-golos text-xs text-[#9a8f84] mb-1">Экспедиция</div>
                    <div className="font-golos text-sm text-[#e8ddd0]">{b.expedition}</div>
                  </div>
                  {b.departure_date && (
                    <div>
                      <div className="font-golos text-xs text-[#9a8f84] mb-1">Дата выезда</div>
                      <div className="font-golos text-sm text-[#e8ddd0]">
                        {b.departure_date}
                        {b.from_moscow && <span className="text-[#9a8f84] ml-2">(из Москвы +1 день)</span>}
                      </div>
                    </div>
                  )}
                  {b.city && (
                    <div>
                      <div className="font-golos text-xs text-[#9a8f84] mb-1">Город</div>
                      <div className="font-golos text-sm text-[#e8ddd0]">{b.city}</div>
                    </div>
                  )}
                  {b.extra_services && (
                    <div>
                      <div className="font-golos text-xs text-[#9a8f84] mb-1">Доп. услуги</div>
                      <div className="font-golos text-sm text-[#4a9db5]">{b.extra_services}</div>
                    </div>
                  )}
                  {b.message && (
                    <div className="md:col-span-2">
                      <div className="font-golos text-xs text-[#9a8f84] mb-1">Сообщение</div>
                      <div className="font-golos text-sm text-[#e8ddd0]">{b.message}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}