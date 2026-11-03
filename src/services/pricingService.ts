import { CustomizationState, PriceBreakdown } from '../types';
import { BLACK_BOOK_PRODUCTS } from '../constants/products';

/**
 * PRINT BIZZ CENTRALIZED PRICING SERVICE
 * 
 * Configurable pricing engine for customer frontend.
 * Designed to seamlessly connect to backend /api/v1/pricing endpoint.
 */
export const calculatePrice = (
  customization: CustomizationState,
  pageCountOverride?: number
): PriceBreakdown => {
  const product = BLACK_BOOK_PRODUCTS.find((p) => p.id === customization.productId) || BLACK_BOOK_PRODUCTS[0];
  const pages = pageCountOverride ?? (customization.document?.pageCount || product.basePagesIncluded);
  const colorPages = customization.document?.colorPageCount || (customization.printType === 'Mixed (B&W + Colour)' ? 12 : customization.printType === 'Full Colour' ? pages : 0);

  // 1. Base Product Price
  let basePrice = product.startingPrice;

  // 2. Paper GSM addition
  let paperGsmExtra = 0;
  if (customization.paperGSM === '80 GSM Bond') paperGsmExtra = 25;
  else if (customization.paperGSM === '100 GSM Executive') paperGsmExtra = 55;
  else if (customization.paperGSM === '120 GSM Royal') paperGsmExtra = 95;

  // Extra pages beyond base pages included
  const extraPages = Math.max(0, pages - product.basePagesIncluded);
  const perPageRate = customization.printSides === 'Double-Sided (Recommended)' ? 1.5 : 2.0;
  const extraPageCost = Math.round(extraPages * perPageRate);

  // 3. Color pages cost
  const colorPagesCost = colorPages * 4.5;

  // 4. Binding addition
  let bindingCost = 0;
  if (customization.binding === 'Silver Foil Embossed Hardcover') bindingCost = 30;
  else if (customization.binding === 'Premium Leatherette Rexine') bindingCost = 110;
  else if (customization.binding === 'Executive Matte Obsidian') bindingCost = 140;

  // 5. Add-ons
  let addOnsCost = 0;
  if (customization.addOns.butterPaperInserts) addOnsCost += 30;
  if (customization.addOns.goldCornerProtectors) addOnsCost += 40;
  if (customization.addOns.ribbonBookmark) addOnsCost += 20;
  if (customization.addOns.cdPocketSleeve) addOnsCost += 25;
  if (customization.addOns.certificateLamination) addOnsCost += 35;
  if (customization.addOns.hardcoverWaterproofing) addOnsCost += 45;

  // Single copy unit price
  const unitPrice = Math.round(basePrice + paperGsmExtra + extraPageCost + colorPagesCost + bindingCost + addOnsCost);
  const copies = Math.max(1, customization.copies || 1);
  const rawSubtotal = unitPrice * copies;

  // Multi-copy volume discount
  let discountPercent = 0;
  if (copies >= 5) discountPercent = 0.15;
  else if (copies >= 3) discountPercent = 0.10;
  else if (copies >= 2) discountPercent = 0.05;

  const discount = Math.round(rawSubtotal * discountPercent);
  const discountedSubtotal = rawSubtotal - discount;

  // Delivery fee from Thane distribution hub to Mumbai addresses
  // Free delivery for orders above ₹699
  const deliveryFee = discountedSubtotal >= 699 ? 0 : 49;

  // GST 12% on print production
  const gstTax = Math.round(discountedSubtotal * 0.12);

  const total = discountedSubtotal + deliveryFee + gstTax;

  return {
    basePrice,
    paperGsmExtra,
    colorPagesCost,
    bindingCost,
    addOnsCost,
    unitPrice,
    copies,
    subtotal: discountedSubtotal,
    deliveryFee,
    gstTax,
    total,
    discount,
  };
};
