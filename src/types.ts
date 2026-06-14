export type ItemType = 'video' | 'ppt' | 'pdf' | 'album' | 'html' | 'image' | 'web' | 'link';

export interface PortfolioItem {
  title: string;
  desc: string;
  type: ItemType;
  src: string;
  img: string;
  fullDesc?: string;
  category?: string;
  isCustom?: boolean;
  html?: string;
  slides?: string[];
  tags?: string[];
  platform?: string;
  likes?: string;
  views?: string;
  collects?: string;
  emoji?: string;
}

export interface CategoryData {
  title: string;
  categories?: Record<string, PortfolioItem[]>;
  items?: PortfolioItem[];
}

export type SubPageKey = 'video' | 'design' | 'photo' | 'media' | 'contact';
