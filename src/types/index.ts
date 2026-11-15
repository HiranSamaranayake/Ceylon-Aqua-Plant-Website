export interface PlantCategory {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description?: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
  plants_count?: number;
}

export interface PlantImage {
  id: string;
  plant_id: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
  created_at?: string;
}

export interface Plant {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  scientific_name?: string;
  short_description: string;
  full_description: string;
  main_image_url: string;
  origin?: string;
  growth_rate?: string; // e.g. "Slow", "Medium", "Fast"
  plant_height?: string; // e.g. "10 - 25 cm"
  light_demand?: string; // e.g. "Low", "Medium", "High"
  co2_requirement?: string; // e.g. "Low", "Medium", "High"
  temperature_range?: string; // e.g. "20 - 28 °C"
  placement?: string; // e.g. "Foreground", "Midground", "Background"
  care_instructions?: string;
  is_featured: boolean;
  is_published: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
  category?: PlantCategory;
  images?: PlantImage[];
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  album_id?: string;
  title: string;
  description?: string;
  image_url: string;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  album?: GalleryAlbum;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_size?: string;
  file_type?: string;
  is_published: boolean;
  created_at?: string;
}

export interface WebsiteSettings {
  company_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_embed_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  linkedin_url?: string;
  hero_title: string;
  hero_subtitle: string;
  about_summary: string;
  vision: string;
  mission: string;
  core_values: { title: string; description: string }[];
}

export interface ContactInquiry {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  plant_reference?: string;
  is_read: boolean;
  created_at?: string;
}
