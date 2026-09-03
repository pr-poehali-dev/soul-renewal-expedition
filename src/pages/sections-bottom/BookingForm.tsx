import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Icon from "@/components/ui/icon";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { expeditions, tariffs } from "../data";
import { BLOCKED_START, BLOCKED_END } from "./utils";

const EXTRA_SERVICES = [
  { id: "horse", label: "Конные прогулки", icon: "🐎" },
  { id: "jeep", label: "Джипинг", icon: "🚙" },
];

interface BookingFormProps {
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
  extraServices: string[];
  toggleExtraService: (label: string) => void;
  customDate: Date | undefined;
  setCustomDate: (v: Date | undefined) => void;
  isMoscow: boolean;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  availableDates: { date: Date; label: string }[];
  activeTariff: (typeof tariffs)[0] | null;
  tariffDays: string;
  groupSize: number;
  tariffPrice: number | null;
  formatRub: (n: number) => string;
}

const BookingForm = ({
  selectedExpedition, setSelectedExpedition,
  formName, setFormName,
  formPhone, setFormPhone,
  formMessage, setFormMessage,
  formSent, setFormSent,
  formLoading, setFormLoading,
  formError, setFormError,
  departureCity,
  extraServices, toggleExtraService,
  customDate, setCustomDate,
  isMoscow,
  selectedDate, setSelectedDate,
  availableDates,
  activeTariff,
  tariffDays,
  groupSize,
  tariffPrice,
  formatRub,
}: BookingFormProps) => {
  return (
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
                  onClick={() => { setSelectedDate(d.label); setCustomDate(undefined); }}
                  className={`px-3 py-2 text-left font-golos text-xs transition-all border ${selectedDate === d.label ? "border-[#4a9db5] bg-[#4a9db5]/10 text-[#4a9db5]" : "border-white/10 bg-[#0d1117] text-[#9a8f84] hover:border-[#4a9db5]/40"}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <p className="font-golos text-xs text-[#9a8f84]/40 mt-2 mb-3">
              ⚠ Период 10–25 июня недоступен для бронирования
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 font-golos text-xs border transition-all ${customDate ? "border-[#4a9db5] bg-[#4a9db5]/10 text-[#4a9db5]" : "border-dashed border-white/20 text-[#9a8f84] hover:border-[#4a9db5]/40"}`}
                >
                  <Icon name="CalendarPlus" size={12} />
                  {customDate ? `Своя дата: ${format(customDate, "d MMMM (EEEEEE)", { locale: ru })}` : "Предложить свою дату"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#111820] border-white/10">
                <Calendar
                  mode="single"
                  selected={customDate}
                  onSelect={(date) => {
                    setCustomDate(date);
                    if (date) setSelectedDate(`${format(date, "d MMMM (EEEEEE)", { locale: ru })} — по согласованию`);
                  }}
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() + 1)) || (date >= BLOCKED_START && date <= BLOCKED_END)}
                  className="text-[#e8ddd0]"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mb-4">
            <select
              value={selectedExpedition}
              onChange={(e) => setSelectedExpedition(e.target.value)}
              className="w-full bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm focus:outline-none focus:border-[#4a9db5]/50 appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a9db5' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
            >
              <option value="" disabled style={{ color: "#9a8f84" }}>Выберите экспедицию</option>
              <optgroup label="── Адыгея ──" style={{ color: "#8ab89a", background: "#0d1117" }}>
                {expeditions.filter(e => e.region === "Адыгея").map((exp, i) => (
                  <option key={i} value={exp.name} style={{ background: "#0d1117", color: "#e8ddd0" }}>
                    {exp.name} — {exp.days}
                  </option>
                ))}
              </optgroup>
              <optgroup label="── Крым ──" style={{ color: "#4a9db5", background: "#0d1117" }}>
                {expeditions.filter(e => e.region === "Крым").map((exp, i) => (
                  <option key={i} value={exp.name} style={{ background: "#0d1117", color: "#e8ddd0" }}>
                    {exp.name} — {exp.days}
                  </option>
                ))}
              </optgroup>
              <optgroup label="── Тарифы ──" style={{ color: "#c9a96e", background: "#0d1117" }}>
                {tariffs.flatMap((t) => t.options.map((o) => (
                  <option key={`${t.id}-${o.days}`} value={`${t.name} · ${o.days}`} style={{ background: "#0d1117", color: "#e8ddd0" }}>
                    {t.name} — {o.days}
                  </option>
                )))}
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
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Sparkles" size={12} className="text-[#4a9db5]" />
              <span className="font-golos text-xs text-[#9a8f84] uppercase tracking-wide">Дополнительные услуги</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {EXTRA_SERVICES.map((s) => (
                <label
                  key={s.id}
                  className={`flex items-center gap-2 px-4 py-2.5 border cursor-pointer transition-all font-golos text-sm ${extraServices.includes(s.label) ? "border-[#4a9db5] bg-[#4a9db5]/10 text-[#4a9db5]" : "border-white/10 bg-[#0d1117] text-[#9a8f84] hover:border-[#4a9db5]/40"}`}
                >
                  <input
                    type="checkbox"
                    checked={extraServices.includes(s.label)}
                    onChange={() => toggleExtraService(s.label)}
                    className="accent-[#4a9db5]"
                  />
                  <span>{s.icon}</span>
                  {s.label}
                </label>
              ))}
            </div>
          </div>
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
                  body: JSON.stringify({
                    name: formName, phone: formPhone, expedition: selectedExpedition, message: formMessage,
                    date: selectedDate, from_moscow: isMoscow, city: departureCity,
                    extra_services: extraServices.join(", "),
                    tariff_info: activeTariff
                      ? `${activeTariff.name} · ${tariffDays}${(activeTariff.id === "family" || activeTariff.id === "energy") ? ` · ${groupSize} чел.` : ""}${tariffPrice !== null ? ` · ${formatRub(tariffPrice)}` : ""}`
                      : "",
                  }),
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
  );
};

export default BookingForm;
