// User and Authentication Types
export interface AuthUser {
  id: string
  email: string
  created_at: string
}

export interface Profile {
  id: string
  username: string | null
  role: 'admin' | 'clinician' | 'user'
  company_id: string | null
  created_at: string
  updated_at: string
}

export interface Employee {
  id: string
  email: string
  company_id: string
  position: string
  status: 'active' | 'inactive'
  first_name: string
  last_name: string
  phone: string | null
  created_at: string
  updated_at: string
}

// Patient Types
export interface Patient {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string
  admission_date: string | null
  status: 'active' | 'discharged' | 'deceased'
  address: string | null
  phone: string | null
  emergency_contact: string | null
  company_id: string
  created_at: string
  updated_at: string
}

// Vendor and Product Types
export interface Vendor {
  id: string
  name: string
  contact_email: string | null
  contact_phone: string | null
  address: string | null
  company_id: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string | null
  company_id: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  category_id: string
  vendor_id: string
  unit_price: number
  stock_quantity: number
  company_id: string
  created_at: string
  updated_at: string
}

// Financial Types
export interface Invoice {
  id: string
  invoice_number: string
  vendor_id: string
  invoice_date: string
  due_date: string | null
  total_amount: number
  status: 'pending' | 'paid' | 'overdue'
  company_id: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  transaction_date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
  company_id: string
  created_at: string
}

// Payroll Types
export interface Contract {
  id: string
  employee_id: string
  start_date: string
  end_date: string | null
  contract_type: string
  salary: number
  status: 'active' | 'terminated'
  company_id: string
  created_at: string
  updated_at: string
}

export interface Paycheck {
  id: string
  employee_id: string
  pay_period_start: string
  pay_period_end: string
  gross_pay: number
  net_pay: number
  deductions: number
  status: 'pending' | 'processed' | 'paid'
  company_id: string
  created_at: string
}

// Delivery and Logistics Types
export interface Delivery {
  id: string
  patient_id: string
  employee_id: string
  scheduled_date: string
  completed_date: string | null
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  items: string // JSON string
  notes: string | null
  company_id: string
  created_at: string
  updated_at: string
}

export interface Pickup {
  id: string
  patient_id: string
  employee_id: string
  scheduled_date: string
  completed_date: string | null
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  items: string // JSON string
  notes: string | null
  company_id: string
  created_at: string
  updated_at: string
}

// Routesheet Types
export interface Routesheet {
  id: string
  employee_id: string
  date: string
  visits: Visit[]
  total_mileage: number
  status: 'draft' | 'submitted' | 'approved'
  company_id: string
  created_at: string
  updated_at: string
}

export interface Visit {
  id: string
  routesheet_id: string
  patient_id: string
  visit_time: string
  service_type: string
  duration: number // minutes
  notes: string | null
  signature: string | null
  created_at: string
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalPatients: number
  activePatients: number
  scheduledVisits: number
  pendingDeliveries: number
  monthlyRevenue: number
  monthlyExpenses: number
  employeeCount: number
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: 'patient_admission' | 'visit_completed' | 'delivery_completed' | 'invoice_paid' | 'employee_added'
  description: string
  timestamp: string
  user_id: string
}

// Common utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T> {
  data: T | null
  error: Error | null
  loading: boolean
}
