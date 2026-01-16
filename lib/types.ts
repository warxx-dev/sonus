interface IncludedItem {
  quantity: number;
  item: string;
}

interface ResponsiveImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface RelatedProduct {
  slug: string;
  name: string;
  image: ResponsiveImage;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  image: ResponsiveImage;
  cartImage: string;
  category: string;
  categoryImage: ResponsiveImage;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includedItems: IncludedItem[];
  gallery: {
    first: ResponsiveImage;
    second: ResponsiveImage;
    third: ResponsiveImage;
  };
  others: RelatedProduct[];
}
