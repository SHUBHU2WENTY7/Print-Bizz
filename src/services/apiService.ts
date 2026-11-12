import { CustomerAddress, Order, TrackingStage, UploadedDocument } from '../types';

/**
 * PRINT BIZZ CUSTOMER API SERVICE
 * Customer-centric API abstraction for orders, document processing, and live tracking.
 */

export const INITIAL_TRACKING_STAGES: TrackingStage[] = [
  {
    id: 'order_placed',
    title: 'Order Confirmed',
    location: 'Print Bizz Order System',
    description: 'Your project specifications have been logged and assigned an order ID.',
    status: 'completed',
    timestamp: 'Today, 10:15 AM',
  },
  {
    id: 'file_verified',
    title: 'Document Preflight Verified',
    location: 'Digital Prepress Queue',
    description: 'Margins, vector fonts, and academic compliance checked and approved.',
    status: 'completed',
    timestamp: 'Today, 10:30 AM',
  },
  {
    id: 'printing_progress',
    title: 'Printing in Progress',
    location: 'Digital Laser Press',
    description: 'High-definition digital press running selected GSM bond sheets.',
    status: 'current',
    timestamp: 'Today, 11:45 AM',
  },
  {
    id: 'binding_finishing',
    title: 'Binding & Foil Stamping',
    location: 'Binding Workshop',
    description: 'Reinforced hardboard casing and precision metallic thermal foil embossing.',
    status: 'upcoming',
  },
  {
    id: 'quality_check',
    title: 'Quality Check & Audit',
    location: 'Quality Assurance',
    description: 'Inspection of spine alignment, gold lettering clarity, and page collation.',
    status: 'upcoming',
  },
  {
    id: 'packed',
    title: 'Weatherproof Packaging',
    location: 'Dispatch Center',
    description: 'Sealed in moisture-resistant bubble cushioning and protective rigid carton.',
    status: 'upcoming',
  },
  {
    id: 'dispatched',
    title: 'Dispatched with Express Courier',
    location: 'In Transit',
    description: 'Handed over to priority express courier partner with tracking ID.',
    status: 'upcoming',
  },
  {
    id: 'out_for_delivery',
    title: 'Out for Delivery',
    location: 'Local Delivery Executive',
    description: 'Courier agent is on the way to your specified delivery address.',
    status: 'upcoming',
  },
  {
    id: 'delivered',
    title: 'Delivered',
    location: 'Recipient Doorstep',
    description: 'Black Book delivered successfully to the recipient.',
    status: 'upcoming',
  },
];

export const MOCK_SAVED_ADDRESSES: CustomerAddress[] = [];

export const MOCK_EXISTING_ORDERS: Order[] = [];

export const api = {
  generateOrderVerificationToken: (orderNumber: string): string => {
    return `${orderNumber}-SECURE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  },
  uploadPdfFile: async (mockFile: { name: string; size: number }): Promise<UploadedDocument> => {
    return {
      id: 'doc_' + Date.now(),
      name: mockFile.name,
      size: mockFile.size,
      pageCount: 80,
      colorPageCount: 12,
      bwPageCount: 68,
      uploadedAt: 'Just now',
      status: 'ready',
      previewPages: ['Title Page', 'Index', 'Chapter 1', 'Results'],
    };
  },
};
