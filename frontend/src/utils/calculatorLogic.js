/**
 * Solar Cost Calculator — Kenya Market (KPLC Rates 2024)
 *
 * KPLC tariff bands (residential):
 *   0–50 kWh:   KES 2.50/kWh
 *   51–1500 kWh: KES 21.32/kWh (energy charge) + fixed charges
 *
 * Approximate blended average: KES 22–25/kWh for mid-range users.
 * We use KES 23/kWh as a safe blended estimate.
 *
 * System sizing:
 *   - Peak sun hours in Kenya: ~5.5 hrs/day
 *   - System efficiency factor: 0.8 (inverter + cable losses)
 *   - kW needed = daily_kWh / (5.5 * 0.8)
 *
 * Installation costs (all-in, incl. panels, inverter, battery, labour):
 *   - Grid-tied system: KES 120,000–150,000 per kW
 *   - Hybrid system:    KES 145,000–185,000 per kW
 *   We default to hybrid for Kenya (frequent grid outages).
 */

const KPLC_BLENDED_RATE = 23;          // KES per kWh
const PEAK_SUN_HOURS = 5.5;            // hrs/day
const SYSTEM_EFFICIENCY = 0.80;
const HYBRID_COST_PER_KW_LOW = 145000; // KES
const HYBRID_COST_PER_KW_HIGH = 185000;

export const PACKAGES = [
  {
    name: 'Starter Solar Kit',
    size: '0.5kW',
    sizeKw: 0.5,
    description: 'Ideal for lighting, phone charging, and small appliances.',
    priceRange: 'KES 75,000 – 95,000',
    features: ['2–4 LED lights', 'Phone & laptop charging', '12V DC fan', '50W solar panel'],
    color: 'sun',
  },
  {
    name: 'Home Essential Package',
    size: '1–2kW',
    sizeKw: 1.5,
    description: 'Powers lights, TV, refrigerator, and phone chargers.',
    priceRange: 'KES 145,000 – 300,000',
    features: ['Full LED lighting', '32" TV', 'Refrigerator (100L)', 'Laptop & phones', 'Small water pump'],
    color: 'solar',
    popular: true,
  },
  {
    name: 'Business Power Package',
    size: '3–5kW',
    sizeKw: 4,
    description: 'Handles most household or small-business loads.',
    priceRange: 'KES 435,000 – 925,000',
    features: ['Full home power', 'Air conditioning (1HP)', 'Water heater', 'Water pump', 'Multiple appliances'],
    color: 'dark',
  },
  {
    name: 'Large Estate Package',
    size: '6kW+',
    sizeKw: 7,
    description: 'For large homes, farms, or commercial premises.',
    priceRange: 'KES 870,000+',
    features: ['Full commercial load', 'Heavy machinery', 'Multiple ACs', 'Water pumping', 'Grid export ready'],
    color: 'solar',
  },
];

export const calculate = (monthlyBillKES) => {
  const bill = parseFloat(monthlyBillKES);
  if (!bill || bill <= 0) return null;

  // Step 1: Estimate monthly kWh consumption from bill
  const monthlyKwh = bill / KPLC_BLENDED_RATE;

  // Step 2: Daily kWh
  const dailyKwh = monthlyKwh / 30;

  // Step 3: System size in kW
  const systemSizeKw = dailyKwh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);
  const roundedSizeKw = Math.ceil(systemSizeKw * 2) / 2; // Round up to nearest 0.5kW

  // Step 4: Cost range
  const costLow = roundedSizeKw * HYBRID_COST_PER_KW_LOW;
  const costHigh = roundedSizeKw * HYBRID_COST_PER_KW_HIGH;

  // Step 5: Annual savings (assuming 80% of bill covered by solar)
  const annualSavings = bill * 12 * 0.8;

  // Step 6: Simple payback period
  const paybackYears = costLow / annualSavings;

  // Step 7: Recommend package
  let recommendedPackage = PACKAGES[0];
  for (const pkg of PACKAGES) {
    if (roundedSizeKw >= pkg.sizeKw) recommendedPackage = pkg;
  }

  return {
    monthlyKwh: Math.round(monthlyKwh),
    dailyKwh: dailyKwh.toFixed(1),
    systemSizeKw: roundedSizeKw,
    costLow: costLow.toLocaleString('en-KE'),
    costHigh: costHigh.toLocaleString('en-KE'),
    annualSavings: Math.round(annualSavings).toLocaleString('en-KE'),
    paybackYears: paybackYears.toFixed(1),
    co2SavedKgPerYear: Math.round(monthlyKwh * 12 * 0.491), // Kenya grid emission factor
    recommendedPackage,
  };
};
