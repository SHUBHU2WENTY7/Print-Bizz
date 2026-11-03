export type PaperSize = 'A4' | 'A3';

export type PaperGSM = '75 GSM Standard' | '80 GSM Bond' | '100 GSM Executive' | '120 GSM Royal';

export type PrintType = 'Black & White' | 'Mixed (B&W + Colour)' | 'Full Colour';

export type PrintSides = 'Double-Sided (Recommended)' | 'Single-Sided';

export type PageSelectionType = 'All Pages' | 'Custom Page Range';

export type BindingType = 
  | 'Golden Embossed Hardcover (Standard)'
  | 'Silver Foil Embossed Hardcover'
  | 'Premium Leatherette Rexine'
  | 'Wire-O Spiral Binding'
  | 'Softcover Perfect Binding'
  | 'Executive Matte Obsidian';

export interface CoverCustomization {
  studentName: string;
  collegeName: string;
  projectTitle: string;
  degreeBranch: string;
  academicYear: string;
  rollNumber: string;
  guideName: string;
  spineText: string;
  coverColor: 'Classic Midnight Black' | 'Royal Navy Blue' | 'Deep Maroon' | 'Dark Emerald';
  embossingFoil: 'Gold Foil' | 'Silver Foil' | 'Rose Gold';
  finish: 'Matte Laminated' | 'Gloss Laminated';
}

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  pricePerCopy: number;
  selected: boolean;
}

export interface UploadedDocument {
  id: string;
  name: string;
  size: number; // in bytes
  pageCount: number;
  colorPageCount: number;
  bwPageCount: number;
  uploadedAt: string;
  status: 'uploading' | 'validating' | 'ready' | 'error';
  validationMessage?: string;
  previewPages: string[]; // Mock page titles or previews
  isRealFile?: boolean;
  fileType?: string; // pdf | docx | doc
  dataUrl?: string; // Object URL or Base64 data for real preview
  renderedPages?: string[]; // Rendered image URLs / HTML pages of actual document
  extractedText?: string[]; // Actual page text extracted from PDF or Word
}

export interface BlackBookProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  category: 'Black Books' | 'Project Books' | 'Thesis Binding' | 'Spiral Binding' | 'Hardcover Binding' | 'Printing Services' | 'Stationery';
  badge?: string;
  startingPrice: number;
  originalPrice: number;
  basePagesIncluded: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  specifications: {
    paperSize: string;
    paperOptions: string;
    binding: string;
    turnaround: string;
    estimatedDelivery: string;
    compliance: string;
    manufacturingHub?: string;
    dispatchHub?: string;
  };
  features: string[];
  popularFor: string;
  inStock?: boolean;
}

export interface CustomizationState {
  productId: string;
  paperSize: PaperSize;
  paperGSM: PaperGSM;
  printType: PrintType;
  printSides: PrintSides;
  pageSelection: PageSelectionType;
  customPageRange: string;
  copies: number;
  binding: BindingType;
  cover: CoverCustomization;
  addOns: {
    butterPaperInserts: boolean;
    goldCornerProtectors: boolean;
    ribbonBookmark: boolean;
    cdPocketSleeve: boolean;
    certificateLamination: boolean;
    hardcoverWaterproofing: boolean;
  };
  document?: UploadedDocument;
}

export interface PriceBreakdown {
  basePrice: number;
  paperGsmExtra: number;
  colorPagesCost: number;
  bindingCost: number;
  addOnsCost: number;
  unitPrice: number;
  copies: number;
  subtotal: number;
  deliveryFee: number;
  gstTax: number;
  total: number;
  discount: number;
}

export interface CartItem {
  id: string;
  product: BlackBookProduct;
  customization: CustomizationState;
  pricing: PriceBreakdown;
  document: UploadedDocument;
  createdAt: string;
}

export type OrderTrackingStageId =
  | 'order_placed'
  | 'payment_confirmed'
  | 'file_verified'
  | 'printing_progress'
  | 'binding_finishing'
  | 'quality_check'
  | 'packed'
  | 'dispatched'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingStage {
  id: OrderTrackingStageId;
  title: string;
  location: string;
  description: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface CustomerAddress {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  line1: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  instructions?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "PB-2026-89421"
  orderDate: string;
  estimatedDeliveryDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: CustomerAddress;
  items: CartItem[];
  pricing: PriceBreakdown;
  paymentMethod: 'UPI' | 'Cards' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  transactionId: string;
  orderStatus: 'Processing' | 'Printing' | 'Binding' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  barcodeToken: string;
  stages: TrackingStage[];
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  paperGSM: string;
  bindingType: string;
  sortBy: 'popular' | 'price_low' | 'price_high' | 'rating' | 'fastest';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'offer' | 'info';
  linkScreen?: string;
}
