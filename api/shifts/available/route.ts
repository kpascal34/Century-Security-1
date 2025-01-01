import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would fetch this data from your database
  const availableShifts = [
    { id: 1, site: "Site A", date: "2023-05-20", time: "08:00 - 16:00", status: "Open" },
    { id: 2, site: "Site B", date: "2023-05-21", time: "16:00 - 00:00", status: "Open" },
    { id: 3, site: "Site C", date: "2023-05-22", time: "00:00 - 08:00", status: "Open" },
    { id: 4, site: "Site A", date: "2023-05-23", time: "08:00 - 16:00", status: "Open" },
  ]

  return NextResponse.json(availableShifts)
}

