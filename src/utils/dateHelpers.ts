import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (date: string | Date, format: string = 'MMM D, YYYY'): string => {
  return dayjs(date).format(format)
}

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('MMM D, YYYY h:mm A')
}

export const formatTime = (date: string | Date): string => {
  return dayjs(date).format('h:mm A')
}

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow()
}

export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day')
}

export const isTomorrow = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
}

export const isYesterday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

export const getDaysBetween = (date1: string | Date, date2: string | Date): number => {
  return dayjs(date1).diff(dayjs(date2), 'day')
}

export const addDays = (date: string | Date, days: number): Date => {
  return dayjs(date).add(days, 'day').toDate()
}

export const subtractDays = (date: string | Date, days: number): Date => {
  return dayjs(date).subtract(days, 'day').toDate()
}
