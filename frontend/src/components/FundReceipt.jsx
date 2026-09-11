// frontend/src/components/FundReceipt.jsx
// Premium Gujarati & English Bilingual Ganpati Festival Donation Receipt (દાન પહોંચ / DONATION RECEIPT)
// Fully optimized for mobile responsiveness & high-resolution PDF rendering via html2canvas.

import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { numberToIndianWords } from '../utils/numberToWords';

const FundReceipt = forwardRef(function FundReceipt({ contribution }, ref) {
  if (!contribution) return null;

  const {
    id,
    receiptNo = `UALG-${new Date(contribution.date || Date.now()).getFullYear()}-${(id || '0000').slice(0, 4).toUpperCase()}`,
    contributorName = 'Anonymous Donor',
    phoneNumber = '',
    amount = 0,
    date = new Date().toISOString(),
    paymentMode = 'Cash',
    note = '',
  } = contribution;

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const amountNumber = Number(amount) || 0;
  const amountFormatted = `₹${amountNumber.toLocaleString('en-IN')}`;
  const amountInWords = numberToIndianWords(amountNumber);

  // Gujarati translation for payment mode
  const paymentModeGujarati = {
    Cash: 'રોકડ (Cash)',
    UPI: 'યુપીઆઈ (UPI)',
    'Bank Transfer': 'બેંક ટ્રાન્સફર (Bank Transfer)',
    Cheque: 'ચેક (Cheque)',
  }[paymentMode] || paymentMode;

  // Verification QR data
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const baseUrl = (!isLocal && typeof window !== 'undefined' && window.location.origin)
    ? window.location.origin
    : 'https://unity-a-live-group.vercel.app';
  const qrVerificationValue = `${baseUrl}/receipt/${encodeURIComponent(id || receiptNo)}`;

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#fffdfa',
        borderRadius: '20px',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Roboto, -apple-system, 'Shruti', 'Gujarati Sangam MN', sans-serif",
        boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
        border: '3px solid #d97706',
        margin: '0 auto',
        position: 'relative',
        color: '#1e293b',
      }}
      className="fund-receipt-card"
    >
      {/* ── Top Festive Golden Ornamental Border ── */}
      <div
        style={{
          height: '8px',
          background: 'linear-gradient(90deg, #b45309 0%, #f59e0b 25%, #d97706 50%, #f59e0b 75%, #b45309 100%)',
        }}
      />

      {/* ── Inner Festive Card Wrapper with Subtle Border ── */}
      <div style={{ padding: '3px', backgroundColor: '#fffdfa' }}>
        
        {/* ── Header ── */}
        <div
          style={{
            background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #172554 100%)',
            borderRadius: '16px 16px 0 0',
            padding: '16px 16px 14px',
            textAlign: 'center',
            position: 'relative',
            color: '#ffffff',
            borderBottom: '2px solid #f59e0b',
          }}
        >
          {/* Auspicious Shlok in Gujarati & Sanskrit */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#fef08a',
              fontWeight: '800',
              letterSpacing: '0.8px',
              margin: '0 0 6px 0',
            }}
          >
            <span>॥ ૐ ગં ગણપતયે નમઃ ॥</span>
            <span style={{ color: '#f59e0b' }}>•</span>
            <span>॥ શ્રી ગણેશાય નમઃ ॥</span>
          </div>

          {/* Logo & Mandal Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '2px solid #f59e0b',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.4)',
              }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ textAlign: 'left' }}>
              <h1
                style={{
                  fontSize: '18px',
                  fontWeight: '900',
                  letterSpacing: '0.5px',
                  margin: 0,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  lineHeight: '1.2',
                }}
              >
                UNITY A LIVE GROUP
              </h1>
              <p
                style={{
                  fontSize: '11px',
                  color: '#fef08a',
                  margin: 0,
                  fontWeight: '700',
                  letterSpacing: '0.3px',
                }}
              >
                ગણપતિ મહોત્સવ ૨૦૨૬ • GANPATI MAHOTSAV
              </p>
            </div>
          </div>

          {/* Dual Language Badge */}
          <div style={{ marginTop: '12px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(90deg, #c2410c 0%, #ea580c 50%, #c2410c 100%)',
                color: '#ffffff',
                padding: '4px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '900',
                letterSpacing: '0.5px',
                border: '1px solid #fed7aa',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
              }}
            >
              <span>📜 દાન પહોંચ</span>
              <span style={{ opacity: 0.7 }}>/</span>
              <span>DONATION RECEIPT</span>
            </div>
          </div>
        </div>

        {/* ── Metadata Bar (Receipt No & Date) with Dotted Tear Line ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fef3c7',
            padding: '9px 16px',
            borderBottom: '1px dashed #d97706',
            fontSize: '12px',
          }}
        >
          <div>
            <span style={{ color: '#92400e', fontSize: '10px', display: 'block', fontWeight: '800' }}>
              પહોંચ ક્રમાંક / RECEIPT NO.
            </span>
            <span style={{ color: '#78350f', fontWeight: '900', fontFamily: 'monospace', fontSize: '13px' }}>
              {receiptNo}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ color: '#92400e', fontSize: '10px', display: 'block', fontWeight: '800' }}>
              તારીખ / DATE
            </span>
            <span style={{ color: '#78350f', fontWeight: '800' }}>
              {formattedDate}
            </span>
          </div>
        </div>

        {/* ── Receipt Body ── */}
        <div style={{ padding: '14px 16px 12px', backgroundColor: '#fffdfa' }}>
          
          {/* Donor Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              padding: '12px 14px',
              marginBottom: '12px',
              border: '1.5px solid #fde68a',
              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)',
            }}
          >
            <div style={{ marginBottom: phoneNumber ? '8px' : '0' }}>
              <span
                style={{
                  color: '#d97706',
                  fontSize: '10px',
                  fontWeight: '800',
                  letterSpacing: '0.4px',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                દાતાશ્રીનું નામ / DONOR'S NAME:
              </span>
              <span
                style={{
                  color: '#0f172a',
                  fontSize: '17px',
                  fontWeight: '900',
                  display: 'block',
                  lineHeight: '1.3',
                }}
              >
                {contributorName}
              </span>
            </div>

            {phoneNumber && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  paddingTop: '6px',
                  borderTop: '1px dashed #fde68a',
                }}
              >
                <span style={{ color: '#d97706', fontSize: '10px', fontWeight: '800' }}>
                  મોબાઇલ નં. / MOBILE NO:
                </span>
                <span style={{ color: '#1e293b', fontSize: '13px', fontWeight: '700' }}>
                  📞 {phoneNumber}
                </span>
              </div>
            )}
          </div>

          {/* Amount Box - Festive Saffron & Gold */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
              border: '2px solid #f59e0b',
              borderRadius: '14px',
              padding: '12px 14px',
              textAlign: 'center',
              marginBottom: '12px',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.15)',
            }}
          >
            <span
              style={{
                color: '#b45309',
                fontSize: '11px',
                fontWeight: '900',
                letterSpacing: '0.5px',
                display: 'block',
              }}
            >
              સ્વીકારેલ દાન રકમ / DONATION AMOUNT
            </span>

            <div
              style={{
                color: '#9a3412',
                fontSize: '30px',
                fontWeight: '900',
                lineHeight: '1.2',
                margin: '4px 0 2px',
                textShadow: '0 1px 2px rgba(0,0,0,0.06)',
              }}
            >
              {amountFormatted}/-
            </div>

            <p
              style={{
                color: '#78350f',
                fontSize: '11px',
                fontWeight: '700',
                fontStyle: 'italic',
                margin: 0,
                lineHeight: '1.3',
              }}
            >
              ({amountInWords})
            </p>
          </div>

          {/* Details Table in Dual Language */}
          <div
            style={{
              border: '1.5px solid #fde68a',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '12px',
              fontSize: '12px',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Payment Mode */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 12px',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #fef3c7',
              }}
            >
              <span style={{ color: '#64748b', fontWeight: '700' }}>
                ચુકવણી પદ્ધતિ / Payment Mode
              </span>
              <span
                style={{
                  color: '#065f46',
                  backgroundColor: '#d1fae5',
                  border: '1px solid #a7f3d0',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontWeight: '800',
                  fontSize: '11px',
                }}
              >
                {paymentModeGujarati}
              </span>
            </div>

            {/* Purpose */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 12px',
                backgroundColor: '#fffdfa',
                borderBottom: note ? '1px solid #fef3c7' : 'none',
              }}
            >
              <span style={{ color: '#64748b', fontWeight: '700' }}>
                દાનનો હેતુ / Purpose
              </span>
              <span style={{ color: '#0f172a', fontWeight: '800' }}>
                ગણેશ મહોત્સવ સેવા (Seva Daan)
              </span>
            </div>

            {/* Note if available */}
            {note && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '9px 12px',
                  backgroundColor: '#ffffff',
                }}
              >
                <span style={{ color: '#64748b', fontWeight: '700', flexShrink: 0 }}>
                  વિશેષ નોંધ / Note:
                </span>
                <span style={{ color: '#334155', fontWeight: '600', maxWidth: '65%', textAlign: 'right' }}>
                  {note}
                </span>
              </div>
            )}
          </div>

          {/* ── Footer: QR Code, Stamp & Signature ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingTop: '8px',
              borderTop: '1.5px dashed #fde68a',
            }}
          >
            {/* Verification QR */}
            <div style={{ textAlign: 'center' }}>
              <QRCodeSVG
                value={qrVerificationValue}
                size={66}
                level="M"
                includeMargin={false}
                style={{
                  border: '2px solid #fde68a',
                  borderRadius: '6px',
                  padding: '2px',
                  backgroundColor: '#ffffff',
                }}
              />
              <span
                style={{
                  display: 'block',
                  fontSize: '8px',
                  color: '#92400e',
                  marginTop: '4px',
                  fontWeight: '800',
                  letterSpacing: '0.4px',
                }}
              >
                સ્કેન કરી ચકાસો<br />SCAN TO VERIFY
              </span>
            </div>

            {/* Official Seal & Signature */}
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'inline-block',
                  border: '2px solid #059669',
                  backgroundColor: '#ecfdf5',
                  borderRadius: '8px',
                  padding: '3px 8px',
                  color: '#047857',
                  fontSize: '9px',
                  fontWeight: '900',
                  letterSpacing: '0.5px',
                  marginBottom: '10px',
                  transform: 'rotate(-3deg)',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.15)',
                }}
              >
                ✓ સ્વીકૃત / VERIFIED & ACKNOWLEDGED
              </div>

              <div
                style={{
                  borderTop: '1.5px solid #d97706',
                  paddingTop: '4px',
                  width: '135px',
                  display: 'inline-block',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#0f172a', display: 'block' }}>
                  અધિકૃત સહી / Signatory
                </span>
                <span style={{ fontSize: '8px', color: '#64748b', display: 'block', fontWeight: '600' }}>
                  UNITY A LIVE GROUP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Divine Blessing Ribbon ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #b45309 100%)',
            color: '#ffffff',
            textAlign: 'center',
            padding: '9px 12px',
            borderRadius: '0 0 16px 16px',
            borderTop: '1.5px solid #f59e0b',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: '900',
              letterSpacing: '0.5px',
              color: '#fef08a',
            }}
          >
            ॥ ગણપતિ બાપ્પા મોરિયા, મંગલ મૂર્તિ મોરિયા ॥
          </div>
          <div
            style={{
              fontSize: '10px',
              color: '#ffffff',
              fontWeight: '700',
              marginTop: '2px',
            }}
          >
            આપના પવિત્ર દાન બદલ હાર્દિક આભાર • Thank You For Your Divine Contribution
          </div>
        </div>

      </div>
    </div>
  );
});

export default FundReceipt;
