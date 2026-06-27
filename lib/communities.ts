/**
 * Community registry — the scalability backbone.
 *
 * Every data record carries a `community_id`. Onboarding a new UAE rural
 * community is a ONE-LINE change: add an entry here and ship a seed file.
 * Nothing else in the app needs to change.
 */
export interface Community {
  id: string;
  name_ar: string;
  name_en: string;
  region_en: string;
  focus_en: string;
  active: boolean;
}

export const COMMUNITIES: Record<string, Community> = {
  "al-quaa": {
    id: "al-quaa",
    name_ar: "القوع",
    name_en: "Al Qua'a",
    region_en: "Al Ain, Abu Dhabi",
    focus_en: "Camel farming + stargazing",
    active: true,
  },
  // Roadmap — uncomment + add a seed file to launch the next community:
  // "liwa":    { id: "liwa",    name_ar: "ليوا",   name_en: "Liwa",    region_en: "Abu Dhabi", focus_en: "Date palm economy", active: false },
  // "hatta":   { id: "hatta",   name_ar: "حتا",    name_en: "Hatta",   region_en: "Dubai",     focus_en: "Eco-tourism",       active: false },
  // "mahadha": { id: "mahadha", name_ar: "محضة",   name_en: "Mahadha", region_en: "RAK",       focus_en: "Border trade",      active: false },
};

/** The community this deployment serves. */
export const ACTIVE_COMMUNITY: Community = COMMUNITIES["al-quaa"];
