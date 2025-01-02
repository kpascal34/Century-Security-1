export interface Shift {
  id: string
  startTime: string
  endTime: string
  venue: Venue
  employee: Employee
  status: 'pending' | 'confirmed' | 'rejected'
  mealBreak: number
  cost: number
  chargeOut: number
  published: boolean
}

export interface Venue {
  id: string
  name: string
  address: string
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  currentLocation: string
  rating: number
}

export interface PublishOptions {
  byPerson: boolean
  bySite: boolean
  selectedDays: string[]
  selectedEmployees: string[]
  notificationMethods: {
    email: boolean
    mobileApp: boolean
    sms: boolean
  }
}

export interface WeeklyReport {
  totalShifts: number
  unfilledShifts: number
  filledHours: number
  filledCost: number
} 