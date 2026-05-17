import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function UnauthorizedPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('auth.unauthorized')}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('auth.unauthorizedMessage')}
        </p>
        <Link to="/dashboard" className="btn-primary">
          {t('common.back')} to Dashboard
        </Link>
      </div>
    </div>
  )
}
