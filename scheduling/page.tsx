'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

export default function SchedulingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [staff, setStaff] = useState([])
  const [selectedStaff, setSelectedStaff] = useState([])
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    fetchStaff()
    fetchShifts()
  }, [])

  const fetchStaff = async () => {
    // In a real application, this would be an API call
    setStaff([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Mike Johnson' },
      { id: 4, name: 'Alice Brown' },
      { id: 5, name: 'Bob Wilson' },
    ])
  }

  const fetchShifts = async () => {
    // In a real application, this would be an API call
    setShifts([
      { id: 1, date: '2023-06-10', time: '08:00-16:00', staff: 'John Doe' },
      { id: 2, date: '2023-06-10', time: '16:00-00:00', staff: 'Jane Smith' },
      { id: 3, date: '2023-06-11', time: '00:00-08:00', staff: 'Mike Johnson' },
    ])
  }

  const handleStaffSelect = (staffId) => {
    setSelectedStaff((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId]
    )
  }

  const handleAddShift = () => {
    // In a real application, this would open a modal or form to add a new shift
    console.log('Add new shift')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1c3664] mb-8">Scheduling</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-1/4">
          <CardHeader>
            <CardTitle>Staff Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="search">Search Staff</Label>
              <Input id="search" placeholder="Search..." />
            </div>
            <ScrollArea className="h-[300px]">
              {staff.map((member) => (
                <div key={member.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`staff-${member.id}`}
                    checked={selectedStaff.includes(member.id)}
                    onCheckedChange={() => handleStaffSelect(member.id)}
                  />
                  <Label htmlFor={`staff-${member.id}`}>{member.name}</Label>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:w-3/4">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {date?.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Shifts for {date?.toLocaleDateString()}</h3>
                <Button onClick={handleAddShift}>
                  <Plus className="mr-2 h-4 w-4" /> Add Shift
                </Button>
              </div>
              {shifts
                .filter((shift) => shift.date === date?.toISOString().split('T')[0])
                .map((shift) => (
                  <div key={shift.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                    <span>{shift.time}</span>
                    <span>{shift.staff}</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

