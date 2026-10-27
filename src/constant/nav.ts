interface NavItem {
    label: string;
    count?: string;
    href: string;
  }
  
export const languages = ["PB", "EN", "ES", "FR"] as const;

export const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
    { label: "Sign In", href: "/auth/sign-in" },
    { label: "Get Started", href: "/auth/sign-up" },
  ];