const productsData = [
  
  {
    name: "Hex Bolts",
    description: "Heavy-duty fasteners for industrial applications.",
    slug: "hex-bolts",
    img: require("../assets/Products/hex-bolts.jpeg"),
    details:
      "Durable hex bolts for industrial and construction use, offering high strength and corrosion resistance.",
    related: ["ss-nuts", "washer-nuts"],
     category: "Industrial Hardware & Fasteners",
  },
  {
    name: "SS Nuts",
    description: "Secure stainless steel nuts for all structures.",
    slug: "ss-nuts",
    img: require("../assets/Products/ss-nuts.jpeg"),
    details:
      "High-quality stainless steel nuts for secure fastening in various industrial applications.",
    related: ["hex-bolts", "washer-nuts"],
     category: "Industrial Hardware & Fasteners",
  },
  {
    name: "Washer Nuts",
    description: "Washers for stability and secure fastening.",
    slug: "washer-nuts",
    img: require("../assets/Products/washer-nuts.jpeg"),
    details:
      "Washer nuts provide stable and secure fastening, preventing loosening under vibration.",
    related: ["hex-bolts", "ss-nuts"],
     category: "Industrial Hardware & Fasteners",
  },
  {
    name: "Threaded Rods",
    description: "Threaded rods for versatile construction support.",
    slug: "threaded-rods",
    img: require("../assets/Products/threaded-rods.jpeg"),
    details:
      "High-strength threaded rods for versatile industrial and construction applications.",
    related: ["hex-bolts", "ss-nuts"],
    category: "Industrial Hardware & Fasteners",

  },

  // 2. Filtration & Process Equipment - Filter Bags
  {
    name: "Dust Collector Bags",
    description: "Bags for dry dust collection systems.",
    slug: "dust-collector-bags",
    img: require("../assets/Products/dust-collector-bags.jpeg"),
    details:
      "Used in industrial dust collectors to capture dry particulate matter. Compatible with pulse jet, shaker, and reverse air systems.",
    related: ["filter-cages"],
     category: "Filter Bags",
  },
  {
    name: "Liquid Filter Bags",
    description: "Filtration bags for liquids (PP, PE, Nylon).",
    slug: "liquid-filter-bags",
    img: require("../assets/Products/liquid-filter-bags.jpeg"),
    details:
      "Liquid filter bags made from polypropylene, polyester, or nylon mesh. Suitable for food, chemical, and water treatment industries.",
    related: ["bag-filter-housings"],
     category: "Filter Bags",
  },
  {
    name: "High-Temperature Bags",
    description: "Heat-resistant filter bags for extreme environments.",
    slug: "high-temperature-bags",
    img: require("../assets/Products/high-temperature-bags.jpeg"),
    details:
      "Made from Nomex, PPS, or PTFE for operations up to 260°C. Ideal for boilers and high-temp furnaces.",
    related: ["filter-cages"],
     category: "Filter Bags",
  },
  {
    name: "Anti-Static Filter Bags",
    description: "Prevent spark generation in explosive atmospheres.",
    slug: "anti-static-filter-bags",
    img: require("../assets/Products/anti-static-filter-bags.jpeg"),
    details:
      "Used in industries with combustible dusts like flour, coal, and aluminum. Offers surface resistivity below 10⁸ ohm.",
    related: ["filter-cages"],
     category: "Filter Bags",
  },

  // 3. Filter Cages
  {
    name: "Mild Steel Filter Cages",
    description: "Support cages for dust collection bags.",
    slug: "mild-steel-filter-cages",
    img: require("../assets/Products/ms-filter-cages.jpeg"),
    details:
      "Economical cages for standard temperature conditions. Available in multiple ring spacings and top/bottom configurations.",
    related: ["dust-collector-bags"],
      category: "Filter Cages",
  },
  {
    name: "Galvanized Filter Cages",
    description: "Corrosion-resistant filter cages.",
    slug: "galvanized-filter-cages",
    img: require("../assets/Products/galvanized-filter-cages.jpeg"),
    details:
      "Coated with a protective zinc layer to resist oxidation and extend service life in moist environments.",
    related: ["filter-bags"],
      category: "Filter Cages",
  },
  {
    name: "Stainless Steel Filter Cages",
    description: "Durable cages for high-corrosion applications.",
    slug: "ss-filter-cages",
    img: require("../assets/Products/ss-filter-cages.jpeg"),
    details:
      "Best suited for corrosive, high-temperature, or FDA-compliant processes.",
    related: ["filter-bags"],
      category: "Filter Cages",
  },
  {
    name: "Star Filter Cages",
    description: "Accordion-style cage for increased bag surface area.",
    slug: "star-filter-cages",
    img: require("../assets/Products/star-filter-cages.jpeg"),
    details:
      "Improves filtration efficiency by expanding fabric area. Helps reduce pressure drop across the system.",
    related: ["filter-bags"],
     category: "Filter Cages",
  },
  {
    name: "Split-Type Cages",
    description: "Multi-piece cages for easy installation in compact spaces.",
    slug: "split-type-cages",
    img: require("../assets/Products/split-type-cages.jpeg"),
    details:
      "Allows cage insertion in tight dust collector compartments without removing top structure.",
    related: ["filter-bags"],
     category: "Filter Cages",
  },
  {
    name: "Venturi Fitted Cages",
    description: "Cages with integrated Venturi nozzles.",
    slug: "venturi-cages",
    img: require("../assets/Products/venturi-cages.jpeg"),
    details:
      "Enhances cleaning pulse efficiency and airflow velocity within the bag filter system.",
    related: ["venturi-nozzles"],
      category: "Filter Cages",
  },

  // 4. Filter Cartridges
  {
    name: "Pleated Dust Cartridges",
    description: "Pleated filter elements for compact dust collectors.",
    slug: "pleated-dust-cartridges",
    img: require("../assets/Products/pleated-cartridges.jpeg"),
    details:
      "Increases surface area and reduces downtime by offering longer service life.",
    related: ["filter-cages"],
     category: "Filter Cartridges",
  },
  {
    name: "Melt Blown Cartridges",
    description: "Polypropylene depth filters for high dirt holding.",
    slug: "melt-blown-cartridges",
    img: require("../assets/Products/melt-blown-cartridges.jpeg"),
    details:
      "Gradient density structure captures particles of varying sizes. Ideal for RO pre-filtration.",
    related: ["liquid-filter-bags"],
   category: "Filter Cartridges",
  },
  {
    name: "Spun Cartridges",
    description: "Economic filters for coarse particle removal.",
    slug: "spun-cartridges",
    img: require("../assets/Products/spun-cartridges.jpeg"),
    details:
      "Thermally bonded, high-porosity structure used for non-critical water filtration applications.",
    related: ["filter-housings"],
    category: "Filter Cartridges",

  },
  {
    name: "Carbon Cartridges",
    description: "Activated carbon filters for taste/odor removal.",
    slug: "carbon-cartridges",
    img: require("../assets/Products/carbon-cartridges.jpeg"),
    details:
      "Removes chlorine, VOCs, and organic compounds. Widely used in drinking water systems.",
    related: ["hepa-carbon-cartridges"],
    category: "Filter Cartridges",
  },
  {
    name: "HEPA & Activated Carbon Cartridges",
    description: "High-performance air purification filters.",
    slug: "hepa-carbon-cartridges",
    img: require("../assets/Products/hepa-cartridges.jpeg"),
    details:
      "HEPA filters capture 99.97% of particles down to 0.3 microns. Activated carbon layer absorbs fumes and gases.",
    related: ["panel-filters"],
    category: "Filter Cartridges",
  },

  // 5. Filter Housings
  {
    name: "Single Bag Filter Housing",
    description: "Compact housing for individual filter bags.",
    slug: "single-bag-housing",
    img: require("../assets/Products/single-bag-housing.jpeg"),
    details:
      "Available in SS or MS. Used in batch processes or smaller systems requiring limited flow rate.",
    related: ["filter-bags"],
    category: "Bag Filter Housings",
  },
  {
    name: "Multi-Bag Filter Systems",
    description: "Housings for high-volume liquid filtration.",
    slug: "multi-bag-filter-systems",
    img: require("../assets/Products/multi-bag-housing.jpeg"),
    details:
      "Suitable for continuous processes with high dirt loading. Multiple filter bags in parallel.",
    related: ["liquid-filter-bags"],
    
    category: "Bag Filter Housings",
  },
  {
    name: "High-Pressure Housing Units",
    description: "Heavy-duty vessels for high PSI applications.",
    slug: "high-pressure-housing",
    img: require("../assets/Products/high-pressure-housing.jpeg"),
    details:
      "Built for hydraulic, chemical, and petrochemical systems requiring pressures above 10 bar.",
    related: ["filter-cartridges"],
    category: "Bag Filter Housings",
  },

  // 6. Dust Collector Systems
  {
    name: "Cyclone Dust Separators",
    description: "Uses centrifugal force to remove coarse dust particles.",
    slug: "cyclone-dust-separators",
    img: require("../assets/Products/cyclone-separator.jpeg"),
    details:
      "Pre-filters large dust to reduce load on fine filtration systems. No moving parts.",
    related: ["pulse-jet-bag-filters"],
    category: "Dust Collector Systems",
  },
  {
    name: "Wet Scrubbers",
    description: "Removes fine particles and gases using water sprays.",
    slug: "wet-scrubbers",
    img: require("../assets/Products/wet-scrubbers.jpeg"),
    details:
      "Ideal for controlling toxic emissions, fumes, and sticky particulate matter.",
    related: ["cyclone-dust-separators"],
    category: "Dust Collector Systems",
  },
  {
    name: "Pulse Jet Bag Filters",
    description: "Self-cleaning filtration systems using compressed air.",
    slug: "pulse-jet-bag-filters",
    img: require("../assets/Products/pulse-jet.jpeg"),
    details:
      "Delivers short bursts of air to dislodge dust buildup from filter surfaces.",
    related: ["dust-collector-bags"],
    category: "Dust Collector Systems",
  },
  {
    name: "Reverse Air Bag House",
    description: "Low-pressure reverse air cleaning dust collectors.",
    slug: "reverse-air-bag-house",
    img: require("../assets/Products/reverse-air.jpeg"),
    details:
      "Saves energy by using fans to blow air in the opposite direction during cleaning.",
    related: ["filter-bags"],
    category: "Dust Collector Systems",
  },

  // 7. Air Filters
  {
    name: "Fine Filters",
    description: "Secondary filters for HVAC and intake systems.",
    slug: "fine-filters",
    img: require("../assets/Products/fine-filters.jpeg"),
    details:
      "Captures smaller airborne particles after pre-filter stages.",
    related: ["panel-filters"],
     category: "Air Intake Filters",
  },
  {
    name: "Pocket / Bag Filters",
    description: "High-capacity filters for HVAC air purification.",
    slug: "pocket-bag-filters",
    img: require("../assets/Products/pocket-bag-filters.jpeg"),
    details:
      "Extended surface area offers high dust holding and long service life.",
    related: ["fine-filters"],
     category: "Air Intake Filters",
  },
  {
    name: "Panel Filters",
    description: "Flat filters for basic particle separation.",
    slug: "panel-filters",
    img: require("../assets/Products/panel-filters.jpeg"),
    details:
      "Ideal for commercial air systems and machinery pre-filtration.",
    related: ["pocket-bag-filters"],
     category: "Air Intake Filters",
  },
  {
    name: "Pre Filters",
    description: "Initial barrier for coarse particles.",
    slug: "pre-filters",
    img: require("../assets/Products/pre-filters.jpeg"),
    details:
      "Protects downstream filters by removing larger contaminants early.",
    related: ["fine-filters", "panel-filters"],
     category: "Air Intake Filters",
  },

  // 8. Strainers & Accessories
  {
    name: "Basket Strainers",
    description: "For high-flow liquid filtration applications.",
    slug: "basket-strainers",
    img: require("../assets/Products/basket-strainers.jpeg"),
    details:
      "Captures coarse debris in pipelines with minimal pressure drop.",
    related: ["y-strainers", "t-type-strainers"],
    category: "Filter Accessories",
  },
  {
    name: "T-Type Strainers",
    description: "Horizontal inline strainers.",
    slug: "t-type-strainers",
    img: require("../assets/Products/t-type-strainers.jpeg"),
    details:
      "Easy-to-clean strainers suitable for steam, air, and water pipelines.",
    related: ["basket-strainers"],
    category: "Filter Accessories",
  },
  {
    name: "Ball / Gate Valves",
    description: "Flow control valves for process systems.",
    slug: "ball-gate-valves",
    img: require("../assets/Products/valves.jpeg"),
    details:
      "Used to start/stop flow. Gate valves for full-open/closed and ball valves for on-off precision.",
    related: ["y-strainers"],
    category: "Filter Accessories",
  },
  {
    name: "Top Caps & Cage Clips",
    description: "Fittings for securing cages and bags.",
    slug: "top-caps-cage-clips",
    img: require("../assets/Products/top-caps.jpeg"),
    details:
      "Provides mechanical stability and alignment to cage assemblies.",
    related: ["filter-cages"],
    category: "Filter Accessories",
  },
  {
    name: "Filter Gaskets & Seals",
    description: "Ensures leak-free filter housing systems.",
    slug: "filter-gaskets-seals",
    img: require("../assets/Products/seals.jpeg"),
    details:
      "Made from silicone, EPDM, and other elastomers. Prevents bypass air.",
    related: ["filter-housings"],
    category: "Filter Accessories",
  },
  {
    name: "Venturi Nozzles",
    description: "Enhance air cleaning pulse performance.",
    slug: "venturi-nozzles",
    img: require("../assets/Products/venturi.jpeg"),
    details:
      "Increases velocity of cleaning air entering filter bags. Improves efficiency.",
    related: ["venturi-cages"],
    category: "Filter Accessories",
  },
  {
    name: "Snap Bands",
    description: "Spring band for bag mounting.",
    slug: "snap-bands",
    img: require("../assets/Products/snap-bands.jpeg"),
    details:
      "Allows easy installation of bags into tube sheets without tools.",
    related: ["filter-bags"],
    category: "Filter Accessories",
  },

  // 9. Auto Components & Sensors
  {
    name: "CNC Shafts",
    description: "Machined shafts for rotating systems.",
    slug: "cnc-shafts",
    img: require("../assets/Products/cnc-shafts.jpeg"),
    details:
      "Precision ground for critical alignment and low-friction movement.",
    related: ["bushings", "yokes"],
    category: "Auto Components & Precision Parts",
  },
  {
    name: "Axle Spindles",
    description: "Load-bearing wheel spindles.",
    slug: "axle-spindles",
    img: require("../assets/Products/axle-spindles.jpeg"),
    details:
      "Designed for strength in automotive and trailer applications.",
    related: ["knuckles"],
    category: "Auto Components & Precision Parts",
  },
  {
    name: "Yokes",
    description: "Coupling elements for rotary motion.",
    slug: "yokes",
    img: require("../assets/Products/yokes.jpeg"),
    details:
      "Facilitates U-joint attachment in driveshaft assemblies.",
    related: ["rod-ends"],
    category: "Auto Components & Precision Parts",
  },
  {
    name: "Rod Ends",
    description: "Ball joints for angular misalignment.",
    slug: "rod-ends",
    img: require("../assets/Products/rod-ends.jpeg"),
    details:
      "Used in steering/suspension systems for flexibility and motion.",
    related: ["bushings"],
    category: "Auto Components & Precision Parts",
  },
  {
    name: "Bushings",
    description: "Low-friction sleeves in moving joints.",
    slug: "bushings",
    img: require("../assets/Products/bushings.jpeg"),
    details:
      "Reduces wear and vibration. Available in metal/polymer types.",
    related: ["cnc-shafts", "rod-ends"],
    category: "Auto Components & Precision Parts",
  },
  {
    name: "Knuckles",
    description: "Connects control arms and wheel hubs.",
    slug: "knuckles",
    img: require("../assets/Products/knuckles.jpeg"),
    details:
      "Provides pivot points for steering systems and support for suspension.",
    related: ["axle-spindles"],
    category: "Auto Components & Precision Parts",
  },
  {
    name: "Industrial Smart Sensors",
    description: "Sensors for real-time machinery monitoring.",
    slug: "industrial-smart-sensors",
    img: require("../assets/Products/industrial-sensors.jpeg"),
    details:
      "Includes temperature, pressure, vibration, proximity, humidity, and flow sensors. Enables predictive maintenance and IIoT integration.",
    related: ["cnc-shafts", "filter-housings"],
     category: "Industrial Smart Sensors",
  },
];

export default productsData;
