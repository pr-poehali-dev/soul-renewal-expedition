import Icon from "@/components/ui/icon";
import { PANORAMA_IMG } from "../data";
import type { ExpWithSchedule } from "./types";

interface ContactAndModalsProps {
  scheduleExp: ExpWithSchedule | null;
  setScheduleExp: (v: ExpWithSchedule | null) => void;
  setSelectedExpedition: (v: string) => void;
  scrollTo: (id: string) => void;
}

const ContactAndModals = ({
  scheduleExp,
  setScheduleExp,
  setSelectedExpedition,
  scrollTo,
}: ContactAndModalsProps) => {
  return (
    <>
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

export default ContactAndModals;
