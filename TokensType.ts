export interface Spacings {
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface BoxShadow {
  color: string;
  type: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
}

export interface BoxShadows {
  "100": BoxShadow;
  "300": BoxShadow;
  "500": BoxShadow;
  "700": BoxShadow;
}

export interface Color {
  "100": string;
  "300": string;
  "500": string;
  "700": string;
  "900": string;
}

export interface BorderRadius {
  xs: number;
  s: number;
  m: number;
  l: number;
}

export interface FontWeight {
  regular: number;
  medium: number;
  semiBold: number;
  bold: number;
}

export interface LineHeight {
  normal: string;
  loose: string;
}

export interface FontSize {
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface FontFamily {
  "public-sans": string;
  "noto-sans": string;
}

export interface Fonts {
  fontWeight: FontWeight;
  fontSize: FontSize;
  fontFamily: FontFamily;
}

export interface Font {
  fontWeight: number;
  fontSize: number;
  fontFamily: string;
}

export interface Typography {
  [key: string]: {
    n1: Font;
    n2: Font;
    n3: Font | undefined;
    n4: Font | undefined;
    n5: Font | undefined;
    n6: Font | undefined;
  };
}
