-- =========================================================================
-- CEYLON AQUATIC PLANTS (PVT) LTD - DATABASE SCHEMA DEFINITION
-- PostgreSQL / Supabase with Row Level Security (RLS)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PLANT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.plant_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PLANTS TABLE
CREATE TABLE IF NOT EXISTS public.plants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES public.plant_categories(id) ON DELETE RESTRICT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    scientific_name TEXT,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    main_image_url TEXT NOT NULL,
    origin TEXT,
    growth_rate TEXT,
    plant_height TEXT,
    light_demand TEXT,
    co2_requirement TEXT,
    temperature_range TEXT,
    placement TEXT,
    care_instructions TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PLANT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.plant_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plant_id UUID NOT NULL REFERENCES public.plants(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GALLERY ALBUMS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID REFERENCES public.gallery_albums(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_size TEXT,
    file_type TEXT DEFAULT 'pdf',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. WEBSITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.website_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    plant_reference TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- INDEXES FOR PERFORMANCE
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_plants_category ON public.plants(category_id);
CREATE INDEX IF NOT EXISTS idx_plants_published ON public.plants(is_published);
CREATE INDEX IF NOT EXISTS idx_plants_slug ON public.plants(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.plant_categories(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_published ON public.gallery_images(is_published);
CREATE INDEX IF NOT EXISTS idx_videos_published ON public.videos(is_published);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE public.plant_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public can read active categories
CREATE POLICY "Public can view active categories" ON public.plant_categories
    FOR SELECT USING (is_active = true);

-- Public can read published plants
CREATE POLICY "Public can view published plants" ON public.plants
    FOR SELECT USING (is_published = true);

-- Public can read plant images
CREATE POLICY "Public can view plant images" ON public.plant_images
    FOR SELECT USING (true);

-- Public can view gallery albums
CREATE POLICY "Public can view active albums" ON public.gallery_albums
    FOR SELECT USING (is_active = true);

-- Public can view published gallery images
CREATE POLICY "Public can view published gallery images" ON public.gallery_images
    FOR SELECT USING (is_published = true);

-- Public can view published videos
CREATE POLICY "Public can view published videos" ON public.videos
    FOR SELECT USING (is_published = true);

-- Public can view published documents
CREATE POLICY "Public can view published documents" ON public.documents
    FOR SELECT USING (is_published = true);

-- Public can view website settings
CREATE POLICY "Public can view website settings" ON public.website_settings
    FOR SELECT USING (true);

-- Public can insert contact inquiries
CREATE POLICY "Public can submit contact inquiries" ON public.contact_inquiries
    FOR INSERT WITH CHECK (true);

-- Authenticated Admin Full Access Policies
CREATE POLICY "Admins have full access to categories" ON public.plant_categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to plants" ON public.plants
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to plant images" ON public.plant_images
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to albums" ON public.gallery_albums
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to gallery images" ON public.gallery_images
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to videos" ON public.videos
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to documents" ON public.documents
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to settings" ON public.website_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to inquiries" ON public.contact_inquiries
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
