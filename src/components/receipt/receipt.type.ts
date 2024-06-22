export interface Good {
  barcode?: string;
  product_name: string;
  unit?: string;
  price?: string;
  amount?: string;
  cost?: string;
}

export interface ServerGoodResponse {
  message: string;
  AI: boolean;
  goods: Good[];
  text_OCR: string;
}

export interface History {
  id: string | number;
  date: string;
  bill_text: Good[];
}
