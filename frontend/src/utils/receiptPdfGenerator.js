// frontend/src/utils/receiptPdfGenerator.js
// Handles PDF rendering, downloading, mobile Web Share API, and WhatsApp sharing.

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SCALE = 2.5; // High resolution for crisp, professional print and screen

/**
 * Captures the receipt DOM element as high-res canvas
 */
export async function captureReceiptElement(element) {
  return html2canvas(element, {
    scale: SCALE,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    logging: false,
    imageTimeout: 15000,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });
}

/**
 * Downloads the receipt DOM element directly as a high-quality PDF
 */
export async function downloadReceiptPDF(element, receiptNo = 'RECEIPT') {
  const canvas = await captureReceiptElement(element);
  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  // Calculate PDF dimensions to fit cleanly
  const imgWidth = canvas.width / SCALE;
  const imgHeight = canvas.height / SCALE;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [imgWidth, imgHeight],
    hotfixes: ['px_scaling'],
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  pdf.save(`Donation-Receipt-${receiptNo}.pdf`);
  return true;
}

/**
 * Creates a PDF File object for Web Share API
 */
export async function createReceiptPDFFile(element, receiptNo = 'RECEIPT') {
  const canvas = await captureReceiptElement(element);
  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  const imgWidth = canvas.width / SCALE;
  const imgHeight = canvas.height / SCALE;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [imgWidth, imgHeight],
    hotfixes: ['px_scaling'],
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  const blob = pdf.output('blob');
  
  return new File([blob], `Donation-Receipt-${receiptNo}.pdf`, {
    type: 'application/pdf',
    lastModified: Date.now(),
  });
}

/**
 * Shares the PDF file via native mobile share sheet (WhatsApp, Telegram, etc.)
 */
export async function shareReceiptViaDevice(element, contribution) {
  const receiptNo = contribution.receiptNo || contribution.id?.slice(0, 8) || 'RECEIPT';
  
  try {
    const file = await createReceiptPDFFile(element, receiptNo);

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Donation Receipt - ${contribution.contributorName}`,
        text: `UNITY A LIVE GROUP - Ganesh Chaturthi 2026 Donation Receipt (₹${Number(contribution.amount).toLocaleString('en-IN')})`,
        files: [file],
      });
      return { success: true };
    } else {
      return { 
        success: false, 
        fallback: true, 
        message: 'File sharing not supported on this browser. Use WhatsApp Share or Download PDF.' 
      };
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      return { success: false, aborted: true };
    }
    console.error('Error sharing receipt:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Builds pre-formatted WhatsApp share link
 */
export function getWhatsAppShareUrl(contribution) {
  const receiptNo = contribution.receiptNo || `UALG-REC-${contribution.id?.slice(0, 6)?.toUpperCase() || 'NEW'}`;
  const amountFormatted = `₹${Number(contribution.amount).toLocaleString('en-IN')}`;
  const dateFormatted = new Date(contribution.date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const paymentModeGujarati = {
    Cash: 'રોકડ (Cash)',
    UPI: 'યુપીઆઈ (UPI)',
    'Bank Transfer': 'બેંક ટ્રાન્સફર (Bank Transfer)',
    Cheque: 'ચેક (Cheque)',
  }[contribution.paymentMode] || contribution.paymentMode || 'Cash';

  const lines = [
    '🌸 *॥ શ્રી ગણેશાય નમઃ ॥* 🌸',
    '*UNITY A LIVE GROUP - GANPATI MAHOTSAV 2026*',
    '📜 *દાન પહોંચ / DONATION RECEIPT*',
    '────────────────────────',
    `🧾 *પહોંચ નં. (Receipt No):* ${receiptNo}`,
    `👤 *દાતાશ્રી (Donor):* ${contribution.contributorName}`,
    `💰 *દાન રાશિ (Amount):* ${amountFormatted}/-`,
    `📅 *તારીખ (Date):* ${dateFormatted}`,
    `💳 *ચુકવણી (Mode):* ${paymentModeGujarati}`,
  ];

  if (contribution.phoneNumber) {
    lines.push(`📞 *મોબાઇલ (Mobile):* ${contribution.phoneNumber}`);
  }

  if (contribution.note) {
    lines.push(`📝 *નોંધ (Note):* ${contribution.note}`);
  }

  lines.push('────────────────────────');
  lines.push('🙏 *આપના પવિત્ર સહયોગ બદલ હાર્દિક આભાર!*');
  lines.push('॥ *ગણપતિ બાપ્પા મોરિયા, મંગલ મૂર્તિ મોરિયા* ॥');
  lines.push('');
  // Use public production domain if on localhost so shared WhatsApp links open properly on mobile devices
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const baseUrl = (!isLocal && typeof window !== 'undefined' && window.location.origin)
    ? window.location.origin
    : 'https://unity-a-live-group.vercel.app';

  const receiptKey = contribution.id || receiptNo;
  lines.push('🌐 *પહોંચ લિંક / Digital Receipt:*');
  lines.push(`${baseUrl}/receipt/${encodeURIComponent(receiptKey)}`);

  const text = encodeURIComponent(lines.join('\n'));

  // Clean phone number if provided for direct 1-to-1 WhatsApp chat
  const cleanPhone = (contribution.phoneNumber || '').replace(/\D/g, '');
  if (cleanPhone && cleanPhone.length === 10) {
    return `https://wa.me/91${cleanPhone}?text=${text}`;
  } else if (cleanPhone && cleanPhone.length > 10) {
    return `https://wa.me/${cleanPhone}?text=${text}`;
  }

  // Fallback to general WhatsApp share
  return `https://api.whatsapp.com/send?text=${text}`;
}
