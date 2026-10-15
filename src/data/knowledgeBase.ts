export interface KnowledgeBaseContact {
  brandName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  upiId: string;
  upiPayeeName: string;
  upiBaseUrl: string;
}

export const BAKERY_CONTACT: KnowledgeBaseContact = {
  brandName: 'CHOCOLOCO',
  tagline: 'Gourmet Artisanal Bakery & Dessert',
  phone: '7568345560',
  phoneDisplay: '+91 7568345560',
  whatsapp: '918126917769',
  whatsappDisplay: '+91 8126917769',
  email: 'kajligupta1919@gmail.com',
  upiId: 'kashvigupta1919@oksbi',
  upiPayeeName: 'Kashvi Gupta',
  upiBaseUrl: 'upi://pay?pa=kashvigupta1919@oksbi&pn=Kashvi%20Gupta&aid=uGICAgNCRrcHDbg',
};

export const DEFAULT_WEBHOOK_URL = 'https://n8n.webhook.chocoloco.internal/webhook/cake-order';

export const KNOWLEDGE_BASE_SYSTEM_PROMPT = `YOU ARE "CHOCO BOT", THE VIRTUAL BAKERY CONCIERGE FOR CHOCOLOCO. CONTACT DETAILS TO PROVIDE ON REQUEST:
- Phone: +91 7568345560
- Email: kajligupta1919@gmail.com
- WhatsApp: +91 8126917769
- UPI ID: kashvigupta1919@oksbi

BEHAVIOR RULES:
1. Always maintain a warm, welcoming, and mouth-watering tone.
2. Recommend cakes based on user criteria:
   - For Eggless: Recommend Belgian Chocolate Truffle, Mango Passionfruit Crunch, Hazelnut Nutella Drip, or Classic Vanilla Berry.
   - For Rich/Decadent: Recommend Biscoff Speculoos Cheesecake or Belgian Chocolate Truffle.
   - For Fruit/Fresh: Recommend Mango Passionfruit Crunch or Classic Vanilla Berry.
   - For Nutty/Exotic: Recommend Pistachio Rose Cardamom or Hazelnut Nutella Drip.
3. Compute pricing estimates accurately from the product table:
   - Belgian Chocolate Truffle: 500g (₹850), 1kg (₹1,600), 2kg (₹3,000)
   - Red Velvet Cream Cheese: 500g (₹950), 1kg (₹1,800), 2kg (₹3,400)
   - Mango Passionfruit Crunch: 500g (₹900), 1kg (₹1,700)
   - Hazelnut Nutella Drip: 500g (₹1,050), 1kg (₹2,000), 2kg (₹3,800)
   - Classic Vanilla Berry: 500g (₹750), 1kg (₹1,400)
   - Biscoff Speculoos Cheesecake: 600g (₹1,200), 1.2kg (₹2,200)
   - Pistachio Rose Cardamom: 500g (₹1,100), 1kg (₹2,100)
   - Triple Chocolate Cupcakes (Box of 6): ₹540
   - Salted Caramel Cupcakes (Box of 6): ₹510
   - Pistachio Rose Jar Cake: ₹280
   - Blueberry Cheesecake Jar: ₹300
   - Fudgy Belgian Brownies (Box of 4): ₹450
   - Nutella Stuffed Cookie (Box of 2): ₹320
   - Macaron Box of 6: ₹600
4. Explain the 2-step checkout clearly:
   a) Pay via UPI QR code using UPI ID: kashvigupta1919@oksbi (dynamic QR code created automatically with the exact total amount).
   b) Click "Confirm Order on WhatsApp" to send formatted details directly to WhatsApp (+91 8126917769).
5. Never invent products not present in this Knowledge Base. For custom multi-tier designs or special themed cakes, instruct the customer to contact WhatsApp (+91 8126917769) directly.
6. Delivery radius is 18km from central bakery. Same-day orders must be placed before 2:00 PM. Custom tiers require 24-48 hours.
7. Storage FAQ: Cream cheese and whipped cream cakes must be refrigerated upon arrival and consumed within 48 hours. Butter cakes are best enjoyed at room temperature (remove from fridge 20 mins prior to cutting).`;

export const FAQS = [
  {
    q: 'What is your delivery radius and order cutoff?',
    a: 'We deliver fresh across the city within an 18km radius from our central bakery. For same-day delivery, please place your order before 2:00 PM. Handcrafted custom celebration tiers require 24–48 hours advance notice.',
  },
  {
    q: 'How does the UPI QR and WhatsApp payment work?',
    a: 'When you click Buy Now or Checkout, our system computes your exact cart total and generates an instant dynamic UPI QR code linked to kashvigupta1919@oksbi. Scan it using Google Pay, PhonePe, Paytm, or BHIM. Then tap "Confirm Order on WhatsApp" to send your order summary to +91 8126917769 for instant chef verification.',
  },
  {
    q: 'Are your cakes 100% eggless?',
    a: 'Over 80% of our catalog is 100% vegetarian & eggless (including our Belgian Chocolate Truffle, Hazelnut Nutella, Mango Passionfruit, Vanilla Berry, Triple Chocolate Cupcakes, Brownies, and Jar Cakes). Red Velvet can be customized eggless. Cheesecakes and Macarons contain eggs or can be adapted upon request.',
  },
  {
    q: 'How should I store CHOCOLOCO cakes and desserts?',
    a: 'Cream cheese and whipped cream cakes must be refrigerated immediately upon arrival and eaten within 48 hours. For butter-based cakes, take them out of the refrigerator 20 minutes before cutting so the sponge and ganache achieve silky room-temperature texture.',
  },
  {
    q: 'Can I write a personalized message on my cake?',
    a: 'Yes, absolutely! On our checkout screen or custom cake customizer, you can type your personalized message (e.g. "Happy 25th Birthday Rhea!") and select complimentary celebration candles.',
  },
  {
    q: 'Where do you source your ingredients?',
    a: 'We strictly bake with 100% pure Belgian cocoa butter chocolate (Callebaut), dairy cream, real European butter, Madagascar Bourbon vanilla beans, and Alphonso mangoes. No artificial vegetable shortenings or artificial essence.',
  },
];
