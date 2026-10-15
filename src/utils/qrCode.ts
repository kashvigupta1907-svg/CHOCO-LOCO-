import QRCode from 'qrcode';

export async function generateUpiQrDataUrl(totalAmount: number): Promise<string> {
  const upiUrl = `upi://pay?pa=kashvigupta1919@oksbi&pn=Kashvi%20Gupta&aid=uGICAgNCRrcHDbg&am=${totalAmount}`;
  try {
    const dataUrl = await QRCode.toDataURL(upiUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#2A1810', // Deep artisanal chocolate color
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate UPI QR code:', err);
    return '';
  }
}

export function buildUpiPayUrl(totalAmount: number): string {
  return `upi://pay?pa=kashvigupta1919@oksbi&pn=Kashvi%20Gupta&aid=uGICAgNCRrcHDbg&am=${totalAmount}`;
}
