'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function AvailableShifts() {
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    fetch('/api/shifts/available')
      .then(response => response.json())
      .then(data => setShifts(data))
  }, [])

  const handleApply = (shiftId) => {
    fetch('/api/shifts/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shiftId }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful application (e.g., show a success message)
        console.log(data.message)
      })
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-[#1c3664] mb-6">Available Shifts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Open Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.site}</TableCell>
                  <TableCell>{shift.date}</TableCell>
                  <TableCell>{shift.time}</TableCell>
                  <TableCell>{shift.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleApply(shift.id)}>Apply</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

