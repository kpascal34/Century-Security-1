'use client'

import { useState } from 'react'
import { format, startOfWeek, addDays, addWeeks, addHours } from 'date-fns'
import type { Shift, Employee, Venue, WeeklyReport } from '@/types/schedule'

interface CompletedShift {
  id: string
  shift: {
    date: Date
    startTime: string
    finishTime: string
    venue: Venue
  }
  staff: Employee
  status: 'pending' | 'approved' | 'denied'
  notes?: string
  submittedAt: Date
  extras: any[]
}

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport>({
    totalShifts: 5,
    unfilledShifts: 2,
    filledHours: 12.5,
    filledCost: 83.25,
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Employee | null>(null)
  const [sendEmail, setSendEmail] = useState(true)
  const [sendSMS, setSendSMS] = useState(false)
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false)
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false)
  const [shifts, setShifts] = useState<{
    id: string;
    venue: Venue;
    date: Date;
    assignments: { staff: Employee; startTime: string; finishTime: string }[];
  }[]>([
    {
      id: '1',
      venue: { id: '1', name: 'Eiger Studios - Eiger Music Studios', address: '123 Main St' },
      date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 2),
      assignments: [
        { staff: { id: '2', name: 'Harris Bryson', email: 'harris@example.com', phone: '987654321', currentLocation: '1', rating: 4.0 }, startTime: '22:00', finishTime: '02:00' },
        { staff: { id: '1', name: 'Mark Flack', email: 'mark@example.com', phone: '123456789', currentLocation: '1', rating: 4.5 }, startTime: '22:00', finishTime: '02:00' },
      ]
    },
    {
      id: '2',
      venue: { id: '2', name: 'Mad Frans Bar - Mad Frans Bar', address: '456 High St' },
      date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 6),
      assignments: [
        { staff: { id: '3', name: 'Kingsley Pascal', email: 'kingsley@example.com', phone: '456789123', currentLocation: '2', rating: 4.5 }, startTime: '19:00', finishTime: '23:30' },
      ]
    }
  ])

  // Mock data - replace with API calls
  const venues: Venue[] = [
    { id: '1', name: 'Eiger Studios - Eiger Music Studios', address: '123 Main St' },
    { id: '2', name: 'Mad Frans Bar - Mad Frans Bar', address: '456 High St' },
    { id: '3', name: 'Sunbridge Wells - Sunbridgewells', address: '789 Market St' }
  ]

  const employees: Employee[] = [
    { id: '1', name: 'Mark Flack', email: 'mark@example.com', phone: '123456789', currentLocation: '1', rating: 4.5 },
    { id: '2', name: 'Harris Bryson', email: 'harris@example.com', phone: '987654321', currentLocation: '1', rating: 4.0 },
    { id: '3', name: 'Kingsley Pascal', email: 'kingsley@example.com', phone: '456789123', currentLocation: '2', rating: 4.5 }
  ]

  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = [...Array(7)].map((_, i) => addDays(startOfCurrentWeek, i))

  const handlePublish = async () => {
    if (!selectedShift) return

    try {
      const response = await fetch('/api/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shift: selectedShift,
          publishOptions: {
            byPerson: true,
            bySite: false,
            selectedDays: [format(selectedDate, 'yyyy-MM-dd')],
            selectedEmployees: [selectedShift.employee.id],
            notificationMethods: {
              email: sendEmail,
              mobileApp: true,
              sms: sendSMS,
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Failed to publish shift')
      
      // Handle success
    } catch (error) {
      // Handle error
      console.error('Failed to publish shift:', error)
    }
  }

  const handleAddShift = (day: Date, venue: Venue) => {
    setSelectedDay(day)
    setSelectedVenue(venue)
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
    setSelectedDay(null)
    setSelectedVenue(null)
  }

  const handleAddStaffToShift = () => {
    if (!selectedDay || !selectedVenue) return

    const newShift = {
      id: Math.random().toString(),
      venue: selectedVenue,
      date: selectedDay,
      assignments: []
    }

    setShifts([...shifts, newShift])
  }

  const handleAddStaffAssignment = (shiftId: string) => {
    setShifts(shifts.map(shift => {
      if (shift.id === shiftId) {
        return {
          ...shift,
          assignments: [...shift.assignments, { 
            staff: employees[0], 
            startTime: format(new Date(), 'HH:mm'),
            finishTime: format(addHours(new Date(), 4), 'HH:mm')
          }]
        }
      }
      return shift
    }))
  }

  const handleUpdateStaffAssignment = (
    shiftId: string,
    assignmentIndex: number,
    field: 'staff' | 'startTime' | 'finishTime',
    value: any
  ) => {
    setShifts(shifts.map(shift => {
      if (shift.id === shiftId) {
        const newAssignments = [...shift.assignments]
        if (field === 'staff') {
          const selectedEmployee = employees.find(emp => emp.id === value)
          if (!selectedEmployee) return shift
          newAssignments[assignmentIndex][field] = selectedEmployee
        } else {
          // Validate time format
          const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
          if (!timeRegex.test(value)) return shift
          newAssignments[assignmentIndex][field] = value
        }
        return { ...shift, assignments: newAssignments }
      }
      return shift
    }))
  }

  const handleRemoveStaffAssignment = (shiftId: string, assignmentIndex: number) => {
    setShifts(shifts.map(shift => {
      if (shift.id === shiftId) {
        const newAssignments = shift.assignments.filter((_, index) => index !== assignmentIndex)
        return { ...shift, assignments: newAssignments }
      }
      return shift
    }))
  }

  const handleDuplicateStaffAssignment = (shiftId: string, assignmentIndex: number) => {
    setShifts(shifts.map(shift => {
      if (shift.id === shiftId) {
        const assignmentToDuplicate = shift.assignments[assignmentIndex]
        return {
          ...shift,
          assignments: [...shift.assignments, { ...assignmentToDuplicate }]
        }
      }
      return shift
    }))
  }

  const handleSaveSiteTemplate = () => {
    // Implementation for saving site template
    console.log('Saving site template')
    setIsTemplateMenuOpen(false)
  }

  const handleLoadSiteTemplate = () => {
    // Implementation for loading site template
    console.log('Loading site template')
    setIsTemplateMenuOpen(false)
  }

  const handleCopyWeek = () => {
    const nextWeekShifts = shifts.map(shift => ({
      ...shift,
      id: Math.random().toString(),
      date: addWeeks(shift.date, 1)
    }))
    setShifts([...shifts, ...nextWeekShifts])
    setIsTemplateMenuOpen(false)
  }

  const calculateVenueStats = (venue: Venue) => {
    const venueShifts = shifts.filter(shift => shift.venue.id === venue.id)
    const totalHours = venueShifts.reduce((total, shift) => {
      return total + shift.assignments.reduce((shiftTotal, assignment) => {
        const start = new Date(`2000-01-01T${assignment.startTime}:00`)
        const end = new Date(`2000-01-01T${assignment.finishTime}:00`)
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
        return shiftTotal + hours
      }, 0)
    }, 0)
    const totalCost = totalHours * 15 // Example hourly rate

    return { hours: totalHours.toFixed(1), cost: totalCost.toFixed(2) }
  }

  const handleMarkCompleted = async (shift: typeof shifts[0], assignment: typeof shifts[0]['assignments'][0]) => {
    const completedShift: CompletedShift = {
      id: Math.random().toString(),
      shift: {
        date: shift.date,
        startTime: assignment.startTime,
        finishTime: assignment.finishTime,
        venue: shift.venue
      },
      staff: assignment.staff,
      status: 'pending',
      submittedAt: new Date(),
      notes: '',
      extras: []
    }

    try {
      // Send to API
      const response = await fetch('/api/shifts/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(completedShift)
      })

      if (!response.ok) {
        throw new Error('Failed to mark shift as completed')
      }
      
      // Remove the assignment from the shift
      setShifts(shifts.map(s => {
        if (s.id === shift.id) {
          return {
            ...s,
            assignments: s.assignments.filter(a => a.staff.id !== assignment.staff.id)
          }
        }
        return s
      }))

      // Show success message
      alert('Shift marked as completed and sent for approval')
    } catch (error) {
      console.error('Failed to submit completed shift:', error)
      alert('Failed to mark shift as completed')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex flex-col h-full">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium">Today</button>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded">←</button>
                <span className="text-sm font-medium">Dec 30 - 05</span>
                <button className="p-1 hover:bg-gray-100 rounded">→</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div 
                className="relative"
                onMouseLeave={() => setIsTemplateMenuOpen(false)}
              >
                <button 
                  onMouseEnter={() => setIsTemplateMenuOpen(true)}
                  className="px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-gray-50"
                >
                  Site Template
                </button>
                {isTemplateMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={handleSaveSiteTemplate}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Save Site Template
                    </button>
                    <button
                      onClick={handleLoadSiteTemplate}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Load Site Template
                    </button>
                    <button
                      onClick={handleCopyWeek}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Copy Week
                    </button>
                  </div>
                )}
              </div>
              <div 
                className="relative"
                onMouseLeave={() => setIsActionsMenuOpen(false)}
              >
                <button 
                  onMouseEnter={() => setIsActionsMenuOpen(true)}
                  className="px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-gray-50"
                >
                  Actions
                </button>
                {isActionsMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={() => setIsActionsMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Re-order Sites
                    </button>
                    <button
                      onClick={() => setIsActionsMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Make Sites Alphabetical
                    </button>
                  </div>
                )}
              </div>
              <button className="px-4 py-2 text-sm font-medium bg-century-gold text-white rounded-md hover:bg-century-gold-dark">
                Publish & Notify
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, dayIndex) => (
              <div key={day.toString()} className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-medium">
                    {format(day, 'EEE d MMM')}
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {venues.map((venue) => {
                    const stats = calculateVenueStats(venue)
                    return (
                      <div key={venue.id} className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-xs font-medium text-gray-600">{venue.name}</h4>
                          <div className="text-xs text-gray-500">
                            {stats.hours}hrs | £{stats.cost}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {shifts
                            .filter(shift => 
                              format(shift.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && 
                              shift.venue.id === venue.id
                            )
                            .map(shift => (
                              <div key={shift.id}>
                                {shift.assignments.map((assignment, index) => (
                                  <div 
                                    key={index}
                                    className="group relative bg-yellow-100 p-2 rounded text-xs cursor-pointer hover:bg-yellow-200"
                                  >
                                    <div>{assignment.startTime} - {assignment.finishTime}</div>
                                    <div className="font-medium">{assignment.staff.name}</div>
                                    <div className="absolute inset-y-0 right-0 hidden group-hover:flex items-center pr-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleMarkCompleted(shift, assignment)
                                        }}
                                        className="text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        Complete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))
                          }
                          <button
                            onClick={() => handleAddShift(day, venue)}
                            className="w-full p-2 text-xs text-blue-600 hover:bg-blue-50 rounded border border-dashed border-blue-300"
                          >
                            + Add Shift
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 text-right">
                    {dayIndex === 6 ? '4.5 hrs | £83.25' : '0 hrs | £0'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Report */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-6">Weekly Report</h2>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500">Total Shifts</p>
                <p className="text-2xl font-bold">{weeklyReport.totalShifts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unfilled Shifts</p>
                <p className="text-2xl font-bold">{weeklyReport.unfilledShifts}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Filled Hours</p>
                <p className="text-2xl font-bold">{weeklyReport.filledHours}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Filled Cost</p>
                <p className="text-2xl font-bold">£{weeklyReport.filledCost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && selectedDay && selectedVenue && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-medium">{selectedVenue.name}</h2>
              <p className="text-sm text-gray-500">{format(selectedDay, 'EEEE, MMMM d')}</p>
            </div>
            <button onClick={handleCloseSidebar} className="text-gray-500 hover:text-gray-700">
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            {shifts
              .filter(shift => 
                format(shift.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd') && 
                shift.venue.id === selectedVenue.id
              )
              .map(shift => (
                <div key={shift.id} className="border-t pt-6">
                  <div className="space-y-4">
                    {shift.assignments.map((assignment, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Staff Member</label>
                            <select
                              value={assignment.staff.id}
                              onChange={(e) => handleUpdateStaffAssignment(shift.id, index, 'staff', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                              {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Start Time</label>
                              <input
                                type="time"
                                value={assignment.startTime}
                                onChange={(e) => handleUpdateStaffAssignment(shift.id, index, 'startTime', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">End Time</label>
                              <input
                                type="time"
                                value={assignment.finishTime}
                                onChange={(e) => handleUpdateStaffAssignment(shift.id, index, 'finishTime', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleDuplicateStaffAssignment(shift.id, index)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleRemoveStaffAssignment(shift.id, index)}
                              className="text-sm text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddStaffAssignment(shift.id)}
                      className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                    >
                      Add Staff
                    </button>
                  </div>
                </div>
              ))}
            
            {shifts.filter(shift => 
              format(shift.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd') && 
              shift.venue.id === selectedVenue.id
            ).length === 0 && (
              <button
                onClick={handleAddStaffToShift}
                className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Create New Shift
              </button>
            )}

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={() => setSendEmail(!sendEmail)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Send Email</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={sendSMS}
                  onChange={() => setSendSMS(!sendSMS)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Send SMS</label>
              </div>
            </div>
            <button
              onClick={handlePublish}
              className="w-full px-4 py-2 bg-century-gold text-white rounded-md hover:bg-century-gold-dark"
            >
              Publish & Notify
            </button>
          </div>
        </div>
      )}
    </main>
  )
} 