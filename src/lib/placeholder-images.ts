import data from './placeholder-images.json';

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
  videoUrl?: string;
  fileUrl?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
