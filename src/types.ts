export interface Slide {
 id: number;
 type: 'hero' | 'about' | 'history' | 'management' | 'business' | 'savings' | 'loans' | 'extra' | 'app' | 'contact' | 'flyer' | 'laporan' | 'teladan' | 'agenda' | 'jadwal-sholat';
 title?: string;
 subtitle?: string;
 description?: string;
 visual?: string;
 services?: Service[];
 highlights?: string[];
 contacts?: Contact[];
 address?: string;
 qr_code?: string;
 mockup?: string;
 visions?: string[];
 missions?: string[];
 socials?: Contact[];
 timeline?: HistoryEvent[];
 imageUrl?: string;
 videoUrl?: string;
  isFullScreen?: boolean;
}

export interface Service {
 name: string;
 description: string;
 icon?: string;
}

export interface Contact {
 department: string;
 number: string;
}

export interface HistoryEvent {
 year: string;
 title: string;
 description: string;
}

export interface Settings {
 marqueeText: string[];
 widgetEnabled: boolean;
 widgetTitle: string;
 widgetText: string;
 appsScriptUrl?: string;
 logoUrl?: string;
 bgMusicEnabled?: boolean;
 bgMusicUrl?: string;
}

