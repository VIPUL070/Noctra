import { Bell, LayoutDashboard, Library, ReceiptText, Search, Settings, Briefcase, Users } from "lucide-react"
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
        heading: 'Menu',
        items: [
          { id: 'search', title: 'Search', icon: Search, shortcut: '⌘K', action: 'search' },
          { id: 'home', title: 'Home', icon: LayoutDashboard, href:`${base}/home` },
          { id: 'library', title: 'My Library', icon: Library, href: `${base}`,exact: true  },
          { id: 'notifications', title: 'Notifications', icon: Bell, href: `${base}/notifications`,badge: 12  },
          { id: 'billing', title: 'Billing', icon: ReceiptText , href: `${base}/billing` },
          { id: 'settings', title: 'Settings', icon: Settings, href: `${base}/settings`},
        ],
      },
    ],
  }
}

export type WorkspaceLite = { id: string; name: string; type: string }

export function getWorkspaceNav(workspaces: WorkspaceLite[]): NavGroupData {
  return {
    heading: "Workspaces",
    items: workspaces.map((w) => ({
      id: w.id,
      title: w.name,
      icon: w.type === "PUBLIC" ? Users : Briefcase,
      href: `/dashboard/${w.id}`,
    })),
  }
}
export function getSharedWorkspaceNav(workspaces: WorkspaceLite[]): NavGroupData {
  return {
    heading: "Shared Workspaces",
    items: workspaces.map((w) => ({
      id: w.id,
      title: w.name,
      icon: w.type === "PUBLIC" ? Users : Briefcase,
      href: `/dashboard/${w.id}`,
    })),
  }
}

export function isItemActive(item: NavItemData, pathname: string) {
  if (!item.href) return false
  if (item.exact) return pathname === item.href
  return pathname === item.href || pathname.startsWith(item.href + '/')
}