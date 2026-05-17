import { ReactNode, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  LogOut,
  User,
  LayoutDashboard,
  Users,
  UserCog,
  Truck,
  Package,
  FileText,
  DollarSign,
  Warehouse,
  Settings,
  TrendingUp,
  Calendar,
  Home,
  X,
  Languages
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

interface LayoutProps {
  children: ReactNode
}

interface NavItem {
  to: string
  icon: any
  label: string
  roles?: string[]
}

export function Layout({ children }: LayoutProps) {
  const { authUser, profile, employee, signOut } = useAuth()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  const navigationItems: NavItem[] = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('navigation.dashboard') },
    { to: '/patients', icon: Users, label: t('navigation.patients'), roles: ['admin'] },
    { to: '/employees', icon: UserCog, label: t('navigation.employees'), roles: ['admin'] },
    { to: '/deliveries', icon: Truck, label: t('navigation.deliveries') },
    { to: '/pickups', icon: Package, label: t('navigation.pickups') },
    { to: '/routesheet', icon: Calendar, label: t('navigation.routesheet'), roles: ['clinician'] },
    { to: '/earnings', icon: TrendingUp, label: t('navigation.earnings'), roles: ['clinician'] },
    { to: '/payroll', icon: DollarSign, label: t('navigation.payroll'), roles: ['admin'] },
    { to: '/inventory', icon: Warehouse, label: t('navigation.inventory'), roles: ['admin'] },
    { to: '/financial', icon: FileText, label: t('navigation.financial'), roles: ['admin'] },
    { to: '/reports', icon: FileText, label: t('navigation.reports'), roles: ['admin'] },
    { to: '/settings', icon: Settings, label: t('navigation.settings'), roles: ['admin'] },
  ]

  const filteredNavigation = navigationItems.filter(item => {
    if (!item.roles) return true
    return item.roles.includes(profile?.role || '')
  })

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.to
    const Icon = item.icon

    return (
      <Link
        to={item.to}
        onClick={() => setMobileMenuOpen(false)}
        className={classNames(
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
          {
            'bg-blue-50 text-blue-600': isActive,
            'text-gray-700 hover:bg-gray-50': !isActive,
          }
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl">MyHospiOps</span>
          </div>
          <button onClick={toggleLanguage} className="p-2 rounded-lg hover:bg-gray-100">
            <Languages className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-xl overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-6 h-6 text-blue-600" />
                  <span className="font-bold text-xl">MyHospiOps</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {employee?.first_name && employee?.last_name
                        ? `${employee.first_name} ${employee.last_name}`
                        : authUser?.email?.split('@')[0]}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {employee?.position || profile?.role || 'User'}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-1">
                {filteredNavigation.map((item) => (
                  <NavLink key={item.to} item={item} />
                ))}
              </nav>

              <div className="p-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Languages className="w-5 h-5" />
                  <span className="font-medium">{i18n.language === 'en' ? 'Español' : 'English'}</span>
                </button>
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t('navigation.logout')}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-2xl">MyHospiOps</span>
            </div>
            <p className="text-sm text-gray-600">{t('app.description')}</p>
          </div>

          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {employee?.first_name && employee?.last_name
                    ? `${employee.first_name} ${employee.last_name}`
                    : authUser?.email?.split('@')[0]}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {employee?.position || profile?.role || 'User'}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink key={item.to} item={item} />
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Languages className="w-5 h-5" />
              <span className="font-medium">{i18n.language === 'en' ? 'Español' : 'English'}</span>
            </button>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{t('navigation.logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">{children}</main>
    </div>
  )
}
