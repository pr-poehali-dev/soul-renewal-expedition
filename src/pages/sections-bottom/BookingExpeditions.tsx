import Icon from "@/components/ui/icon";
import type { ExpWithSchedule } from "./types";
import { CITIES, getPrice } from "./utils";

interface BookingExpeditionsProps {
  departureCity: string | null;
  setDepartureCity: (v: string) => void;
  setSelectedDate: (v: string) => void;
  isMoscow: boolean;
  expsTyped: ExpWithSchedule[];
  setScheduleExp: (v: ExpWithSchedule | null) => void;
  setSelectedExpedition: (v: string) => void;
}

const BookingExpeditions = ({
  departureCity,
  setDepartureCity,
  setSelectedDate,
  isMoscow,
  expsTyped,
  setScheduleExp,
  setSelectedExpedition,
}: BookingExpeditionsProps) => {
  return (
    <>
      <div className="text-center mb-16">
        <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Ближайшие даты</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4"><em className="italic text-[#c9a96e]">Бронирование</em></h2>
        <div className="section-divider mt-6" />
      </div>
      {/* City selector */}
      <div className="mb-12">
        <p className="font-golos text-xs tracking-[0.3em] text-[#9a8f84] uppercase text-center mb-5">Выберите город выезда</p>
        <div className="flex flex-wrap justify-center gap-3">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => { setDepartureCity(city); setSelectedDate(""); }}
              className={`px-6 py-2.5 font-golos text-sm tracking-wide transition-all border ${departureCity === city ? "border-[#4a9db5] bg-[#4a9db5]/10 text-[#4a9db5]" : "border-white/10 text-[#9a8f84] hover:border-[#4a9db5]/40 hover:text-[#e8ddd0]"}`}
            >
              {city}
            </button>
          ))}
        </div>
        {!departureCity && (
          <p className="font-golos text-xs text-[#9a8f84]/50 text-center mt-4">Выберите город, чтобы увидеть стоимость экспедиций</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
        {expsTyped.map((exp, i) => (
          <div key={i} className="flex flex-col p-7 border border-white/5 bg-[#111820] hover:border-[#4a9db5]/30 transition-all hover-lift">
            <div className="flex items-center justify-between mb-5">
              <span className={`font-golos text-xs tracking-widest uppercase px-3 py-1 ${exp.region === "Крым" ? "bg-[#4a9db5]/10 text-[#4a9db5]" : "bg-[#c9a96e]/10 text-[#c9a96e]"}`}>
                {exp.region}
              </span>
              <span className="font-golos text-xs text-[#9a8f84]">{exp.days}</span>
            </div>
            <h3 className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-1">{exp.name}</h3>
            {departureCity && exp.price !== "уточняется" && (
              <div className="font-cormorant text-3xl text-[#c9a96e] font-light mb-3">
                {getPrice(exp.price, departureCity, exp.pricesByCity)}
                {isMoscow && exp.pricesByCity && (
                  <span className="font-golos text-xs text-[#9a8f84]/60 ml-2">(+1 день)</span>
                )}
              </div>
            )}
            {!departureCity && (
              <div className="font-golos text-xs text-[#9a8f84]/50 mb-3 italic">выберите город для цены</div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <Icon name="MapPin" size={12} className="text-[#4a9db5] shrink-0" />
              <span className="font-golos text-xs text-[#9a8f84] leading-relaxed">{exp.places}</span>
            </div>
            {(exp.transport || exp.accommodation || exp.meals) && (
              <div className="space-y-1.5 mb-5">
                {exp.transport && (
                  <div className="flex items-center gap-2">
                    <Icon name="Bus" size={12} className="text-[#5a8a6e] shrink-0" />
                    <span className="font-golos text-[11px] text-[#9a8f84]/80">{exp.transport}</span>
                  </div>
                )}
                {exp.accommodation && (
                  <div className="flex items-center gap-2">
                    <Icon name="Home" size={12} className="text-[#5a8a6e] shrink-0" />
                    <span className="font-golos text-[11px] text-[#9a8f84]/80">{exp.accommodation}</span>
                  </div>
                )}
                {exp.meals && (
                  <div className="flex items-center gap-2">
                    <Icon name="UtensilsCrossed" size={12} className="text-[#5a8a6e] shrink-0" />
                    <span className="font-golos text-[11px] text-[#9a8f84]/80">{exp.meals}</span>
                  </div>
                )}
              </div>
            )}
            <div className="space-y-3 mb-6 flex-1">
              {exp.program.map((day, d) => (
                <div key={d} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4a9db5]/15 border border-[#4a9db5]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-golos text-[10px] text-[#4a9db5]">{d + 1}</span>
                  </div>
                  <p className="font-golos text-xs text-[#9a8f84] leading-relaxed">{day}</p>
                </div>
              ))}
            </div>
            {exp.schedule && exp.schedule.length > 0 && (
              <button
                onClick={() => setScheduleExp(exp)}
                className="w-full py-2.5 border border-white/10 text-[#9a8f84] font-golos text-xs tracking-widest uppercase hover:border-[#4a9db5]/30 hover:text-[#4a9db5] transition-all mb-3"
              >
                Подробная программа
              </button>
            )}
            <div className="flex items-center gap-2 mb-3 px-1">
              <Icon name="CreditCard" size={12} className="text-[#5a8a6e] shrink-0" />
              <span className="font-golos text-[11px] text-[#9a8f84]/70">Наличными или СБП</span>
            </div>
            <button
              onClick={() => setSelectedExpedition(exp.name)}
              className="w-full py-3 border border-[#4a9db5]/40 text-[#4a9db5] font-golos text-xs tracking-widest uppercase hover:bg-[#4a9db5]/10 transition-all mt-auto"
            >
              Забронировать
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingExpeditions;