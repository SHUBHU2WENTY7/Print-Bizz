import { CartItem, CustomerAddress, Order, TrackingStage, UploadedDocument } from '../types';

/**
 * PRINT BIZZ API INTEGRATION CONTRACT & CLIENT ABSTRACTION
 * 
 * Clean separation between customer frontend and future backend microservices:
 * - Orders Microservice
 * - Pricing Engine
 * - Document Processing & PDF Preflight
 * - Barcode & QR Verification Service
 * - Goa & Thane Logistics Tracking Service
 */

export const INITIAL_TRACKING_STAGES: TrackingStage[] = [
  {
    id: 'order_placed',
    title: 'Order Placed',
    location: 'Customer Portal',
    description: 'Order details and student specifications submitted successfully.',
    status: 'completed',
    timestamp: 'Today, 10:15 AM',
  },
  {
    id: 'payment_confirmed',
    title: 'Payment Confirmed',
    location: 'Razorpay Secure Gateway',
    description: 'UPI / Card transaction verified via secure backend callback.',
    status: 'completed',
    timestamp: 'Today, 10:16 AM',
  },
  {
    id: 'sent_to_goa',
    title: 'Sent to Goa Production Hub',
    location: 'Goa Central Facility',
    description: 'PDF preflight passed; sent to master print queues in Goa.',
    status: 'current',
    timestamp: 'Today, 11:30 AM',
  },
  {
    id: 'printing_progress',
    title: 'Printing in Progress',
    location: 'Goa Industrial Press 4',
    description: 'High-definition digital press running 80 GSM bond sheets.',
    status: 'upcoming',
  },
  {
    id: 'binding_finishing',
    title: 'Binding & Gold Foil Stamping',
    location: 'Goa Binding Workshop',
    description: 'Precision hardboard case making and heated gold foil stamping.',
    status: 'upcoming',
  },
  {
    id: 'quality_check',
    title: 'Quality Check & Pre-Dispatch Audit',
    location: 'Goa QA Station',
    description: 'Inspection of spine alignment, gold lettering and page order.',
    status: 'upcoming',
  },
  {
    id: 'packed',
    title: 'Reinforced Weatherproof Packing',
    location: 'Goa Packaging Unit',
    description: 'Bubble cushioned and sealed in moisture-resistant tamper box.',
    status: 'upcoming',
  },
  {
    id: 'dispatched_thane',
    title: 'Dispatched to Thane Distribution Hub',
    location: 'Transit: Goa -> Maharashtra',
    description: 'Overnight priority cargo transit to Thane warehouse.',
    status: 'upcoming',
  },
  {
    id: 'received_thane_hub',
    title: 'Received at Thane Hub',
    location: 'Thane Central Hub, Maharashtra',
    description: 'Inward barcode scanned; sorted for express Mumbai dispatch.',
    status: 'upcoming',
  },
  {
    id: 'out_for_delivery',
    title: 'Out for Delivery',
    location: 'Mumbai Delivery Route',
    description: 'Assigned to local express delivery executive for doorstep delivery.',
    status: 'upcoming',
  },
  {
    id: 'delivered',
    title: 'Delivered',
    location: 'Recipient Doorstep',
    description: 'Black Book delivered and verified with secure OTP/Barcode.',
    status: 'upcoming',
  },
];

export const MOCK_SAVED_ADDRESSES: CustomerAddress[] = [
  {
    id: 'addr-1',
    label: 'Hostel / College',
    recipientName: 'Aarav Sharma',
    phone: '+91 98201 44521',
    line1: 'Room 304, Boys Hostel B, VJTI Campus',
    area: 'H. R. Mahajani Road, Matunga East',
    city: 'Mumbai',
    pincode: '400019',
    landmark: 'Near VJTI Quadrangle',
    instructions: 'Call upon arrival at the security gate',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Home',
    recipientName: 'Aarav Sharma',
    phone: '+91 98201 44521',
    line1: 'B-702, Nilgiri Heights, Ghodbunder Road',
    area: 'Kavesar, Thane West',
    city: 'Thane',
    pincode: '400615',
    landmark: 'Opposite Suraj Water Park',
    instructions: 'Leave at front desk with security if unavailable',
    isDefault: false,
  },
];

export const MOCK_EXISTING_ORDERS: Order[] = [
  {
    id: 'order-101',
    orderNumber: 'PB-2026-90412',
    orderDate: '01 Nov 2026, 04:30 PM',
    estimatedDeliveryDate: '04 Nov 2026 (Guaranteed)',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98201 44521',
    customerEmail: 'aarav.sharma@vjti.ac.in',
    address: MOCK_SAVED_ADDRESSES[0],
    items: [],
    pricing: {
      basePrice: 349,
      paperGsmExtra: 25,
      colorPagesCost: 45,
      bindingCost: 0,
      addOnsCost: 85,
      unitPrice: 504,
      copies: 2,
      subtotal: 958,
      deliveryFee: 0,
      gstTax: 115,
      total: 1073,
      discount: 50,
    },
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    transactionId: 'TXN-UPI-98218942-OKAXIS',
    orderStatus: 'In Production (Goa)',
    barcodeToken: 'PB-GOA-THN-90412-SECURE-89A',
    stages: INITIAL_TRACKING_STAGES,
  },
];

// Mock API Call helpers
export const api = {
  // Validate and mock upload PDF
  uploadPdfFile: async (file: { name: string; size: number }): Promise<UploadedDocument> => {
    // Simulate preflight scan delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Calculate approximate realistic page count based on file size or name
    const estPages = Math.max(35, Math.min(140, Math.round(file.size / (60 * 1024)) || 76));
    const estColorPages = Math.round(estPages * 0.15);
    const estBwPages = estPages - estColorPages;

    return {
      id: 'doc_' + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      pageCount: estPages,
      colorPageCount: estColorPages,
      bwPageCount: estBwPages,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'ready',
      validationMessage: 'Preflight Passed: PDF/X compliant, 300 DPI text vectors, 1.25" inner margin detected for binding clearance.',
      previewPages: [
        'Page 1: Title & University Seal (A4)',
        'Page 2: Certificate & Guide Endorsement',
        'Page 3: Declaration of Authenticity',
        'Page 4: Acknowledgements & Abstract',
        'Page 5: Table of Contents & List of Figures',
        'Page 6-75: Body Chapters, System Architecture & Results',
      ],
    };
  },

  // Generate unique secure verification barcode token
  generateOrderVerificationToken: (orderId: string): string => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const hash = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PB-VERIFY-${orderId}-${timestamp}-${hash}`;
  },
};
