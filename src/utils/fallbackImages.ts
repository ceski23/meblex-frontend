import { Furniture } from 'assets';
import { FC, SVGProps } from 'react';

type SvgIcon = FC<SVGProps<SVGSVGElement>>;

interface Icon {
  id: number;
  slug: string;
  icon: SvgIcon;
}

const icons: Icon[] = [
  { id: 1, slug: 'sofy', icon: Furniture.Sofa },
  { id: 2, slug: 'fotele', icon: Furniture.Armchair },
  { id: 3, slug: 'regaly', icon: Furniture.Bookcase },
  { id: 4, slug: 'stoly', icon: Furniture.Table1 },
  { id: 5, slug: 'biurka', icon: Furniture.Desk },
  { id: 6, slug: 'polki', icon: Furniture.Shelves },
  { id: 7, slug: 'szafy', icon: Furniture.Wardrobe },
  { id: 8, slug: 'komody', icon: Furniture.ChestOfDrawers },
  { id: 9, slug: 'lustra', icon: Furniture.Mirror },
  { id: 10, slug: 'szafki-tv', icon: Furniture.TvTable },
  { id: 11, slug: 'lozka', icon: Furniture.DoubleBed },
  { id: 12, slug: 'krzesla', icon: Furniture.DiningChair },
];

export const categoryIcon = <K extends keyof Icon>(key: K, value: Icon[K]): SvgIcon => (
  icons.filter(icon => icon[key] === value)[0].icon
);
