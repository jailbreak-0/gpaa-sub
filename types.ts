
export interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

export interface NewsItem {
  category: string;
  title: string;
  description: string;
  image: string;
  date?: string;
}

export interface PillarItem {
  title: string;
  description: string;
  icon: string;
}

export interface Executive {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}

export interface MembershipCategory {
  title: string;
  description: string;
  fees: string;
  benefits: string[];
  icon: string;
}

export interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  type: 'upcoming' | 'past';
}

export interface Program {
  title: string;
  description: string;
  image: string;
  icon: string;
  category: string;
}

export interface Partner {
  name: string;
  logo: string;
  description?: string;
}

export interface RegionalExecutive {
  name: string;
  role: 'Chairman' | 'Secretary';
  region: string;
  image?: string;
  phone?: string;
  email?: string;
}

export interface WelfarePaymentMethod {
  type: 'Mobile Money' | 'Bank' | 'Shortcode';
  name: string;
  number: string;
  details?: string;
}

export interface Document {
  title: string;
  description: string;
  category: 'Financial' | 'Reports' | 'Calendar' | 'Policies' | 'Forms';
  fileUrl: string;
  date: string;
  size?: string;
}

export interface MemberProfile {
  id: string;
  firstName: string;
  lastName: string;
  category: string;
  region: string;
  district: string;
  facility: string;
  email?: string;
  phone?: string;
  showContact: boolean;
}

export interface TrustSignal {
  icon: string;
  stat: string;
  label: string;
}
