export interface SearchOverview {
  search_score: number;
  visibility_index: number;
  domain_authority: number;
  page_authority: number;
  spam_score: number;
  indexed_pages: number;
  load_time_ms: number;
  mobile_score: number;
}

export interface TopKeyword {
  keyword: string;
  volume: number;
  ranking: number;
}

export interface GeoDistribution {
  country: string;
  traffic: number;
}

export interface TrafficSources {
  organic: number;
  direct: number;
  referral: number;
  social: number;
}

export interface SeoHistory {
  month: string;
  search_score: number;
  organic_traffic: number;
}

export interface InsightDocument {
  search_overview: SearchOverview;
  top_keywords: TopKeyword[];
  geo_distribution: GeoDistribution[];
  traffic_sources: TrafficSources;
  seo_history: SeoHistory[];
}
