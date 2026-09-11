// frontend/src/utils/numberToWords.js
// Utility to convert numbers into Indian numbering system words (Lakhs, Crores, Thousands)

const ones = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const tens = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertBelowThousand(num) {
  let str = '';
  if (num >= 100) {
    str += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  if (num > 0) {
    if (num < 20) {
      str += ones[num] + ' ';
    } else {
      str += tens[Math.floor(num / 10)] + ' ';
      if (num % 10 > 0) {
        str += ones[num % 10] + ' ';
      }
    }
  }
  return str.trim();
}

/**
 * Converts an amount in INR to words in Indian format.
 * E.g., 5001 -> "Five Thousand One Rupees Only"
 * E.g., 105000 -> "One Lakh Five Thousand Rupees Only"
 */
export function numberToIndianWords(amount) {
  const num = Math.floor(Number(amount));
  if (isNaN(num) || num <= 0) return 'Zero Rupees Only';

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remainder = num % 1000;

  let result = '';

  if (crore > 0) {
    result += convertBelowThousand(crore) + ' Crore ';
  }
  if (lakh > 0) {
    result += convertBelowThousand(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    result += convertBelowThousand(thousand) + ' Thousand ';
  }
  if (remainder > 0) {
    result += convertBelowThousand(remainder) + ' ';
  }

  return `${result.trim()} Rupees Only`;
}
