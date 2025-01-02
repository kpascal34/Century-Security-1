'use client'

import { useState, useEffect } from 'react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import { CalendarDaysIcon, UserGroupIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import ShiftModal from '@/components/scheduling/ShiftModal'
import WeeklyCalendar from '@/components/scheduling/WeeklyCalendar'
import VenueList from '@/components/scheduling/VenueList'
import StaffList from '@/components/scheduling/StaffList'

export default function SchedulingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false)
  const [selectedView, setSelectedView] = useState<'calendar' | 'venues' | 'staff'>('calendar')

  const startDate = startOfWeek(selectedDate)
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scheduling</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage shifts, staff assignments, and venue coverage
            </p>
          </div>
          <div className="mt-4 flex sm:mt-0">
            <Button
              onClick={() => setIsShiftModalOpen(true)}
              className="inline-flex items-center"
            >
              Create New Shift
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="sm:hidden">
            <Label htmlFor="view-selector" className="sr-only">
              Select a view
            </Label>
            <select
              id="view-selector"
              className="block w-full rounded-md border-gray-300 py-2"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value as any)}
            >
              <option value="calendar">Calendar View</option>
              <option value="venues">Venues</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              <Button
                variant={selectedView === 'calendar' ? 'default' : 'ghost'}
                onClick={() => setSelectedView('calendar')}
                className="inline-flex items-center"
              >
                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                Calendar
              </Button>
              <Button
                variant={selectedView === 'venues' ? 'default' : 'ghost'}
                onClick={() => setSelectedView('venues')}
                className="inline-flex items-center"
              >
                <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                Venues
              </Button>
              <Button
                variant={selectedView === 'staff' ? 'default' : 'ghost'}
                onClick={() => setSelectedView('staff')}
                className="inline-flex items-center"
              >
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Staff
              </Button>
            </nav>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {selectedView === 'calendar' && (
              <WeeklyCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            )}
            {selectedView === 'venues' && <VenueList />}
            {selectedView === 'staff' && <StaffList />}
          </CardContent>
        </Card>
      </div>

      <ShiftModal
        isOpen={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  )
} 