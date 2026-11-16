-- =========================================================================
-- CEYLON AQUATIC PLANTS (PVT) LTD - SEED DATA
-- Default Categories, Showcase Plants, Albums, Videos, and Site Settings
-- =========================================================================

-- 1. INSERT THE 6 OFFICIAL PLANT CATEGORIES
INSERT INTO public.plant_categories (id, slug, name, short_description, full_description, image_url, display_order, is_active, seo_title, seo_description)
VALUES
(
    'c1000000-0000-0000-0000-000000000001',
    'plants-bunch',
    'Plants Bunch',
    'Freshly harvested healthy bunches of stem and rooted aquatic flora, carefully bundled for vibrant aquarium backgrounds and midgrounds.',
    'Our bunched plants are cultivated under optimal tropical sunshine and water quality in Ceylon. Each bunch is carefully selected, trimmed, and banded to ensure rapid root establishment and lush submersed foliage in aquatic ecosystems.',
    'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1000&q=80',
    1,
    true,
    'Bunched Aquarium Plants | Ceylon Aquatic Plants (Pvt) Ltd',
    'Explore premium bunched aquatic plants organically cultivated in Sri Lanka. Ideal for aquascaping and natural aquarium filtration.'
),
(
    'c1000000-0000-0000-0000-000000000002',
    'potted-plants',
    'Potted Plants',
    'Established aquatic plants in mineral wool pots, featuring developed root structures ready for direct aquarium placement.',
    'Our potted plant collection includes robust specimens of Anubias, Echinodorus, and Cryptocoryne established in nutrient-inert rockwool mesh pots, ensuring zero transplant shock and immediate growth upon delivery.',
    'https://images.unsplash.com/photo-1544943910-4c1dc44a03ab?auto=format&fit=crop&w=1000&q=80',
    2,
    true,
    'Potted Aquarium Plants | Ceylon Aquatic Plants (Pvt) Ltd',
    'Hardy potted aquatic plants with fully developed root networks. Grown under controlled nursery conditions in Sri Lanka.'
),
(
    'c1000000-0000-0000-0000-000000000003',
    'garden-pond-plants',
    'Garden-Pond Plants',
    'Hardy marginal, floating, and deep-water botanical specimens suitable for natural garden ponds, water features, and bio-filters.',
    'Ceylon Aquatic Plants provides indigenous and tropical pond flora designed to create healthy pond ecosystems, clarity, natural shade for pond fish, and breathtaking surface blooms.',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
    3,
    true,
    'Garden & Pond Aquatic Plants | Ceylon Aquatic Plants (Pvt) Ltd',
    'Tropical pond plants and hardy water lilies cultivated for outdoor garden ponds, koi ponds, and natural water features.'
),
(
    'c1000000-0000-0000-0000-000000000004',
    'terrarium-plants',
    'Terrarium Plants',
    'Moisture-loving epiphytes, mosses, and high-humidity foliage tailored for vivariums, paludariums, and closed terrarium habitats.',
    'Specially conditioned plants that thrive in high humidity microclimates, featuring delicate foliage textures, vibrant emersed colors, and compact growth habits.',
    'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1000&q=80',
    4,
    true,
    'Terrarium & Paludarium Plants | Ceylon Aquatic Plants (Pvt) Ltd',
    'Lush tropical moisture-loving plants curated for terrariums, vivariums, and bioactive reptile enclosures.'
),
(
    'c1000000-0000-0000-0000-000000000005',
    'tissue-culture',
    'Tissue Culture',
    '100% sterile laboratory-propagated in-vitro cups guaranteed free from algae, snails, parasites, and chemical pesticides.',
    'Propagated in state-of-the-art sterile tissue culture laboratories. Each sealed cup contains clean plantlets suspended in nutrient-rich agar gel, guaranteeing the purest start for competitive aquascaping and biosecure aquaria.',
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80',
    5,
    true,
    'Tissue Culture In-Vitro Aquarium Plants | Ceylon Aquatic Plants',
    'Sterile 1-2-Grow in-vitro tissue cultured aquarium plants. Free from snails, spores, and algae. Produced in Sri Lanka.'
),
(
    'c1000000-0000-0000-0000-000000000006',
    'other-products',
    'Other Products',
    'Natural driftwood, botanicals, aquatic moss pads, stone mounts, and specialized aquascaping foundation accessories.',
    'Complementary natural aquascaping materials, natural seed pads, pre-mounted driftwood pieces, and specialized natural aquarium accessories.',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    6,
    true,
    'Aquascaping Botanicals & Accessories | Ceylon Aquatic Plants',
    'Natural driftwood, moss pads, and botanical decor for planted aquariums and biotope scapes.'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image_url = EXCLUDED.image_url;

-- 2. INSERT FEATURED & SHOWCASE PLANTS
INSERT INTO public.plants (
    id, category_id, slug, name, scientific_name, short_description, full_description,
    main_image_url, origin, growth_rate, plant_height, light_demand, co2_requirement,
    temperature_range, placement, care_instructions, is_featured, is_published, seo_title, seo_description
)
VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'rotala-rotundifolia',
    'Rotala Rotundifolia',
    'Rotala rotundifolia',
    'Classic red-to-pink stem plant offering dense, bushy growth and stunning coloration under adequate illumination.',
    'Rotala rotundifolia is one of the most popular and versatile stem plants in modern aquascaping. When submerged under moderate to high lighting, its elongated leaves develop an exquisite amber-pink to deep ruby tint. It branches readily after trimming, creating lush background thickets.',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
    'Southeast Asia',
    'Fast',
    '20 - 45 cm',
    'Medium to High',
    'Recommended',
    '20 - 28 °C',
    'Background',
    'Trim stem tops regularly to promote bushy side-shoots. Provide balanced liquid micro and macronutrients with iron supplementation to enhance red pigmentation.',
    true,
    true,
    'Rotala Rotundifolia Bunch | Ceylon Aquatic Plants',
    'Wholesale Rotala rotundifolia bunches. Vibrant red and pink aquatic stem plant cultivated in Sri Lanka.'
),
(
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'ludwigia-palustris-super-red',
    'Ludwigia Palustris Super Red',
    'Ludwigia palustris',
    'Vivid, deeply saturated crimson foliage that maintains brilliant red coloration even in modest lighting conditions.',
    'Unlike many demanding red stem plants, Ludwigia Palustris Super Red produces deep ruby leaves with ease. Its paired ovate leaves create an eye-catching focal contrast against deep green aquatic greenery in midground and background groupings.',
    'https://images.unsplash.com/photo-1544943910-4c1dc44a03ab?auto=format&fit=crop&w=1000&q=80',
    'North & Central America',
    'Medium',
    '15 - 30 cm',
    'Medium',
    'Optional but beneficial',
    '18 - 28 °C',
    'Midground to Background',
    'Propagate by taking cutting tops and replanting directly into substrate. Responds enthusiastically to micronutrient fertilization.',
    true,
    true,
    'Ludwigia Palustris Super Red | Ceylon Aquatic Plants',
    'Lush red stem plants for planted aquascapes. Cultivated by Ceylon Aquatic Plants (Pvt) Ltd.'
),
(
    'p1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000002',
    'anubias-barteri-var-nana',
    'Anubias Barteri var. Nana',
    'Anubias barteri var. nana',
    'Extremely hardy epiphyte featuring tough dark emerald leaves. Unmatched resilience and herbivore resistance.',
    'Anubias barteri var. nana is an undemanding, slow-growing rhizome plant. Its thick, leathery dark green leaves thrive attached to porous rockwork, driftwood roots, or substrate mesh. Highly resistant to herbivorous cichlids and low-tech aquarium conditions.',
    'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1000&q=80',
    'West Africa',
    'Slow',
    '5 - 12 cm',
    'Low to Medium',
    'Low',
    '20 - 28 °C',
    'Foreground / Epiphyte Mount',
    'Do not bury the horizontal rhizome beneath the gravel; attach it to hardscape using plant glue or line until roots adhere naturally.',
    true,
    true,
    'Potted Anubias Barteri var Nana | Ceylon Aquatic Plants',
    'Durable potted Anubias nana aquarium plants. Healthy rhizomes established in rockwool pots.'
),
(
    'p1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000002',
    'echinodorus-bleheri-amazon-sword',
    'Amazon Sword (Echinodorus Bleheri)',
    'Echinodorus grisebachii / bleheri',
    'Magnificent solitary specimen plant with broad sword-shaped leaves, ideal as a majestic aquarium centerpiece.',
    'The Amazon Sword is celebrated worldwide for its grand presence and dramatic broad leaf rosettes. Capable of growing into an impressive focal specimen in medium to large aquariums, it also acts as a powerful natural biological nitrate sink.',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    'South America',
    'Medium to Fast',
    '25 - 50 cm',
    'Medium',
    'Low to Moderate',
    '22 - 28 °C',
    'Background / Centerpiece',
    'Heavy root feeder. Benefit greatly from nutrient-rich substrate or root fertilizer tabs inserted near the base of the plant.',
    true,
    true,
    'Amazon Sword Plant Potted | Ceylon Aquatic Plants',
    'Potted Echinodorus bleheri Amazon Sword plants. Tropical aquarium centerpieces from Sri Lanka.'
),
(
    'p1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000003',
    'nymphaea-zenkeri-red-tiger-lotus',
    'Red Tiger Lotus (Nymphaea Zenkeri)',
    'Nymphaea zenkeri',
    'Spectacular tropical water lily featuring variegated wine-red leaves with dark purple marbling.',
    'Red Tiger Lotus is a standout aquatic bulb plant that forms a stunning submerged bush of patterned arrow-shaped leaves before sending graceful lily pads to the surface. Produces fragrant nocturnal blossoms under good sunlight.',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80',
    'West Africa',
    'Fast',
    '20 - 45 cm',
    'Medium to High',
    'Moderate',
    '22 - 30 °C',
    'Midground to Background',
    'Trim surface runner leaves if you wish to maintain a compact, bushy submerged shape. Plant the bulb halfway into the substrate.',
    true,
    true,
    'Red Tiger Lotus Pond Plant | Ceylon Aquatic Plants',
    'Exquisite Red Tiger Lotus for decorative ponds and show aquariums. Exported by Ceylon Aquatic Plants.'
),
(
    'p1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000005',
    'eleocharis-parvula-hairgrass',
    'Dwarf Hairgrass (In-Vitro Cup)',
    'Eleocharis parvula',
    'Fine needle-like bright green carpeting grass. Creates lush, rolling underwater lawns.',
    'Propagated in our sterile tissue culture laboratories, Dwarf Hairgrass forms a dense, natural green carpet across the aquarium floor. In-vitro cups provide dozens of clean plantlets that spread rapidly via subterranean runners.',
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80',
    'Cosmopolitan',
    'Medium',
    '3 - 7 cm',
    'Medium to High',
    'Recommended',
    '18 - 26 °C',
    'Foreground Carpet',
    'Rinse agar gel gently with clean water. Divide cup into small portions (10-15 clumps) and plant evenly into fine substrate with aquascaping tweezers.',
    true,
    true,
    'Tissue Culture Dwarf Hairgrass | Ceylon Aquatic Plants',
    'Sterile in-vitro Dwarf Hairgrass cups. Snail-free, pesticide-free aquarium carpeting plants.'
)
ON CONFLICT (slug) DO NOTHING;

-- 3. INSERT GALLERY ALBUMS
INSERT INTO public.gallery_albums (id, slug, title, description, display_order, is_active)
VALUES
('a1000000-0000-0000-0000-000000000001', 'aquascapes', 'Nature Aquascapes', 'Masterfully planted aquatic layouts and biotope displays featuring our plant collections.', 1, true),
('a1000000-0000-0000-0000-000000000002', 'nursery-facilities', 'Nursery & Propagation', 'Our sustainable cultivation greenhouse pools, shade houses, and laboratory facilities in Sri Lanka.', 2, true),
('a1000000-0000-0000-0000-000000000003', 'botanical-varieties', 'Botanical Varieties', 'Macro close-ups and specimen profiles of submersed foliage and flowers.', 3, true)
ON CONFLICT (slug) DO NOTHING;

-- 4. INSERT GALLERY IMAGES
INSERT INTO public.gallery_images (album_id, title, description, image_url, display_order, is_published)
VALUES
('a1000000-0000-0000-0000-000000000001', 'High-Tech Iwagumi Layout', 'Lush Monte Carlo carpet framed by selected Seiryu stone and stem accents.', 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1200&q=85', 1, true),
('a1000000-0000-0000-0000-000000000001', 'Dutch Style Stem Garden', 'Color-zoned arrangement featuring Ludwigia, Rotala, and Alternanthera varieties.', 'https://images.unsplash.com/photo-1544943910-4c1dc44a03ab?auto=format&fit=crop&w=1200&q=85', 2, true),
('a1000000-0000-0000-0000-000000000002', 'Sunlit Cultivation Basins', 'Protected nursery basins utilizing natural tropical sunlight and pure water source in Sri Lanka.', 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85', 3, true),
('a1000000-0000-0000-0000-000000000002', 'Sterile Tissue Culture Chamber', 'Certified laboratory propagation of clean in-vitro cups under HEPA filtration.', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=85', 4, true),
('a1000000-0000-0000-0000-000000000003', 'Submersed Foliage Macro', 'Delicate leaf vein architecture of Cryptocoryne wendtii.', 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=85', 5, true),
('a1000000-0000-0000-0000-000000000003', 'Natural Paludarium Canopy', 'Lush terrarium mosses and micro-ferns grown in humid tropical conditions.', 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85', 6, true);

-- 5. INSERT VIDEOS
INSERT INTO public.videos (title, description, video_url, thumbnail_url, is_featured, is_published, display_order)
VALUES
(
    'Ceylon Aquatic Plants — Nursery & Cultivation Tour',
    'A journey through our tropical cultivation nursery in Sri Lanka, demonstrating sustainable hydroponic growing practices, water filtration, and plant health.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80',
    true,
    true,
    1
),
(
    'Art of Aquascaping: Designing with Bunched & Potted Plants',
    'Master tips on plant grouping, trimming techniques, and hardscape positioning for long-term aquarium vitality.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1544943910-4c1dc44a03ab?auto=format&fit=crop&w=800&q=80',
    false,
    true,
    2
),
(
    'Tissue Culture In-Vitro: Lab-to-Aquarium Acclimatization',
    'Step-by-step demonstration of unpacking, rinsing, and planting sterile in-vitro cups into high-grade aquascaping substrates.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    false,
    true,
    3
);

-- 6. INSERT DEFAULT DOCUMENTS
INSERT INTO public.documents (title, description, file_url, file_size, file_type, is_published)
VALUES
(
    'Ceylon Aquatic Plants — Official Product Catalogue 2026',
    'Complete botanical inventory overview, category classifications, and export specifications for international partners.',
    '/documents/ceylon-aquatic-plants-catalog-2026.pdf',
    '4.8 MB',
    'pdf',
    true
),
(
    'Aquatic Plant Care & Acclimatization Guidelines',
    'Comprehensive handling, water parameter matching, and planting guidelines for bunched and potted aquatic species.',
    '/documents/aquatic-plant-care-guide.pdf',
    '1.2 MB',
    'pdf',
    true
);

-- 7. INSERT DEFAULT WEBSITE SETTINGS
INSERT INTO public.website_settings (key, value)
VALUES
(
    'site_config',
    '{
        "company_name": "Ceylon Aquatic Plants (Pvt) Ltd",
        "tagline": "Premium Tropical Aquatic Flora Cultivated in Sri Lanka",
        "phone": "077 704 2100",
        "whatsapp": "+94 77 704 2100",
        "email": "Ceylonaquaplants@yahoo.com",
        "address": "No: 36/24, Sampath Pedesa, Lionel Jayasinghe Mawatha, Godagama, Homagama, Colombo",
        "map_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58586029806!2d79.79979929288124!3d6.921837368686618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000",
        "facebook_url": "https://facebook.com/ceylonaquaticplants",
        "instagram_url": "https://instagram.com/ceylonaquaticplants",
        "youtube_url": "https://youtube.com/@ceylonaquaticplants",
        "linkedin_url": "https://linkedin.com/company/ceylonaquaticplants",
        "hero_title": "Pure Tropical Aquatic Plants from the Heart of Ceylon",
        "hero_subtitle": "Sustainably cultivated live aquarium plants, tissue-culture in-vitro varieties, and hardy pond flora curated for passionate aquascapers and international partners.",
        "about_summary": "Ceylon Aquatic Plants (Pvt) Ltd is a dedicated grower and showcase provider of premium tropical aquatic plants based in Sri Lanka. Leveraging year-round tropical sunshine, crystal-clear water sources, and biological cultivation methods, we bring the vibrancy of natural aquatic ecosystems to hobbyists and professional aquascapers.",
        "vision": "To be the globally recognized benchmark for sustainable tropical aquatic plant cultivation, biosecurity, and botanical excellence.",
        "mission": "To cultivate, preserve, and showcase premium-grade aquatic and terrarium flora through sustainable horticultural practices, biosecure propagation, and authentic customer partnership.",
        "core_values": [
            { "title": "Botanical Vitality", "description": "Every plant is cultivated under optimal conditions to ensure maximum vigor, clean root systems, and radiant coloration." },
            { "title": "Sustainable Stewardship", "description": "Eco-friendly greenhouse management, water recirculation, and responsible propagation respecting natural aquatic ecosystems." },
            { "title": "Biosecure Purity", "description": "Rigorous quality inspections and sterile tissue-culture standards guaranteeing clean specimens free from pests and harmful contaminants." },
            { "title": "Passionate Expertise", "description": "Deep horticultural knowledge and dedication to supporting aquascapers, pond enthusiasts, and botanical institutions worldwide." }
        ]
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
