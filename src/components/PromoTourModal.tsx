import Icon from "@/components/ui/icon";
import { expeditions } from "@/pages/data";

interface PromoTourModalProps {
  open: boolean;
  onClose: () => void;
  onBook: (expeditionName: string) => void;
}

const PromoTourModal = ({ open, onClose, onBook }: PromoTourModalProps) => {
  const tour = expeditions.find((e) => e.name === "Пять чудес Адыгеи");

  if (!open || !tour) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="relative bg-[#0d1117] border border-[#c9a96e]/30 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[#9a8f84] hover:text-[#e8ddd0] transition-colors z-10">
          <Icon name="X" size={22} />
        </button>

        <div className="p-8 pt-10">
          <p className="font-golos text-xs tracking-[0.4em] text-[#c9a96e] uppercase mb-3">Новый маршрут</p>
          <h3 className="font-cormorant text-4xl font-light text-[#e8ddd0] mb-2 leading-tight">
            {tour.name}
          </h3>
          <p className="font-golos text-sm text-[#5a8a6e] mb-5 tracking-wide">{tour.days}</p>

          <div className="flex items-center gap-2 mb-5">
            <Icon name="MapPin" size={14} className="text-[#4a9db5] shrink-0" />
            <span className="font-golos text-sm text-[#9a8f84] leading-relaxed">{tour.places}</span>
          </div>

          <div className="space-y-2 mb-6">
            {tour.program.map((p, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-golos text-[10px] text-[#c9a96e]">{i + 1}</span>
                </div>
                <p className="font-golos text-xs text-[#9a8f84] leading-relaxed">{p}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6 text-center">
            {Object.entries(tour.pricesByCity || {}).map(([city, price]) => (
              <div key={city} className="p-3 border border-white/10 bg-[#111820]">
                <div className="font-golos text-[10px] text-[#9a8f84] mb-1">{city}</div>
                <div className="font-cormorant text-xl text-[#c9a96e]">{price}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Icon name="Calendar" size={14} className="text-[#4a9db5]" />
            <span className="font-golos text-xs text-[#9a8f84]">Ближайшие даты: {tour.next}</span>
          </div>

          <button
            onClick={() => { onBook(tour.name); onClose(); }}
            className="w-full py-3.5 bg-[#c9a96e] text-[#0d1117] font-golos text-sm tracking-widest uppercase hover:bg-[#d9bb82] transition-colors font-medium"
          >
            Забронировать место
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoTourModal;
