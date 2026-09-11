// frontend/src/pages/ReceiptView.jsx
// Dedicated route page for viewing, verifying, downloading, and sharing donation receipts.
// URL: /receipt/:id and /funds/receipt/:id

import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fundsService } from '../services/fundsService';
import FundReceipt from '../components/FundReceipt';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadReceiptPDF, shareReceiptViaDevice, getWhatsAppShareUrl } from '../utils/receiptPdfGenerator';
import { Download, MessageCircle, Share2, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

export default function ReceiptView() {
  const { id } = useParams();
  const receiptRef = useRef(null);
  const [contribution, setContribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fundsService.getContributionById(id);
        if (res?.success && res?.data) {
          setContribution(res.data);
        } else {
          setError('Receipt not found or invalid ID.');
        }
      } catch (err) {
        console.error('Error loading receipt:', err);
        setError('Could not find the requested donation receipt. Please check the link or ID.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReceipt();
    }
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!receiptRef.current || downloading || !contribution) return;
    try {
      setDownloading(true);
      const receiptNo = contribution.receiptNo || contribution.id?.slice(0, 6) || 'RECEIPT';
      await downloadReceiptPDF(receiptRef.current, receiptNo);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleWhatsAppShare = () => {
    if (!contribution) return;
    const waUrl = getWhatsAppShareUrl(contribution);
    window.open(waUrl, '_blank');
  };

  const handleDeviceShare = async () => {
    if (!receiptRef.current || sharing || !contribution) return;
    try {
      setSharing(true);
      const res = await shareReceiptViaDevice(receiptRef.current, contribution);
      if (res?.fallback) {
        handleWhatsAppShare();
      }
    } catch (err) {
      console.error('Share error:', err);
    } finally {
      setSharing(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative text-white selection:bg-amber-500 selection:text-white">
      <Navbar />

      {/* ── Background Glow ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"></div>
      </div>

      <main className="flex-1 relative z-10 max-w-xl mx-auto px-3 sm:px-4 pt-24 pb-16 w-full flex flex-col items-center">
        
        {/* Navigation Bar */}
        <div className="w-full flex items-center justify-between mb-4">
          <Link
            to="/funds"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Funds / ફંડ યાદી</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Digital Receipt</span>
          </div>
        </div>

        {error ? (
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center mt-8 backdrop-blur-md">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">પહોંચ મળી નથી / Receipt Not Found</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">{error}</p>
            <Link
              to="/funds"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" /> ફંડ પેજ પર જાઓ / Go to Funds
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            
            {/* The Receipt Component */}
            <div className="w-full shadow-2xl rounded-2xl overflow-hidden mb-5 animate-in fade-in zoom-in-95 duration-300">
              <FundReceipt ref={receiptRef} contribution={contribution} />
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-[460px] bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl space-y-3">
              
              <div className="grid grid-cols-2 gap-2.5">
                {/* Download PDF */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={downloading}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all active:scale-98 ${
                    downloadSuccess
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-ualg-blue hover:bg-blue-600'
                  } disabled:opacity-50`}
                >
                  {downloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>બની રહી છે...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span>ડાઉનલોડ સફળ!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Share */}
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#1ebd59] shadow-lg shadow-emerald-500/20 transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp શેર</span>
                </button>
              </div>

              {/* Native Mobile Share */}
              <button
                onClick={handleDeviceShare}
                disabled={sharing}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition active:scale-98"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{sharing ? 'શેર થઈ રહ્યું છે...' : 'Share PDF File (મોબાઇલ શેર)'}</span>
              </button>

              <p className="text-[10px] text-center text-gray-400">
                UNITY A LIVE GROUP • Official Digital Donation Receipt
              </p>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
