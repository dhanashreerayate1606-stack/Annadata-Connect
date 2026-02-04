import rawData from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category?: 'product' | 'hero' | 'learning';
  productType?: 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'spices' | 'flowers';
  name?: string;
  price?: string;
  farmer?: string;
  location?: string;
  searchQuery?: string;
  fileUrl?: string;
};

// Safe cast to avoid HMR module mismatch issues in Turbopack
const data = rawData as { placeholderImages: ImagePlaceholder[] };

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
