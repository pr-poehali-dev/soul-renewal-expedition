import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/6b7e9073-dca0-40c0-8842-8b89fd115646.jpg";
const ENERGY_IMG = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/cc8026cd-e87c-4bce-9228-ce70d3ac8717.jpg";
const PANORAMA_IMG = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/33b6b822-bff2-4134-9069-e0e3a9618e50.jpg";
// User real photos
const PHOTO_CRATER = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/bucket/968860a0-da39-4498-993a-c96aa98951ea.jpg";
const PHOTO_TRAIL = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/bucket/f82db171-0eca-4ce8-b019-b374d619c6f9.jpg";
const PHOTO_SHELF = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/bucket/704e0080-5a01-4d80-b98d-f7a8b6cb8a84.jpg";
const PHOTO_PEAKS = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/bucket/33ae11ed-aa4e-4219-813a-4aaa9230f256.jpg";
const PHOTO_ROCKS = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/bucket/516235c4-83fe-486e-9d6d-4fcfa3f52184.jpg";
// Generated place photos
const PLACE_DOLINA = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/323e551a-891e-4436-afef-cf6206c95fa6.jpg";
const PLACE_ILYAS = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/e6413fd5-b3b9-4689-872f-c44f25b566ac.jpg";
const PLACE_MEGANOM = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/a48f0b3f-8c94-47ec-9799-376d00425a18.jpg";
const PLACE_HRAM = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/0899ce5b-37ab-4f9d-b9be-3c47ea5da31e.jpg";
const PLACE_FIOLENT = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/8ac1ce0d-d228-457f-b495-ae806a5a152e.jpg";
const PLACE_MANGUP = "https://cdn.poehali.dev/projects/0c801b77-5392-43f8-973b-c08b2a31aeda/files/524dd1a2-8c39-4d13-89f0-5e38c151b9fc.jpg";

const adygheaTours = [
  {
    num: "01",
    name: "Лагонаки",
    subtitle: "Смотровая на высоте 1744 м",
    desc: "Очистительный сеанс на вершине плато — сброс старой энергии и наполнение новой. Панорама горных хребтов на 360°.",
    practice: "Очищение и наполнение",
    alt: "Высота 1744 м",
    img: PHOTO_CRATER,
    gallery: [PHOTO_CRATER, PHOTO_PEAKS],
    icon: "🏔️",
    color: "#5a8a6e",
  },
  {
    num: "02",
    name: "Смотровая над Орлиной полкой",
    subtitle: "Чистка меридианов",
    desc: "Точка силы над ущельем — чистка энергетических меридианов и мощное наполнение через горный воздух и пространство.",
    practice: "Чистка меридианов",
    alt: "Над ущельем",
    img: PHOTO_TRAIL,
    gallery: [PHOTO_TRAIL, PHOTO_ROCKS],
    icon: "🦅",
    color: "#7a6e3a",
  },
  {
    num: "03",
    name: "Орлиная полка",
    subtitle: "Место встречи с орлами",
    desc: "Легендарная скальная полка — место, где гнездятся орлы и концентрируется энергия свободы. Практика выхода за пределы.",
    practice: "Энергия свободы",
    alt: "Скальная полка",
    img: PHOTO_SHELF,
    gallery: [PHOTO_SHELF, PHOTO_ROCKS],
    icon: "🪶",
    color: "#5a8a6e",
  },
];

const places = [
  { name: "Долина Приведений", desc: "Мистическая долина с каменными великанами на склонах Демерджи. Место, где скалы хранят память тысячелетий и пробуждают внутренние трансформации.", icon: "🗿", img: PLACE_DOLINA },
  { name: "Мыс Меганом", desc: "Сакральный мыс с пересечением мощных энергетических потоков. Место медитаций и ретритов.", icon: "🌊", img: PLACE_MEGANOM },
  { name: "Вершина Ильяс-Кая", desc: "Священная гора с руинами древнего монастыря над морем. Место силы, откуда открывается путь к ясности и духовному обновлению.", icon: "⛪", img: PLACE_ILYAS },
  { name: "Храм Солнца", desc: "Природный амфитеатр из каменных глыб на мысе Фиолент. Древнее место силы, где солнечная энергия заряжает и пробуждает внутренний свет.", icon: "☀️", img: PLACE_HRAM },
  { name: "Мыс Фиолент", desc: "Скалистый берег с кристальной водой. Место очищения морской стихией.", icon: "💎", img: PLACE_FIOLENT },
  { name: "Мангуп-Кале", desc: "Пещерный город на вершине горы. Место силы древних цивилизаций Крыма.", icon: "🗺️", img: PLACE_MANGUP },
];

const practices = [
  { title: "Медитация у скал", desc: "Практика тишины и присутствия на фоне крымских утёсов. Работа с энергией камня и земли.", duration: "2–3 часа", icon: "🧘" },
  { title: "Морские ритуалы", desc: "Очищение и обновление через взаимодействие с морской стихией на рассвете и закате.", duration: "1.5 часа", icon: "🌅" },
  { title: "Горные походы", desc: "Осознанные восхождения к вершинам с практиками дыхания и работой с пространством.", duration: "полный день", icon: "🚶" },
  { title: "Ночь у огня", desc: "Глубинные практики у живого огня под звёздами. Трансформационная работа с тенями.", duration: "вся ночь", icon: "🔥" },
];

const reviews = [
  { name: "Анна М.", city: "Москва", text: "Это был самый сильный опыт в моей жизни. Долина Приведений буквально перевернула моё восприятие. Каменные великаны как будто говорят с тобой. Вернулась другим человеком.", stars: 5 },
  { name: "Сергей К.", city: "Санкт-Петербург", text: "Три дня на Меганоме — это не отдых, это путешествие внутрь себя. Команда создаёт невероятное пространство безопасности.", stars: 5 },
  { name: "Елена Р.", city: "Екатеринбург", text: "Вершина Ильяс-Кая изменила меня навсегда. Стоишь на краю скалы над морем, а под ногами — тысячи лет истории. Практики там работают на каком-то очень глубоком уровне.", stars: 5 },
  { name: "Дмитрий В.", city: "Краснодар", text: "Храм Солнца на рассвете — это незабываемо. Первые лучи между камнями, тишина, и ощущение, что ты в центре Вселенной. Буду возвращаться снова.", stars: 5 },
];

const expeditions = [
  { name: "Экспедиция «Дикий Берег»", days: "5 дней", price: "от 45 000 ₽", places: "Меганом, Фиолент, Карадаг", group: "до 8 человек", next: "12 мая 2026" },
  { name: "Экспедиция «Горные Духи»", days: "7 дней", price: "от 62 000 ₽", places: "Чатыр-Даг, Демерджи, Мангуп", group: "до 6 человек", next: "3 июня 2026" },
  { name: "Экспедиция «Полное Погружение»", days: "10 дней", price: "от 89 000 ₽", places: "Все 6 мест силы", group: "до 5 человек", next: "18 июля 2026" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О нас" },
    { id: "adygea", label: "Адыгея" },
    { id: "places", label: "Крым" },
    { id: "practices", label: "Практики" },
    { id: "gallery", label: "Галерея" },
    { id: "reviews", label: "Отзывы" },
    { id: "booking", label: "Бронирование" },
    { id: "contact", label: "Контакты" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      navItems.forEach((n) => {
        const el = document.getElementById(n.id);
        if (el && scrollY >= el.offsetTop) setActiveSection(n.id);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const galleryImages = [HERO_IMG, ENERGY_IMG, PANORAMA_IMG, HERO_IMG, ENERGY_IMG, PANORAMA_IMG];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e8ddd0]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-cormorant text-xl font-light tracking-widest text-[#e8ddd0] uppercase">
            Крым<span className="text-[#4a9db5]"> · </span>Сила
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link font-golos text-sm tracking-wide transition-colors ${activeSection === item.id ? "text-[#4a9db5]" : "text-[#9a8f84] hover:text-[#e8ddd0]"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="lg:hidden text-[#9a8f84] hover:text-[#e8ddd0]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#0d1117] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="font-golos text-sm text-[#9a8f84] hover:text-[#e8ddd0] text-left py-1">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-[#0d1117]/30 to-[#0d1117]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-6">Экспедиции по местам силы</p>
          <h1 className="font-cormorant text-6xl md:text-8xl font-light text-[#e8ddd0] leading-none mb-6">
            Крым.<br /><em className="italic text-[#c9a96e]">Живая земля.</em>
          </h1>
          <p className="font-golos text-lg text-[#9a8f84] max-w-xl mx-auto mb-10 leading-relaxed">
            Путешествия к энергетическим сердцам Крыма — скалам, морю и горам, которые меняют людей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("places")} className="px-8 py-3 bg-[#4a9db5] text-[#0d1117] font-golos text-sm tracking-widest uppercase hover:bg-[#5ab0c8] transition-colors font-medium">
              Места силы
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

      {/* ABOUT */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">О нас</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-8 leading-tight">
              Мы проводники<br /><em className="italic text-[#c9a96e]">между мирами</em>
            </h2>
            <p className="font-golos text-[#9a8f84] leading-relaxed mb-6 text-base">
              Более 10 лет мы водим людей по энергетическим местам Крыма. Не просто туристические маршруты — это глубинная работа с пространством и собой.
            </p>
            <p className="font-golos text-[#9a8f84] leading-relaxed mb-8 text-base">
              Каждая экспедиция — это путешествие к сути. Мы соединяем практики работы с энергией, осознанное движение в природе и силу крымских мест, которые тысячелетиями притягивали искателей.
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

      {/* ADYGEA */}
      <section id="adygea" className="py-32 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0d1117 0%, #0b130e 50%, #0d1117 100%)" }}>
        {/* bg mountain silhouette */}
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
                  <div className="flex-1 h-64 lg:h-72 overflow-hidden relative">
                    <img
                      src={tour.img}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 ${i % 2 === 1 ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#111810] via-transparent to-transparent opacity-70`} />
                    <div className="absolute top-4 left-4 font-cormorant text-6xl font-light leading-none opacity-30 text-white">
                      {tour.num}
                    </div>
                  </div>
                  {/* Thumbnail strip */}
                  <div className="flex gap-0.5">
                    {tour.gallery.map((thumb, j) => (
                      <div key={j} className="flex-1 h-16 overflow-hidden">
                        <img
                          src={thumb}
                          alt=""
                          className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
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
                    onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                    className="mt-8 self-start px-6 py-2.5 border border-[#5a8a6e]/40 text-[#8ab89a] font-golos text-xs tracking-widest uppercase hover:bg-[#5a8a6e]/10 hover:border-[#5a8a6e] transition-all"
                  >
                    Узнать подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Divider to next section */}
          <div className="mt-20 text-center">
            <button
              onClick={() => document.getElementById("places")?.scrollIntoView({ behavior: "smooth" })}
              className="font-golos text-xs tracking-[0.3em] text-[#9a8f84]/50 uppercase hover:text-[#9a8f84] transition-colors"
            >
              Также смотрите — туры по Крыму ↓
            </button>
          </div>
        </div>
      </section>

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
                <div className="h-48 overflow-hidden relative">
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111820] to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-2xl mb-3">{place.icon}</div>
                  <h3 className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-2">{place.name}</h3>
                  <p className="font-golos text-sm text-[#9a8f84] leading-relaxed">{place.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICES */}
      <section id="practices" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Программа</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4"><em className="italic text-[#c9a96e]">Практики</em></h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {practices.map((p, i) => (
              <div key={i} className="flex gap-6 p-8 bg-[#111820] border border-white/5 hover:border-[#4a9db5]/20 transition-colors">
                <div className="text-4xl flex-shrink-0">{p.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="font-cormorant text-2xl text-[#e8ddd0] font-light">{p.title}</h3>
                    <span className="font-golos text-xs text-[#4a9db5] bg-[#4a9db5]/10 px-2 py-1 rounded-full whitespace-nowrap">{p.duration}</span>
                  </div>
                  <p className="font-golos text-sm text-[#9a8f84] leading-relaxed">{p.desc}</p>
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
          <div className="mb-4 overflow-hidden h-[500px] relative">
            <img src={galleryImages[galleryIndex]} alt="Крым" className="w-full h-full object-cover transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e13]/60 to-transparent" />
            <button onClick={() => setGalleryIndex((galleryIndex - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0d1117]/60 p-3 hover:bg-[#4a9db5]/20 transition-colors">
              <Icon name="ChevronLeft" size={20} className="text-[#e8ddd0]" />
            </button>
            <button onClick={() => setGalleryIndex((galleryIndex + 1) % galleryImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0d1117]/60 p-3 hover:bg-[#4a9db5]/20 transition-colors">
              <Icon name="ChevronRight" size={20} className="text-[#e8ddd0]" />
            </button>
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

      {/* BOOKING */}
      <section id="booking" className="py-32 px-6 bg-[#0a0e13]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-golos text-xs tracking-[0.4em] text-[#4a9db5] uppercase mb-4">Ближайшие даты</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#e8ddd0] mb-4"><em className="italic text-[#c9a96e]">Бронирование</em></h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {expeditions.map((exp, i) => (
              <div key={i} className={`p-8 border transition-all hover-lift ${i === 1 ? "border-[#4a9db5]/50 bg-[#4a9db5]/5" : "border-white/5 bg-[#111820] hover:border-[#4a9db5]/20"}`}>
                {i === 1 && <div className="font-golos text-xs tracking-widest text-[#4a9db5] uppercase mb-4">Популярное</div>}
                <h3 className="font-cormorant text-2xl text-[#e8ddd0] font-light mb-2">{exp.name}</h3>
                <div className="font-cormorant text-4xl text-[#c9a96e] font-light mb-6">{exp.price}</div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3"><Icon name="Calendar" size={14} className="text-[#4a9db5]" /><span className="font-golos text-sm text-[#9a8f84]">{exp.days}</span></div>
                  <div className="flex items-center gap-3"><Icon name="MapPin" size={14} className="text-[#4a9db5]" /><span className="font-golos text-sm text-[#9a8f84]">{exp.places}</span></div>
                  <div className="flex items-center gap-3"><Icon name="Users" size={14} className="text-[#4a9db5]" /><span className="font-golos text-sm text-[#9a8f84]">{exp.group}</span></div>
                  <div className="flex items-center gap-3"><Icon name="Clock" size={14} className="text-[#4a9db5]" /><span className="font-golos text-sm text-[#9a8f84]">Старт: {exp.next}</span></div>
                </div>
                <button className={`w-full py-3 font-golos text-sm tracking-widest uppercase transition-all ${i === 1 ? "bg-[#4a9db5] text-[#0d1117] hover:bg-[#5ab0c8] font-medium" : "border border-[#4a9db5]/40 text-[#4a9db5] hover:bg-[#4a9db5]/10"}`}>
                  Забронировать
                </button>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto p-8 bg-[#111820] border border-white/5">
            <h3 className="font-cormorant text-3xl text-[#e8ddd0] font-light mb-6 text-center">Задать вопрос</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Ваше имя" className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#4a9db5]/50 w-full" />
              <input type="tel" placeholder="Телефон" className="bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#4a9db5]/50 w-full" />
            </div>
            <textarea rows={4} placeholder="Расскажите о себе и своих ожиданиях от экспедиции..." className="w-full bg-[#0d1117] border border-white/10 text-[#e8ddd0] px-4 py-3 font-golos text-sm placeholder:text-[#9a8f84]/50 focus:outline-none focus:border-[#4a9db5]/50 resize-none mb-4" />
            <button className="w-full py-4 bg-[#4a9db5] text-[#0d1117] font-golos text-sm tracking-widest uppercase hover:bg-[#5ab0c8] transition-colors font-medium">
              Отправить заявку
            </button>
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
              <a href="tel:+79001234567" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#4a9db5]/10 border border-[#4a9db5]/20 flex items-center justify-center group-hover:bg-[#4a9db5]/20 transition-colors">
                  <Icon name="Phone" size={18} className="text-[#4a9db5]" />
                </div>
                <div>
                  <div className="font-golos text-xs text-[#9a8f84] mb-1 tracking-wide">Телефон</div>
                  <div className="font-cormorant text-xl text-[#e8ddd0]">+7 900 123-45-67</div>
                </div>
              </a>
              <a href="mailto:info@crimea-power.ru" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#4a9db5]/10 border border-[#4a9db5]/20 flex items-center justify-center group-hover:bg-[#4a9db5]/20 transition-colors">
                  <Icon name="Mail" size={18} className="text-[#4a9db5]" />
                </div>
                <div>
                  <div className="font-golos text-xs text-[#9a8f84] mb-1 tracking-wide">Email</div>
                  <div className="font-cormorant text-xl text-[#e8ddd0]">info@crimea-power.ru</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#4a9db5]/10 border border-[#4a9db5]/20 flex items-center justify-center">
                  <Icon name="MapPin" size={18} className="text-[#4a9db5]" />
                </div>
                <div>
                  <div className="font-golos text-xs text-[#9a8f84] mb-1 tracking-wide">Сбор групп</div>
                  <div className="font-cormorant text-xl text-[#e8ddd0]">Симферополь, Крым</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#4a9db5]/40 transition-colors text-[#9a8f84] hover:text-[#4a9db5]">
                <Icon name="MessageCircle" size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#4a9db5]/40 transition-colors text-[#9a8f84] hover:text-[#4a9db5]">
                <Icon name="Instagram" size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#4a9db5]/40 transition-colors text-[#9a8f84] hover:text-[#4a9db5]">
                <Icon name="Youtube" size={16} />
              </a>
            </div>
          </div>
          <div className="relative h-80 lg:h-[450px]">
            <img src={PANORAMA_IMG} alt="Крым панорама" className="w-full h-full object-cover" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/40 to-transparent" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }} />
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Index;