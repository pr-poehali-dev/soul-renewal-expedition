import { useState } from "react";
import Icon from "@/components/ui/icon";
import Lightbox from "@/components/ui/Lightbox";
import { places, programItems, romanticCamping, fiveWondersGallery, reviews, galleryImages } from "./data";

interface SectionsMidProps {
  galleryIndex: number;
  setGalleryIndex: (i: number) => void;
  scrollTo: (id: string) => void;
}

const SectionsMid = ({ galleryIndex, setGalleryIndex, scrollTo }: SectionsMidProps) => {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index = 0) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length });
  const nextImage = () => lightbox && setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length });

  const allPlaceImages = places.map(p => p.img);
  const fiveWondersImages = fiveWondersGallery.map(p => p.img);

  return (
    <>
      {/* PLACES */}
      <section id="places" className="py-32 px-6 bg-[#0a0e13]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Маршруты</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4">Места <em className="italic text-[#c9a96e]">силы</em></h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place, i) => (
              <div key={i} className="group relative overflow-hidden bg-[#111820] hover-lift cursor-pointer border border-white/5 hover:border-[#4a9db5]/30 transition-colors">
                <div className="h-48 overflow-hidden relative cursor-zoom-in" onClick={() => openLightbox(allPlaceImages, i)}>
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111820] to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/40 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ZoomIn" size={14} className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-2xl mb-3">{place.icon}</div>
                  <h3 className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-2">{place.name}</h3>
                  <p className="font-golos text-sm text-[#9a8f84] leading-relaxed mb-5">{place.desc}</p>
                  <button
                    onClick={() => scrollTo("tariffs")}
                    className="w-full py-2.5 border border-[#4a9db5]/40 text-[#4a9db5] font-golos text-xs tracking-widest uppercase hover:bg-[#4a9db5]/10 transition-all"
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="practices" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Чем наполнено путешествие</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4">Возможные <em className="italic text-[#c9a96e]">активности</em></h2>
            <p className="font-golos text-sm text-[#9a8f84] max-w-xl mx-auto mt-4">Последовательность и наполненность программы может меняться в зависимости от группы, погоды и маршрута</p>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {programItems.map((p, i) => (
              <div key={i} className="flex gap-5 p-6 bg-[#111820] border border-white/5 hover:border-[#4a9db5]/20 transition-colors">
                <div className="text-3xl flex-shrink-0">{p.icon}</div>
                <div>
                  <h3 className="font-cormorant text-xl text-[#e8ddd0] font-light mb-1">{p.title}</h3>
                  <p className="font-golos text-sm text-[#9a8f84] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-5 p-6 bg-[#4a9db5]/5 border border-[#4a9db5]/20">
            <div className="text-3xl flex-shrink-0">{romanticCamping.icon}</div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h3 className="font-cormorant text-xl text-[#e8ddd0] font-light">{romanticCamping.title}</h3>
                <span className="font-golos text-[10px] text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-1 tracking-wide uppercase">За отдельную плату</span>
              </div>
              <p className="font-golos text-sm text-[#9a8f84] leading-relaxed">{romanticCamping.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FIVE WONDERS GALLERY */}
      <section id="five-wonders-gallery" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.4em] text-[#c9a96e] uppercase mb-4">Фотогалерея тура</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4">Пять <em className="italic text-[#c9a96e]">чудес Адыгеи</em></h2>
            <p className="font-golos text-sm text-[#9a8f84] max-w-xl mx-auto mt-4">Пять локаций одного маршрута — от древнего монастыря до горного скита</p>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fiveWondersGallery.map((spot, i) => (
              <div key={i} className="group relative overflow-hidden bg-[#111820] hover-lift cursor-pointer border border-white/5 hover:border-[#c9a96e]/30 transition-colors">
                <div className="h-56 overflow-hidden relative cursor-zoom-in" onClick={() => openLightbox(fiveWondersImages, i)}>
                  <img src={spot.img} alt={spot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111820] to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/40 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ZoomIn" size={14} className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-2xl mb-3">{spot.icon}</div>
                  <h3 className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-2">{spot.name}</h3>
                  <p className="font-golos text-sm text-[#9a8f84] leading-relaxed mb-5">{spot.desc}</p>
                  <button
                    onClick={() => scrollTo("booking")}
                    className="w-full py-2.5 border border-[#c9a96e]/40 text-[#c9a96e] font-golos text-xs tracking-widest uppercase hover:bg-[#c9a96e]/10 transition-all"
                  >
                    Забронировать тур
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 px-6 bg-[#0a0e13]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Визуальный дневник</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4"><em className="italic text-[#c9a96e]">Галерея</em></h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="mb-4 overflow-hidden h-[500px] relative group cursor-zoom-in" onClick={() => openLightbox(galleryImages, galleryIndex)}>
            <img src={galleryImages[galleryIndex]} alt="Крым" className="w-full h-full object-cover transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e13]/60 to-transparent" />
            <button onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex - 1 + galleryImages.length) % galleryImages.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0d1117]/60 p-3 hover:bg-[#4a9db5]/20 transition-colors">
              <Icon name="ChevronLeft" size={20} className="text-[#e8ddd0]" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex + 1) % galleryImages.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0d1117]/60 p-3 hover:bg-[#4a9db5]/20 transition-colors">
              <Icon name="ChevronRight" size={20} className="text-[#e8ddd0]" />
            </button>
            <div className="absolute top-4 right-4 bg-black/40 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="ZoomIn" size={16} className="text-white" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {galleryImages.map((img, i) => (
              <button key={i} onClick={() => setGalleryIndex(i)} className={`h-20 overflow-hidden transition-all ${i === galleryIndex ? "ring-2 ring-[#4a9db5]" : "opacity-50 hover:opacity-80"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Путники о нас</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4"><em className="italic text-[#c9a96e]">Отзывы</em></h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="p-8 bg-[#111820] border border-white/5 relative">
                <div className="font-cormorant text-6xl text-[#4a9db5]/20 absolute top-4 right-6 leading-none">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, j) => <span key={j} className="text-[#c9a96e] text-sm">★</span>)}
                </div>
                <p className="font-golos text-[#9a8f84] leading-relaxed mb-6 text-sm italic">{r.text}</p>
                <div>
                  <div className="font-cormorant text-lg text-[#e8ddd0]">{r.name}</div>
                  <div className="font-golos text-xs text-[#4a9db5] tracking-wide">{r.city}</div>
                </div>
              </div>
            ))}
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

export default SectionsMid;