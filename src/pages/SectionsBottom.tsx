import { useState, useMemo } from "react";
import { expeditions, tariffs } from "./data";
import BookingExpeditions from "./sections-bottom/BookingExpeditions";
import TariffsSection from "./sections-bottom/TariffsSection";
import BookingForm from "./sections-bottom/BookingForm";
import ContactAndModals from "./sections-bottom/ContactAndModals";
import type { ExpWithSchedule } from "./sections-bottom/types";
import { getAvailableDates, adjustForCity, formatRub } from "./sections-bottom/utils";

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
  extraServices: string[];
  setExtraServices: (v: string[]) => void;
  selectedTariff: string | null;
  setSelectedTariff: (v: string | null) => void;
  tariffDays: string;
  setTariffDays: (v: string) => void;
  groupSize: number;
  setGroupSize: (v: number) => void;
  customDate: Date | undefined;
  setCustomDate: (v: Date | undefined) => void;
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
  extraServices, setExtraServices,
  selectedTariff, setSelectedTariff,
  tariffDays, setTariffDays,
  groupSize, setGroupSize,
  customDate, setCustomDate,
  scrollTo,
}: SectionsBottomProps) => {
  const toggleExtraService = (label: string) => {
    setExtraServices(
      extraServices.includes(label)
        ? extraServices.filter((s) => s !== label)
        : [...extraServices, label]
    );
  };
  const isMoscow = departureCity === "Москва";
  const [selectedDate, setSelectedDate] = useState("");

  const activeTariff = tariffs.find((t) => t.id === selectedTariff) || null;
  const activeTariffOption = activeTariff?.options.find((o) => o.days === tariffDays) || activeTariff?.options[0] || null;

  const tariffPrice = useMemo(() => {
    if (!activeTariff || !activeTariffOption || !departureCity) return null;
    let base = activeTariffOption.price;
    if (activeTariff.id === "family" && activeTariff.extraPersonPrice && activeTariff.baseGroupSize) {
      const extra = Math.max(0, groupSize - activeTariff.baseGroupSize);
      base = base + extra * activeTariff.extraPersonPrice;
    }
    if (activeTariff.id === "energy") {
      base = base * groupSize;
    }
    return adjustForCity(base, departureCity);
  }, [activeTariff, activeTariffOption, departureCity, groupSize]);

  const expsTyped = expeditions as ExpWithSchedule[];
  const [scheduleExp, setScheduleExp] = useState<ExpWithSchedule | null>(null);

  const availableDates = useMemo(() => getAvailableDates(isMoscow), [isMoscow]);

  return (
    <>
      {/* BOOKING */}
      <section id="booking" className="py-32 px-6 bg-[#0a0e13]">
        <div className="max-w-7xl mx-auto">
          <BookingExpeditions
            departureCity={departureCity}
            setDepartureCity={setDepartureCity}
            setSelectedDate={setSelectedDate}
            isMoscow={isMoscow}
            expsTyped={expsTyped}
            setScheduleExp={setScheduleExp}
            setSelectedExpedition={setSelectedExpedition}
          />

          <TariffsSection
            departureCity={departureCity}
            selectedTariff={selectedTariff}
            setSelectedTariff={setSelectedTariff}
            tariffDays={tariffDays}
            setTariffDays={setTariffDays}
            groupSize={groupSize}
            setGroupSize={setGroupSize}
            setSelectedExpedition={setSelectedExpedition}
            scrollTo={scrollTo}
            activeTariff={activeTariff}
            tariffPrice={tariffPrice}
          />

          <BookingForm
            selectedExpedition={selectedExpedition}
            setSelectedExpedition={setSelectedExpedition}
            formName={formName}
            setFormName={setFormName}
            formPhone={formPhone}
            setFormPhone={setFormPhone}
            formMessage={formMessage}
            setFormMessage={setFormMessage}
            formSent={formSent}
            setFormSent={setFormSent}
            formLoading={formLoading}
            setFormLoading={setFormLoading}
            formError={formError}
            setFormError={setFormError}
            departureCity={departureCity}
            extraServices={extraServices}
            toggleExtraService={toggleExtraService}
            customDate={customDate}
            setCustomDate={setCustomDate}
            isMoscow={isMoscow}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableDates={availableDates}
            activeTariff={activeTariff}
            tariffDays={tariffDays}
            groupSize={groupSize}
            tariffPrice={tariffPrice}
            formatRub={formatRub}
          />
        </div>
      </section>

      <ContactAndModals
        scheduleExp={scheduleExp}
        setScheduleExp={setScheduleExp}
        setSelectedExpedition={setSelectedExpedition}
        scrollTo={scrollTo}
      />
    </>
  );
};

export default SectionsBottom;
