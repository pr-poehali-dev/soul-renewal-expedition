import Icon from "@/components/ui/icon";
import { tariffs } from "../data";
import { adjustForCity, formatRub } from "./utils";

interface TariffsSectionProps {
  departureCity: string | null;
  selectedTariff: string | null;
  setSelectedTariff: (v: string | null) => void;
  tariffDays: string;
  setTariffDays: (v: string) => void;
  groupSize: number;
  setGroupSize: (v: number) => void;
  setSelectedExpedition: (v: string) => void;
  scrollTo: (id: string) => void;
  activeTariff: (typeof tariffs)[0] | null;
  tariffPrice: number | null;
}

const TariffsSection = ({
  departureCity,
  selectedTariff,
  setSelectedTariff,
  tariffDays,
  setTariffDays,
  groupSize,
  setGroupSize,
  setSelectedExpedition,
  scrollTo,
  activeTariff,
  tariffPrice,
}: TariffsSectionProps) => {
  return (
    <>
      {/* TARIFFS */}
      <div id="tariffs" className="text-center mb-10 scroll-mt-24">
        <p className="font-golos text-xs tracking-[0.3em] text-[#9a8f84] uppercase mb-3">Или выберите формат</p>
        <h3 className="font-cormorant text-3xl md:text-4xl font-light text-[#e8ddd0]">Варианты <em className="italic text-[#c9a96e]">тарифов</em></h3>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {tariffs.map((t) => (
          <div
            key={t.id}
            className={`flex flex-col p-7 border transition-all ${selectedTariff === t.id ? "border-[#4a9db5] bg-[#4a9db5]/5" : "border-white/5 bg-[#111820] hover:border-[#4a9db5]/30"}`}
          >
            <div className="text-3xl mb-3">{t.icon}</div>
            <h4 className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-2">{t.name}</h4>
            <p className="font-golos text-xs text-[#9a8f84] leading-relaxed mb-5 flex-1">{t.desc}</p>
            <div className="space-y-2 mb-5">
              {t.options.map((o) => {
                const displayPrice = adjustForCity(o.price, departureCity);
                return (
                  <div key={o.days} className="flex items-center justify-between px-3 py-2 border border-white/5 bg-[#0d1117]">
                    <span className="font-golos text-xs text-[#9a8f84]">{o.days}</span>
                    <span className="font-cormorant text-lg text-[#c9a96e]">{formatRub(displayPrice ?? o.price)}</span>
                  </div>
                );
              })}
            </div>
            <p className="font-golos text-[11px] text-[#9a8f84]/60 mb-5">
              {t.unit}{departureCity === "Москва" ? " · из Москвы +5 000 ₽" : ""}
            </p>
            <button
              onClick={() => {
                setSelectedTariff(t.id);
                setTariffDays(t.options[0].days);
                setGroupSize(t.id === "family" ? (t.baseGroupSize || 3) : t.id === "energy" ? (t.minGroupSize || 4) : 1);
              }}
              className={`w-full py-3 border font-golos text-xs tracking-widest uppercase transition-all mt-auto ${selectedTariff === t.id ? "bg-[#4a9db5] border-[#4a9db5] text-[#0d1117]" : "border-[#4a9db5]/40 text-[#4a9db5] hover:bg-[#4a9db5]/10"}`}
            >
              {selectedTariff === t.id ? "Выбрано" : "Выбрать тариф"}
            </button>
          </div>
        ))}
      </div>

      {selectedTariff && activeTariff && (
        <div className="max-w-2xl mx-auto mb-16 p-6 border border-[#4a9db5]/20 bg-[#4a9db5]/5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-golos text-xs text-[#4a9db5] uppercase tracking-wide">Настройка тарифа «{activeTariff.name}»</span>
            <button onClick={() => setSelectedTariff(null)} className="text-[#9a8f84] hover:text-[#e8ddd0]">
              <Icon name="X" size={14} />
            </button>
          </div>
          {activeTariff.options.length > 1 && (
            <div className="flex gap-2 mb-4">
              {activeTariff.options.map((o) => (
                <button
                  key={o.days}
                  onClick={() => setTariffDays(o.days)}
                  className={`px-4 py-2 font-golos text-xs border transition-all ${tariffDays === o.days ? "border-[#4a9db5] bg-[#4a9db5]/10 text-[#4a9db5]" : "border-white/10 text-[#9a8f84] hover:border-[#4a9db5]/40"}`}
                >
                  {o.days}
                </button>
              ))}
            </div>
          )}
          {(activeTariff.id === "family" || activeTariff.id === "energy") && (
            <div className="flex items-center gap-4 mb-4">
              <span className="font-golos text-xs text-[#9a8f84]">Количество человек</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGroupSize(Math.max(activeTariff.id === "family" ? (activeTariff.baseGroupSize || 3) : (activeTariff.minGroupSize || 4), groupSize - 1))}
                  className="w-8 h-8 border border-white/10 text-[#9a8f84] hover:border-[#4a9db5]/40 hover:text-[#4a9db5] flex items-center justify-center"
                >
                  −
                </button>
                <span className="font-cormorant text-xl text-[#e8ddd0] w-8 text-center">{groupSize}</span>
                <button
                  onClick={() => setGroupSize(groupSize + 1)}
                  className="w-8 h-8 border border-white/10 text-[#9a8f84] hover:border-[#4a9db5]/40 hover:text-[#4a9db5] flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          )}
          {departureCity ? (
            tariffPrice !== null && (
              <div className="font-cormorant text-3xl text-[#c9a96e] font-light">
                Итого: {formatRub(tariffPrice)}
              </div>
            )
          ) : (
            <p className="font-golos text-xs text-[#9a8f84]/60">Выберите город выезда выше, чтобы увидеть стоимость</p>
          )}
          <button
            onClick={() => {
              setSelectedExpedition(`${activeTariff.name} · ${tariffDays}`);
              scrollTo("booking");
            }}
            className="w-full mt-5 py-3 border border-[#4a9db5]/40 text-[#4a9db5] font-golos text-xs tracking-widest uppercase hover:bg-[#4a9db5]/10 transition-all"
          >
            Забронировать этот тариф
          </button>
        </div>
      )}
    </>
  );
};

export default TariffsSection;
