import { supabase, isSupabaseConfigured } from "./supabase";
import {
  PlantCategory,
  Plant,
  GalleryAlbum,
  GalleryImage,
  Video,
  DocumentItem,
  WebsiteSettings,
  ContactInquiry,
} from "@/types";

// =========================================================================
// DEFAULT DATA STORE (Used if Supabase is unconfigured or in offline fallback)
// =========================================================================

const initialCategories: PlantCategory[] = [
  {
    id: "c1000000-0000-0000-0000-000000000001",
    slug: "plants-bunch",
    name: "Plants Bunch",
    short_description: "Freshly harvested healthy bunches of stem and rooted aquatic flora, carefully bundled for vibrant aquarium backgrounds and midgrounds.",
    full_description: "Our bunched plants are cultivated under optimal tropical sunshine and water quality in Ceylon. Each bunch is carefully selected, trimmed, and banded to ensure rapid root establishment and lush submersed foliage in aquatic ecosystems.",
    image_url: "/images/plants-bunch/plants-bunch-category.jpg",
    display_order: 1,
    is_active: true,
    seo_title: "Bunched Aquarium Plants | Ceylon Aquatic Plants (Pvt) Ltd",
    seo_description: "Explore premium bunched aquatic plants organically cultivated in Sri Lanka. Ideal for aquascaping and natural aquarium filtration.",
    created_at: new Date().toISOString(),
  },
  {
    id: "c1000000-0000-0000-0000-000000000002",
    slug: "potted-plants",
    name: "Potted Plants",
    short_description: "Established aquatic plants in mineral wool pots, featuring developed root structures ready for direct aquarium placement.",
    full_description: "Our potted plant collection includes robust specimens of Anubias, Echinodorus, and Cryptocoryne established in nutrient-inert rockwool mesh pots, ensuring zero transplant shock and immediate growth upon delivery.",
    image_url: "/images/potted-plants/potted-plants-category.jpg",
    display_order: 2,
    is_active: true,
    seo_title: "Potted Aquarium Plants | Ceylon Aquatic Plants (Pvt) Ltd",
    seo_description: "Hardy potted aquatic plants with fully developed root networks. Grown under controlled nursery conditions in Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "c1000000-0000-0000-0000-000000000003",
    slug: "garden-pond-plants",
    name: "Garden-Pond Plants",
    short_description: "Hardy marginal, floating, and deep-water botanical specimens suitable for natural garden ponds, water features, and bio-filters.",
    full_description: "Ceylon Aquatic Plants provides indigenous and tropical pond flora designed to create healthy pond ecosystems, clarity, natural shade for pond fish, and breathtaking surface blooms.",
    image_url: "/images/garden-pond-plants/garden-pond-plants-category.jpg",
    display_order: 3,
    is_active: true,
    seo_title: "Garden & Pond Aquatic Plants | Ceylon Aquatic Plants (Pvt) Ltd",
    seo_description: "Tropical pond plants and hardy water lilies cultivated for outdoor garden ponds, koi ponds, and natural water features.",
    created_at: new Date().toISOString(),
  },
  {
    id: "c1000000-0000-0000-0000-000000000004",
    slug: "terrarium-plants",
    name: "Terrarium Plants",
    short_description: "Moisture-loving epiphytes, mosses, and high-humidity foliage tailored for vivariums, paludariums, and closed terrarium habitats.",
    full_description: "Specially conditioned plants that thrive in high humidity microclimates, featuring delicate foliage textures, vibrant emersed colors, and compact growth habits.",
    image_url: "/images/terrarium-plants/terrarium-plants-category.jpg",
    display_order: 4,
    is_active: true,
    seo_title: "Terrarium & Paludarium Plants | Ceylon Aquatic Plants (Pvt) Ltd",
    seo_description: "Lush tropical moisture-loving plants curated for terrariums, vivariums, and bioactive reptile enclosures.",
    created_at: new Date().toISOString(),
  },
  {
    id: "c1000000-0000-0000-0000-000000000005",
    slug: "tissue-culture",
    name: "Tissue Culture",
    short_description: "100% sterile laboratory-propagated in-vitro cups guaranteed free from algae, snails, parasites, and chemical pesticides.",
    full_description: "Propagated in state-of-the-art sterile tissue culture laboratories. Each sealed cup contains clean plantlets suspended in nutrient-rich agar gel, guaranteeing the purest start for competitive aquascaping and biosecure aquaria.",
    image_url: "/images/tissue-culture/tissue-culture-category.jpg",
    display_order: 5,
    is_active: true,
    seo_title: "Tissue Culture In-Vitro Aquarium Plants | Ceylon Aquatic Plants",
    seo_description: "Sterile 1-2-Grow in-vitro tissue cultured aquarium plants. Free from snails, spores, and algae. Produced in Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "c1000000-0000-0000-0000-000000000006",
    slug: "other-products",
    name: "Other Products",
    short_description: "Natural driftwood, botanicals, aquatic moss pads, stone mounts, and specialized aquascaping foundation accessories.",
    full_description: "Complementary natural aquascaping materials, natural seed pads, pre-mounted driftwood pieces, and specialized natural aquarium accessories.",
    image_url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
    display_order: 6,
    is_active: true,
    seo_title: "Aquascaping Botanicals & Accessories | Ceylon Aquatic Plants",
    seo_description: "Natural driftwood, moss pads, and botanical decor for planted aquariums and biotope scapes.",
    created_at: new Date().toISOString(),
  },
];

const initialPlants: Plant[] = [
  {
    id: "p1000000-0000-0000-0000-000000000001",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "rotala-rotundifolia",
    name: "Rotala Rotundifolia (Bunch)",
    scientific_name: "Rotala rotundifolia",
    short_description: "Classic red-to-pink stem plant offering dense, bushy growth and stunning coloration under adequate illumination.",
    full_description: "Rotala rotundifolia is one of the most popular and versatile stem plants in modern aquascaping. When submerged under moderate to high lighting, its elongated leaves develop an exquisite amber-pink to deep ruby tint. It branches readily after trimming, creating lush background thickets.",
    main_image_url: "/images/plants-bunch/rotala-rotundifolia-red-bunch.jpg",
    origin: "Southeast Asia",
    growth_rate: "Fast",
    plant_height: "20 - 45 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "20 - 28 °C",
    placement: "Background",
    care_instructions: "Trim stem tops regularly to promote bushy side-shoots. Provide balanced liquid micro and macronutrients with iron supplementation to enhance red pigmentation.",
    is_featured: true,
    is_published: true,
    seo_title: "Rotala Rotundifolia Bunch | Ceylon Aquatic Plants",
    seo_description: "Wholesale Rotala rotundifolia bunches. Vibrant red and pink aquatic stem plant cultivated in Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000002",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "ludwigia-palustris-super-red",
    name: "Ludwigia Palustris 'Super Red' (Bunch)",
    scientific_name: "Ludwigia palustris 'Super Red'",
    short_description: "Vivid, deeply saturated crimson foliage that maintains brilliant red coloration even in modest lighting conditions.",
    full_description: "Unlike many demanding red stem plants, Ludwigia Palustris Super Red produces deep ruby leaves with ease. Its paired ovate leaves create an eye-catching focal contrast against deep green aquatic greenery in midground and background groupings.",
    main_image_url: "/images/plants-bunch/ludwigia-palustris-super-red-bunch.jpg",
    origin: "North & Central America",
    growth_rate: "Medium",
    plant_height: "15 - 30 cm",
    light_demand: "Medium",
    co2_requirement: "Optional but beneficial",
    temperature_range: "18 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Propagate by taking cutting tops and replanting directly into substrate. Responds enthusiastically to micronutrient fertilization.",
    is_featured: true,
    is_published: true,
    seo_title: "Ludwigia Palustris Super Red | Ceylon Aquatic Plants",
    seo_description: "Lush red stem plants for planted aquascapes. Cultivated by Ceylon Aquatic Plants (Pvt) Ltd.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000003",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "anubias-barteri-var-nana",
    name: "Anubias Barteri var. Nana (Potted)",
    scientific_name: "Anubias barteri var. nana",
    short_description: "Extremely hardy epiphyte featuring tough dark emerald leaves. Unmatched resilience and herbivore resistance.",
    full_description: "Anubias barteri var. nana is an undemanding, slow-growing rhizome plant established in mineral wool mesh pots. Its thick, leathery dark green leaves thrive attached to porous rockwork, driftwood roots, or substrate mesh. Highly resistant to herbivorous cichlids and low-tech aquarium conditions.",
    main_image_url: "/images/potted-plants/anubias-barteri-var-nana-potted.jpg",
    origin: "West Africa",
    growth_rate: "Slow",
    plant_height: "5 - 12 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "20 - 28 °C",
    placement: "Foreground / Epiphyte Mount",
    care_instructions: "Do not bury the horizontal rhizome beneath the gravel; attach it to hardscape using plant glue or line until roots adhere naturally.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Anubias Barteri var Nana | Ceylon Aquatic Plants",
    seo_description: "Durable potted Anubias nana aquarium plants. Healthy rhizomes established in rockwool pots.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000004",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "echinodorus-bleheri-amazon-sword",
    name: "Amazon Sword (Echinodorus Bleheri Potted)",
    scientific_name: "Echinodorus grisebachii / bleheri",
    short_description: "Magnificent solitary specimen plant with broad sword-shaped leaves, ideal as a majestic aquarium centerpiece.",
    full_description: "The Amazon Sword is celebrated worldwide for its grand presence and dramatic broad leaf rosettes. Established in mineral wool pots, it develops robust root structures for direct placement into medium to large aquascapes.",
    main_image_url: "/images/potted-plants/echinodorus-bleheri-amazon-sword-potted.jpg",
    origin: "South America",
    growth_rate: "Medium to Fast",
    plant_height: "25 - 50 cm",
    light_demand: "Medium",
    co2_requirement: "Low to Moderate",
    temperature_range: "22 - 28 °C",
    placement: "Background / Centerpiece",
    care_instructions: "Heavy root feeder. Benefit greatly from nutrient-rich substrate or root fertilizer tabs inserted near the base of the plant.",
    is_featured: true,
    is_published: true,
    seo_title: "Amazon Sword Plant Potted | Ceylon Aquatic Plants",
    seo_description: "Potted Echinodorus bleheri Amazon Sword plants. Tropical aquarium centerpieces from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000005",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "water-mimosa-neptunia-oleracea",
    name: "Water Mimosa (Neptunia Oleracea)",
    scientific_name: "Neptunia oleracea",
    short_description: "Fascinating sensitive floating pond plant with spongy white floating stems and delicate feathery foliage.",
    full_description: "Neptunia oleracea, commonly known as Water Mimosa, is an extraordinary floating botanical that forms lush floating mats across garden ponds. Its fern-like bipinnate leaflets fold inward when touched, while spongy fibrous white stems provide natural buoyancy and excellent shade for pond fish.",
    main_image_url: "/images/garden-pond-plants/water-mimosa-neptunia-oleracea.jpg",
    origin: "Tropical Asia / Sri Lanka",
    growth_rate: "Fast",
    plant_height: "Floating / 10 - 25 cm",
    light_demand: "High / Full Sun",
    co2_requirement: "Low (Pond Surface)",
    temperature_range: "22 - 32 °C",
    placement: "Pond Surface / Floating & Marginal",
    care_instructions: "Place directly on the water surface in a sunny garden pond. Thrives with calm water movement and organic pond nutrients.",
    is_featured: true,
    is_published: true,
    seo_title: "Water Mimosa Pond Plant | Ceylon Aquatic Plants",
    seo_description: "Wholesale floating Water Mimosa (Neptunia oleracea) pond plants cultivated in Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000022",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "hornwort-ceratophyllum-demersum",
    name: "Hornwort (Ceratophyllum Demersum)",
    scientific_name: "Ceratophyllum demersum",
    short_description: "Essential submerged oxygenating pond plant providing rapid biological water purification and algae competition.",
    full_description: "Hornwort is the premier natural bio-filtering pond plant in tropical aquaculture. Rootless and fast-growing, it absorbs excess nitrates and phosphates directly from the pond water column, starving nuisance algae while releasing vital dissolved oxygen for fish.",
    main_image_url: "/images/garden-pond-plants/hornwort-ceratophyllum-demersum.jpg",
    origin: "Cosmopolitan / Ceylon",
    growth_rate: "Very Fast",
    plant_height: "30 - 100 cm",
    light_demand: "Medium to High",
    co2_requirement: "Low",
    temperature_range: "15 - 30 °C",
    placement: "Submerged Oxygenator",
    care_instructions: "Can be allowed to float freely in the water column or anchored in bundles into pond baskets. Prune excess growth periodically.",
    is_featured: true,
    is_published: true,
    seo_title: "Hornwort Pond Oxygenator | Ceylon Aquatic Plants",
    seo_description: "Healthy bunched Ceratophyllum demersum Hornwort. Natural pond oxygenator and bio-filter from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000023",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "asian-water-grass-hygroryza-aristata",
    name: "Asian Water Grass (Hygroryza Aristata)",
    scientific_name: "Hygroryza aristata",
    short_description: "Rare and unique floating grass featuring swollen, spindle-shaped petioles and graceful bamboo-like leaves.",
    full_description: "Hygroryza aristata is a distinctive floating aquatic grass native to South Asia. Its inflated leaf stalks act as natural floats, supporting neat horizontal fans of foliage that resemble miniature bamboo rafts across the pond surface.",
    main_image_url: "/images/garden-pond-plants/asian-water-grass-hygroryza-aristata.jpg",
    origin: "Sri Lanka / South Asia",
    growth_rate: "Medium",
    plant_height: "Floating / 5 - 15 cm",
    light_demand: "High / Full Sunlight",
    co2_requirement: "Low",
    temperature_range: "20 - 30 °C",
    placement: "Pond Surface / Floating",
    care_instructions: "Float on calm water surface receiving ample sunlight. Fine root systems provide excellent grazing and shelter for fry.",
    is_featured: true,
    is_published: true,
    seo_title: "Asian Water Grass Hygroryza Aristata | Ceylon Aquatic Plants",
    seo_description: "Unique floating Hygroryza aristata water grass for decorative ponds. Exported from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000024",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "water-primrose-ludwigia-adscendens",
    name: "Water Primrose (Ludwigia Adscendens)",
    scientific_name: "Ludwigia adscendens",
    short_description: "Vigorous creeping wetland botanical with glossy obovate leaves and specialized white floating breathing roots.",
    full_description: "Ludwigia adscendens is an indigenous tropical wetland creeper that extends gracefully from pond borders across open water. It develops specialized spongy white spindle-shaped breathing roots (pneumatophores) and charming cream-white flowers.",
    main_image_url: "/images/garden-pond-plants/water-primrose-ludwigia-adscendens.jpg",
    origin: "Tropical Asia",
    growth_rate: "Fast",
    plant_height: "10 - 20 cm above water",
    light_demand: "High / Full Sun",
    co2_requirement: "Low",
    temperature_range: "22 - 32 °C",
    placement: "Pond Margin & Surface",
    care_instructions: "Plant in marginal pond mud or allow creeping stems to trail across surface water. Excellent natural bio-filtration.",
    is_featured: false,
    is_published: true,
    seo_title: "Ludwigia Adscendens Water Primrose | Ceylon Aquatic Plants",
    seo_description: "Native Water Primrose marginal pond plants. Hardy tropical bio-filtering flora from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000025",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "mosaic-flower-ludwigia-sedioides",
    name: "Mosaic Flower (Ludwigia Sedioides)",
    scientific_name: "Ludwigia sedioides",
    short_description: "Breathtaking geometric floating rosettes of diamond-shaped red-edged leaves accented with radiant yellow blossoms.",
    full_description: "Ludwigia sedioides, celebrated globally as the Mosaic Plant or False Loosestrife, creates breathtaking kaleidoscopic circular rosettes across the water surface. Long submerged red stems anchor in shallow substrate while vivid yellow flowers bloom under bright tropical sun.",
    main_image_url: "/images/garden-pond-plants/mosaic-flower-ludwigia-sedioides.jpg",
    origin: "Central & South America",
    growth_rate: "Medium",
    plant_height: "Surface Rosette (10 - 40 cm stem)",
    light_demand: "High / Full Sun",
    co2_requirement: "Low to Moderate",
    temperature_range: "22 - 30 °C",
    placement: "Pond Surface / Rooted in Shallows",
    care_instructions: "Plant stem bases in nutrient-rich loamy soil in pots placed 15-40 cm beneath the water surface in direct sun.",
    is_featured: true,
    is_published: true,
    seo_title: "Mosaic Flower Ludwigia Sedioides | Ceylon Aquatic Plants",
    seo_description: "Stunning geometric Mosaic Plant rosettes with yellow flowers for decorative garden ponds.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000026",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "floating-water-fern-salvinia-auriculata",
    name: "Floating Water Fern (Salvinia Auriculata)",
    scientific_name: "Salvinia auriculata",
    short_description: "Hardy velvety floating fern forming dense surface carpets that control algae and provide fish shade.",
    full_description: "Salvinia auriculata features paired rounded leaves covered in water-repellent egg-beater hairs. Floating effortlessly on water surfaces, it excels at absorbing excess nutrients, cooling pond water, and preventing algae outbreaks.",
    main_image_url: "/images/garden-pond-plants/floating-water-fern-salvinia-auriculata.jpg",
    origin: "Tropical Americas / Pantropical",
    growth_rate: "Fast",
    plant_height: "Floating / 1 - 3 cm",
    light_demand: "Medium to High",
    co2_requirement: "Low",
    temperature_range: "18 - 30 °C",
    placement: "Pond Surface / Floating Carpet",
    care_instructions: "Scatter over still pond water. Scoop excess plants periodically to maintain open surface areas for fish.",
    is_featured: false,
    is_published: true,
    seo_title: "Salvinia Auriculata Floating Water Fern | Ceylon Aquatic Plants",
    seo_description: "Wholesale floating Salvinia water ferns for garden ponds and natural bio-filtration.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000027",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "water-lettuce-pistia-stratiotes",
    name: "Water Lettuce (Pistia Stratiotes)",
    scientific_name: "Pistia stratiotes",
    short_description: "Velvety ribbed soft green rosettes resembling miniature cabbage heads with extensive hanging root networks.",
    full_description: "Water Lettuce is one of the most widely appreciated surface pond plants in the world. Its soft, ridged, velvety leaves form handsome open rosettes, while its trailing feathery root systems provide unparalleled natural filtration and shelter for pond aquatic life.",
    main_image_url: "/images/garden-pond-plants/water-lettuce-pistia-stratiotes.jpg",
    origin: "Pantropical",
    growth_rate: "Fast",
    plant_height: "Floating / 5 - 15 cm",
    light_demand: "Medium to High / Sun",
    co2_requirement: "Low",
    temperature_range: "20 - 32 °C",
    placement: "Pond Surface / Floating Specimen",
    care_instructions: "Float freely in calm ponds with moderate water movement. Prefers warm water and ample natural sunlight.",
    is_featured: true,
    is_published: true,
    seo_title: "Water Lettuce Pistia Stratiotes | Ceylon Aquatic Plants",
    seo_description: "Tropical Water Lettuce pond plants. Healthy floating rosettes cultivated by Ceylon Aquatic Plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000028",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "asian-hooded-fern-salvinia-cucullata",
    name: "Asian Hooded Fern (Salvinia Cucullata)",
    scientific_name: "Salvinia cucullata",
    short_description: "Curved cup-like emerald floating leaves forming structured geometric floating clusters.",
    full_description: "Salvinia cucullata is an exotic Asian floating fern known for its distinctive cup-shaped or hooded leaves that curve upward like miniature scrolls. Forms dense, architecturally striking floating clusters that filter sunlight and beautify outdoor ponds.",
    main_image_url: "/images/garden-pond-plants/asian-hooded-fern-salvinia-cucullata.jpg",
    origin: "Southeast Asia / Sri Lanka",
    growth_rate: "Medium",
    plant_height: "Floating / 2 - 4 cm",
    light_demand: "Medium to High",
    co2_requirement: "Low",
    temperature_range: "20 - 30 °C",
    placement: "Pond Surface / Floating",
    care_instructions: "Float on calm water. Protect from forceful surface waterfalls or turbulence.",
    is_featured: false,
    is_published: true,
    seo_title: "Salvinia Cucullata Hooded Fern | Ceylon Aquatic Plants",
    seo_description: "Asian hooded floating water fern Salvinia cucullata. Rare ornamental pond foliage.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000029",
    category_id: "c1000000-0000-0000-0000-000000000003",
    slug: "water-chestnut-trapa-natans",
    name: "Water Chestnut (Trapa Natans)",
    scientific_name: "Trapa natans",
    short_description: "Attractive fan-shaped rosettes of serrated floating leaves with inflated air-filled reddish petioles.",
    full_description: "Trapa natans (Water Chestnut / Water Caltrop) is a historic floating botanical with attractive fan-shaped rosettes of toothed glossy leaves. Swollen reddish petioles provide buoyancy while submerged stems anchor in pond soil.",
    main_image_url: "/images/garden-pond-plants/water-chestnut-trapa-natans.jpg",
    origin: "Eurasia & Tropical Asia",
    growth_rate: "Medium",
    plant_height: "Surface Rosette (20 - 60 cm stem)",
    light_demand: "High / Full Sun",
    co2_requirement: "Low",
    temperature_range: "18 - 28 °C",
    placement: "Pond Surface / Rooted in Shallows",
    care_instructions: "Anchor submerged cords in silt or pond soil baskets. Needs good sunlight to form robust floating rosettes.",
    is_featured: false,
    is_published: true,
    seo_title: "Water Chestnut Trapa Natans | Ceylon Aquatic Plants",
    seo_description: "Freshly cultivated Trapa natans Water Chestnut rosettes for garden and outdoor water features.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000006",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "eleocharis-parvula-hairgrass",
    name: "Dwarf Hairgrass (In-Vitro Cup)",
    scientific_name: "Eleocharis parvula",
    short_description: "Fine needle-like bright green carpeting grass. Creates lush, rolling underwater lawns.",
    full_description: "Propagated in our sterile tissue culture laboratories, Dwarf Hairgrass forms a dense, natural green carpet across the aquarium floor. In-vitro cups provide dozens of clean plantlets that spread rapidly via subterranean runners.",
    main_image_url: "/images/tissue-culture/eleocharis-parvula-hairgrass.jpg",
    origin: "Cosmopolitan",
    growth_rate: "Medium",
    plant_height: "3 - 7 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "18 - 26 °C",
    placement: "Foreground Carpet",
    care_instructions: "Rinse agar gel gently with clean water. Divide cup into small portions (10-15 clumps) and plant evenly into fine substrate with aquascaping tweezers.",
    is_featured: true,
    is_published: true,
    seo_title: "Tissue Culture Dwarf Hairgrass | Ceylon Aquatic Plants",
    seo_description: "Sterile in-vitro Dwarf Hairgrass cups. Snail-free, pesticide-free aquarium carpeting plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000007",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "micranthemum-callitrichoides-cuba",
    name: "Micranthemum Callitrichoides 'Cuba' (In-Vitro Cup)",
    scientific_name: "Micranthemum callitrichoides 'Cuba'",
    short_description: "Renowned miniature carpeting flora producing a vibrant dense emerald submersed lawn in competitive aquascaping.",
    full_description: "Micranthemum callitrichoides 'Cuba' is acclaimed as one of the world's most desirable foreground aquatic plants. Cultivated under sterile laboratory in-vitro conditions, each cup provides pristine, pest-free clumps that spread horizontally to form a breathtaking emerald aquatic carpet.",
    main_image_url: "/images/tissue-culture/micranthemum-callitrichoides-cuba.jpg",
    origin: "Cuba / Caribbean",
    growth_rate: "Medium",
    plant_height: "1 - 3 cm",
    light_demand: "High",
    co2_requirement: "Required",
    temperature_range: "20 - 28 °C",
    placement: "Foreground Carpet",
    care_instructions: "Rinse agar carefully with clean lukewarm water. Divide the cup into 10-15 small portions and plant into fine aquasoil using precision tweezers.",
    is_featured: true,
    is_published: true,
    seo_title: "Micranthemum Callitrichoides Cuba In-Vitro Cup | Ceylon Aquatic Plants",
    seo_description: "Wholesale sterile tissue culture Micranthemum Cuba cups. 100% snail-free and algae-free aquatic carpet plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000008",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "alternanthera-reineckii-mini",
    name: "Alternanthera Reineckii 'Mini' (In-Vitro Cup)",
    scientific_name: "Alternanthera reineckii 'Mini'",
    short_description: "Compact miniature red-violet foliage providing vivid ruby contrast in aquarium midgrounds and foregrounds.",
    full_description: "Alternanthera reineckii 'Mini' is a dwarf cultivar renowned for its saturated crimson to purple-red leaves and compact bushy form. Propagation via sterile tissue culture guarantees robust pathogen-free specimens that adapt quickly to submersed aquaria.",
    main_image_url: "/images/tissue-culture/alternanthera-reineckii-mini.jpg",
    origin: "South America",
    growth_rate: "Medium",
    plant_height: "5 - 10 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Foreground to Midground",
    care_instructions: "Trim tall tops regularly to encourage dense side branches. Iron and micronutrient fertilization enhances intense red color.",
    is_featured: true,
    is_published: true,
    seo_title: "Alternanthera Reineckii Mini In-Vitro | Ceylon Aquatic Plants",
    seo_description: "Compact red aquatic stem plants in sterile in-vitro cups. Cultivated in Ceylon for international export.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000009",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "anubias-barteri-nana-petite",
    name: "Anubias Barteri var. Nana 'Petite' (In-Vitro Cup)",
    scientific_name: "Anubias barteri var. nana 'Petite'",
    short_description: "Ultra-compact miniature Anubias with tiny dark green leathery leaves. Exceptional resilience for hardscape detailing.",
    full_description: "Anubias 'Petite' is one of the most celebrated miniature epiphyte species in nature aquariums. Sterile in-vitro propagation delivers multiple clean miniature rhizomes ready to mount directly onto driftwood roots and stone crevasses.",
    main_image_url: "/images/tissue-culture/anubias-barteri-var-nana-petite.jpg",
    origin: "West Africa (Cultivar)",
    growth_rate: "Slow",
    plant_height: "3 - 5 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "20 - 28 °C",
    placement: "Foreground / Hardscape Epiphyte",
    care_instructions: "Do not bury the horizontal rhizome beneath substrate. Affix to driftwood or stone with aquatic glue or thread.",
    is_featured: true,
    is_published: true,
    seo_title: "Anubias Nana Petite In-Vitro Cup | Ceylon Aquatic Plants",
    seo_description: "Sterile miniature Anubias Petite in-vitro cups. Clean rhizomes free from pest snails and algae.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000010",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "cryptocoryne-wendtii-brown-in-vitro",
    name: "Cryptocoryne Wendtii 'Brown' (In-Vitro Cup)",
    scientific_name: "Cryptocoryne wendtii 'Brown'",
    short_description: "Classic Sri Lankan endemic crypt featuring textured bronze-brown fluted foliage that flourishes across varied water parameters.",
    full_description: "Indigenous to Ceylon's tropical streams, Cryptocoryne wendtii 'Brown' is celebrated worldwide for its resilience and earthy bronze hues. Laboratory in-vitro tissue culture eliminates Crypt melt risks and delivers clean, pesticide-free juvenile plants.",
    main_image_url: "/images/tissue-culture/cryptocoryne-wendtii-brown.jpg",
    origin: "Sri Lanka (Ceylon)",
    growth_rate: "Medium",
    plant_height: "10 - 20 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low to Moderate",
    temperature_range: "20 - 28 °C",
    placement: "Midground",
    care_instructions: "Rinse nutrient gel and plant individual crowns into nutrient-rich substrate. Thrives even in modest aquarium lighting.",
    is_featured: true,
    is_published: true,
    seo_title: "Cryptocoryne Wendtii Brown In-Vitro | Ceylon Aquatic Plants",
    seo_description: "Native Sri Lankan Cryptocoryne wendtii in sterile tissue culture cups. Snail-free, guaranteed pure.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000011",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "rotala-rotundifolia-colorata-in-vitro",
    name: "Rotala Rotundifolia 'Colorata' (In-Vitro Cup)",
    scientific_name: "Rotala rotundifolia 'Colorata'",
    short_description: "High-impact pink-red stem plant forming dense colorful thickets under moderate to intense lighting.",
    full_description: "Rotala 'Colorata' produces brilliant peach to saturated scarlet tips when submerged. Each sterile in-vitro cup contains dozens of healthy shoots ready for expansive grouping in aquascape backgrounds.",
    main_image_url: "/images/tissue-culture/rotala-rotundifolia-colorata.jpg",
    origin: "Southeast Asia",
    growth_rate: "Fast",
    plant_height: "15 - 35 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Background",
    care_instructions: "Separate into small clumps and plant spaced 1-2 cm apart. Prune stems regularly to create voluminous bushes.",
    is_featured: false,
    is_published: true,
    seo_title: "Rotala Colorata In-Vitro Cup | Ceylon Aquatic Plants",
    seo_description: "Vibrant red aquatic stem plants in sterile in-vitro cups. Cultivated in Ceylon.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000012",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "micranthemum-monte-carlo-in-vitro",
    name: "Micranthemum 'Monte Carlo' (In-Vitro Cup)",
    scientific_name: "Micranthemum tweediei 'Monte Carlo'",
    short_description: "Lush, compact round-leaved carpeting plant. More forgiving than Cuba and spreads reliably across the aquarium floor.",
    full_description: "Monte Carlo is renowned as the most reliable and vigorous foreground carpeting plant in modern aquascaping. Sterile in-vitro cups provide clean, pathogen-free creeping runners that root quickly into aquasoil substrates.",
    main_image_url: "/images/tissue-culture/micranthemum-monte-carlo.jpg",
    origin: "South America",
    growth_rate: "Medium to Fast",
    plant_height: "2 - 5 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "20 - 28 °C",
    placement: "Foreground Carpet",
    care_instructions: "Divide cup into small portions and plant into fine aquasoil. Regular mowing keeps the carpet dense and healthy.",
    is_featured: true,
    is_published: true,
    seo_title: "Micranthemum Monte Carlo In-Vitro Cup | Ceylon Aquatic Plants",
    seo_description: "Sterile Monte Carlo carpeting plants in in-vitro cups. Easy carpeting aquatic plant from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000013",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "glossostigma-elatinoides-in-vitro",
    name: "Glossostigma Elatinoides (In-Vitro Cup)",
    scientific_name: "Glossostigma elatinoides",
    short_description: "Iconic Japanese nature aquarium carpeting plant with charming spatula-shaped bright emerald leaves.",
    full_description: "Introduced to global aquascaping by Takashi Amano, Glossostigma forms a dense, rapid-growing green lawn under adequate light. Produced in sterile in-vitro cups to provide clean pest-free plantlets for pristine layouts.",
    main_image_url: "/images/tissue-culture/glossostigma-elatinoides.jpg",
    origin: "Australia & New Zealand",
    growth_rate: "Fast",
    plant_height: "2 - 4 cm",
    light_demand: "High",
    co2_requirement: "Recommended",
    temperature_range: "18 - 26 °C",
    placement: "Foreground Carpet",
    care_instructions: "Plant individual stems slightly tilted into fine substrate with tweezers under high light to encourage creeping horizontal growth.",
    is_featured: false,
    is_published: true,
    seo_title: "Glossostigma Elatinoides In-Vitro Cup | Ceylon Aquatic Plants",
    seo_description: "Sterile in-vitro Glossostigma aquarium carpeting cups. Snail-free and pesticide-free.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000014",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "hemianthus-micranthemoides-pearl-weed",
    name: "Hemianthus Micranthemoides (Pearl Weed In-Vitro Cup)",
    scientific_name: "Hemianthus micranthemoides",
    short_description: "Incredibly versatile light-green botanical that can be sculpted into lush bushes, cushions, or dense foreground carpets.",
    full_description: "Pearl Weed is praised for its adaptability and delicate bright lime-green leaves. In-vitro cups contain hundreds of miniature plantlets that respond eagerly to trimming, allowing aquascapers to shape hedges, bushes, or ground cover.",
    main_image_url: "/images/tissue-culture/hemianthus-micranthemoides.jpg",
    origin: "North America",
    growth_rate: "Fast",
    plant_height: "5 - 20 cm",
    light_demand: "Medium to High",
    co2_requirement: "Optional to Recommended",
    temperature_range: "20 - 28 °C",
    placement: "Foreground to Midground",
    care_instructions: "Very undemanding. Prune frequently with curved scissors to sculpt into desired landscape contours.",
    is_featured: false,
    is_published: true,
    seo_title: "Pearl Weed Hemianthus In-Vitro Cup | Ceylon Aquatic Plants",
    seo_description: "Sterile Pearl Weed tissue culture cups. Versatile aquascaping plant from Ceylon Aquatic Plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000015",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "pogostemon-helferi-downoi-in-vitro",
    name: "Pogostemon Helferi 'Downoi' (In-Vitro Cup)",
    scientific_name: "Pogostemon helferi",
    short_description: "Distinctive star-shaped rosettes with curly frilled leaf margins. A prized Thai focal specimen in foregrounds.",
    full_description: "Known locally in Thailand as 'Downoi' (Little Star), Pogostemon helferi boasts unique decorative crinkled leaves arranged in star rosettes. In-vitro sterile culture ensures optimal vigor and zero pest contamination.",
    main_image_url: "/images/tissue-culture/pogostemon-helferi-downoi.jpg",
    origin: "Thailand / Myanmar",
    growth_rate: "Medium",
    plant_height: "5 - 10 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Foreground to Midground",
    care_instructions: "Rinse gel gently and insert plantlets into substrate in small groups. Iron supplementation maintains deep emerald color.",
    is_featured: true,
    is_published: true,
    seo_title: "Pogostemon Helferi Downoi In-Vitro | Ceylon Aquatic Plants",
    seo_description: "Sterile Pogostemon helferi Downoi tissue culture cups. Unique star-shaped foreground plant.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000016",
    category_id: "c1000000-0000-0000-0000-000000000005",
    slug: "hydrocotyle-tripartita-japan-in-vitro",
    name: "Hydrocotyle Tripartita 'Japan' (In-Vitro Cup)",
    scientific_name: "Hydrocotyle tripartita",
    short_description: "Delicate three-lobed mini clover foliage creating cascading mats over rocks and lush green carpet trails.",
    full_description: "Hydrocotyle tripartita 'Japan' is famous for its fast-growing, miniature clover-like leaves and creeping stems. Propagated in sterile in-vitro cups, it creates lush green mats across substrates and hardscape crevasses.",
    main_image_url: "/images/tissue-culture/hydrocotyle-tripartita-japan.jpg",
    origin: "Southeast Asia / Japan",
    growth_rate: "Fast",
    plant_height: "3 - 8 cm",
    light_demand: "Medium",
    co2_requirement: "Recommended",
    temperature_range: "20 - 28 °C",
    placement: "Foreground to Midground",
    care_instructions: "Press runners gently into substrate or between hardscape pieces. Trim regularly with scissors to maintain compact matting.",
    is_featured: true,
    is_published: true,
    seo_title: "Hydrocotyle Tripartita Japan In-Vitro | Ceylon Aquatic Plants",
    seo_description: "Miniature clover-leaf tissue culture cups. Clean, sterile in-vitro aquarium plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000031",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "alternanthera-reineckii-purple-bunch",
    name: "Alternanthera Reineckii 'Purple' (Bunch)",
    scientific_name: "Alternanthera reineckii 'Purple'",
    short_description: "Striking magenta-purple underside stem foliage providing deep ruby accents in aquarium midgrounds and backgrounds.",
    full_description: "Alternanthera reineckii 'Purple' is a spectacular tropical stem plant cultivated in fresh bunches. Its vivid purple-pink undersides and olive-ruby tops create a commanding visual contrast against green aquarium flora.",
    main_image_url: "/images/plants-bunch/alternanthera-reineckii-purple-bunch.jpg",
    origin: "South America",
    growth_rate: "Medium",
    plant_height: "20 - 40 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Plant individual stems with 2-3 cm spacing. Regular iron dosing brings out the most intense ruby and magenta tones.",
    is_featured: true,
    is_published: true,
    seo_title: "Alternanthera Reineckii Purple Bunch | Ceylon Aquatic Plants",
    seo_description: "Wholesale Alternanthera reineckii Purple stem bunches. Vibrant purple aquarium plants from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000032",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "ludwigia-repens-rubin-bunch",
    name: "Ludwigia Repens 'Rubin' (Bunch)",
    scientific_name: "Ludwigia repens 'Rubin'",
    short_description: "Vibrant wine-red ovate leaves on vigorous stems. Highly adaptable and maintains intense coloration.",
    full_description: "Ludwigia repens 'Rubin' is renowned for its intense dark red to ruby coloring which persists even under moderate aquarium lighting. Bundled in fresh export bunches with healthy stem bases for immediate rooting.",
    main_image_url: "/images/plants-bunch/ludwigia-repens-rubin-bunch.jpg",
    origin: "North America",
    growth_rate: "Fast",
    plant_height: "20 - 45 cm",
    light_demand: "Medium",
    co2_requirement: "Optional but beneficial",
    temperature_range: "18 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Prune tops when reaching the surface to stimulate voluminous side branching. Replant pruned stems easily.",
    is_featured: true,
    is_published: true,
    seo_title: "Ludwigia Repens Rubin Bunch | Ceylon Aquatic Plants",
    seo_description: "Freshly harvested Ludwigia Rubin stem bunches. Deep red aquatic foliage from Ceylon nurseries.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000033",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "bacopa-caroliniana-bunch",
    name: "Bacopa Caroliniana (Bunch)",
    scientific_name: "Bacopa caroliniana",
    short_description: "Hardy, aromatic succulent stem plant with thick rounded bright green leaves and gentle lemon aroma.",
    full_description: "Bacopa caroliniana is a classic, hardy aquatic stem plant known for its oval, succulent fleshy leaves that emit a pleasant lemon scent when bruised. Very undemanding and well-suited for beginners and low-tech aquascapes.",
    main_image_url: "/images/plants-bunch/bacopa-caroliniana-bunch.jpg",
    origin: "North America",
    growth_rate: "Slow to Medium",
    plant_height: "20 - 40 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "15 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Insert stems firmly into the substrate. Responds well to gentle trimming and thrives across wide pH and water hardness ranges.",
    is_featured: false,
    is_published: true,
    seo_title: "Bacopa Caroliniana Stem Bunch | Ceylon Aquatic Plants",
    seo_description: "Hardy Bacopa caroliniana bunches for freshwater aquariums. Cultivated in tropical Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000034",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "hygrophila-corymbosa-stricta-bunch",
    name: "Hygrophila Corymbosa 'Stricta' (Bunch)",
    scientific_name: "Hygrophila corymbosa 'Stricta'",
    short_description: "Willow-leafed Hygrophila producing upright green foliage columns and rapid natural nutrient absorption.",
    full_description: "Hygrophila corymbosa 'Stricta' features robust upright stems with long, willow-like bright emerald leaves. Its fast growth rate makes it an effective biological nutrient filter that outcompetes nuisance algae in new aquarium setups.",
    main_image_url: "/images/plants-bunch/hygrophila-corymbosa-stricta-bunch.jpg",
    origin: "Southeast Asia",
    growth_rate: "Fast",
    plant_height: "25 - 50 cm",
    light_demand: "Medium",
    co2_requirement: "Low",
    temperature_range: "20 - 28 °C",
    placement: "Background",
    care_instructions: "Plant stems in background groupings. Regular trimming prevents lower leaves from losing light and keeps stands dense.",
    is_featured: false,
    is_published: true,
    seo_title: "Hygrophila Corymbosa Stricta Bunch | Ceylon Aquatic Plants",
    seo_description: "Wholesale Hygrophila Stricta stem bunches. Rapid-growing tropical background plant.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000035",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "hygrophila-difformis-water-wisteria-bunch",
    name: "Hygrophila Difformis (Water Wisteria Bunch)",
    scientific_name: "Hygrophila difformis",
    short_description: "Deeply pinnatifid, lace-like bright green foliage resembling underwater fern fronds. Excellent water purifier.",
    full_description: "Water Wisteria (Hygrophila difformis) is an exceptionally beautiful and adaptable aquatic plant. Its submerged leaves develop intricate, deeply divided fern-like shapes that flutter gracefully in water currents.",
    main_image_url: "/images/plants-bunch/hygrophila-difformis-water-wisteria-bunch.jpg",
    origin: "Indian Subcontinent & Southeast Asia",
    growth_rate: "Fast",
    plant_height: "20 - 50 cm",
    light_demand: "Medium",
    co2_requirement: "Low",
    temperature_range: "22 - 30 °C",
    placement: "Midground to Background",
    care_instructions: "Can be planted into substrate or allowed to float as a protective refuge for fry. Absorbs excess nitrates vigorously.",
    is_featured: true,
    is_published: true,
    seo_title: "Water Wisteria Hygrophila Difformis Bunch | Ceylon Aquatic Plants",
    seo_description: "Lace-leaf Water Wisteria bunches for planted aquascapes. Cultivated by Ceylon Aquatic Plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000036",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "hygrophila-polysperma-ceylon-bunch",
    name: "Hygrophila Polysperma 'Ceylon' (Bunch)",
    scientific_name: "Hygrophila polysperma 'Ceylon'",
    short_description: "Endemic Ceylon variety displaying slender olive leaves that flush warm copper-bronze under aquarium lighting.",
    full_description: "A cherished native variety originating from Sri Lanka's freshwater streams, Hygrophila polysperma 'Ceylon' develops lovely warm bronze to copper leaf tones toward the shoot apices under good lighting.",
    main_image_url: "/images/plants-bunch/hygrophila-polysperma-ceylon-bunch.jpg",
    origin: "Sri Lanka (Ceylon)",
    growth_rate: "Fast",
    plant_height: "20 - 45 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "18 - 30 °C",
    placement: "Background",
    care_instructions: "Extremely hardy and adaptable to almost any freshwater aquarium conditions. Prune regularly to maintain neat bushes.",
    is_featured: true,
    is_published: true,
    seo_title: "Hygrophila Polysperma Ceylon Bunch | Ceylon Aquatic Plants",
    seo_description: "Native Ceylon Hygrophila stem bunches. Hardy, fast-growing aquarium plant from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000037",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "hygrophila-salicifolia-bunch",
    name: "Hygrophila Salicifolia (Bunch)",
    scientific_name: "Hygrophila salicifolia",
    short_description: "Slender willow-shaped lanceolate leaves on firm vertical stems. Creates clean vertical architecture.",
    full_description: "Hygrophila salicifolia produces elongated, narrow lanceolate foliage that forms clean vertical columns in aquarium backgrounds. Its sturdy stems and resilient foliage make it suitable for community and peaceful cichlid setups.",
    main_image_url: "/images/plants-bunch/hygrophila-salicifolia-bunch.jpg",
    origin: "Southeast Asia",
    growth_rate: "Fast",
    plant_height: "25 - 50 cm",
    light_demand: "Medium",
    co2_requirement: "Low",
    temperature_range: "20 - 28 °C",
    placement: "Background",
    care_instructions: "Group 4-6 stems together for maximum visual impact. Trim stem tops before they break the water surface.",
    is_featured: false,
    is_published: true,
    seo_title: "Hygrophila Salicifolia Stem Bunch | Ceylon Aquatic Plants",
    seo_description: "Narrow-leaf Hygrophila salicifolia bunches. Freshly cultivated tropical aquarium stem plant.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000038",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "ludwigia-glandulosa-bronze-bunch",
    name: "Ludwigia Glandulosa (Bunch)",
    scientific_name: "Ludwigia glandulosa",
    short_description: "Regal lanceolate bronze-burgundy leaves arranged symmetrically along erect reddish-purple stems.",
    full_description: "Ludwigia glandulosa is considered one of the most stunning colored stem plants in the aquarium hobby. Its deep reddish-bronze and wine-colored leaves create an unforgettable focal point in aquascape midgrounds.",
    main_image_url: "/images/plants-bunch/ludwigia-glandulosa-bronze-bunch.jpg",
    origin: "North America",
    growth_rate: "Medium",
    plant_height: "15 - 35 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "20 - 26 °C",
    placement: "Midground",
    care_instructions: "Give ample space between stems to allow light penetration to lower leaves. Provide iron-rich liquid fertilizer.",
    is_featured: true,
    is_published: true,
    seo_title: "Ludwigia Glandulosa Bunch | Ceylon Aquatic Plants",
    seo_description: "Wholesale Ludwigia glandulosa bunches. Rare burgundy aquatic stem plant from Ceylon.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000039",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "limnophila-sessiliflora-ambulia-bunch",
    name: "Limnophila Sessiliflora (Ambulia Bunch)",
    scientific_name: "Limnophila sessiliflora",
    short_description: "Lush whorls of soft feathery light-green foliage. Beautiful and far hardier than Cabomba.",
    full_description: "Commonly known as Asian Ambulia, Limnophila sessiliflora produces captivating whorls of bright emerald needle-like leaves. It thrives in low-to-medium light, growing quickly into voluminous decorative background thickets.",
    main_image_url: "/images/plants-bunch/limnophila-sessiliflora-ambulia-bunch.jpg",
    origin: "South & Southeast Asia",
    growth_rate: "Fast",
    plant_height: "20 - 50 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "20 - 28 °C",
    placement: "Background",
    care_instructions: "Pinch top shoots when stems become too tall to encourage dense branching. Excellent refuge for fish fry.",
    is_featured: false,
    is_published: true,
    seo_title: "Limnophila Sessiliflora Ambulia Bunch | Ceylon Aquatic Plants",
    seo_description: "Feathery Asian Ambulia bunches for planted aquascapes. Cultivated by Ceylon Aquatic Plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000040",
    category_id: "c1000000-0000-0000-0000-000000000001",
    slug: "rotala-wallichii-pink-whorled-bunch",
    name: "Rotala Wallichii (Bunch)",
    scientific_name: "Rotala wallichii",
    short_description: "Delicate needle-whorled stem plant crowned with vivid pink to magenta apical tips.",
    full_description: "Rotala wallichii is a prized aquascaping gem featuring ultra-fine needle-like whorled leaves that transition from gold-bronze to vibrant ruby-pink at the shoot tips under good illumination and CO2.",
    main_image_url: "/images/plants-bunch/rotala-wallichii-pink-whorled-bunch.jpg",
    origin: "Southeast Asia",
    growth_rate: "Medium to Fast",
    plant_height: "15 - 30 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Prefers soft, slightly acidic water and good illumination with iron supplementation to reach peak coloration.",
    is_featured: true,
    is_published: true,
    seo_title: "Rotala Wallichii Stem Bunch | Ceylon Aquatic Plants",
    seo_description: "Pink needle-leaf Rotala wallichii bunches. Pristine stem plants grown by Ceylon Aquatic Plants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000051",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "cryptocoryne-wendtii-green-potted",
    name: "Cryptocoryne Wendtii 'Green' (Potted)",
    scientific_name: "Cryptocoryne wendtii 'Green'",
    short_description: "Hardy tropical rosette plant with fluted bright green leaves established in mineral wool pots.",
    full_description: "Indigenous to the freshwater streams of Sri Lanka, Cryptocoryne wendtii 'Green' is acclaimed globally for its unmatched adaptability. Cultivated in nutrient-inert rockwool mesh pots, it avoids transplant stress and quickly settles into varied aquarium parameters.",
    main_image_url: "/images/potted-plants/cryptocoryne-wendtii-green-potted.jpg",
    origin: "Sri Lanka (Ceylon)",
    growth_rate: "Medium",
    plant_height: "10 - 25 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low to Moderate",
    temperature_range: "20 - 28 °C",
    placement: "Midground",
    care_instructions: "Thrives in low-tech tanks. Embed pot gently into aquarium substrate or transfer bare-root into gravel.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Cryptocoryne Wendtii Green | Ceylon Aquatic Plants",
    seo_description: "Wholesale potted Cryptocoryne wendtii plants. Hardy Sri Lankan native aquatic flora.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000052",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "ludwigia-glandulosa-potted",
    name: "Ludwigia Glandulosa (Potted)",
    scientific_name: "Ludwigia glandulosa",
    short_description: "Erect stems with lanceolate bronze-burgundy leaves established in mesh pots with mineral wool.",
    full_description: "Ludwigia glandulosa is one of the most magnificent red stem plants. Cultivated in sturdy pots, the established root structure ensures rapid acclimatization and deep ruby-bronze leaf coloration in freshwater aquariums.",
    main_image_url: "/images/potted-plants/ludwigia-glandulosa-potted.jpg",
    origin: "North America",
    growth_rate: "Medium",
    plant_height: "20 - 40 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "20 - 26 °C",
    placement: "Midground to Background",
    care_instructions: "Provide moderate to high lighting and iron supplementation for intense crimson hues.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Ludwigia Glandulosa | Ceylon Aquatic Plants",
    seo_description: "Potted Ludwigia glandulosa stem plants with established root systems.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000053",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "ludwigia-repens-rubin-potted",
    name: "Ludwigia Repens 'Rubin' (Potted)",
    scientific_name: "Ludwigia repens 'Rubin'",
    short_description: "Bushy potted specimen with deep ruby-wine ovate foliage on sturdy upright stems.",
    full_description: "Ludwigia repens 'Rubin' maintains rich reddish-copper leaves even in moderate lighting. Shipped in established rockwool pots with dense roots that prevent shock upon aquarium introduction.",
    main_image_url: "/images/potted-plants/ludwigia-repens-rubin-potted.jpg",
    origin: "North America",
    growth_rate: "Fast",
    plant_height: "20 - 45 cm",
    light_demand: "Medium",
    co2_requirement: "Optional",
    temperature_range: "18 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Trim stem tops regularly to stimulate compact side branching.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Ludwigia Rubin | Ceylon Aquatic Plants",
    seo_description: "Established potted Ludwigia repens Rubin with developed root system.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000054",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "bacopa-monnieri-potted",
    name: "Bacopa Monnieri 'Moneywort' (Potted)",
    scientific_name: "Bacopa monnieri",
    short_description: "Upright fleshy succulent stems with rounded bright emerald leaves in mineral wool pots.",
    full_description: "Bacopa monnieri (Moneywort) is an extremely resilient and attractive aquatic plant. Established in pots, its thick vertical stems and rounded leaves provide structured architectural beauty in aquarium backgrounds.",
    main_image_url: "/images/potted-plants/bacopa-monnieri-potted.jpg",
    origin: "Pantropical / Asia",
    growth_rate: "Medium",
    plant_height: "15 - 35 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "18 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Very undemanding. Tolerates a wide range of water hardness and pH levels.",
    is_featured: false,
    is_published: true,
    seo_title: "Potted Bacopa Monnieri Moneywort | Ceylon Aquatic Plants",
    seo_description: "Hardy potted Bacopa monnieri plants for freshwater aquariums.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000055",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "hygrophila-polysperma-potted",
    name: "Hygrophila Polysperma (Potted)",
    scientific_name: "Hygrophila polysperma",
    short_description: "Vigorous tropical stem plant with warm olive-green foliage established in rockwool pots.",
    full_description: "Hygrophila polysperma is a fast-growing, beginner-friendly background plant. Established in mineral wool pots, it swiftly absorbs excess nitrates and provides lush green cover for fish.",
    main_image_url: "/images/potted-plants/hygrophila-polysperma-potted.jpg",
    origin: "India & Sri Lanka",
    growth_rate: "Fast",
    plant_height: "20 - 45 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "18 - 30 °C",
    placement: "Background",
    care_instructions: "Prune frequently to prevent shading lower leaves and maintain dense foliage.",
    is_featured: false,
    is_published: true,
    seo_title: "Potted Hygrophila Polysperma | Ceylon Aquatic Plants",
    seo_description: "Fast-growing potted Hygrophila polysperma from Ceylon nurseries.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000056",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "hygrophila-corymbosa-stricta-potted",
    name: "Hygrophila Corymbosa 'Stricta' (Potted)",
    scientific_name: "Hygrophila corymbosa 'Stricta'",
    short_description: "Robust willow-leaved stems forming bold vertical green pillars in mineral wool pots.",
    full_description: "Hygrophila corymbosa 'Stricta' features strong upright stems and long, broad emerald leaves. The established pot root network ensures rapid adaptation without leaf drop.",
    main_image_url: "/images/potted-plants/hygrophila-corymbosa-stricta-potted.jpg",
    origin: "Southeast Asia",
    growth_rate: "Fast",
    plant_height: "25 - 50 cm",
    light_demand: "Medium",
    co2_requirement: "Low",
    temperature_range: "20 - 28 °C",
    placement: "Background",
    care_instructions: "Place in open background areas. Requires regular trimming to maintain tidy bush shapes.",
    is_featured: false,
    is_published: true,
    seo_title: "Potted Hygrophila Corymbosa Stricta | Ceylon Aquatic Plants",
    seo_description: "Potted Hygrophila Stricta with established root systems.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000057",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "vallisneria-spiralis-potted",
    name: "Vallisneria Spiralis 'Italian' (Potted)",
    scientific_name: "Vallisneria spiralis",
    short_description: "Graceful vertical ribbon-grass foliage forming natural flowing underwater curtains in pots.",
    full_description: "Vallisneria spiralis is the ultimate background grass plant for natural aquascapes. Pre-established in mineral wool pots, its root crown is protected from damage, allowing rapid propagation via horizontal runners.",
    main_image_url: "/images/potted-plants/vallisneria-spiralis-potted.jpg",
    origin: "Southern Europe & North Africa",
    growth_rate: "Fast",
    plant_height: "30 - 60 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "18 - 28 °C",
    placement: "Background",
    care_instructions: "Plant root pot into substrate. Spreads naturally through runner plantlets across the aquarium floor.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Vallisneria Spiralis | Ceylon Aquatic Plants",
    seo_description: "Hardy potted Vallisneria ribbon plants for aquarium backgrounds.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000058",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "cabomba-aquatica-potted",
    name: "Cabomba Aquatica 'Yellow Cabomba' (Potted)",
    scientific_name: "Cabomba aquatica",
    short_description: "Feathery bright green fan-like whorls crowned with delicate floating peltate leaves in pots.",
    full_description: "Cabomba aquatica produces exquisite fine-divided fan leaves in dense whorls. Potted cultivation ensures established roots, making it far hardier and easier to establish in planted aquariums.",
    main_image_url: "/images/potted-plants/cabomba-aquatica-potted.jpg",
    origin: "South America",
    growth_rate: "Fast",
    plant_height: "20 - 50 cm",
    light_demand: "Medium to High",
    co2_requirement: "Moderate",
    temperature_range: "22 - 28 °C",
    placement: "Background",
    care_instructions: "Prefers clean water with moderate water flow and good illumination.",
    is_featured: false,
    is_published: true,
    seo_title: "Potted Cabomba Aquatica | Ceylon Aquatic Plants",
    seo_description: "Potted Cabomba aquatica with healthy established roots.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000059",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "limnophila-sessiliflora-potted",
    name: "Limnophila Sessiliflora 'Ambulia' (Potted)",
    scientific_name: "Limnophila sessiliflora",
    short_description: "Soft feathery whorls of luminous green foliage established in rockwool pots.",
    full_description: "Asian Ambulia (Limnophila sessiliflora) is praised as an undemanding alternative to Cabomba. Cultivated in mineral wool pots, it offers established roots that quickly anchor into aquarium gravel.",
    main_image_url: "/images/potted-plants/limnophila-sessiliflora-potted.jpg",
    origin: "South & Southeast Asia",
    growth_rate: "Fast",
    plant_height: "20 - 50 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low",
    temperature_range: "20 - 28 °C",
    placement: "Background",
    care_instructions: "Pinch top shoots when reaching the surface to stimulate voluminous side growth.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Limnophila Sessiliflora Ambulia | Ceylon Aquatic Plants",
    seo_description: "Feathery potted Ambulia aquarium plants from Ceylon.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000060",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "cabomba-furcata-potted",
    name: "Cabomba Furcata 'Red Cabomba' (Potted)",
    scientific_name: "Cabomba furcata",
    short_description: "Striking bronze-red to purple feathery fan-whorls established in mineral wool pots.",
    full_description: "Cabomba furcata is renowned for its captivating reddish-purple fan-like leaves. Its established potted root network dramatically increases survival and coloration upon introduction to high-light aquascapes.",
    main_image_url: "/images/potted-plants/cabomba-furcata-potted.jpg",
    origin: "Central & South America",
    growth_rate: "Fast",
    plant_height: "20 - 45 cm",
    light_demand: "High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Background",
    care_instructions: "Requires good lighting and CO2 supplementation to maintain vivid reddish tones.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Red Cabomba Furcata | Ceylon Aquatic Plants",
    seo_description: "Wholesale potted Cabomba furcata with vibrant red foliage.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000061",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "cabomba-caroliniana-potted",
    name: "Cabomba Caroliniana 'Green Cabomba' (Potted)",
    scientific_name: "Cabomba caroliniana",
    short_description: "Dense emerald-green fan whorls on vigorous stems rooted in mineral wool pots.",
    full_description: "Green Cabomba provides voluminous lush background foliage with its symmetrical fan-shaped leaf segments. Shipped in rockwool pots for immediate stability and zero leaf shedding.",
    main_image_url: "/images/potted-plants/cabomba-caroliniana-potted.jpg",
    origin: "Americas",
    growth_rate: "Fast",
    plant_height: "25 - 50 cm",
    light_demand: "Medium to High",
    co2_requirement: "Moderate",
    temperature_range: "18 - 26 °C",
    placement: "Background",
    care_instructions: "Keep water clear and free of suspended debris. Trim tops regularly.",
    is_featured: false,
    is_published: true,
    seo_title: "Potted Green Cabomba Caroliniana | Ceylon Aquatic Plants",
    seo_description: "Healthy potted Green Cabomba caroliniana plants from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000062",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "pogostemon-stellatus-potted",
    name: "Pogostemon Stellatus 'Broad Leaf' (Potted)",
    scientific_name: "Pogostemon stellatus",
    short_description: "Majestic star-like whorls of bronze-green serrated leaves rooted in mineral wool pots.",
    full_description: "Pogostemon stellatus is a captivating Asian stem plant featuring dense whorls of long, narrow toothed leaves. Potted cultivation allows the root system to develop fully, accelerating vibrant leaf development.",
    main_image_url: "/images/potted-plants/pogostemon-stellatus-potted.jpg",
    origin: "Asia & Australia",
    growth_rate: "Medium to Fast",
    plant_height: "20 - 45 cm",
    light_demand: "Medium to High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Give adequate spacing between pots. Responds enthusiastically to micronutrient fertilization.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Pogostemon Stellatus | Ceylon Aquatic Plants",
    seo_description: "Established potted Pogostemon stellatus with decorative star whorls.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000063",
    category_id: "c1000000-0000-0000-0000-000000000002",
    slug: "rotala-wallichii-potted",
    name: "Rotala Wallichii 'Purple' (Potted)",
    scientific_name: "Rotala wallichii",
    short_description: "Dense needle-like magenta and purple whorled foliage established in rockwool pots.",
    full_description: "Rotala wallichii produces radiant magenta to purple needle whorls at its shoot tips. Grown in mineral wool pots, the established root mass provides resilience and rapid growth in soft-water aquascapes.",
    main_image_url: "/images/potted-plants/rotala-wallichii-potted.jpg",
    origin: "Southeast Asia",
    growth_rate: "Medium to Fast",
    plant_height: "15 - 35 cm",
    light_demand: "High",
    co2_requirement: "Recommended",
    temperature_range: "22 - 28 °C",
    placement: "Midground to Background",
    care_instructions: "Prefers soft water, strong lighting, and regular iron fertilization.",
    is_featured: true,
    is_published: true,
    seo_title: "Potted Rotala Wallichii Purple | Ceylon Aquatic Plants",
    seo_description: "Rare potted Rotala wallichii with intense purple foliage from Ceylon.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000071",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "aglaonema-silver-queen-terrarium",
    name: "Aglaonema 'Silver Queen' (Terrarium)",
    scientific_name: "Aglaonema commutatum 'Silver Queen'",
    short_description: "Splashed emerald and silver-cream lanceolate foliage ideal for high-humidity terrariums and paludariums.",
    full_description: "Aglaonema 'Silver Queen' is a classic, hardy moisture-loving botanical prized for its distinctive pewter-silver and deep emerald mottled leaf patterns. Thriving in humid terrariums and vivariums, its broad leaves create natural shelter and microhabitats for tropical fauna.",
    main_image_url: "/images/terrarium-plants/aglaonema-silver-queen-terrarium.jpg",
    origin: "Tropical Asia",
    growth_rate: "Slow to Medium",
    plant_height: "15 - 30 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low (Emersed Terrarium)",
    temperature_range: "20 - 28 °C",
    placement: "Terrarium Midground / Paludarium Bank",
    care_instructions: "Thrives in enclosed terrariums with high ambient humidity (70%+). Keep substrate consistently moist without waterlogging.",
    is_featured: true,
    is_published: true,
    seo_title: "Aglaonema Silver Queen Terrarium Plant | Ceylon Aquatic Plants",
    seo_description: "Wholesale Aglaonema Silver Queen potted terrarium plants. Hardy humidity-loving foliage from Sri Lanka.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000072",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "dracaena-sanderiana-white-stripe-terrarium",
    name: "Dracaena Sanderiana 'White Stripe' (Terrarium)",
    scientific_name: "Dracaena sanderiana 'White Stripe'",
    short_description: "Upright architectural canes with vivid ivory-white and forest green striped foliage for paludariums.",
    full_description: "Commonly known as the White Ribbon Plant, this Dracaena cultivar produces striking vertical canes lined with long, elegant leaves broadly bordered in crisp white. Perfect for paludarium riverbanks and moist terrarium backgrounds.",
    main_image_url: "/images/terrarium-plants/dracaena-sanderiana-white-stripe-terrarium.jpg",
    origin: "Tropical Central Africa",
    growth_rate: "Medium",
    plant_height: "20 - 45 cm",
    light_demand: "Medium",
    co2_requirement: "Low (Emersed)",
    temperature_range: "18 - 28 °C",
    placement: "Terrarium Background / Paludarium Water's Edge",
    care_instructions: "Roots can be submerged in shallow water while leaves remain emersed in humid air. Ideal for paludarium waterfalls and stream banks.",
    is_featured: true,
    is_published: true,
    seo_title: "White Ribbon Plant Dracaena Sanderiana | Ceylon Aquatic Plants",
    seo_description: "White striped Dracaena sanderiana for paludariums and terrariums from Ceylon nurseries.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000073",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "dracaena-sanderiana-gold-terrarium",
    name: "Dracaena Sanderiana 'Gold' (Terrarium)",
    scientific_name: "Dracaena sanderiana 'Gold'",
    short_description: "Vibrant chartreuse and lime-gold striped foliage forming radiant vertical accents in humid enclosures.",
    full_description: "Dracaena Sanderiana 'Gold' features luminous bright golden-yellow margins with a central olive stripe. It introduces warm tropical sunlight tones into enclosed glass terrariums and vivarium canopies.",
    main_image_url: "/images/terrarium-plants/dracaena-sanderiana-gold-terrarium.jpg",
    origin: "Tropical Africa / Asia",
    growth_rate: "Medium",
    plant_height: "20 - 40 cm",
    light_demand: "Medium to Bright Indirect",
    co2_requirement: "Low (Emersed)",
    temperature_range: "20 - 28 °C",
    placement: "Terrarium Midground to Background",
    care_instructions: "Prefers bright, indirect light to maintain radiant golden coloration. Mist foliage periodically in open terrariums.",
    is_featured: false,
    is_published: true,
    seo_title: "Gold Ribbon Dracaena Sanderiana | Ceylon Aquatic Plants",
    seo_description: "Golden variegated Dracaena ribbon plant for terrariums and vivarium enclosures.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000074",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "dracaena-sanderiana-variegated-terrarium",
    name: "Dracaena Sanderiana 'Variegated' (Terrarium)",
    scientific_name: "Dracaena sanderiana 'Variegata'",
    short_description: "Lush multi-stemmed ribbon plant with contrasting cream stripes and arching leaves for terrariums.",
    full_description: "A vigorous multi-shoot Dracaena specimen featuring crisp white-and-green variegated blades that arch gracefully from sturdy canes. Excellent for providing vertical depth in closed terrariums and vivariums.",
    main_image_url: "/images/terrarium-plants/dracaena-sanderiana-variegated-terrarium.jpg",
    origin: "Tropical Africa",
    growth_rate: "Medium",
    plant_height: "20 - 40 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low (Emersed)",
    temperature_range: "18 - 28 °C",
    placement: "Terrarium Background / Vivarium Edge",
    care_instructions: "Thrives in moist soil mixes or hydroponic rockwool pots. Avoid drying out at root level.",
    is_featured: false,
    is_published: true,
    seo_title: "Variegated Ribbon Plant | Ceylon Aquatic Plants",
    seo_description: "Variegated Dracaena ribbon plant for enclosed terrariums and paludarium margins.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000075",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "aglaonema-nitidum-silver-king-terrarium",
    name: "Aglaonema Nitidum 'Silver King' (Terrarium)",
    scientific_name: "Aglaonema nitidum 'Silver King'",
    short_description: "Broad, lustrous pewter-silver and deep green leaves forming bold tropical rosettes in vivariums.",
    full_description: "Aglaonema 'Silver King' is distinguished by its broad, lanceolate foliage dense with silver-grey marbling. Tolerant of low light levels and high humidity, it is one of the most reliable floor-covering rosettes for bioactive vivariums.",
    main_image_url: "/images/terrarium-plants/aglaonema-nitidum-silver-king-terrarium.jpg",
    origin: "Southeast Asia",
    growth_rate: "Slow to Medium",
    plant_height: "20 - 35 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low (Emersed)",
    temperature_range: "20 - 30 °C",
    placement: "Terrarium Midground / Large Vivarium Center",
    care_instructions: "Provide well-drained moist terrarium substrate. Highly durable against microclimate humidity shifts.",
    is_featured: true,
    is_published: true,
    seo_title: "Aglaonema Silver King Terrarium Plant | Ceylon Aquatic Plants",
    seo_description: "Broad-leaf silver Chinese Evergreen for humid terrarium and vivarium habitats.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000076",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "dracaena-marginata-tricolor-terrarium",
    name: "Dracaena Marginata 'Tricolor' (Terrarium)",
    scientific_name: "Dracaena marginata 'Tricolor'",
    short_description: "Narrow ribbon-needle leaves edged in brilliant magenta-pink and cream stripes for paludariums.",
    full_description: "The Madagascar Dragon Tree 'Tricolor' provides unmatched linear texture and vibrant reddish-pink color. Grown in rockwool pots, its established roots adapt effortlessly to humid vivarium conditions and paludarium margins.",
    main_image_url: "/images/terrarium-plants/dracaena-marginata-tricolor-terrarium.jpg",
    origin: "Madagascar",
    growth_rate: "Slow to Medium",
    plant_height: "20 - 45 cm",
    light_demand: "Medium to Bright Indirect",
    co2_requirement: "Low (Emersed)",
    temperature_range: "18 - 28 °C",
    placement: "Terrarium Background / Paludarium Focal",
    care_instructions: "Requires good drainage. Keep foliage misted in terrariums while allowing root zones moderate aeration.",
    is_featured: true,
    is_published: true,
    seo_title: "Dracaena Marginata Tricolor Terrarium | Ceylon Aquatic Plants",
    seo_description: "Red-edge Dracaena Tricolor plants for terrariums and tropical paludariums.",
    created_at: new Date().toISOString(),
  },
  {
    id: "p1000000-0000-0000-0000-000000000077",
    category_id: "c1000000-0000-0000-0000-000000000004",
    slug: "dracaena-sanderiana-compacta-terrarium",
    name: "Dracaena Sanderiana 'Compacta' (Terrarium)",
    scientific_name: "Dracaena sanderiana 'Compacta'",
    short_description: "Dense, tiered rosette arrangement of ivory-bordered arching green foliage in rockwool pots.",
    full_description: "A compact dwarf variant of the Ribbon Plant featuring shortened internodes and dense whorled tiers of crisp white-edged leaves. Exceptional for smaller tabletop terrariums and enclosed bottle gardens.",
    main_image_url: "/images/terrarium-plants/dracaena-sanderiana-compacta-terrarium.jpg",
    origin: "West & Central Africa",
    growth_rate: "Slow to Medium",
    plant_height: "15 - 30 cm",
    light_demand: "Low to Medium",
    co2_requirement: "Low (Emersed)",
    temperature_range: "20 - 28 °C",
    placement: "Terrarium Foreground to Midground",
    care_instructions: "Ideal for compact terrarium enclosures. Keep substrate consistently humid with indirect lighting.",
    is_featured: false,
    is_published: true,
    seo_title: "Compact Ribbon Plant Dracaena | Ceylon Aquatic Plants",
    seo_description: "Compact variegated Dracaena sanderiana for small terrariums and bottle gardens.",
    created_at: new Date().toISOString(),
  },


];

const initialAlbums: GalleryAlbum[] = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    slug: "aquascapes",
    title: "Nature Aquascapes",
    description: "Masterfully planted aquatic layouts and biotope displays featuring our plant collections.",
    display_order: 1,
    is_active: true,
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    slug: "nursery-facilities",
    title: "Nursery & Propagation",
    description: "Our sustainable cultivation greenhouse pools, shade houses, and laboratory facilities in Sri Lanka.",
    display_order: 2,
    is_active: true,
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    slug: "botanical-varieties",
    title: "Botanical Varieties",
    description: "Macro close-ups and specimen profiles of submersed foliage and flowers.",
    display_order: 3,
    is_active: true,
  },
];

const initialGalleryImages: GalleryImage[] = [
  {
    id: "g1000000-0000-0000-0000-000000000001",
    album_id: "a1000000-0000-0000-0000-000000000001",
    title: "High-Tech Iwagumi Layout",
    description: "Lush Monte Carlo carpet framed by selected Seiryu stone and stem accents.",
    image_url: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1200&q=85",
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000002",
    album_id: "a1000000-0000-0000-0000-000000000001",
    title: "Dutch Style Stem Garden",
    description: "Color-zoned arrangement featuring Ludwigia, Rotala, and Alternanthera varieties.",
    image_url: "/images/plants-bunch/ludwigia-palustris-super-red-bunch.jpg",
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000003",
    album_id: "a1000000-0000-0000-0000-000000000002",
    title: "Sunlit Cultivation Basins",
    description: "Protected nursery basins utilizing natural tropical sunlight and pure water source in Sri Lanka.",
    image_url: "/images/garden-pond-plants/water-mimosa-neptunia-oleracea.jpg",
    display_order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000004",
    album_id: "a1000000-0000-0000-0000-000000000002",
    title: "Sterile Tissue Culture In-Vitro Cups",
    description: "Certified laboratory propagation of clean in-vitro cups under HEPA filtration.",
    image_url: "/images/tissue-culture/micranthemum-callitrichoides-cuba.jpg",
    display_order: 4,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000005",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Submersed Foliage Macro",
    description: "Delicate leaf vein architecture of Cryptocoryne wendtii.",
    image_url: "/images/potted-plants/cryptocoryne-wendtii-green-potted.jpg",
    display_order: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000006",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Natural Paludarium Canopy",
    description: "Lush terrarium mosses and micro-ferns grown in humid tropical conditions.",
    image_url: "/images/terrarium-plants/aglaonema-silver-queen-terrarium.jpg",
    display_order: 6,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000007",
    album_id: "a1000000-0000-0000-0000-000000000001",
    title: "Lush Underwater Aquatic Plant Environment",
    description: "Thriving underwater ecosystem with dense green vegetation and crystal clear water.",
    image_url: "/images/underwater-flora-natural.jpg",
    display_order: 7,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000008",
    album_id: "a1000000-0000-0000-0000-000000000001",
    title: "Greenhouse Aquascape with Aquatic Moss & Foliage",
    description: "Curved natural aquascape with vibrant green moss and healthy aquatic stems.",
    image_url: "/images/underwater-aquascape-lush.jpg",
    display_order: 8,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000009",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Rotala Rotundifolia Stem Flora",
    description: "Vibrant orange and crimson red stem leaves cultivated for Dutch and nature aquascapes.",
    image_url: "/images/plants-bunch/rotala-rotundifolia-red-bunch.jpg",
    display_order: 9,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000010",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Ludwigia Repens Rubin Specimen",
    description: "Intense deep ruby-red submersed aquatic foliage with balanced node spacing.",
    image_url: "/images/plants-bunch/ludwigia-repens-rubin-bunch.jpg",
    display_order: 10,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000011",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Anubias Barteri var. Nana Specimen",
    description: "Hardy dark green leathery leaves and established rhizome system.",
    image_url: "/images/potted-plants/anubias-barteri-var-nana-potted.jpg",
    display_order: 11,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000012",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Amazon Sword Plant Broad Foliage",
    description: "Majestic centerpiece plant with healthy green lanceolate underwater leaves.",
    image_url: "/images/potted-plants/echinodorus-bleheri-amazon-sword-potted.jpg",
    display_order: 12,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000013",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Cabomba Furcata Delicate Whorls",
    description: "Exquisite fan-shaped reddish-purple leaves in crystal clear tropical water.",
    image_url: "/images/potted-plants/cabomba-furcata-potted.jpg",
    display_order: 13,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000014",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Vallisneria Spiralis Ribbon Foliage",
    description: "Graceful background aquatic ribbons swaying naturally under gentle water currents.",
    image_url: "/images/potted-plants/vallisneria-spiralis-potted.jpg",
    display_order: 14,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000015",
    album_id: "a1000000-0000-0000-0000-000000000002",
    title: "Mosaic Flower Floating Rosette",
    description: "Ludwigia sedioides geometric floating rosette growing in tropical nursery basins.",
    image_url: "/images/garden-pond-plants/mosaic-flower-ludwigia-sedioides.jpg",
    display_order: 15,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000016",
    album_id: "a1000000-0000-0000-0000-000000000002",
    title: "Hornwort Submersed Oxygenating Flora",
    description: "Ceratophyllum demersum lush green needle-like whorls providing biosecure nursery shelter.",
    image_url: "/images/garden-pond-plants/hornwort-ceratophyllum-demersum.jpg",
    display_order: 16,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000017",
    album_id: "a1000000-0000-0000-0000-000000000002",
    title: "Asian Hooded Floating Fern",
    description: "Salvinia cucullata natural floating canopy capturing tropical solar energy.",
    image_url: "/images/garden-pond-plants/asian-hooded-fern-salvinia-cucullata.jpg",
    display_order: 17,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000018",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Alternanthera Reineckii 'Mini' Rosette",
    description: "Compact ruby-purple foliage displaying intense natural coloration.",
    image_url: "/images/tissue-culture/alternanthera-reineckii-mini.jpg",
    display_order: 18,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000019",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Micranthemum 'Monte Carlo' Dense Foreground",
    description: "Vibrant round miniature leaves forming a lush biological carpet.",
    image_url: "/images/tissue-culture/micranthemum-monte-carlo.jpg",
    display_order: 19,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "g1000000-0000-0000-0000-000000000020",
    album_id: "a1000000-0000-0000-0000-000000000003",
    title: "Hydrocotyle Tripartita Clover Canopy",
    description: "Bright lime-green miniature clover foliage creeping over aquascape stones.",
    image_url: "/images/tissue-culture/hydrocotyle-tripartita-japan.jpg",
    display_order: 20,
    is_published: true,
    created_at: new Date().toISOString(),
  },
];

const initialVideos: Video[] = [
  {
    id: "v1000000-0000-0000-0000-000000000001",
    title: "Ceylon Aquatic Plants — Nursery & Cultivation Tour",
    description: "A journey through our tropical cultivation nursery in Sri Lanka, demonstrating sustainable hydroponic growing practices, water filtration, and plant health.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
    is_published: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "v1000000-0000-0000-0000-000000000002",
    title: "Art of Aquascaping: Designing with Bunched & Potted Plants",
    description: "Master tips on plant grouping, trimming techniques, and hardscape positioning for long-term aquarium vitality.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: "/images/plants-bunch/plants-bunch-category.jpg",
    is_featured: false,
    is_published: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "v1000000-0000-0000-0000-000000000003",
    title: "Tissue Culture In-Vitro: Lab-to-Aquarium Acclimatization",
    description: "Step-by-step demonstration of unpacking, rinsing, and planting sterile in-vitro cups into high-grade aquascaping substrates.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: "/images/tissue-culture/tissue-culture-category.jpg",
    is_featured: false,
    is_published: true,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
];

const initialDocuments: DocumentItem[] = [
  {
    id: "d1000000-0000-0000-0000-000000000001",
    title: "Ceylon Aquatic Plants — Official Product Catalogue 2026",
    description: "Complete botanical inventory overview, category classifications, and export specifications for international partners.",
    file_url: "/documents/ceylon-aquatic-plants-catalog-2026.pdf",
    file_size: "4.8 MB",
    file_type: "pdf",
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "d1000000-0000-0000-0000-000000000002",
    title: "Aquatic Plant Care & Acclimatization Guidelines",
    description: "Comprehensive handling, water parameter matching, and planting guidelines for bunched and potted aquatic species.",
    file_url: "/documents/aquatic-plant-care-guide.pdf",
    file_size: "1.2 MB",
    file_type: "pdf",
    is_published: true,
    created_at: new Date().toISOString(),
  },
];

const initialSettings: WebsiteSettings = {
  company_name: "Ceylon Aquatic Plants (Pvt) Ltd",
  tagline: "Pure Tropical Aquatic Plants from the Heart of Ceylon",
  phone: "077 704 2100",
  whatsapp: "+94 77 704 2100",
  email: "Ceylonaquaplants@yahoo.com",
  address: "No: 36/24, Sampath Pedesa, Lionel Jayasinghe Mawatha, Godagama, Homagama, Colombo",
  map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58586029806!2d79.79979929288124!3d6.921837368686618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000",
  facebook_url: "https://facebook.com/ceylonaquaticplants",
  instagram_url: "https://instagram.com/ceylonaquaticplants",
  youtube_url: "https://youtube.com/@ceylonaquaticplants",
  linkedin_url: "https://linkedin.com/company/ceylonaquaticplants",
  hero_title: "Pure Tropical Aquatic Plants from the Heart of Ceylon",
  hero_subtitle: "Sustainably cultivated live aquarium plants, tissue-culture in-vitro varieties, and hardy pond flora curated for passionate aquascapers and international partners.",
  about_summary: "Ceylon Aquatic Plants (Pvt) Ltd is a dedicated grower and showcase provider of premium tropical aquatic plants based in Sri Lanka. Leveraging year-round tropical sunshine, crystal-clear water sources, and biological cultivation methods, we bring the vibrancy of natural aquatic ecosystems to hobbyists and professional aquascapers worldwide.",
  vision: "To be the globally recognized benchmark for sustainable tropical aquatic plant cultivation, biosecurity, and botanical excellence.",
  mission: "To cultivate, preserve, and showcase premium-grade aquatic and terrarium flora through sustainable horticultural practices, biosecure propagation, and authentic customer partnership.",
  core_values: [
    { title: "Botanical Vitality", description: "Every plant is cultivated under optimal conditions to ensure maximum vigor, clean root systems, and radiant coloration." },
    { title: "Sustainable Stewardship", description: "Eco-friendly greenhouse management, water recirculation, and responsible propagation respecting natural aquatic ecosystems." },
    { title: "Biosecure Purity", description: "Rigorous quality inspections and sterile tissue-culture standards guaranteeing clean specimens free from pests and harmful contaminants." },
    { title: "Passionate Expertise", description: "Deep horticultural knowledge and dedication to supporting aquascapers, pond enthusiasts, and botanical institutions worldwide." }
  ]
};

// Global in-memory cache
let categoriesStore = [...initialCategories];
let plantsStore = [...initialPlants];
let albumsStore = [...initialAlbums];
let galleryStore = [...initialGalleryImages];
let videosStore = [...initialVideos];
let documentsStore = [...initialDocuments];
let settingsStore = { ...initialSettings };
let inquiriesStore: ContactInquiry[] = [];

// =========================================================================
// DATA ACCESS & MUTATION FUNCTIONS
// =========================================================================

export async function getCategories(options?: { activeOnly?: boolean }): Promise<PlantCategory[]> {
  const activeOnly = options?.activeOnly ?? true;

  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("plant_categories").select("*").order("display_order", { ascending: true });
    if (activeOnly) {
      query = query.eq("is_active", true);
    }
    const { data, error } = await query;
    if (!error && data) {
      return data;
    }
  }

  // Fallback
  return categoriesStore
    .filter(c => !activeOnly || c.is_active)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getCategoryBySlug(slug: string): Promise<PlantCategory | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("plant_categories")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data;
  }

  return categoriesStore.find(c => c.slug === slug) || null;
}

export async function saveCategory(category: Partial<PlantCategory>): Promise<PlantCategory> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    if (category.id) {
      const { data } = await supabase
        .from("plant_categories")
        .update({ ...category, updated_at: now })
        .eq("id", category.id)
        .select()
        .single();
      if (data) return data;
    } else {
      const { data } = await supabase
        .from("plant_categories")
        .insert([{ ...category, created_at: now, updated_at: now }])
        .select()
        .single();
      if (data) return data;
    }
  }

  // Fallback
  if (category.id) {
    const idx = categoriesStore.findIndex(c => c.id === category.id);
    if (idx !== -1) {
      categoriesStore[idx] = { ...categoriesStore[idx], ...category, updated_at: now };
      return categoriesStore[idx];
    }
  }
  const newCat: PlantCategory = {
    id: category.id || `c-${Date.now()}`,
    slug: category.slug || "new-category",
    name: category.name || "Untitled Category",
    short_description: category.short_description || "",
    full_description: category.full_description || "",
    image_url: category.image_url || "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1000&q=80",
    display_order: category.display_order || categoriesStore.length + 1,
    is_active: category.is_active ?? true,
    seo_title: category.seo_title,
    seo_description: category.seo_description,
    created_at: now,
    updated_at: now,
  };
  categoriesStore.push(newCat);
  return newCat;
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  // Check if any plants belong to this category
  const plantsInCategory = plantsStore.filter(p => p.category_id === id);
  if (plantsInCategory.length > 0) {
    return {
      success: false,
      error: `Cannot delete category: ${plantsInCategory.length} plant(s) are assigned to it. Please reassign or delete these plants first.`,
    };
  }

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("plant_categories").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
  }

  categoriesStore = categoriesStore.filter(c => c.id !== id);
  return { success: true };
}

export async function getPlants(options?: {
  category_slug?: string;
  featuredOnly?: boolean;
  publishedOnly?: boolean;
}): Promise<Plant[]> {
  const publishedOnly = options?.publishedOnly ?? true;

  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("plants").select("*, category:plant_categories(*)");
    if (publishedOnly) query = query.eq("is_published", true);
    if (options?.featuredOnly) query = query.eq("is_featured", true);
    if (options?.category_slug) {
      const cat = await getCategoryBySlug(options.category_slug);
      if (cat) query = query.eq("category_id", cat.id);
    }
    const { data, error } = await query.order("created_at", { ascending: false });
    if (!error && data) return data;
  }

  let list = [...plantsStore];
  if (publishedOnly) list = list.filter(p => p.is_published);
  if (options?.featuredOnly) list = list.filter(p => p.is_featured);
  if (options?.category_slug) {
    const cat = categoriesStore.find(c => c.slug === options.category_slug);
    if (cat) list = list.filter(p => p.category_id === cat.id);
  }
  return list.map(p => ({
    ...p,
    category: categoriesStore.find(c => c.id === p.category_id),
  }));
}

export async function getPlantBySlug(slug: string): Promise<Plant | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("plants")
      .select("*, category:plant_categories(*), images:plant_images(*)")
      .eq("slug", slug)
      .single();
    if (!error && data) return data;
  }

  const p = plantsStore.find(x => x.slug === slug);
  if (!p) return null;
  return {
    ...p,
    category: categoriesStore.find(c => c.id === p.category_id),
    images: [],
  };
}

export async function savePlant(plant: Partial<Plant>): Promise<Plant> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    if (plant.id) {
      const { data } = await supabase
        .from("plants")
        .update({ ...plant, updated_at: now })
        .eq("id", plant.id)
        .select()
        .single();
      if (data) return data;
    } else {
      const { data } = await supabase
        .from("plants")
        .insert([{ ...plant, created_at: now, updated_at: now }])
        .select()
        .single();
      if (data) return data;
    }
  }

  if (plant.id) {
    const idx = plantsStore.findIndex(p => p.id === plant.id);
    if (idx !== -1) {
      plantsStore[idx] = { ...plantsStore[idx], ...plant, updated_at: now };
      return plantsStore[idx];
    }
  }

  const newPlant: Plant = {
    id: plant.id || `p-${Date.now()}`,
    category_id: plant.category_id || categoriesStore[0]?.id || "",
    slug: plant.slug || "new-plant",
    name: plant.name || "Untitled Plant",
    scientific_name: plant.scientific_name,
    short_description: plant.short_description || "",
    full_description: plant.full_description || "",
    main_image_url: plant.main_image_url || "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1000&q=80",
    origin: plant.origin || "Tropical",
    growth_rate: plant.growth_rate || "Medium",
    plant_height: plant.plant_height || "15 - 30 cm",
    light_demand: plant.light_demand || "Medium",
    co2_requirement: plant.co2_requirement || "Optional",
    temperature_range: plant.temperature_range || "22 - 28 °C",
    placement: plant.placement || "Midground",
    care_instructions: plant.care_instructions || "",
    is_featured: plant.is_featured ?? false,
    is_published: plant.is_published ?? true,
    seo_title: plant.seo_title,
    seo_description: plant.seo_description,
    created_at: now,
    updated_at: now,
  };
  plantsStore.unshift(newPlant);
  return newPlant;
}

export async function deletePlant(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("plants").delete().eq("id", id);
    if (!error) return true;
  }
  plantsStore = plantsStore.filter(p => p.id !== id);
  return true;
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("gallery_albums").select("*").eq("is_active", true).order("display_order");
    if (data) return data;
  }
  return albumsStore.filter(a => a.is_active);
}

export async function getGalleryImages(options?: { album_id?: string; publishedOnly?: boolean }): Promise<GalleryImage[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("gallery_images").select("*, album:gallery_albums(*)");
    if (publishedOnly) query = query.eq("is_published", true);
    if (options?.album_id) query = query.eq("album_id", options.album_id);
    const { data } = await query.order("display_order", { ascending: true });
    if (data) return data;
  }

  let list = [...galleryStore];
  if (publishedOnly) list = list.filter(g => g.is_published);
  if (options?.album_id) list = list.filter(g => g.album_id === options.album_id);
  return list.map(g => ({
    ...g,
    album: albumsStore.find(a => a.id === g.album_id),
  }));
}

export async function saveGalleryImage(img: Partial<GalleryImage>): Promise<GalleryImage> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    if (img.id) {
      const { data } = await supabase.from("gallery_images").update(img).eq("id", img.id).select().single();
      if (data) return data;
    } else {
      const { data } = await supabase.from("gallery_images").insert([img]).select().single();
      if (data) return data;
    }
  }

  if (img.id) {
    const idx = galleryStore.findIndex(g => g.id === img.id);
    if (idx !== -1) {
      galleryStore[idx] = { ...galleryStore[idx], ...img };
      return galleryStore[idx];
    }
  }
  const newImg: GalleryImage = {
    id: img.id || `g-${Date.now()}`,
    album_id: img.album_id || albumsStore[0]?.id,
    title: img.title || "Gallery Photograph",
    description: img.description || "",
    image_url: img.image_url || "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1200&q=85",
    display_order: img.display_order || galleryStore.length + 1,
    is_published: img.is_published ?? true,
    created_at: now,
  };
  galleryStore.push(newImg);
  return newImg;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("gallery_images").delete().eq("id", id);
  }
  galleryStore = galleryStore.filter(g => g.id !== id);
  return true;
}

export async function getVideos(options?: { publishedOnly?: boolean }): Promise<Video[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("videos").select("*");
    if (publishedOnly) query = query.eq("is_published", true);
    const { data } = await query.order("display_order", { ascending: true });
    if (data) return data;
  }

  let list = [...videosStore];
  if (publishedOnly) list = list.filter(v => v.is_published);
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function saveVideo(video: Partial<Video>): Promise<Video> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    if (video.id) {
      const { data } = await supabase.from("videos").update(video).eq("id", video.id).select().single();
      if (data) return data;
    } else {
      const { data } = await supabase.from("videos").insert([video]).select().single();
      if (data) return data;
    }
  }

  if (video.id) {
    const idx = videosStore.findIndex(v => v.id === video.id);
    if (idx !== -1) {
      videosStore[idx] = { ...videosStore[idx], ...video };
      return videosStore[idx];
    }
  }
  const newVid: Video = {
    id: video.id || `v-${Date.now()}`,
    title: video.title || "Showcase Video",
    description: video.description || "",
    video_url: video.video_url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: video.thumbnail_url || "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80",
    is_featured: video.is_featured ?? false,
    is_published: video.is_published ?? true,
    display_order: video.display_order || videosStore.length + 1,
    created_at: now,
  };
  videosStore.push(newVid);
  return newVid;
}

export async function deleteVideo(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("videos").delete().eq("id", id);
  }
  videosStore = videosStore.filter(v => v.id !== id);
  return true;
}

export async function getDocuments(options?: { publishedOnly?: boolean }): Promise<DocumentItem[]> {
  const publishedOnly = options?.publishedOnly ?? true;
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("documents").select("*");
    if (publishedOnly) query = query.eq("is_published", true);
    const { data } = await query.order("created_at", { ascending: false });
    if (data) return data;
  }

  let list = [...documentsStore];
  if (publishedOnly) list = list.filter(d => d.is_published);
  return list;
}

export async function saveDocument(doc: Partial<DocumentItem>): Promise<DocumentItem> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    if (doc.id) {
      const { data } = await supabase.from("documents").update(doc).eq("id", doc.id).select().single();
      if (data) return data;
    } else {
      const { data } = await supabase.from("documents").insert([doc]).select().single();
      if (data) return data;
    }
  }

  if (doc.id) {
    const idx = documentsStore.findIndex(d => d.id === doc.id);
    if (idx !== -1) {
      documentsStore[idx] = { ...documentsStore[idx], ...doc };
      return documentsStore[idx];
    }
  }
  const newDoc: DocumentItem = {
    id: doc.id || `doc-${Date.now()}`,
    title: doc.title || "PDF Information Sheet",
    description: doc.description || "",
    file_url: doc.file_url || "/documents/sample.pdf",
    file_size: doc.file_size || "1.5 MB",
    file_type: doc.file_type || "pdf",
    is_published: doc.is_published ?? true,
    created_at: now,
  };
  documentsStore.push(newDoc);
  return newDoc;
}

export async function deleteDocument(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("documents").delete().eq("id", id);
  }
  documentsStore = documentsStore.filter(d => d.id !== id);
  return true;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  let result = settingsStore;
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("website_settings").select("value").eq("key", "site_config").single();
    if (data?.value) result = data.value as WebsiteSettings;
  }
  // Ensure tagline and hero_title are clean, properly spaced, and without '#'
  if (result.hero_title) {
    result.hero_title = result.hero_title.replace(/#/g, "").trim();
    if (result.hero_title.toLowerCase().replace(/[^a-z]/g, "") === "puretropicalaquaticplantsfromtheheartofceylon") {
      result.hero_title = "Pure Tropical Aquatic Plants from the Heart of Ceylon";
    }
  }
  if (result.tagline) {
    result.tagline = result.tagline.replace(/#/g, "").trim();
    if (result.tagline.toLowerCase().replace(/[^a-z]/g, "") === "puretropicalaquaticplantsfromtheheartofceylon") {
      result.tagline = "Pure Tropical Aquatic Plants from the Heart of Ceylon";
    }
  }
  return result;
}

export async function saveWebsiteSettings(settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  settingsStore = { ...settingsStore, ...settings };
  if (isSupabaseConfigured && supabase) {
    await supabase.from("website_settings").upsert({
      key: "site_config",
      value: settingsStore,
      updated_at: new Date().toISOString(),
    });
  }
  return settingsStore;
}

export async function getContactInquiries(): Promise<ContactInquiry[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false });
    if (data) return data;
  }
  return inquiriesStore;
}

export async function createContactInquiry(
  inquiry: Omit<ContactInquiry, "id" | "created_at" | "is_read">
): Promise<ContactInquiry> {
  const newInq: ContactInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    is_read: false,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("contact_inquiries").insert([newInq]).select().single();
    if (data) return data;
  }

  inquiriesStore.unshift(newInq);
  return newInq;
}

export async function markInquiryRead(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("contact_inquiries").update({ is_read: true }).eq("id", id);
  }
  const inq = inquiriesStore.find(i => i.id === id);
  if (inq) inq.is_read = true;
  return true;
}

export async function getDashboardStats() {
  const totalPlants = plantsStore.length;
  const publishedPlants = plantsStore.filter(p => p.is_published).length;
  const draftPlants = totalPlants - publishedPlants;
  const totalCategories = categoriesStore.length;
  const totalGallery = galleryStore.length;
  const totalVideos = videosStore.filter(v => v.is_published).length;
  const totalInquiries = inquiriesStore.length;
  const unreadInquiries = inquiriesStore.filter(i => !i.is_read).length;

  return {
    totalPlants,
    publishedPlants,
    draftPlants,
    totalCategories,
    totalGallery,
    totalVideos,
    totalInquiries,
    unreadInquiries,
  };
}
