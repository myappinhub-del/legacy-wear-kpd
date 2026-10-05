import { ThemeType } from '../types';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  badge: string;
  primary: string;
  primaryHover: string;
  accent: string;
  bg: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  goldShine: string;
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  gold_luxury: {
    id: 'gold_luxury',
    name: 'Royale Gold & Obsidian',
    badge: '👑 Signature Brand',
    primary: '#d4af37',
    primaryHover: '#e5c158',
    accent: '#c5a059',
    bg: '#0a0b0e',
    surface: '#12141a',
    card: '#161922',
    border: '#2a2e3d',
    text: '#f9fafb',
    muted: '#9ca3af',
    goldShine: 'linear-gradient(135deg, #d4af37 0%, #fef08a 50%, #b45309 100%)'
  },
  obsidian_silver: {
    id: 'obsidian_silver',
    name: 'Obsidian & Platinum Silver',
    badge: '⚡ Modern Monolith',
    primary: '#e2e8f0',
    primaryHover: '#ffffff',
    accent: '#94a3b8',
    bg: '#08080a',
    surface: '#101116',
    card: '#14161f',
    border: '#272a38',
    text: '#ffffff',
    muted: '#94a3b8',
    goldShine: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 50%, #64748b 100%)'
  },
  royal_ruby: {
    id: 'royal_ruby',
    name: 'Royal Velvet & Crimson',
    badge: '🍷 Haute Couture',
    primary: '#f43f5e',
    primaryHover: '#fb7185',
    accent: '#e11d48',
    bg: '#0d0407',
    surface: '#18070e',
    card: '#220b14',
    border: '#451020',
    text: '#fff1f2',
    muted: '#fda4af',
    goldShine: 'linear-gradient(135deg, #fb7185 0%, #fda4af 50%, #e11d48 100%)'
  },
  emerald_prestige: {
    id: 'emerald_prestige',
    name: 'Emerald Prestige & Jade',
    badge: '🌲 Sovereign Heritage',
    primary: '#10b981',
    primaryHover: '#34d399',
    accent: '#059669',
    bg: '#040d0a',
    surface: '#091812',
    card: '#0d221a',
    border: '#144634',
    text: '#ecfdf5',
    muted: '#6ee7b7',
    goldShine: 'linear-gradient(135deg, #34d399 0%, #6ee7b7 50%, #059669 100%)'
  },
  clean_minimal: {
    id: 'clean_minimal',
    name: 'Nordic Clean Studio',
    badge: '⚪ Bright High Street',
    primary: '#18181b',
    primaryHover: '#27272a',
    accent: '#d4af37',
    bg: '#f8fafc',
    surface: '#ffffff',
    card: '#ffffff',
    border: '#e2e8f0',
    text: '#09090b',
    muted: '#64748b',
    goldShine: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)'
  }
};
