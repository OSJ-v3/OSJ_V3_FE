export type InquiryCategory = "BUG" | "IMPROVEMENT" | "ETC";

export interface InquiryRequest {
  title: string;
  content: string;
  category: InquiryCategory;
}
