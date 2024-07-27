
export interface NavItem {
  link?: string;
  label: string;
  value: string;
  children?: NavItem[];
  checked?: boolean;
}

export interface NavModule {
  label: string;
  children: NavItem[];
}