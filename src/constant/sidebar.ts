import { Bell, LayoutDashboard, Library, ReceiptText, Search, Settings } from "lucide-react"
import { ElementType } from "react"

export type NavAction = 'search'
export type NavItemData = {
  id: string
  title: string
  icon: ElementType
  href?: string
  exact?: boolean
  action?: NavAction
  badge?: number | string
  shortcut?: string
  children?: NavItemData[]
}

export type NavGroupData = { heading?: string; items: NavItemData[] }

export function getNav(base: string): { groups: NavGroupData[]; } {
  return {
    groups: [
      {
        items: [
          { id: 'search', title: 'Search', icon: Search, shortcut: '⌘K', action: 'search' },
          { id: 'home', title: 'Home', icon: LayoutDashboard, href: base, exact: true },
          { id: 'library', title: 'My Library', icon: Library, href: `${base}/my-library` },
          { id: 'notifications', title: 'Notifications', icon: Bell, href: `${base}/notiifcations`,badge: 12  },
          { id: 'billing', title: 'Billing', icon: ReceiptText , href: `${base}/billing` },
          { id: 'settings', title: 'Settings', icon: Settings, href: `${base}/settings`},
        ],
      },
    ],
  }
}

export function isItemActive(item: NavItemData, pathname: string) {
  if (!item.href) return false
  if (item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(item.href + '/')
}