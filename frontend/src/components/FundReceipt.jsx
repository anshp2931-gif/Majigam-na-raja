// frontend/src/components/FundReceipt.jsx
// Authentic, Clean & Professional Gujarati + English Donation Receipt (દાન પહોંચ / DONATION RECEIPT)
// Colors: Classic Dark Green & Elegant Golden. Simple, trustworthy, and dignified trust receipt design.

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
    Cash: 'રોકડ / Cash',
    UPI: 'યુપીઆઈ / UPI',
    'Bank Transfer': 'બેંક ટ્રાન્સફર / Bank Transfer',
    Cheque: 'ચેક / Cheque',
  }[paymentMode] || paymentMode;

  // Verification QR data
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const baseUrl = (!isLocal && typeof window !== 'undefined' && window.location.origin)
    ? window.location.origin
    : 'https://unity-a-live-group.vercel.app';
  const qrVerificationValue = `${baseUrl}/admin/receipt/${encodeURIComponent(id || receiptNo)}`;

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Roboto, -apple-system, 'Shruti', 'Gujarati Sangam MN', sans-serif",
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        border: '2px solid #065f46',
        margin: '0 auto',
        position: 'relative',
        color: '#1e293b',
      }}
      className="fund-receipt-clean"
    >
      {/* ── Outer Decorative Golden Line ── */}
      <div style={{ height: '5px', backgroundColor: '#d97706' }} />

      <div style={{ padding: '20px 22px 18px' }}>
        
        {/* ── Top Auspicious Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <p
            style={{
              fontSize: '12px',
              color: '#d97706',
              fontWeight: '700',
              margin: '0 0 6px 0',
              letterSpacing: '0.5px',
            }}
          >
            ॥ શ્રી ગણેશાય નમઃ ॥
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #065f46',
                backgroundColor: '#ffffff',
              }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ textAlign: 'left' }}>
              <h1
                style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  letterSpacing: '0.5px',
                  margin: 0,
                  color: '#064e3b',
                  textTransform: 'uppercase',
                  lineHeight: '1.2',
                }}
              >
                UNITY A LIVE GROUP
              </h1>
              <p
                style={{
                  fontSize: '11px',
                  color: '#b45309',
                  margin: 0,
                  fontWeight: '600',
                }}
              >
                ગણેશ મહોત્સવ ૨૦૨૬ • GANESH MAHOTSAV 2026
              </p>
            </div>
          </div>

          {/* Formal Receipt Title Badge */}
          <div style={{ marginTop: '10px' }}>
            <div
              style={{
                display: 'inline-block',
                borderTop: '1px solid #065f46',
                borderBottom: '1px solid #065f46',
                padding: '3px 18px',
                color: '#065f46',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '0.8px',
              }}
            >
              દાન પહોંચ / DONATION RECEIPT
            </div>
          </div>
        </div>

        {/* ── Metadata Row: Receipt No & Date ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '8px 12px',
            marginBottom: '14px',
            fontSize: '11px',
          }}
        >
          <div>
            <span style={{ color: '#047857', fontWeight: '700', display: 'block' }}>પહોંચ નં. / RECEIPT NO.</span>
            <span style={{ color: '#064e3b', fontWeight: '800', fontFamily: 'monospace', fontSize: '13px' }}>
              {receiptNo}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ color: '#047857', fontWeight: '700', display: 'block' }}>તારીખ / DATE</span>
            <span style={{ color: '#064e3b', fontWeight: '700' }}>{formattedDate}</span>
          </div>
        </div>

        {/* ── Clean Receipt Details Form Structure ── */}
        <div style={{ marginBottom: '14px', fontSize: '12px' }}>
          
          {/* Donor Name Row */}
          <div
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>
              દાતાશ્રીનું નામ (Received with thanks from):
            </span>
            <span style={{ color: '#0f172a', fontSize: '16px', fontWeight: '800', lineHeight: '1.3' }}>
              {contributorName}
            </span>
          </div>

          {/* Mobile Number Row */}
          {phoneNumber && (
            <div
              style={{
                padding: '8px 10px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '700' }}>
                મોબાઇલ નં. (Mobile No.):
              </span>
              <span style={{ color: '#0f172a', fontSize: '12px', fontWeight: '700' }}>
                {phoneNumber}
              </span>
            </div>
          )}

          {/* Amount in Words Row */}
          <div
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '700' }}>
              રકમ અંકે રૂપિયા (Amount in Words):
            </span>
            <span style={{ color: '#065f46', fontSize: '12px', fontWeight: '700', fontStyle: 'italic' }}>
              {amountInWords}
            </span>
          </div>

          {/* Payment Mode Row */}
          <div
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '700' }}>
              ચુકવણી પદ્ધતિ (Payment Mode):
            </span>
            <span
              style={{
                color: '#065f46',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '11px',
              }}
            >
              {paymentModeGujarati}
            </span>
          </div>

          {/* Purpose Row */}
          <div
            style={{
              padding: '8px 10px',
              borderBottom: note ? '1px solid #e2e8f0' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '700' }}>
              દાનનો હેતુ (On Account of):
            </span>
            <span style={{ color: '#0f172a', fontWeight: '700', fontSize: '11px' }}>
              ગણેશ મહોત્સવ સેવા / Ganesh Mahotsav Seva
            </span>
          </div>

          {/* Note Row if present */}
          {note && (
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '700', flexShrink: 0 }}>
                નોંધ (Remarks):
              </span>
              <span style={{ color: '#334155', fontWeight: '600', maxWidth: '65%', textAlign: 'right', fontSize: '11px' }}>
                {note}
              </span>
            </div>
          )}
        </div>

        {/* ── Prominent Formal Amount Box ── */}
        <div
          style={{
            border: '2px solid #065f46',
            borderRadius: '10px',
            backgroundColor: '#f0fdf4',
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <span style={{ color: '#047857', fontWeight: '800', fontSize: '12px', letterSpacing: '0.4px' }}>
            કુલ દાન રકમ / Total Amount:
          </span>
          <span
            style={{
              color: '#064e3b',
              fontWeight: '900',
              fontSize: '24px',
              letterSpacing: '0.5px',
            }}
          >
            {amountFormatted}/-
          </span>
        </div>

        {/* ── Bottom Section: QR Code & Signatory ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: '10px',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          {/* Simple Digital Verification QR */}
          <div style={{ textAlign: 'center' }}>
            <QRCodeSVG
              value={qrVerificationValue}
              size={56}
              level="M"
              includeMargin={false}
              style={{
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                padding: '2px',
                backgroundColor: '#ffffff',
              }}
            />
            <span
              style={{
                display: 'block',
                fontSize: '8px',
                color: '#64748b',
                marginTop: '3px',
                fontWeight: '600',
              }}
            >
              Scan to Verify
            </span>
          </div>

          {/* Professional Signatory Line */}
          <div style={{ textAlign: 'center', width: '150px' }}>
            <div style={{ height: '30px' }} />
            <div style={{ borderTop: '1.5px solid #065f46', paddingTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#064e3b', display: 'block' }}>
                અધિકૃત સહી / Signatory
              </span>
              <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>
                UNITY A LIVE GROUP
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer Respectful Blessing ── */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '14px',
            paddingTop: '8px',
            borderTop: '1px dashed #cbd5e1',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '11px',
              color: '#064e3b',
              fontWeight: '700',
            }}
          >
            ॥ ગણપતિ બાપ્પા મોરિયા ॥
          </p>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: '9px',
              color: '#64748b',
            }}
          >
            આપના પવિત્ર સહયોગ બદલ ખૂબ ખૂબ આભાર • Thank you for your generous support
          </p>
        </div>

      </div>

      {/* ── Bottom Accent Line ── */}
      <div style={{ height: '4px', backgroundColor: '#065f46' }} />
    </div>
  );
});

export default FundReceipt;
