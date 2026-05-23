import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { expeditions, PANORAMA_IMG } from "./data";

const BLOCKED_START = new Date(2026, 5, 10); // 10 июня 2026
const BLOCKED_END = new Date(2026, 5, 25);   // 25 июня 2026

function getAvailableDates(isMoscow: boolean): { date: Date; label: string }[] {
  const dates: { date: Date; label: string }[] = [];
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 2);

  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  // Генерируем даты на 3 месяца вперёд
  const end = new Date(now);
  end.setMonth(end.getMonth() + 3);

  const d = new Date(start);
  while (d <= end && dates.length < 12) {
    const dow = d.getDay(); // 0=вс,1=пн,...,4=чт,3=ср
    const isThursday = dow === 4;
    const isWednesday = dow === 3;

    const inBlockedRange = d >= BLOCKED_START && d <= BLOCKED_END;

    if (!inBlockedRange && (isThursday || (isMoscow && isWednesday))) {
      dates.push({
        date: new Date(d),
        label: `${d.getDate()} ${months[d.getMonth()]} (${days[d.getDay()]})${isMoscow && isWednesday ? " — Москва" : ""}`,
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

const CITIES = ["Ростов-на-Дону", "Краснодар", "Москва"];

function getPrice(basePrice: string, city: string | null): string {
  if (!city) return "";
  if (city === "Москва" && basePrice !== "уточняется") {
    const num = parseInt(basePrice.replace(/\D/g, ""), 10);
    return `${(num + 5000).toLocaleString("ru-RU")} ₽`;
  }
  return basePrice;
}

interface SectionsBottomProps {
  selectedExpedition: string;
  setSelectedExpedition: (v: string) => void;
  formName: string;
  setFormName: (v: string) => void;
  formPhone: string;
  setFormPhone: (v: string) => void;
  formMessage: string;
  setFormMessage: (v: string) => void;
  formSent: boolean;
  setFormSent: (v: boolean) => void;
  formLoading: boolean;
  setFormLoading: (v: boolean) => void;
  formError: string;
  setFormError: (v: string) => void;
  departureCity: string | null;
  setDepartureCity: (v: string) => void;
  scrollTo: (id: string) => void;
}

const SectionsBottom = ({
  selectedExpedition, setSelectedExpedition,
  formName, setFormName,
  formPhone, setFormPhone,
  formMessage, setFormMessage,
  formSent, setFormSent,
  formLoading, setFormLoading,
  formError, setFormError,
  departureCity, setDepartureCity,
  scrollTo,
}: SectionsBottomProps) => {
  const isMoscow = departureCity === "Москва";
  const [selectedDate, setSelectedDate] = useState("");

  type ScheduleItem = { time: string; desc: string };
  type DayBlock = { day: string; subtitle: string; items: ScheduleItem[] };
  type ExpWithSchedule = (typeof expeditions)[0] & { schedule?: DayBlock[] };
  const expsTyped = expeditions as ExpWithSchedule[];
  const [scheduleExp, setScheduleExp] = useState<ExpWithSchedule | null>(null);

  const availableDates = useMemo(() => getAvailableDates(isMoscow), [isMoscow]);

  return (
    <>
      {/* BOOKING */}
      <section id="booking" className="py-32 px-6 bg-[#0a0e13]">
        <div className="max-w-7xl mx-auto">
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
                    {getPrice(exp.price, departureCity)}
                  </div>
                )}
                {!departureCity && (
                  <div className="font-golos text-xs text-[#9a8f84]/50 mb-3 italic">выберите город для цены</div>
                )}
                <div className="flex items-center gap-2 mb-5">
                  <Icon name="MapPin" size={12} className="text-[#4a9db5] shrink-0" />
                  <span className="font-golos text-xs text-[#9a8f84] leading-relaxed">{exp.places}</span>
                </div>
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
                <button
                  onClick={() => setSelectedExpedition(exp.name)}
                  className="w-full py-3 border border-[#4a9db5]/40 text-[#4a9db5] font-golos text-xs tracking-widest uppercase hover:bg-[#4a9db5]/10 transition-all mt-auto"
                >
                  Забронировать
                </button>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto p-8 bg-[#111820] border border-white/5">
            <h3 className="font-cormorant text-3xl text-[#e8ddd0] font-light mb-2 text-center">Записаться в экспедицию</h3>
            <p className="font-golos text-sm text-[#9a8f84] text-center mb-8">Выберите маршрут и оставьте заявку — свяжемся в течение дня</p>
            {formSent ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-4">✓</div>
                <p className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-2">Заявка отправлена</p>
                <p className="font-golos text-sm text-[#9a8f84]">Мы свяжемся с вами в течение дня</p>
              </div>
            ) : (
              <>
                {/* Город из шапки */}
                <div className="mb-4 flex items-center gap-3 px-4 py-3 border border-white/10 bg-[#0d1117]">
                  <Icon name="MapPin" size={14} className="text-[#4a9db5] shrink-0" />
                  {departureCity ? (
                    <span className="font-golos text-sm text-[#e8ddd0]">
                      Выезд из: <span className="text-[#4a9db5]">{departureCity}</span>
                      {isMoscow && <span className="text-xs text-[#9a8f84] ml-2">(выезд в среду, +1 день)</span>}
                    </span>
                  ) : (
                    <span className="font-golos text-sm text-[#9a8f84]">Выберите город выезда выше ↑</span>
                  )}
                </div>

                {/* Выбор даты */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Calendar" size={12} className="text-[#4a9db5]" />
                    <span className="font-golos text-xs text-[#9a8f84] uppercase tracking-wide">Дата выезда</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((d, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(d.label)}
                        className={`px-3 py-2 text-left font-golos text-xs transition-all border ${selectedDate === d.label ? "border-[#4a9db5] bg-[#4a9db5]/10 text-[#4a9db5]" : "border-white/10 bg-[#0d1117] text-[#9a8f84] hover:border-[#4a9db5]/40"}`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <p className="font-golos text-xs text-[#9a8f84]/40 mt-2">
                    ⚠ Период 10–25 июня недоступен для бронирования
                  </p>
                </div>

                <div className="mb-4">
                  <select
                    value={selectedExpedition}
                    onChange={(e) => setSelectedExpedition(e.target.value)}
                    className="w-full bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm focus:outline-none focus:border-[#4a9db5]/50 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a9db5' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                  >
                    <option value="" disabled style={{ color: "#9a8f84" }}>Выберите экспедицию</option>
                    <optgroup label="── Крым ──" style={{ color: "#4a9db5", background: "#0d1117" }}>
                      {expeditions.filter(e => e.region === "Крым").map((exp, i) => (
                        <option key={i} value={exp.name} style={{ background: "#0d1117", color: "#e8ddd0" }}>
                          {exp.name} — {exp.days}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── Адыгея ──" style={{ color: "#c9a96e", background: "#0d1117" }}>
                      {expeditions.filter(e => e.region === "Адыгея").map((exp, i) => (
                        <option key={i} value={exp.name} style={{ background: "#0d1117", color: "#e8ddd0" }}>
                          {exp.name} — {exp.days}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                {selectedExpedition && (
                  <div className="mb-4 px-4 py-3 border border-[#4a9db5]/20 bg-[#4a9db5]/5">
                    {expeditions.filter(e => e.name === selectedExpedition).map(exp => (
                      <div key={exp.name} className="flex flex-wrap gap-4">
                        <span className="font-golos text-xs text-[#4a9db5]">📅 Старт: {exp.next}</span>
                        <span className="font-golos text-xs text-[#4a9db5]">👥 {exp.group}</span>
                        <span className="font-golos text-xs text-[#4a9db5]">📍 {exp.places}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#4a9db5]/50 w-full"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#4a9db5]/50 w-full"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Расскажите о себе и своих ожиданиях от экспедиции..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#4a9db5]/50 resize-none mb-4"
                />
                <button
                  disabled={!formName || !formPhone || !selectedExpedition || !selectedDate || formLoading}
                  onClick={async () => {
                    setFormLoading(true);
                    setFormError("");
                    try {
                      const res = await fetch("https://functions.poehali.dev/a4e9dd8d-21dc-438a-a766-99a50185d91f", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: formName, phone: formPhone, expedition: selectedExpedition, message: formMessage, date: selectedDate, from_moscow: isMoscow, city: departureCity }),
                      });
                      if (res.ok) {
                        setFormSent(true);
                      } else {
                        setFormError("Ошибка отправки. Попробуйте позже.");
                      }
                    } catch {
                      setFormError("Ошибка соединения. Попробуйте позже.");
                    } finally {
                      setFormLoading(false);
                    }
                  }}
                  className="w-full py-4 bg-[#4a9db5] text-[#0d1117] font-golos text-sm tracking-widest uppercase hover:bg-[#5ab0c8] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formLoading ? "Отправляем..." : "Отправить заявку"}
                </button>
                {formError && <p className="font-golos text-xs text-red-400 text-center mt-3">{formError}</p>}
                {(!formName || !formPhone || !selectedExpedition || !selectedDate) && !formError && (
                  <p className="font-golos text-xs text-[#9a8f84]/60 text-center mt-3">Заполните имя, телефон, выберите экспедицию и дату выезда</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Связь</p>
            <h2 className="font-cormorant text-5xl font-light text-[#e8ddd0] mb-8"><em className="italic text-[#c9a96e]">Контакты</em></h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#4a9db5]/10 border border-[#4a9db5]/20 flex items-center justify-center group-hover:bg-[#4a9db5]/20 transition-colors shrink-0">
                  <Icon name="Phone" size={18} className="text-[#4a9db5]" />
                </div>
                <div>
                  <div className="font-golos text-xs text-[#9a8f84] mb-1 tracking-wide">Телефон</div>
                  <a href="tel:+79257771555" className="block font-cormorant text-xl text-[#e8ddd0] hover:text-[#4a9db5] transition-colors">+7 925 777-15-55</a>
                  <a href="tel:+79001380345" className="block font-cormorant text-xl text-[#e8ddd0] hover:text-[#4a9db5] transition-colors">+7 900 138-03-45</a>
                </div>
              </div>
              <a href="mailto:a5144500@inbox.ru" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#4a9db5]/10 border border-[#4a9db5]/20 flex items-center justify-center group-hover:bg-[#4a9db5]/20 transition-colors">
                  <Icon name="Mail" size={18} className="text-[#4a9db5]" />
                </div>
                <div>
                  <div className="font-golos text-xs text-[#9a8f84] mb-1 tracking-wide">Email</div>
                  <div className="font-cormorant text-xl text-[#e8ddd0]">a5144500@inbox.ru</div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#4a9db5]/10 border border-[#4a9db5]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="MapPin" size={18} className="text-[#4a9db5]" />
                </div>
                <div>
                  <div className="font-golos text-xs text-[#9a8f84] mb-1 tracking-wide">Сбор групп</div>
                  <div className="font-cormorant text-xl text-[#e8ddd0]">Ростов-на-Дону, Москва, Краснодар</div>
                  <div className="font-golos text-xs text-[#9a8f84]/70 mt-1">Для участников из Москвы +1 день к любой экспедиции</div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="font-golos text-xs text-[#9a8f84] mb-3 tracking-wide uppercase">Написать нам</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-golos text-xs text-[#9a8f84]/60 w-36">+7 925 777-15-55</span>
                  <a href="https://t.me/+79257771555" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#4a9db5]/30 text-[#4a9db5] hover:bg-[#4a9db5]/10 transition-colors font-golos text-xs">
                    <Icon name="Send" size={12} /> Telegram
                  </a>
                  <a href="https://wa.me/79257771555" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#5a8a6e]/30 text-[#8ab89a] hover:bg-[#5a8a6e]/10 transition-colors font-golos text-xs">
                    <Icon name="MessageCircle" size={12} /> WhatsApp
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-golos text-xs text-[#9a8f84]/60 w-36">+7 900 138-03-45</span>
                  <a href="https://t.me/+79001380345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#4a9db5]/30 text-[#4a9db5] hover:bg-[#4a9db5]/10 transition-colors font-golos text-xs">
                    <Icon name="Send" size={12} /> Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-80 lg:h-[450px]">
            <img src={PANORAMA_IMG} alt="Крым панорама" className="w-full h-full object-cover" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/40 to-transparent" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }} />
          </div>
        </div>
      </section>

      {/* SCHEDULE MODAL */}
      {scheduleExp && scheduleExp.schedule && scheduleExp.schedule.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm" onClick={() => setScheduleExp(null)}>
          <div className="relative bg-[#0d1117] border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between p-7 border-b border-white/5">
              <div>
                <p className="font-golos text-xs tracking-[0.3em] text-[#4a9db5] uppercase mb-1">Программа экспедиции</p>
                <h3 className="font-cormorant text-3xl text-[#e8ddd0] font-light">{scheduleExp.name}</h3>
              </div>
              <button onClick={() => setScheduleExp(null)} className="text-[#9a8f84] hover:text-[#e8ddd0] transition-colors ml-6 mt-1">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-7 space-y-8">
              {scheduleExp.schedule.map((dayBlock, di) => (
                <div key={di}>
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="font-golos text-xs tracking-widest text-[#4a9db5] uppercase">{dayBlock.day}</span>
                    <span className="font-cormorant text-xl text-[#e8ddd0] font-light italic">{dayBlock.subtitle}</span>
                  </div>
                  <div className="space-y-4">
                    {dayBlock.items.map((item, ii) => (
                      <div key={ii} className="flex gap-5">
                        <span className="font-golos text-xs text-[#4a9db5] whitespace-nowrap w-24 shrink-0 mt-0.5">{item.time}</span>
                        <div className="flex-1 border-l border-white/5 pl-5">
                          <p className="font-golos text-sm text-[#9a8f84] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-7 pb-7">
              <button
                onClick={() => { setScheduleExp(null); setSelectedExpedition(scheduleExp.name); }}
                className="w-full py-3 bg-[#4a9db5]/10 border border-[#4a9db5]/40 text-[#4a9db5] font-golos text-xs tracking-widest uppercase hover:bg-[#4a9db5]/20 transition-all"
              >
                Забронировать эту экспедицию
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-cormorant text-lg tracking-widest text-[#9a8f84] uppercase">Крым<span className="text-[#4a9db5]"> · </span>Сила</div>
          <div className="font-golos text-xs text-[#9a8f84]/50 text-center">© 2026 Экспедиции по местам силы Крыма</div>
          <div className="flex gap-6">
            {[["Главная", "home"], ["Места силы", "places"], ["Контакты", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="font-golos text-xs text-[#9a8f84]/60 hover:text-[#9a8f84] transition-colors tracking-wide">
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default SectionsBottom;