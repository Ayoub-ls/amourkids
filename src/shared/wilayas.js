import locationData from "./algeria_wilayas_baladiyas.json";

// Canonical list of Algeria's wilayas and their baladiyas, shared by every
// order form. Names are kept in Arabic because those are stored with orders.
export const WILAYAS = locationData.wilayas;

export function getBaladiyas(wilayaName) {
  return WILAYAS.find((wilaya) => wilaya.name_ar === wilayaName)?.baladiyas ?? [];
}
