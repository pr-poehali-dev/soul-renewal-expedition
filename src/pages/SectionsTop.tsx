import { useState } from "react";
import Icon from "@/components/ui/icon";
import Lightbox from "@/components/ui/Lightbox";
import { HERO_IMG, ENERGY_IMG, adygheaTours, adygeaPlaces, retreatSpace } from "./data";

interface SectionsTopProps {
  scrollTo: (id: string) => void;
}

const SectionsTop = ({ scrollTo }: SectionsTopProps) => {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index = 0) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length });
  const nextImage = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length });

  return (
    <>
      {/* HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-[#0d1117]/30 to-[#0d1117]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          <p className="font-golos text-xs tracking-[0.4em] text-[#8ab89a] uppercase mb-6">Экспедиции по местам силы</p>
          <h1 className="font-cormorant text-6xl md:text-8xl font-light text-[#e8ddd0] leading-none mb-6">
            Адыгея и Крым.<br /><em className="italic text-[#c9a96e]">Живая земля.</em>
          </h1>
          <p className="font-golos text-lg text-[#9a8f84] max-w-xl mx-auto mb-10 leading-relaxed">
            Путешествия к энергетическим сердцам Адыгеи и Крыма — горам Кавказа, скалам и морю, которые меняют людей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("adygea")} className="px-8 py-3 bg-[#5a8a6e] text-[#0d1117] font-golos text-sm tracking-widest uppercase hover:bg-[#6b9c7f] transition-colors font-medium">
              Туры в Адыгею
            </button>
            <button onClick={() => scrollTo("booking")} className="px-8 py-3 border border-[#4a9db5]/50 text-[#4a9db5] font-golos text-sm tracking-widest uppercase hover:border-[#4a9db5] hover:bg-[#4a9db5]/10 transition-all">
              Забронировать
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-[#4a9db5]/60" />
        </div>
      </section>

      {/* ADYGEA */}
      <section id="adygea" className="py-32 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0d1117 0%, #0b130e 50%, #0d1117 100%)" }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400'%3E%3Cpath d='M0,400 L0,250 L180,120 L360,200 L540,80 L720,160 L900,40 L1080,140 L1260,100 L1440,180 L1440,400 Z' fill='%235a8a6e'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="font-golos text-xs tracking-[0.4em] text-[#5a8a6e] uppercase mb-4">Горная Адыгея</p>
            <h2 className="font-cormorant text-5xl md:text-7xl font-light text-[#e8ddd0] mb-4 leading-none">
              Туры в <em className="italic text-[#8ab89a]">Адыгею</em>
            </h2>
            <p className="font-golos text-[#9a8f84] max-w-xl mx-auto leading-relaxed mt-6">
              Горные маршруты с энергетическими практиками на высоте — где кавказский воздух и древние скалы открывают новое измерение силы
            </p>
            <div className="w-16 h-px mx-auto mt-8" style={{ background: "linear-gradient(90deg, transparent, #5a8a6e, transparent)" }} />
          </div>

          {/* Tour cards — stepped layout */}
          <div className="space-y-8">
            {adygheaTours.map((tour, i) => (
              <div
                key={i}
                className={`group flex flex-col lg:flex-row gap-0 overflow-hidden border border-white/5 hover:border-[#5a8a6e]/30 transition-all duration-500 hover-lift ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                style={{ background: "#111810" }}
              >
                {/* Image block */}
                <div className="lg:w-1/2 flex-shrink-0 flex flex-col">
                  <div className="flex-1 h-64 lg:h-72 overflow-hidden relative cursor-zoom-in" onClick={() => openLightbox(tour.gallery, 0)}>
                    <img
                      src={tour.img}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 ${i % 2 === 1 ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#111810] via-transparent to-transparent opacity-70`} />
                    <div className="absolute top-4 left-4 font-cormorant text-6xl font-light leading-none opacity-30 text-white">
                      {tour.num}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/40 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="ZoomIn" size={14} className="text-white" />
                    </div>
                  </div>
                  {/* Thumbnail strip */}
                  <div className="flex gap-0.5">
                    {tour.gallery.map((thumb, j) => (
                      <div key={j} className="flex-1 h-16 overflow-hidden cursor-zoom-in" onClick={() => openLightbox(tour.gallery, j)}>
                        <img
                          src={thumb}
                          alt=""
                          className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{tour.icon}</span>
                    <span className="font-golos text-xs tracking-[0.3em] text-[#5a8a6e] uppercase">{tour.practice}</span>
                  </div>
                  <h3 className="font-cormorant text-4xl md:text-5xl font-light text-[#e8ddd0] mb-2 leading-tight">
                    {tour.name}
                  </h3>
                  <p className="font-golos text-sm text-[#5a8a6e] mb-6 tracking-wide">{tour.subtitle}</p>
                  <p className="font-golos text-[#9a8f84] leading-relaxed mb-8 text-sm">{tour.desc}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Mountain" size={14} className="text-[#5a8a6e]" />
                      <span className="font-golos text-xs text-[#9a8f84]">{tour.alt}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#5a8a6e]/40" />
                    <div className="flex items-center gap-2">
                      <Icon name="Wind" size={14} className="text-[#5a8a6e]" />
                      <span className="font-golos text-xs text-[#9a8f84]">Горная Адыгея</span>
                    </div>
                  </div>
                  <button
                    onClick={() => scrollTo("booking")}
                    className="mt-8 self-start px-6 py-2.5 border border-[#5a8a6e]/40 text-[#8ab89a] font-golos text-xs tracking-widest uppercase hover:bg-[#5a8a6e]/10 hover:border-[#5a8a6e] transition-all"
                  >
                    Узнать подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Adygea places of power */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="font-golos text-xs tracking-[0.4em] text-[#5a8a6e] uppercase mb-4">Места силы</p>
              <h3 className="font-cormorant text-4xl md:text-5xl font-light text-[#e8ddd0] mb-4">
                Священные точки <em className="italic text-[#8ab89a]">Адыгеи</em>
              </h3>
              <div className="w-16 h-px mx-auto" style={{ background: "linear-gradient(90deg, transparent, #5a8a6e, transparent)" }} />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {adygeaPlaces.map((place, i) => (
                <div key={i} className="group relative overflow-hidden border border-white/5 hover:border-[#5a8a6e]/40 transition-all duration-500" style={{ background: "#0d1510" }}>
                  <div className="h-52 overflow-hidden relative cursor-zoom-in" onClick={() => openLightbox([place.img])}>
                    <img src={place.img} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1510] to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="font-golos text-xs tracking-[0.3em] text-[#5a8a6e] uppercase">{place.practice}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/40 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="ZoomIn" size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-2xl mb-3">{place.icon}</div>
                    <h4 className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-1">{place.name}</h4>
                    <p className="font-golos text-xs text-[#5a8a6e] mb-3 tracking-wide">{place.subtitle}</p>
                    <p className="font-golos text-sm text-[#9a8f84] leading-relaxed mb-5">{place.desc}</p>
                    <button
                      onClick={() => scrollTo("tariffs")}
                      className="w-full py-2.5 border border-[#5a8a6e]/40 text-[#8ab89a] font-golos text-xs tracking-widest uppercase hover:bg-[#5a8a6e]/10 hover:border-[#5a8a6e] transition-all"
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retreat space */}
          <div id="retreat" className="mt-24 scroll-mt-24">
            <div className="border border-[#5a8a6e]/20 overflow-hidden" style={{ background: "#0d1510" }}>
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 grid grid-cols-2 gap-0.5">
                  {retreatSpace.images.map((img, j) => (
                    <div key={j} className={`h-64 lg:h-full overflow-hidden cursor-zoom-in ${j === 0 ? "col-span-2 lg:col-span-1" : "hidden lg:block"}`} onClick={() => openLightbox(retreatSpace.images, j)}>
                      <img src={img} alt={retreatSpace.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
                <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                  <p className="font-golos text-xs tracking-[0.4em] text-[#5a8a6e] uppercase mb-4">{retreatSpace.subtitle}</p>
                  <h3 className="font-cormorant text-4xl md:text-5xl font-light text-[#e8ddd0] mb-5 leading-tight">
                    {retreatSpace.title}
                  </h3>
                  <p className="font-golos text-[#9a8f84] leading-relaxed mb-8 text-sm">{retreatSpace.desc}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {retreatSpace.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-lg">{f.icon}</span>
                        <span className="font-golos text-xs text-[#9a8f84]">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="self-start px-6 py-2.5 border border-[#5a8a6e]/40 text-[#8ab89a] font-golos text-xs tracking-widest uppercase hover:bg-[#5a8a6e]/10 hover:border-[#5a8a6e] transition-all"
                  >
                    Узнать об аренде
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider to next section */}
          <div className="mt-20 text-center">
            <button
              onClick={() => scrollTo("places")}
              className="font-golos text-xs tracking-[0.3em] text-[#9a8f84]/50 uppercase hover:text-[#9a8f84] transition-colors"
            >
              Также смотрите — туры по Крыму ↓
            </button>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">О нас</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-8 leading-tight">
              Почему важно побывать<br /><em className="italic text-[#c9a96e]">в местах силы?</em>
            </h2>
            <p className="font-golos text-[#9a8f84] leading-relaxed mb-5 text-base">
              Места силы — это особые точки на планете, где концентрируется мощная энергия. Люди издревле стремились сюда, чтобы:
            </p>
            <ul className="mb-5 space-y-1">
              {["восстановить жизненные силы", "получить вдохновение", "расширить сознание", "найти гармонию", "ощутить связь с природой и Вселенной"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-golos text-sm text-[#9a8f84]">
                  <span className="text-[#4a9db5] mt-0.5">—</span> {item}
                </li>
              ))}
            </ul>
            <p className="font-golos text-[#9a8f84] leading-relaxed mb-4 text-base">В таких местах можно:</p>
            <ul className="mb-6 space-y-1">
              {["медитировать", "загадывать желания", "работать с внутренними запросами", "проводить ритуалы", "настраиваться на глубокие размышления"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 font-golos text-sm text-[#9a8f84]">
                  <span className="text-[#c9a96e] mt-0.5">—</span> {item}
                </li>
              ))}
            </ul>
            <p className="font-golos text-[#9a8f84] leading-relaxed mb-8 text-base">
              Посещение места силы способствует <span className="text-[#e8ddd0]">внутренней трансформации</span>, помогает избавиться от блоков, получить озарения и улучшить здоровье. Многие отмечают, что после таких поездок жизнь начинает меняться: появляются новые возможности, уходят страхи, реализуются мечты.
            </p>

            <p className="font-golos text-xs tracking-[0.3em] text-[#4a9db5] uppercase mb-5">🌌 Почему стоит отправиться с нами?</p>

            <div className="space-y-5 mb-8">
              <div className="flex gap-4">
                <div className="w-1 shrink-0 mt-1 rounded-full bg-[#c9a96e]/60" />
                <div>
                  <span className="font-golos text-sm text-[#e8ddd0] font-medium">Места силы: </span>
                  <span className="font-golos text-sm text-[#9a8f84]">исследуйте уникальные локации, где природа и история переплетаются, создавая мощные энергетические потоки. Крым и Адыгея — древние святыни, где вы ощутите связь с чем-то большим.</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 shrink-0 mt-1 rounded-full bg-[#c9a96e]/60" />
                <div>
                  <span className="font-golos text-sm text-[#e8ddd0] font-medium">Трансформация души: </span>
                  <span className="font-golos text-sm text-[#9a8f84]">практики медитации и осознанности помогут обновить энергетику и найти гармонию внутри себя.</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 shrink-0 mt-1 rounded-full bg-[#c9a96e]/60" />
                <div>
                  <span className="font-golos text-sm text-[#e8ddd0] font-medium">Энергетическое обновление: </span>
                  <span className="font-golos text-sm text-[#9a8f84]">древние знания и современные методики освобождают от негатива. Вы вернётесь обновлённым, с новыми силами и ясностью мысли.</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 shrink-0 mt-1 rounded-full bg-[#c9a96e]/60" />
                <div>
                  <span className="font-golos text-sm text-[#e8ddd0] font-medium">Сообщество единомышленников: </span>
                  <span className="font-golos text-sm text-[#9a8f84]">вы становитесь частью дружной семьи, где каждый делится опытом и поддерживает друг друга на пути к самопознанию.</span>
                </div>
              </div>
            </div>

            <p className="font-golos text-sm text-[#8ab89a] italic mb-8">
              🌿 Откройте мир, где каждый момент наполнен смыслом, а каждое место — возможность для роста и обновления.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="font-cormorant text-4xl text-[#c9a96e] font-light">10+</div>
                <div className="font-golos text-xs text-[#9a8f84] mt-1 tracking-wide">лет опыта</div>
              </div>
              <div>
                <div className="font-cormorant text-4xl text-[#c9a96e] font-light">600+</div>
                <div className="font-golos text-xs text-[#9a8f84] mt-1 tracking-wide">участников</div>
              </div>
              <div>
                <div className="font-cormorant text-4xl text-[#c9a96e] font-light">6</div>
                <div className="font-golos text-xs text-[#9a8f84] mt-1 tracking-wide">мест силы</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={ENERGY_IMG} alt="Место силы" className="w-full h-[500px] object-cover" style={{ clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)" }} />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#4a9db5]/30" />
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-[#c9a96e]/30" />
          </div>
        </div>
      </section>
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
};

export default SectionsTop;