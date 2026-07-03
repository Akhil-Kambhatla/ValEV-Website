// ─── Charging stations ────────────────────────────────────────────────────────

export interface Station {
  name:      string  // short display name / station ID
  venue:     string  // host venue name
  city:      string
  state:     string
  status:    'coming-soon' | 'live' | 'planned'
  machines:  number
  latitude:  number
  longitude: number
}

export const STATIONS: Station[] = [
  {
    name:      'Lucky9 Tadipatri Biryani Center',
    venue:     'Lucky9 Tadipatri Biryani Center',
    city:      'Ananthapur',
    state:     'Andhra Pradesh',
    status:    'coming-soon',
    machines:  2,
    latitude:  14.677964995449972,
    longitude: 77.60121721534581,
  },
]

export function stationMapsUrl(s: Station): string {
  return `https://www.google.com/maps/search/?api=1&query=${s.latitude},${s.longitude}`
}

// ─── Brand ───────────────────────────────────────────────────────────────────
export const BRAND = {
  name:    'ValEV',
  legal:   'Val Energy Pvt. Ltd.',
  tagline: 'Fast charging, everywhere.',
  promise: 'Building South India\'s EV fast-charging network.',
  founded: '2024',
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  // Primary WhatsApp — use this everywhere a single number is shown
  whatsapp:             '918008673152',
  whatsappUrl:          'https://wa.me/918008673152',
  // Secondary WhatsApp — show alongside primary only in full contact lists
  whatsappSecondary:    '919133377007',
  whatsappSecondaryUrl: 'https://wa.me/919133377007',
  email:    'valevenergy@gmail.com',
  emailUrl: 'mailto:valevenergy@gmail.com',
  linkedin: 'https://www.linkedin.com/company/val-ev/',
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',      href: '/about'      },
  { label: 'Network',    href: '/#network'   },
  { label: 'Technology', href: '/technology'  },
  { label: 'Partner',    href: '/partner'    },
  { label: 'Contact',    href: '/contact'    },
] as const

// ─── Footer links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Terms of use',   href: '/terms'   },
] as const

// ─── Map ──────────────────────────────────────────────────────────────────────
export const MAP_CENTER: [number, number] = [17.385, 78.4867] // Hyderabad
export const MAP_ZOOM = 7

// ─── Seeded demo pins ─────────────────────────────────────────────────────────
export const SEED_PINS = [
  { lat: 17.385,  lng: 78.4867, role: 'driver',     note: 'Near Hitech City' },
  { lat: 13.0827, lng: 80.2707, role: 'restaurant',  note: 'OMR food street' },
  { lat: 12.9716, lng: 77.5946, role: 'fleet',       note: 'Outer Ring Road' },
  { lat: 17.6868, lng: 83.2185, role: 'driver',     note: 'Vizag beach road' },
  { lat: 16.5062, lng: 80.648,  role: 'restaurant',  note: 'Vijayawada highway' },
  { lat: 14.4426, lng: 79.9865, role: 'driver',     note: 'Nellore bypass' },
  { lat: 15.8281, lng: 78.0373, role: 'fleet',       note: 'Kurnool depot area' },
  { lat: 18.1124, lng: 79.0193, role: 'driver',     note: 'Warangal highway' },
]

// ─── Partner Estimator ────────────────────────────────────────────────────────
export const ESTIMATOR = {
  defaultCarsPerDay:  15,
  defaultUnitsPerCar: 30,
  hostPayoutPerUnit:  1.2,  // ₹ per kWh — illustrative, not a guarantee
  sessionFee:         0,
  label:              'illustrative estimate, not a guarantee',
}

// ─── EV Facts strip ───────────────────────────────────────────────────────────
export const EV_FACTS: { stat: string; label: string }[] = [
  { stat: '5.4M+',      label: 'EVs on Indian roads today' },
  { stat: '49%',        label: 'YoY growth in EV sales (FY24)' },
  { stat: '₹1.5/km',    label: 'avg. running cost vs ₹7 for petrol' },
  { stat: '8 min',      label: 'avg. session at a fast charger' },
  { stat: '150kW',      label: 'peak DC fast-charge speed available in India' },
  { stat: '2030',       label: "India's EV policy target year" },
  { stat: '30%',        label: 'fleet operators planning full EV transition by 2027' },
  { stat: '₹0',         label: 'investment required to host a ValEV station' },
  { stat: '3×',         label: 'longer dwell time at charging-enabled venues' },
  { stat: '60%',        label: 'Indian EV buyers cite range anxiety as top concern' },
  { stat: '10M',        label: 'target EV sales/year by 2030 (NITI Aayog)' },
  { stat: '22 GW',      label: 'renewable energy capacity added in India in 2023' },
  { stat: '80%',        label: 'of EV charging happens at home globally today' },
  { stat: '₹500Cr+',    label: 'FAME II subsidy allocated to charging infra' },
  { stat: 'Zero',       label: 'tailpipe emissions from a battery EV' },
  { stat: '15yr',       label: 'typical EV battery warranty offered by top OEMs' },
  { stat: '1 in 4',     label: 'new auto-rickshaws sold in India are electric' },
  { stat: '40%',        label: 'reduction in maintenance costs vs ICE vehicles' },
  { stat: '9,000+',     label: 'public EV chargers installed in India (2024)' },
  { stat: 'South India',label: 'fastest-growing EV adoption region in India' },
  { stat: '85%',        label: 'uptime target for premium charging networks' },
  { stat: '2050',       label: "India's carbon net-zero commitment year" },
  { stat: '₹3,500Cr',  label: 'projected EV charging market size in India by 2026' },
  { stat: '250km+',    label: 'typical range of mid-segment EVs in India (WLTP)' },
  { stat: '4x',        label: 'more torque from EV motors vs comparable ICE engines' },
  { stat: '2M+',       label: 'two- and three-wheelers sold as EVs in FY24' },
  { stat: 'CCS2',      label: 'India\'s universal DC fast-charge connector standard' },
]

// ─── Host Earnings Calculator ─────────────────────────────────────────────────
export const HOST_EARNINGS_CALC = {
  defaultCarsPerDay:    18,    // EV cars per day — typical city commercial location
  defaultUnitsPerCar:   30,    // kWh per session — typical DC fast-charge fill
  defaultPayoutPerUnit: 1.75,  // ₹ per kWh — illustrative host payout rate
  disclaimer: 'an estimate, not a guarantee — actual earnings depend on traffic, session length, and agreed payout rates.',
} as const

// ─── EV Savings Calculator ────────────────────────────────────────────────────
export const SAVINGS_CALC = {
  defaultMonthlyKm:     1200,   // km/month — typical South Indian city commuter
  defaultPetrolMileage: 14,     // km/litre — mid-size sedan baseline
  defaultPetrolPrice:   110,    // ₹/litre — national average (mid-2025)
  defaultEvEfficiency:  6.5,    // km/kWh — typical EV in mixed city + highway use
  defaultChargingCost:  20,     // ₹/kWh — typical DC fast-charger tariff in India
  co2PerLitrePetrol:    2.31,   // kg CO2e per litre of petrol (IPCC factor)
  disclaimer:
    'an estimate, not a guarantee — fuel prices and EV efficiency vary by vehicle and usage.',
} as const

// ─── Partner page placeholder figures ────────────────────────────────────────
// PLACEHOLDER FIGURES — replace with real numbers before launch.
export const PARTNER_PLACEHOLDERS = {
  // FOCO Franchise model
  focoInvestmentFrom:  'from ₹X lakh',
  focoSpaceNeeded:     '~2 car-park spaces (~550 sq ft)',
  focoPowerSetup:      'Grid connection; ValEV-managed installation',
  focoIdealLocations:  'Highways, commercial hubs, malls, offices, residential complexes',
  focoPaybackPeriod:   'X–Y years (illustrative)',
  focoAnnualReturn:    'X% per annum (illustrative)',
  // Host / Location Partner model
  hostEarningRate:     '₹X per kWh charged (indicative)',
  hostMonthlyEarning:  '₹X,XXX–₹XX,XXX per month (illustrative)',
} as const

// ─── FOCO Calculator ─────────────────────────────────────────────────────────
// PLACEHOLDER-ADJUSTABLE FIGURES — review all values before launch.
export const FOCO_CALC = {
  // kW rating → machine purchase price (₹), actual grid draw (kW, for transformer sizing), avg daily units dispensed (kWh)
  machines: [
    { kw: 120, priceRs: 1_050_000, consumptionKw: 130, dailyUnits: 500 },
    { kw: 180, priceRs: 1_300_000, consumptionKw: 196, dailyUnits: 600 },
    { kw: 240, priceRs: 1_400_000, consumptionKw: 270, dailyUnits: 700 },
  ],
  // Transformer ladder (ascending kVA). Sizing rule: pick the smallest where total_consumption < 0.90 × kVA.
  // Verified: 1×120 (130kW) → 150kVA; 120+180 (326kW) → 400kVA; 3×240 (810kW) → 1000kVA.
  transformers: [
    { kva: 150,  priceRs:   700_000 },
    { kva: 315,  priceRs:   950_000 },
    { kva: 400,  priceRs: 1_250_000 },
    { kva: 500,  priceRs: 1_350_000 },
    { kva: 630,  priceRs: 1_500_000 },
    { kva: 750,  priceRs: 2_000_000 },
    { kva: 1000, priceRs: 2_500_000 },
  ],
  // Civil works: ₹8L for 1 machine, +₹3L per additional machine. Index 0 = 1 machine, etc.
  civilByCount: [800_000, 1_100_000, 1_400_000],
  // Fixed costs always included in every setup
  canopyRs:          600_000,  // canopy
  discomRs:        1_000_000,  // DISCOM connection charges
  softwareFirstYear:  50_000,  // first-year software
  // Net profit per kWh dispensed — fixed, NOT user-editable
  netProfitPerUnit: 8,
} as const

// ─── Fleet Savings Calculator — PLACEHOLDER figures ──────────────────────────
// PLACEHOLDER — savingsOptions represent ₹ saved per charge vs standard public
// tariff. Replace with real preferential-rate advantage figures before launch.
// weeksPerMonth and weeksPerYear are fixed calculation constants, not estimates.
export const FLEET_SAVINGS_CALC = {
  savingsOptions:      [800, 900, 1000] as const, // ₹ per charge — PLACEHOLDER
  defaultSavings:      900,                        // default selection — PLACEHOLDER
  defaultVehicles:     20,
  vehiclesMin:         1,
  vehiclesMax:         200,
  defaultChargesPerWk: 5,
  weeksPerMonth:       4.33,
  weeksPerYear:        52,
  disclaimer:
    'Indicative estimate — actual preferential rates are tailored to your fleet and discussed directly.',
} as const

// ─── Team placeholders ────────────────────────────────────────────────────────
export const TEAM = [
  { name: '[Founder Name]',    role: 'Founder & CEO',    bio: 'Placeholder — add your bio here.' },
  { name: '[Co-founder Name]', role: 'Co-founder & COO', bio: 'Placeholder — add your bio here.' },
]
