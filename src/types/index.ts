export type DietaryType = 'EGGLESS' | 'EGG/OPT' | 'CONTAINS EGG' | 'GF OPT' | 'GF / EGG';

export interface ProductOption {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Cakes' | 'Cheesecakes' | 'Cupcakes' | 'Desserts & Jars';
  description: string;
  flavorProfile: string;
  dietary: DietaryType;
  options: ProductOption[];
  defaultPrice: number;
  image: string;
  popular?: boolean;
  bestseller?: boolean;
  egglessFriendly?: boolean;
}

export interface CartItem {
  id: string; // unique item id including selected size
  productId: string;
  name: string;
  size: string;
  unitPrice: number;
  quantity: number;
  image: string;
  dietary: DietaryType;
  customCakeMessage?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  address: string;
  cityArea?: string;
  pincode?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  orderNotes?: string;
}

export interface OrderRecord {
  orderId: string;
  timestamp: string;
  customer: CustomerDetails;
  items: {
    productId: string;
    name: string;
    size: string;
    qty: number;
    price: number;
    customCakeMessage?: string;
  }[];
  totalAmount: number;
  upiIdUsed: string;
  whatsappRecipient: string;
  status: 'PENDING_PAYMENT' | 'PAID_VERIFIED' | 'BAKING' | 'OUT_FOR_DELIVERY';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  quickActions?: {
    label: string;
    action: () => void;
  }[];
}
