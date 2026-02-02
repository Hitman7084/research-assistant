export interface DigestResponse {
  category: string;
  summary: string;
  generated_at: string;
}

export type Category = 'cs.AI' | 'cs.LG' | 'cs.CL' | 'cs.CV' | 'cs.NE' | 'cs.RO';

export interface CategoryOption {
  value: Category;
  label: string;
}
