// frontend/src/components/ReceiptModal.jsx
// Mobile-first responsive modal to preview, download, and share donation receipts.

import { useRef, useState } from 'react';
import { X, Download, Share2, MessageCircle, Check, Printer } from 'lucide-react';
import FundReceipt from './FundReceipt';
import { downloadReceiptPDF, shareReceiptViaDevice, getWhatsAppShareUrl } from '../utils/receiptPdfGenerator';

export default function ReceiptModal({ contribution, onClose }) {
  const receiptRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!contribution) return null;

  const receiptNo = contribution.receiptNo || `UALG-${contribution.id?.slice(0, 6)?.toUpperCase() || 'REC'}`;

  const handleDownloadPDF = async () => {
    if (!receiptRef.current || downloading) return;
    try {
      setDownloading(true);
      await downloadReceiptPDF(receiptRef.current, receiptNo);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to download PDF:', err);
      alert('PDF download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleDeviceShare = async () => {
    if (!receiptRef.current || sharing) return;
    try {
      setSharing(true);
      const res = await shareReceiptViaDevice(receiptRef.current, contribution);
      if (res?.fallback) {
        // Fallback directly to WhatsApp
        const waUrl = getWhatsAppShareUrl(contribution);
        window.open(waUrl, '_blank');
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setSharing(false);
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = getWhatsAppShareUrl(contribution);
    window.open(waUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* ── Modal Header ── */}
        <div className="px-4 py-3 bg-gradient-to-r from-ualg-navy to-slate-900 text-white flex items-center justify-between flex-shrink-0 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-ualg-gold text-lg">🧾</span>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">દાન પહોંચ / Donation Receipt</h3>
              <p className="text-[11px] text-blue-300">Unity A Live Group • {receiptNo}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable Receipt Preview Area ── */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-slate-100/70 flex justify-center items-start">
          <div className="w-full flex justify-center">
            <FundReceipt ref={receiptRef} contribution={contribution} />
          </div>
        </div>

        {/* ── Touch-Friendly Action Bar ── */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-200 flex-shrink-0 space-y-2.5">
          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all active:scale-98 ${
                downloadSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-ualg-navy hover:bg-ualg-blue'
              } disabled:opacity-50`}
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>પીડીએફ બની રહી છે...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>ડાઉનલોડ સફળ!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF (ડાઉનલોડ)</span>
                </>
              )}
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#1ebd59] shadow-md shadow-emerald-500/20 transition-all active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp શેર</span>
            </button>
          </div>

          {/* Secondary Options */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handleDeviceShare}
              disabled={sharing}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition active:scale-98"
            >
              <Share2 className="w-3.5 h-3.5 text-ualg-blue" />
              <span>{sharing ? 'શેર થઈ રહ્યું છે...' : 'Share PDF (મોબાઇલ શેર)'}</span>
            </button>

            <button
              onClick={onClose}
              className="py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition active:scale-98"
            >
              બંધ કરો / Close
            </button>
          </div>

          {/* Mobile tip */}
          <p className="text-[10px] text-center text-gray-400">
            ટિપ: આ પહોંચ તમે સીધી WhatsApp પર મોકલી શકો છો અથવા PDF ડાઉનલોડ કરી શકો છો.
          </p>
        </div>

      </div>
    </div>
  );
}
