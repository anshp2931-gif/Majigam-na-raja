// frontend/src/components/FundReceipt.jsx
// Ultra-Premium Divine Gujarati & English Ganpati Festival Donation Receipt (દાન પહોંચ / DONATION RECEIPT)
// Features Gold Foil metallic aesthetics, sacred temple motifs, ticket notch cutouts, and 100% mobile responsiveness.

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
    month: 'long',
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
        background: 'linear-gradient(180deg, #fffdf8 0%, #fffbf0 50%, #fff7e6 100%)',
        borderRadius: '24px',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Roboto, 'Shruti', 'Gujarati Sangam MN', -apple-system, sans-serif",
        boxShadow: '0 25px 60px -15px rgba(217, 119, 6, 0.3), 0 0 0 1px rgba(245, 158, 11, 0.3)',
        border: '3px solid transparent',
        backgroundImage: 'linear-gradient(#fffdf8, #fff7e6), linear-gradient(135deg, #d97706, #fbbf24, #b45309, #f59e0b)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        margin: '0 auto',
        position: 'relative',
        color: '#1e293b',
      }}
      className="fund-receipt-crazy"
    >
      {/* ── Sacred Ganesha Background Watermark (Inline SVG for crisp canvas rendering) ── */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '240px',
          height: '240px',
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 100 100" fill="#d97706" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 C40 8 32 15 32 25 C32 30 35 34 38 37 C34 40 30 46 30 52 C30 60 36 68 44 70 C42 74 38 78 34 80 C40 82 48 80 52 75 C56 80 64 82 70 80 C66 78 62 74 60 70 C68 68 74 60 74 52 C74 46 70 40 66 37 C69 34 72 30 72 25 C72 15 64 8 54 8 Z M50 20 C53 20 56 23 56 27 C56 31 53 34 50 34 C47 34 44 31 44 27 C44 23 47 20 50 20 Z" />
          <circle cx="50" cy="14" r="3" fill="#ea580c" />
        </svg>
      </div>

      {/* ── Top Golden Foil Ribbon ── */}
      <div
        style={{
          height: '8px',
          background: 'linear-gradient(90deg, #92400e 0%, #f59e0b 25%, #fef08a 50%, #f59e0b 75%, #92400e 100%)',
          boxShadow: '0 2px 10px rgba(245, 158, 11, 0.5)',
        }}
      />

      {/* ── Grand Festive Header ── */}
      <div
        style={{
          background: 'linear-gradient(145deg, #090d16 0%, #1a102f 40%, #2e1065 75%, #0f172a 100%)',
          padding: '20px 18px 18px',
          textAlign: 'center',
          position: 'relative',
          color: '#ffffff',
          borderBottom: '3px solid #f59e0b',
        }}
      >
        {/* Glowing Decorative Aura */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '70px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Sacred Sanskrit Shlok Banner */}
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(254, 240, 138, 0.3)',
            borderRadius: '999px',
            padding: '3px 14px',
            marginBottom: '10px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              color: '#fef08a',
              fontWeight: '800',
              letterSpacing: '0.8px',
              margin: 0,
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            🌺 ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥ 🌺
          </p>
        </div>

        {/* Brand & Emblem */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div
            style={{
              position: 'relative',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              padding: '2px',
              background: 'linear-gradient(135deg, #fef08a, #f59e0b, #b45309)',
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)',
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                objectFit: 'cover',
              }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: '950',
                letterSpacing: '1px',
                margin: 0,
                color: '#ffffff',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 12px rgba(245, 158, 11, 0.3)',
              }}
            >
              UNITY A LIVE GROUP
            </h1>
            <p
              style={{
                fontSize: '11px',
                color: '#fef08a',
                margin: '2px 0 0 0',
                fontWeight: '800',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
              }}
            >
              ગણપતિ મહોત્સવ ૨૦૨૬ • GANPATI MAHOTSAV
            </p>
          </div>
        </div>

        {/* 3D Gold Ribbon Badge */}
        <div style={{ marginTop: '14px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #b45309 0%, #ea580c 40%, #f59e0b 70%, #d97706 100%)',
              color: '#ffffff',
              padding: '5px 20px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: '900',
              letterSpacing: '0.8px',
              border: '2px solid #fef08a',
              boxShadow: '0 4px 18px rgba(234, 88, 12, 0.5), inset 0 1px 1px rgba(255,255,255,0.6)',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            <span>📜 દાન પહોંચ</span>
            <span style={{ opacity: 0.7, fontSize: '10px' }}>✦</span>
            <span>DONATION RECEIPT</span>
          </div>
        </div>
      </div>

      {/* ── Metadata Bar with Gold Dashed Perforation Line ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fef3c7',
          padding: '10px 20px',
          borderBottom: '2px dashed #f59e0b',
          fontSize: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <span style={{ color: '#92400e', fontSize: '10px', display: 'block', fontWeight: '800', letterSpacing: '0.4px' }}>
            પહોંચ ક્રમાંક / RECEIPT NO.
          </span>
          <span
            style={{
              color: '#78350f',
              fontWeight: '900',
              fontFamily: 'monospace',
              fontSize: '14px',
              letterSpacing: '0.5px',
            }}
          >
            {receiptNo}
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ color: '#92400e', fontSize: '10px', display: 'block', fontWeight: '800', letterSpacing: '0.4px' }}>
            તારીખ / DATE
          </span>
          <span style={{ color: '#78350f', fontWeight: '900', fontSize: '12px' }}>
            🗓️ {formattedDate}
          </span>
        </div>
      </div>

      {/* ── Receipt Main Body ── */}
      <div style={{ padding: '16px 20px 14px', position: 'relative', zIndex: 1 }}>
        
        {/* Donor Information Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '14px',
            border: '2px solid #fde68a',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.08)',
            position: 'relative',
          }}
        >
          {/* Decorative Corner Flairs */}
          <div style={{ position: 'absolute', top: '6px', right: '8px', fontSize: '14px', opacity: 0.6 }}>
            🪔
          </div>

          <div style={{ marginBottom: phoneNumber ? '10px' : '0' }}>
            <span
              style={{
                color: '#d97706',
                fontSize: '10px',
                fontWeight: '900',
                letterSpacing: '0.6px',
                display: 'block',
                marginBottom: '2px',
                textTransform: 'uppercase',
              }}
            >
              દાતાશ્રીનું નામ / DONOR'S NAME:
            </span>
            <span
              style={{
                color: '#0f172a',
                fontSize: '19px',
                fontWeight: '950',
                display: 'block',
                lineHeight: '1.2',
                letterSpacing: '0.2px',
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
                gap: '8px',
                paddingTop: '8px',
                borderTop: '1px dashed #fde68a',
              }}
            >
              <span
                style={{
                  color: '#92400e',
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                }}
              >
                મોબાઇલ નં. / MOBILE:
              </span>
              <span
                style={{
                  color: '#1e293b',
                  fontSize: '13px',
                  fontWeight: '800',
                  backgroundColor: '#fef3c7',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid #fde68a',
                }}
              >
                📞 {phoneNumber}
              </span>
            </div>
          )}
        </div>

        {/* ── The Centerpiece: Grand Golden Royal Vault Amount Badge ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 25%, #c2410c 60%, #b45309 100%)',
            borderRadius: '18px',
            padding: '16px 14px 14px',
            textAlign: 'center',
            marginBottom: '14px',
            border: '2px solid #fef08a',
            boxShadow: '0 8px 24px rgba(180, 83, 9, 0.35), inset 0 2px 4px rgba(255,255,255,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Sparkle Motif */}
          <div style={{ position: 'absolute', top: '8px', left: '12px', color: '#fef08a', fontSize: '12px' }}>✨</div>
          <div style={{ position: 'absolute', top: '8px', right: '12px', color: '#fef08a', fontSize: '12px' }}>✨</div>

          <span
            style={{
              color: '#fef08a',
              fontSize: '11px',
              fontWeight: '900',
              letterSpacing: '1px',
              display: 'block',
              textTransform: 'uppercase',
              textShadow: '0 1px 3px rgba(0,0,0,0.6)',
            }}
          >
            સ્વીકારેલ દાન રકમ • RECEIVED DONATION AMOUNT
          </span>

          <div
            style={{
              color: '#ffffff',
              fontSize: '34px',
              fontWeight: '950',
              lineHeight: '1.2',
              margin: '6px 0 4px',
              letterSpacing: '1px',
              textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 0 15px rgba(254, 240, 138, 0.4)',
            }}
          >
            {amountFormatted}/-
          </div>

          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              borderRadius: '8px',
              padding: '4px 10px',
              display: 'inline-block',
              maxWidth: '92%',
              border: '1px solid rgba(254, 240, 138, 0.2)',
            }}
          >
            <p
              style={{
                color: '#fef08a',
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
        </div>

        {/* ── Bilingual Details Grid (Ivory & Gold Cards) ── */}
        <div
          style={{
            border: '2px solid #fde68a',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '14px',
            fontSize: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.06)',
          }}
        >
          {/* Payment Mode */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #fef3c7',
            }}
          >
            <span style={{ color: '#64748b', fontWeight: '800' }}>
              ચુકવણી પદ્ધતિ / Payment Mode
            </span>
            <span
              style={{
                color: '#065f46',
                backgroundColor: '#d1fae5',
                border: '1.5px solid #6ee7b7',
                padding: '3px 12px',
                borderRadius: '999px',
                fontWeight: '900',
                fontSize: '11px',
                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.15)',
              }}
            >
              💳 {paymentModeGujarati}
            </span>
          </div>

          {/* Purpose */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              backgroundColor: '#fffdf8',
              borderBottom: note ? '1px solid #fef3c7' : 'none',
            }}
          >
            <span style={{ color: '#64748b', fontWeight: '800' }}>
              દાનનો હેતુ / Purpose
            </span>
            <span style={{ color: '#0f172a', fontWeight: '900' }}>
              🌸 ગણેશ મહોત્સવ સેવા (Seva Daan)
            </span>
          </div>

          {/* Note if available */}
          {note && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '10px 14px',
                backgroundColor: '#ffffff',
              }}
            >
              <span style={{ color: '#64748b', fontWeight: '800', flexShrink: 0 }}>
                વિશેષ નોંધ / Note:
              </span>
              <span style={{ color: '#334155', fontWeight: '700', maxWidth: '65%', textAlign: 'right' }}>
                {note}
              </span>
            </div>
          )}
        </div>

        {/* ── Official Stamp, QR Verification & Signature ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: '10px',
            borderTop: '2px dashed #fde68a',
          }}
        >
          {/* Verification QR Code with Scan Frame */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '4px',
                background: '#ffffff',
                border: '2px solid #f59e0b',
                borderRadius: '10px',
                display: 'inline-block',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)',
              }}
            >
              <QRCodeSVG
                value={qrVerificationValue}
                size={70}
                level="M"
                includeMargin={false}
              />
            </div>
            <span
              style={{
                display: 'block',
                fontSize: '8px',
                color: '#92400e',
                marginTop: '4px',
                fontWeight: '900',
                letterSpacing: '0.4px',
                lineHeight: '1.2',
              }}
            >
              🔍 સ્કેન કરી ચકાસો<br />SCAN TO VERIFY
            </span>
          </div>

          {/* Official Mandir Wax Stamp & Signature */}
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: '2px solid #059669',
                backgroundColor: '#ecfdf5',
                borderRadius: '10px',
                padding: '4px 10px',
                color: '#047857',
                fontSize: '9px',
                fontWeight: '950',
                letterSpacing: '0.6px',
                marginBottom: '10px',
                transform: 'rotate(-4deg)',
                boxShadow: '0 3px 8px rgba(5, 150, 105, 0.2)',
              }}
            >
              <span>★</span>
              <span>✓ સ્વીકૃત / VERIFIED & ACKNOWLEDGED</span>
              <span>★</span>
            </div>

            <div
              style={{
                borderTop: '2px solid #d97706',
                paddingTop: '4px',
                width: '140px',
                display: 'inline-block',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#0f172a', display: 'block' }}>
                અધિકૃત સહી / Signatory
              </span>
              <span style={{ fontSize: '8px', color: '#64748b', display: 'block', fontWeight: '700' }}>
                UNITY A LIVE GROUP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Divine Blessing Ribbon with Gold Accents ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 40%, #b45309 80%, #78350f 100%)',
          color: '#ffffff',
          textAlign: 'center',
          padding: '12px 14px 10px',
          borderTop: '2px solid #f59e0b',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: '950',
            letterSpacing: '0.8px',
            color: '#fef08a',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          🌺 ॥ ગણપતિ બાપ્પા મોરિયા, મંગલ મૂર્તિ મોરિયા ॥ 🌺
        </div>
        <div
          style={{
            fontSize: '10px',
            color: '#ffffff',
            fontWeight: '800',
            marginTop: '3px',
            letterSpacing: '0.3px',
          }}
        >
          આપના પવિત્ર દાન બદલ હાર્દિક આભાર • Thank You For Your Divine Contribution
        </div>
      </div>

      {/* ── Bottom Perforated Edge Indicator ── */}
      <div
        style={{
          height: '6px',
          background: 'repeating-linear-gradient(90deg, #f59e0b, #f59e0b 6px, transparent 6px, transparent 12px)',
          opacity: 0.8,
        }}
      />
    </div>
  );
});

export default FundReceipt;
