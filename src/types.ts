export interface EnrichedCompany {
  name: string;
  website: string;
  Enriched_Data: string;
}

export interface CompanyInputData {
  companyName: string;
  website: string;
  product: string;
  territory: string;
}

export interface EnrichedCompanyData {
  customerSnapshot: string;
  keyDemographics: {
    industry: string;
    companySize: string;
    annualRevenue: string;
    location: string;
  };
  decisionMakerProfile: {
    title: string;
    keyResponsibilities: string[];
    painPoints: string[];
  };
  whyTheyBuy: string[];
  commonObjections: {
    objection: string;
    response: string;
  }[];
  conversationStarters: string[];
  successStory: string;
  competitiveEdge: string;
}

export interface EnrichmentResponse {
  enriched_data: EnrichedCompanyData | EnrichedCompany[];
}