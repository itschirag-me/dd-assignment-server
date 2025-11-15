import { ApiProperty } from '@nestjs/swagger';

export class SearchOverviewDto {
  @ApiProperty()
  search_score: number;

  @ApiProperty()
  visibility_index: number;

  @ApiProperty()
  domain_authority: number;

  @ApiProperty()
  page_authority: number;

  @ApiProperty()
  spam_score: number;

  @ApiProperty()
  indexed_pages: number;

  @ApiProperty()
  load_time_ms: number;

  @ApiProperty()
  mobile_score: number;
}

export class TopKeywordDto {
  @ApiProperty()
  keyword: string;

  @ApiProperty()
  volume: number;

  @ApiProperty()
  ranking: number;
}

export class GeoDistributionDto {
  @ApiProperty()
  country: string;

  @ApiProperty()
  traffic: number;
}

export class TrafficSourcesDto {
  @ApiProperty()
  organic: number;

  @ApiProperty()
  direct: number;

  @ApiProperty()
  referral: number;

  @ApiProperty()
  social: number;
}

export class SeoHistoryDto {
  @ApiProperty()
  month: string;

  @ApiProperty()
  search_score: number;

  @ApiProperty()
  organic_traffic: number;
}

export class InsightResponseDto {
  @ApiProperty({ type: SearchOverviewDto })
  search_overview: SearchOverviewDto;

  @ApiProperty({ type: [TopKeywordDto] })
  top_keywords: TopKeywordDto[];

  @ApiProperty({ type: [GeoDistributionDto] })
  geo_distribution: GeoDistributionDto[];

  @ApiProperty({ type: TrafficSourcesDto })
  traffic_sources: TrafficSourcesDto;

  @ApiProperty({ type: [SeoHistoryDto] })
  seo_history: SeoHistoryDto[];
}
