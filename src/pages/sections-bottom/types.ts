import { expeditions } from "../data";

export type ScheduleItem = { time: string; desc: string };
export type DayBlock = { day: string; subtitle: string; items: ScheduleItem[] };
export type ExpWithSchedule = (typeof expeditions)[0] & {
  schedule?: DayBlock[];
  pricesByCity?: Record<string, string>;
  transport?: string;
  accommodation?: string;
  meals?: string;
};
