export interface QueryProductGroupsResponse {
  tags: string[];
  product_groups: ProductGroup[];
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductGroup {
  title: string;
  products: Product[];
  hasSubscriptionsProducts: boolean;
}

export interface Product {
  title: string;
  guid: string;
  searchUid: string;
  code: string;
  specs: string;
  rating: number;
  opinionsCount: number;
  serviceRating: any;
  serviceRatingColor: any;
  commentsCount: number;
  image: string;
  isCompare: boolean;
  traceability: boolean;
  restrictedForLegal: boolean;
}
