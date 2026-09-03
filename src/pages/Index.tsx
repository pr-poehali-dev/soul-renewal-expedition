import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import SectionsTop from "./SectionsTop";
import SectionsMid from "./SectionsMid";
import SectionsBottom from "./SectionsBottom";
import PromoTourModal from "@/components/PromoTourModal";

const navItems = [
  { id: "home", label: "Главная" },
  { id: "adygea", label: "Адыгея" },
  { id: "about", label: "О нас" },
  { id: "places", label: "Крым" },
  { id: "practices", label: "Программа" },
  { id: "five-wonders-gallery", label: "Пять чудес Адыгеи" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Отзывы" },
  { id: "booking", label: "Бронирование" },
  { id: "contact", label: "Контакты" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedExpedition, setSelectedExpedition] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [departureCity, setDepartureCity] = useState<string | null>(null);
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [tariffDays, setTariffDays] = useState<string>("");
  const [groupSize, setGroupSize] = useState<number>(3);
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);
  const [promoOpen, setPromoOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("promoTourShown");
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setPromoOpen(true);
        sessionStorage.setItem("promoTourShown", "1");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

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

  const handlePromoBook = (expeditionName: string) => {
    setSelectedExpedition(expeditionName);
    scrollTo("booking");
  };

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
            <button
              onClick={() => setPromoOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#c9a96e]/50 text-[#c9a96e] font-golos text-xs tracking-widest uppercase hover:bg-[#c9a96e]/10 transition-all"
            >
              <Icon name="Sparkles" size={13} />
              Пять чудес Адыгеи
            </button>
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
            <button
              onClick={() => { setPromoOpen(true); setMenuOpen(false); }}
              className="flex items-center gap-1.5 mt-2 px-4 py-2.5 border border-[#c9a96e]/50 text-[#c9a96e] font-golos text-xs tracking-widest uppercase hover:bg-[#c9a96e]/10 transition-all justify-center"
            >
              <Icon name="Sparkles" size={13} />
              Пять чудес Адыгеи
            </button>
          </div>
        )}
      </nav>

      <PromoTourModal open={promoOpen} onClose={() => setPromoOpen(false)} onBook={handlePromoBook} />

      <SectionsTop scrollTo={scrollTo} />
      <SectionsMid galleryIndex={galleryIndex} setGalleryIndex={setGalleryIndex} scrollTo={scrollTo} />
      <SectionsBottom
        selectedExpedition={selectedExpedition} setSelectedExpedition={setSelectedExpedition}
        formName={formName} setFormName={setFormName}
        formPhone={formPhone} setFormPhone={setFormPhone}
        formMessage={formMessage} setFormMessage={setFormMessage}
        formSent={formSent} setFormSent={setFormSent}
        formLoading={formLoading} setFormLoading={setFormLoading}
        formError={formError} setFormError={setFormError}
        departureCity={departureCity} setDepartureCity={setDepartureCity}
        extraServices={extraServices} setExtraServices={setExtraServices}
        selectedTariff={selectedTariff} setSelectedTariff={setSelectedTariff}
        tariffDays={tariffDays} setTariffDays={setTariffDays}
        groupSize={groupSize} setGroupSize={setGroupSize}
        customDate={customDate} setCustomDate={setCustomDate}
        scrollTo={scrollTo}
      />
    </div>
  );
};

export default Index;