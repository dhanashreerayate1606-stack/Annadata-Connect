import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category?: 'product' | 'hero' | 'learning';
  name?: string;
  price?: string;
  farmer?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = (data as any).placeholderImages;
