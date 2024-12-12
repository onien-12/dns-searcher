export type ApiResponse<D> = {
  message: string;
  data: D;
};

export interface PriceRange {
  min: number;
  max: number;
}

export interface SearchCatalogResult {
  type: 'catalog';
  data: {
    searchUid: string;
    params: string;
  };
}

export interface SearchResult {
  type: 'search';
  data: SearchData;
}

export interface CatalogData {
  realCategoryId: string;
  productGroups: ProductGroup[];
}

export interface SearchData {
  categories: Category[];
  title: any;
  totalCount: number;
  productGroups: ProductGroup[];
  group: any;
  sort: SortStrategies;
  pageSize: number;
  filters: FilterStrategy[];
  hasSavedFilters: any;
}

export interface Category {
  title: string;
  searchUid: string;
  image: string;
  params: string;
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
  reliability?: Reliability;
}

export interface Reliability {
  iconUrl: string;
  text: string;
  iconUrlNight: string;
}

export interface SortStrategies {
  variants: SortStrategy[];
  selected: any;
  default: string;
  type: string;
  id: string;
  label: string;
  description: any;
}

export interface SortStrategy {
  id: string;
  label: string;
  count: any;
}

export interface FilterStrategy {
  variants?: FilterVariant[];
  selected: any;
  type: string;
  id: string;
  label: string;
  hasDescription: boolean;
  descriptionId: any;
  top?: any[];
  default: any;
  count?: number;
  hint?: string;
  icon?: string;
  min?: number;
  max?: number;
  minSelected: any;
  maxSelected: any;
}

export interface FilterVariant {
  id: string;
  label: string;
  count?: number;
  metroName?: string;
  metroColor?: string;
  keywords?: string[];
  isTechnopoint?: boolean;
  latitude?: number;
  longitude?: number;
  address?: string;
}
