import { useAuth } from '../hooks/useAuth'
import { Layout } from '../components/Layout'
import { useTranslation } from 'react-i18next'
import { Users, Calendar, Truck, DollarSign, TrendingUp, Activity } from 'lucide-react'

export function DashboardPage() {
  const { profile, employee } = useAuth()
  const { t } = useTranslation()

  const isAdmin = profile?.role === 'admin'
  const isClinician = profile?.role === 'clinician'

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  )

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}, {employee?.first_name || profile?.username || 'User'}!
          </h1>
          <p className="text-gray-600">
            {isAdmin && 'Administrator Dashboard - Manage your hospice operations'}
            {isClinician && 'Clinician Dashboard - Track your visits and deliveries'}
            {!isAdmin && !isClinician && 'Dashboard Overview'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isAdmin && (
            <>
              <StatCard
                icon={Users}
                label={t('dashboard.totalPatients')}
                value="--"
                color="blue"
              />
              <StatCard
                icon={Calendar}
                label={t('dashboard.scheduledVisits')}
                value="--"
                color="green"
              />
              <StatCard
                icon={DollarSign}
                label={t('dashboard.monthlyRevenue')}
                value="$--"
                color="purple"
              />
              <StatCard
                icon={TrendingUp}
                label={t('dashboard.monthlyExpenses')}
                value="$--"
                color="orange"
              />
            </>
          )}
          {isClinician && (
            <>
              <StatCard
                icon={Calendar}
                label="Today's Visits"
                value="--"
                color="blue"
              />
              <StatCard
                icon={Truck}
                label="Pending Deliveries"
                value="--"
                color="green"
              />
              <StatCard
                icon={DollarSign}
                label="This Week's Earnings"
                value="$--"
                color="purple"
              />
              <StatCard
                icon={Activity}
                label="Completed Visits"
                value="--"
                color="orange"
              />
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.quickActions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isAdmin && (
              <>
                <button className="btn-primary text-left justify-start">
                  <Users className="w-5 h-5 mr-2" />
                  Add New Patient
                </button>
                <button className="btn-primary text-left justify-start">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Visit
                </button>
                <button className="btn-primary text-left justify-start">
                  <DollarSign className="w-5 h-5 mr-2" />
                  View Reports
                </button>
              </>
            )}
            {isClinician && (
              <>
                <button className="btn-primary text-left justify-start">
                  <Calendar className="w-5 h-5 mr-2" />
                  Start Routesheet
                </button>
                <button className="btn-primary text-left justify-start">
                  <Truck className="w-5 h-5 mr-2" />
                  View Deliveries
                </button>
                <button className="btn-primary text-left justify-start">
                  <Activity className="w-5 h-5 mr-2" />
                  View Earnings
                </button>
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.recentActivity')}</h2>
          <p className="text-gray-500 text-center py-8">
            {t('common.noData')} - Connect your data sources to see activity
          </p>
        </div>
      </div>
    </Layout>
  )
}
