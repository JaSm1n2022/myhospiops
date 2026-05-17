// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CLINICIAN: 'clinician',
  USER: 'user',
} as const

// Employee status
export const EMPLOYEE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

// Patient status
export const PATIENT_STATUS = {
  ACTIVE: 'active',
  DISCHARGED: 'discharged',
  DECEASED: 'deceased',
} as const

// Clinical positions/disciplines
export const CLINICAL_POSITIONS = [
  'RN',
  'LPN',
  'CNA',
  'MSW',
  'Chaplain',
  'Volunteer',
  'Physical Therapist',
  'Occupational Therapist',
  'Speech Therapist',
  'Bereavement Counselor',
] as const

// Service codes
export const SERVICE_CODES = [
  { code: 'SN', label: 'Skilled Nursing', color: 'blue' },
  { code: 'HHA', label: 'Home Health Aide', color: 'green' },
  { code: 'MSW', label: 'Medical Social Worker', color: 'purple' },
  { code: 'CHAP', label: 'Chaplain', color: 'orange' },
  { code: 'PT', label: 'Physical Therapy', color: 'cyan' },
  { code: 'OT', label: 'Occupational Therapy', color: 'pink' },
  { code: 'ST', label: 'Speech Therapy', color: 'teal' },
  { code: 'BC', label: 'Bereavement Counseling', color: 'gray' },
  { code: 'VOL', label: 'Volunteer', color: 'yellow' },
] as const

// Invoice/Transaction status
export const INVOICE_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
} as const

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const

// Delivery/Pickup status
export const DELIVERY_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

// Routesheet status
export const ROUTESHEET_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
} as const

// Paycheck status
export const PAYCHECK_STATUS = {
  PENDING: 'pending',
  PROCESSED: 'processed',
  PAID: 'paid',
} as const

// Contract status
export const CONTRACT_STATUS = {
  ACTIVE: 'active',
  TERMINATED: 'terminated',
} as const
