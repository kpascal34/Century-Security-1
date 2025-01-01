'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Check, X, Search } from 'lucide-react'

const timesheets = [
  { id: 1, guard: "John Doe", date: "2023-05-15", hoursWorked: 8, status: "Pending" },
  { id: 2, guard: "Jane Smith", date: "2023-05-14", hoursWorked: 10, status: "Approved" },
  { id: 3, guard: "Mike Johnson", date: "2023-05-13", hoursWorked: 6, status: "Rejected" },
  { id: 4, guard: "Emily Brown", date: "2023-05-12", hoursWorked: 8, status: "Approved" },
]

export default function TimesheetsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTimesheets = timesheets.filter(timesheet => 
    timesheet.guard.toLowerCase().includes(searchTerm.toLowerCase()) ||
    timesheet.date.includes(searchTerm) ||
    timesheet.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1c3664] mb-4 sm:mb-0">Timesheets</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Submit New Timesheet
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Timesheets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Input
              placeholder="Search timesheets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="ghost" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guard</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Hours Worked</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimesheets.map((timesheet) => (
                  <TableRow key={timesheet.id}>
                    <TableCell>{timesheet.guard}</TableCell>
                    <TableCell>{timesheet.date}</TableCell>
                    <TableCell>{timesheet.hoursWorked}</TableCell>
                    <TableCell>{timesheet.status}</TableCell>
                    <TableCell>
                      {timesheet.status === "Pending" && (
                        <>
                          <Button variant="outline" size="sm" className="mr-2">
                            <Check className="mr-2 h-4 w-4" /> Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <X className="mr-2 h-4 w-4" /> Reject
                          </Button>
                        </>
                      )}
                      {timesheet.status !== "Pending" && (
                        <Button variant="outline" size="sm">View</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

