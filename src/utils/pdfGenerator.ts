import jsPDF from 'jspdf';

export function generateKnowledgeBasePDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Helper for footer
  const drawFooter = (pageNum: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.text(
      'CHOCOLOCO Official Knowledge Base — Contact: +91 7568345560',
      margin,
      pageHeight - 7
    );
    doc.text(`Page ${pageNum} of 3`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  // ================= PAGE 1 =================
  // Header Banner
  doc.setFillColor(60, 22, 38); // #3C1626 dark plum / maroon
  doc.roundedRect(margin, 14, contentWidth, 38, 2, 2, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('CHOCOLOCO', margin + 8, 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(240, 230, 235);
  doc.text('Gourmet Artisanal Bakery & Dessert Knowledge Base', margin + 8, 36);

  // Contact Box inside header
  const contactBoxWidth = 72;
  const contactBoxX = pageWidth - margin - contactBoxWidth - 6;
  doc.setFillColor(78, 32, 50);
  doc.roundedRect(contactBoxX, 18, contactBoxWidth, 30, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Direct Contact Info:', contactBoxX + 4, 23);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(230, 230, 230);
  doc.text('• Call: +91 7568345560', contactBoxX + 4, 28);
  doc.text('• WhatsApp: +91 8126917769', contactBoxX + 4, 33);
  doc.text('• Email: kajligupta1919@gmail.com', contactBoxX + 4, 38);
  doc.text('• UPI ID: kashvigupta1919@oksbi', contactBoxX + 4, 43);

  // Section 1: ABOUT CHOCOLOCO
  let y = 60;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(60, 22, 38);
  doc.text('1. ABOUT CHOCOLOCO', margin, y);

  doc.setDrawColor(180, 50, 80);
  doc.setLineWidth(0.5);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const aboutText =
    'CHOCOLOCO is a premium artisanal bakery specializing in handcrafted cakes, gourmet cupcakes, decadent brownies, and custom celebration tiers. Every creation is baked fresh using imported Belgian chocolate, real dairy butter, organic berries, and zero artificial preservatives.';
  const aboutLines = doc.splitTextToSize(aboutText, contentWidth);
  doc.text(aboutLines, margin, y);

  y += 14;
  // Three feature cards
  const cardW = (contentWidth - 8) / 3;
  const cardH = 24;

  const cards = [
    {
      title: '100% Quality Promise',
      text: 'Baked fresh on order day using real butter, pure cocoa butter chocolate, and zero synthetic syrups.',
    },
    {
      title: 'Dietary Flexibility',
      text: 'Over 80% of our catalog is available in 100% Eggless options. Gluten-Free and Sugar-Free available on request.',
    },
    {
      title: 'Seamless Fulfillment',
      text: 'Instant UPI dynamic QR generation, background order processing, and direct WhatsApp verification.',
    },
  ];

  cards.forEach((card, idx) => {
    const cx = margin + idx * (cardW + 4);
    doc.setFillColor(254, 248, 250);
    doc.setDrawColor(220, 180, 195);
    doc.setLineWidth(0.4);
    doc.roundedRect(cx, y, cardW, cardH, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(140, 20, 50);
    doc.text(card.title, cx + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(70, 70, 70);
    const cLines = doc.splitTextToSize(card.text, cardW - 8);
    doc.text(cLines, cx + 4, y + 11);
  });

  // Section 2: SIGNATURE & CUSTOM CAKES CATALOG
  y += cardH + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(60, 22, 38);
  doc.text('2. SIGNATURE & CUSTOM CAKES CATALOG', margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 7;
  // Table Header
  const colX = [margin, margin + 40, margin + 114, margin + 142, margin + 162];
  const colW = [40, 74, 28, 20, 16];

  doc.setFillColor(45, 15, 25);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ITEM NAME', colX[0] + 2, y + 5);
  doc.text('DESCRIPTION & FLAVOR PROFILE', colX[1] + 2, y + 5);
  doc.text('SIZES', colX[2] + 2, y + 5);
  doc.text('DIETARY', colX[3] + 2, y + 5);
  doc.text('PRICE', colX[4] + 2, y + 5);

  y += 7;
  const cakesCatalog = [
    {
      name: 'Belgian Chocolate Truffle',
      desc: 'Rich 55% dark chocolate ganache layered between silky chocolate sponge.',
      sizes: '500g / 1kg / 2kg',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹850 /\n₹1,600',
    },
    {
      name: 'Red Velvet Cream Cheese',
      desc: 'Classic cocoa sponge with authentic tangy cream cheese frosting and velvet crumbs.',
      sizes: '500g / 1kg / 2kg',
      dietary: 'EGG/OPT',
      dietaryColor: [180, 100, 20],
      price: '₹950 /\n₹1,800',
    },
    {
      name: 'Mango Passionfruit Crunch',
      desc: 'Vanilla sponge infused with fresh Alphonso mango puree, white chocolate & passionfruit crunch.',
      sizes: '500g / 1kg',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹900 /\n₹1,700',
    },
    {
      name: 'Hazelnut Nutella Drip',
      desc: 'Moist chocolate cake layered with rich Nutella ganache and roasted hazelnut praline.',
      sizes: '500g / 1kg / 2kg',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹1,050 /\n₹2,000',
    },
    {
      name: 'Classic Vanilla Berry',
      desc: 'Madagascar vanilla sponge layered with wild berry compote and whipped cream frosting.',
      sizes: '500g / 1kg',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹750 /\n₹1,400',
    },
    {
      name: 'Biscoff Speculoos Cheesecake',
      desc: 'Baked New York style cheesecake with Lotus Biscoff spread and crushed cookie base.',
      sizes: '600g / 1.2kg',
      dietary: 'EGG',
      dietaryColor: [180, 50, 50],
      price: '₹1,200 /\n₹2,200',
    },
    {
      name: 'Pistachio Rose Cardamom',
      desc: 'Persian inspired pistachio cake layered with rose water mousse and crushed dry fruits.',
      sizes: '500g / 1kg',
      dietary: 'GF OPT',
      dietaryColor: [50, 100, 180],
      price: '₹1,100 /\n₹2,100',
    },
  ];

  cakesCatalog.forEach((row, i) => {
    const rowH = 13.5;
    if (i % 2 === 1) {
      doc.setFillColor(252, 248, 250);
      doc.rect(margin, y, contentWidth, rowH, 'F');
    }
    doc.setDrawColor(240, 230, 235);
    doc.setLineWidth(0.2);
    doc.line(margin, y + rowH, pageWidth - margin, y + rowH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 30, 30);
    doc.text(row.name, colX[0] + 2, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(70, 70, 70);
    const descLines = doc.splitTextToSize(row.desc, colW[1] - 4);
    doc.text(descLines, colX[1] + 2, y + 4.5);

    doc.text(row.sizes, colX[2] + 2, y + 5);

    // Dietary pill
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(row.dietaryColor[0], row.dietaryColor[1], row.dietaryColor[2]);
    doc.text(row.dietary, colX[3] + 2, y + 5);

    // Price
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(20, 20, 20);
    doc.text(row.price, colX[4] + 2, y + 5);

    y += rowH;
  });

  drawFooter(1);

  // ================= PAGE 2 =================
  doc.addPage();
  y = 18;

  // Title 2. (Contd.)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(60, 22, 38);
  doc.text('2. DESSERTS, CUPCAKES & PASTRIES (CONTD.)', margin, y);
  doc.setDrawColor(180, 50, 80);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 6;
  doc.setFillColor(45, 15, 25);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ITEM NAME', colX[0] + 2, y + 5);
  doc.text('DESCRIPTION', colX[1] + 2, y + 5);
  doc.text('UNIT / PORTION', colX[2] + 2, y + 5);
  doc.text('DIETARY', colX[3] + 2, y + 5);
  doc.text('PRICE', colX[4] + 2, y + 5);

  y += 7;
  const dessertsCatalog = [
    {
      name: 'Triple Chocolate Cupcake',
      desc: 'Dark chocolate cake, filled with fudge, topped with chocolate buttercream.',
      portion: 'Box of 6',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹540',
    },
    {
      name: 'Salted Caramel Cupcake',
      desc: 'Fluffy vanilla cake filled with house-made salted caramel and praline.',
      portion: 'Box of 6',
      dietary: 'EGG/OPT',
      dietaryColor: [180, 100, 20],
      price: '₹510',
    },
    {
      name: 'Pistachio Rose Jar Cake',
      desc: 'Layered cake jar with pistachio sponge and rose cream in reusable glass jar.',
      portion: '250ml Jar',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹280',
    },
    {
      name: 'Blueberry Cheesecake Jar',
      desc: 'Crumbled Graham cracker base, cream cheese mousse, and wild blueberry topping.',
      portion: '250ml Jar',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹300',
    },
    {
      name: 'Fudgy Belgian Brownie',
      desc: 'Ultra-dense, crinkle-top chocolate brownie made with 70% dark Belgian cocoa.',
      portion: 'Box of 4',
      dietary: 'EGGLESS',
      dietaryColor: [34, 139, 34],
      price: '₹450',
    },
    {
      name: 'Nutella Stuffed Cookie',
      desc: 'Giant NYC style brown butter cookie oozing with warm Nutella center.',
      portion: 'Box of 2',
      dietary: 'CONTAINS EGG',
      dietaryColor: [180, 50, 50],
      price: '₹320',
    },
    {
      name: 'Macaron Box of 6',
      desc: 'Almond flour shells with Raspberry, Dark Chocolate, and Salted Caramel fillings.',
      portion: 'Box of 6',
      dietary: 'GF / EGG',
      dietaryColor: [50, 100, 180],
      price: '₹600',
    },
  ];

  dessertsCatalog.forEach((row, i) => {
    const rowH = 11;
    if (i % 2 === 1) {
      doc.setFillColor(252, 248, 250);
      doc.rect(margin, y, contentWidth, rowH, 'F');
    }
    doc.setDrawColor(240, 230, 235);
    doc.setLineWidth(0.2);
    doc.line(margin, y + rowH, pageWidth - margin, y + rowH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 30, 30);
    doc.text(row.name, colX[0] + 2, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(70, 70, 70);
    const descLines = doc.splitTextToSize(row.desc, colW[1] - 4);
    doc.text(descLines, colX[1] + 2, y + 4);

    doc.text(row.portion, colX[2] + 2, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(row.dietaryColor[0], row.dietaryColor[1], row.dietaryColor[2]);
    doc.text(row.dietary, colX[3] + 2, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(20, 20, 20);
    doc.text(row.price, colX[4] + 2, y + 5);

    y += rowH;
  });

  // Section 3: ORDERING & DYNAMIC UPI PAYMENT GUIDELINES
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(60, 22, 38);
  doc.text('3. ORDERING & DYNAMIC UPI PAYMENT GUIDELINES', margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 7;
  const protocolBoxH = 50;
  doc.setFillColor(254, 250, 252);
  doc.setDrawColor(220, 180, 195);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, protocolBoxH, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(60, 22, 38);
  doc.text('Standard Dynamic Ordering & Automated Payment Protocol:', margin + 6, y + 7);

  const steps = [
    '1. Cart Summary: Customer reviews ordered items, custom cake text, and shipping fee on the checkout screen.',
    '2. UPI QR Code Generation: System computes total amount and generates dynamic UPI URL:\n    upi://pay?pa=kashvigupta1919@oksbi&pn=Kashvi%20Gupta&aid=uGICAgNCRrcHDbg&am=TOTALAMOUNT',
    '3. Scan & Pay: Customer scans using Google Pay, PhonePe, Paytm, or BHIM.',
    '4. WhatsApp Confirmation: Customer clicks "Confirm Order on WhatsApp", launching pre-filled link:\n    https://wa.me/918126917769?text=Thank%20you%20for%20your%20order...',
    '5. Background Webhook Sync: System quietly dispatches JSON order summary to backend webhook endpoint without user interruption.',
  ];

  let sy = y + 13;
  steps.forEach((st) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 50, 50);
    const sl = doc.splitTextToSize(st, contentWidth - 12);
    doc.text(sl, margin + 6, sy);
    sy += sl.length > 1 ? 7.5 : 5.5;
  });

  // Section 4: DELIVERY, PICKUP & STORAGE FAQS
  y += protocolBoxH + 9;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(60, 22, 38);
  doc.text('4. DELIVERY, PICKUP & STORAGE FAQS', margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 8;
  const faqs = [
    {
      q: 'Q: What is the delivery radius and same-day ordering deadline?',
      a: 'We deliver across the city within an 18km radius from our central bakery. Same-day orders must be placed before 2:00 PM for evening delivery. Custom tier cakes require 24–48 hours lead time.',
    },
    {
      q: 'Q: How should I store CHOCOLOCO cakes and desserts?',
      a: 'Cream cheese and whipped cream cakes must be refrigerated upon arrival and consumed within 48 hours. Serve butter-based cakes at room temperature (remove from fridge 20 mins prior to cutting).',
    },
  ];

  faqs.forEach((faq) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(50, 20, 30);
    doc.text(faq.q, margin, y);
    y += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    const al = doc.splitTextToSize(faq.a, contentWidth);
    doc.text(al, margin, y);
    y += al.length * 3.8 + 3;
  });

  drawFooter(2);

  // ================= PAGE 3 =================
  doc.addPage();
  y = 18;

  // Title 5: AI CHATBOT INTEGRATION
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(60, 22, 38);
  doc.text('5. AI CHATBOT INTEGRATION & CONTEXT RULES', margin, y);
  doc.setDrawColor(180, 50, 80);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.text(
    'The CHOCOLOCO AI Chatbot acts as a virtual bakery assistant. It reads from this exact Knowledge Base to assist customers with cake selections, dietary filtering, price quotes, and payment flow guidance.',
    margin,
    y
  );

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text('SYSTEM PROMPT CONFIGURATION', margin, y);

  y += 4;
  const promptBoxH = 80;
  doc.setFillColor(30, 25, 30); // dark terminal style
  doc.roundedRect(margin, y, contentWidth, promptBoxH, 2, 2, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(240, 240, 240);

  const promptSnippet = `YOU ARE "CHOCO BOT", THE VIRTUAL BAKERY CONCIERGE FOR CHOCOLOCO. CONTACT DETAILS TO PROVIDE ON REQUEST: - Phone: +91 7568345560 - Email: kajligupta1919@gmail.com - WhatsApp: +91 8126917769 - UPI ID: kashvigupta1919@oksbi BEHAVIOR RULES: 1. Always maintain a warm, welcoming, and mouth-watering tone. 2. Recommend cakes based on user criteria: - For Eggless: Recommend Belgian Chocolate Truffle, Mango Passionfruit, Hazelnut Nutella, or Vanilla Berry. - For Rich/Decadent: Recommend Biscoff Cheesecake or Belgian Chocolate Truffle. 3. Compute pricing estimates accurately from the product table (e.g., 1kg Belgian Truffle = ₹1,600). 4. Explain the 2-step checkout clearly: a) Pay via UPI QR code using ID: kashvigupta1919@oksbi b) Click "Confirm Order on WhatsApp" to send details to +91 8126917769. 5. Never invent products not present in this Knowledge Base. For custom designs, instruct the customer to contact WhatsApp (+91 8126917769) directly.`;

  const promptLines = doc.splitTextToSize(promptSnippet, contentWidth - 8);
  doc.text(promptLines, margin + 4, y + 7);

  // Section 6: AUTOMATED WEBHOOK PAYLOAD REFERENCE
  y += promptBoxH + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(60, 22, 38);
  doc.text('6. AUTOMATED WEBHOOK PAYLOAD REFERENCE', margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text('Sample Background Order JSON Payload:', margin, y);

  y += 4;
  const webhookBoxH = 50;
  doc.setFillColor(250, 248, 252);
  doc.setDrawColor(210, 190, 210);
  doc.roundedRect(margin, y, contentWidth, webhookBoxH, 2, 2, 'FD');

  const jsonSnippet = `{
  "order_id": "CHOCO-9842",
  "timestamp": "2026-10-15T10:30:00Z",
  "customer_name": "Kashvi Gupta",
  "customer_phone": "+91 8126917769",
  "items": [
    { "name": "Belgian Chocolate Truffle", "weight": "1kg", "qty": 1, "price": 1600 },
    { "name": "Triple Chocolate Cupcake (Box of 6)", "qty": 1, "price": 540 }
  ],
  "total_amount": 2140,
  "upi_id_used": "kashvigupta1919@oksbi",
  "whatsapp_recipient": "+918126917769"
}`;

  doc.setFont('courier', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(50, 40, 60);
  const jsonLines = doc.splitTextToSize(jsonSnippet, contentWidth - 8);
  doc.text(jsonLines, margin + 6, y + 7);

  drawFooter(3);

  // Trigger download in browser
  doc.save('CHOCOLOCO_Official_Knowledge_Base.pdf');
}
