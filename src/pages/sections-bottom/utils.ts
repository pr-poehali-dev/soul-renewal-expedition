export const BLOCKED_START = new Date(2026, 5, 10); // 10 июня 2026
export const BLOCKED_END = new Date(2026, 5, 25);   // 25 июня 2026

export function getAvailableDates(isMoscow: boolean): { date: Date; label: string }[] {
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

export const CITIES = ["Ростов-на-Дону", "Краснодар", "Москва"];

export function getPrice(basePrice: string, city: string | null, pricesByCity?: Record<string, string>): string {
  if (!city) return "";
  if (pricesByCity && pricesByCity[city]) return pricesByCity[city];
  if (city === "Москва" && basePrice !== "уточняется") {
    const num = parseInt(basePrice.replace(/\D/g, ""), 10);
    return `${(num + 5000).toLocaleString("ru-RU")} ₽`;
  }
  return basePrice;
}

export function adjustForCity(basePrice: number, city: string | null): number | null {
  if (!city) return null;
  if (city === "Москва") return basePrice + 5000;
  return basePrice;
}

export function formatRub(n: number): string {
  return `${n.toLocaleString("ru-RU")} ₽`;
}
