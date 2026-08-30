import { useState } from "react";
import Icon from "@/components/ui/icon";

const RetreatRequestForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("");
  const [participants, setParticipants] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = name && phone && dates && participants;

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://functions.poehali.dev/a4e9dd8d-21dc-438a-a766-99a50185d91f", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request_type: "retreat",
          name,
          phone,
          date: dates,
          participants: Number(participants) || participants,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Ошибка отправки. Попробуйте позже.");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-6">
        <div className="text-3xl mb-3">✓</div>
        <p className="font-cormorant text-xl text-[#e8ddd0] font-light mb-1">Заявка отправлена</p>
        <p className="font-golos text-xs text-[#9a8f84]">Мы свяжемся с вами в течение дня</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 border border-[#5a8a6e]/20 bg-[#0d1510]">
      <p className="font-golos text-xs text-[#5a8a6e] uppercase tracking-wide mb-4">Заявка на аренду помещения для ретритов</p>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#5a8a6e]/50 w-full"
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#5a8a6e]/50 w-full"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <input
          type="text"
          placeholder="Желаемые даты"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#5a8a6e]/50 w-full"
        />
        <input
          type="number"
          min={1}
          placeholder="Количество участников"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#5a8a6e]/50 w-full"
        />
      </div>
      <button
        disabled={!isValid || loading}
        onClick={submit}
        className="w-full py-3 bg-[#5a8a6e] text-[#0d1117] font-golos text-xs tracking-widest uppercase hover:bg-[#6b9c7f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? "Отправляем..." : (<><Icon name="Send" size={14} /> Отправить заявку</>)}
      </button>
      {error && <p className="font-golos text-xs text-red-400 text-center mt-3">{error}</p>}
      {!isValid && !error && (
        <p className="font-golos text-xs text-[#9a8f84]/60 text-center mt-3">Заполните имя, телефон, даты и количество участников</p>
      )}
    </div>
  );
};

export default RetreatRequestForm;
