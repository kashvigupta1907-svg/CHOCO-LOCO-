import { GoogleGenAI } from '@google/genai';
import { KNOWLEDGE_BASE_SYSTEM_PROMPT, BAKERY_CONTACT } from '../data/knowledgeBase';
import { PRODUCTS } from '../data/products';

// Check for client-side or injected Gemini API key
const apiKey =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
  (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) ||
  '';

let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
  }
}

// Local Knowledge Base fallback response generator
export function getLocalKnowledgeResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  // Contact info
  if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('number')) {
    return `You can reach CHOCOLOCO directly at:\n📞 Phone: ${BAKERY_CONTACT.phoneDisplay}\n💬 WhatsApp: ${BAKERY_CONTACT.whatsappDisplay}\n✉️ Email: ${BAKERY_CONTACT.email}\n💳 UPI ID: ${BAKERY_CONTACT.upiId}`;
  }

  // UPI / Payment / QR questions
  if (query.includes('upi') || query.includes('pay') || query.includes('qr') || query.includes('checkout')) {
    return `💳 Ordering & UPI Payment at CHOCOLOCO is super simple!\n1. Pick your favorite cake and click "Order Now" or "Checkout".\n2. A dynamic UPI QR code will appear for our UPI ID (${BAKERY_CONTACT.upiId}) with your exact bill amount.\n3. Scan with Google Pay, PhonePe, Paytm, or BHIM.\n4. Click "Confirm Order on WhatsApp" to ping us at ${BAKERY_CONTACT.whatsappDisplay} for instant verification!`;
  }

  // Delivery radius and cutoff
  if (query.includes('deliver') || query.includes('radius') || query.includes('time') || query.includes('area') || query.includes('same day')) {
    return `🚚 Delivery Information:\n• Radius: We deliver within an 18km radius from our central bakery.\n• Same-Day Delivery: Available for orders placed before 2:00 PM!\n• Custom Tiers: Require 24–48 hours advance notice.\nCakes are transported in temperature-controlled insulated carriers to keep ganache pristine.`;
  }

  // Storage
  if (query.includes('store') || query.includes('fridge') || query.includes('refrigerat') || query.includes('keep')) {
    return `❄️ Storage Instructions:\n• Cream cheese and whipped cream cakes (like Red Velvet and Blueberry Cheesecake Jar) must be refrigerated immediately and enjoyed within 48 hours.\n• Dark chocolate & butter-based cakes (like Belgian Truffle and Hazelnut Nutella) are best served at room temperature — remove from the fridge 20 minutes before cutting!`;
  }

  // Eggless requests
  if (query.includes('eggless') || query.includes('veg') || query.includes('vegetarian') || query.includes('without egg')) {
    return `🌿 Over 80% of our catalog is 100% Eggless! Here are our chef recommendations:\n1. Belgian Chocolate Truffle (500g: ₹850 | 1kg: ₹1,600)\n2. Hazelnut Nutella Drip (500g: ₹1,050 | 1kg: ₹2,000)\n3. Mango Passionfruit Crunch (500g: ₹900 | 1kg: ₹1,700)\n4. Classic Vanilla Berry (500g: ₹750 | 1kg: ₹1,400)\n5. Triple Chocolate Cupcakes (Box of 6: ₹540)\n6. Fudgy Belgian Brownies (Box of 4: ₹450)\nWould you like me to help you order one?`;
  }

  // Gluten-free
  if (query.includes('gluten') || query.includes('celiac') || query.includes('gf')) {
    return `🌾 For Gluten-Free options, we feature:\n• Pistachio Rose Cardamom Cake (500g: ₹1,100 | 1kg: ₹2,100) - Made with almond/pistachio flour base upon request\n• French Macaron Box of 6 (₹600) - Naturally crafted with 100% California almond flour meringue!\nPlease mention Gluten-Free in your order notes.`;
  }

  // Price inquiries
  if (query.includes('price') || query.includes('cost') || query.includes('rate') || query.includes('menu')) {
    return `🎂 Signature Cakes Pricing Overview:\n• Belgian Chocolate Truffle: 500g (₹850) | 1kg (₹1,600) | 2kg (₹3,000)\n• Red Velvet Cream Cheese: 500g (₹950) | 1kg (₹1,800) | 2kg (₹3,400)\n• Hazelnut Nutella Drip: 500g (₹1,050) | 1kg (₹2,000)\n• Biscoff Speculoos Cheesecake: 600g (₹1,200) | 1.2kg (₹2,200)\n• Classic Vanilla Berry: 500g (₹750) | 1kg (₹1,400)\n• Brownies (Box of 4): ₹450 | Cupcakes (Box of 6): ₹510-₹540\nYou can view the full catalog on our page or download the official PDF!`;
  }

  // Recommendation for rich / chocolate
  if (query.includes('chocolate') || query.includes('best') || query.includes('recommend') || query.includes('popular')) {
    return `🍫 For rich, decadent chocolate lovers, our most celebrated signature is the **Belgian Chocolate Truffle** (₹850 for 500g / ₹1,600 for 1kg) crafted with 55% imported Callebaut dark ganache. If you love roasted hazelnut crunch, the **Hazelnut Nutella Drip** is an absolute crowd favorite!`;
  }

  // PDF request
  if (query.includes('pdf') || query.includes('download') || query.includes('knowledge base') || query.includes('brochure')) {
    return `📄 You can download our complete official 3-page Knowledge Base PDF right now! Click the "Download Official PDF" button in the Knowledge Base section or top bar to save the complete menu, prices, and guides to your device.`;
  }

  // Custom cake inquiry
  if (query.includes('custom') || query.includes('tier') || query.includes('wedding') || query.includes('birthday design')) {
    return `🎨 For custom tiered celebration cakes, themed fondant decor, or specific flavor pairings, our head chef crafts custom creations with 24–48 hours lead time! You can use our Custom Cake Customizer on this site or chat with us on WhatsApp at +91 8126917769.`;
  }

  // General greeting / catch-all
  return `Hello! I am Choco Bot, your virtual concierge at CHOCOLOCO. 🎂\n\nI can help you explore our handcrafted Belgian chocolate cakes, eggless options, calculate prices, explain our dynamic UPI payment & WhatsApp checkout, or guide you on deliveries within our 18km radius.\n\nWhat kind of sweet celebration are you planning today?`;
}

export async function askChocoBot(userQuery: string): Promise<string> {
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userQuery,
        config: {
          systemInstruction: KNOWLEDGE_BASE_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local Knowledge Base engine:', err);
    }
  }

  // Intelligent local Knowledge Base fallback
  return getLocalKnowledgeResponse(userQuery);
}
