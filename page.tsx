'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, FileText, Users, AlertTriangle, CheckCircle, XCircle, Video } from 'lucide-react'
import Link from "next/link"

export default function Dashboard() {
  const [signedInStaff, setSignedInStaff] = useState([])
  const [shiftResponses, setShiftResponses] = useState([])
  const [expiringItems, setExpiringItems] = useState([])
  const [scheduledAbsences, setScheduledAbsences] = useState([])

  useEffect(() => {
    fetchSignedInStaff()
    fetchShiftResponses()
    fetchExpiringItems()
    fetchScheduledAbsences()

    const interval = setInterval(() => {
      fetchSignedInStaff()
      fetchShiftResponses()
      fetchExpiringItems()
      fetchScheduledAbsences()
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const fetchSignedInStaff = async () => {
    setSignedInStaff([
      { id: 1, name: 'John Doe', site: 'Site A', signInTime: '08:00' },
      { id: 2, name: 'Jane Smith', site: 'Site B', signInTime: '09:15' },
      { id: 3, name: 'Mike Johnson', site: 'Site C', signInTime: '07:45' },
    ])
  }

  const fetchShiftResponses = async () => {
    setShiftResponses([
      { id: 1, name: 'Alice Brown', shift: 'Night Shift', response: 'accepted' },
      { id: 2, name: 'Bob Wilson', shift: 'Day Shift', response: 'declined' },
      { id: 3, name: 'Carol Davis', shift: 'Evening Shift', response: 'pending' },
    ])
  }

  const fetchExpiringItems = async () => {
    setExpiringItems([
      { id: 1, type: 'SIA License', name: 'David Lee', expiryDate: '2023-06-15' },
      { id: 2, type: 'First Aid Certificate', name: 'Emma White', expiryDate: '2023-06-20' },
      { id: 3, type: 'CCTV Certification', name: 'Frank Green', expiryDate: '2023-06-25' },
    ])
  }

  const fetchScheduledAbsences = async () => {
    setScheduledAbsences([
      { id: 1, name: 'Grace Taylor', type: 'Holiday', startDate: '2023-06-10', endDate: '2023-06-17' },
      { id: 2, name: 'Henry Clark', type: 'Training', startDate: '2023-06-12', endDate: '2023-06-14' },
      { id: 3, name: 'Ivy Martin', type: 'Sick Leave', startDate: '2023-06-11', endDate: '2023-06-13' },
    ])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1c3664] mb-8">Security Operations Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <DashboardCard title="Staff Management" icon={<Users className="h-6 w-6" />} link="/staff" />
        <DashboardCard title="Scheduling" icon={<Calendar className="h-6 w-6" />} link="/scheduling" />
        <DashboardCard title="Timesheets" icon={<Clock className="h-6 w-6" />} link="/timesheets" />
        <DashboardCard title="Invoicing" icon={<FileText className="h-6 w-6" />} link="/invoicing" />
        <DashboardCard title="Reports" icon={<FileText className="h-6 w-6" />} link="/reports" />
        <DashboardCard title="Compliance" icon={<AlertTriangle className="h-6 w-6" />} link="/compliance" />
        <DashboardCard title="Training" icon={<Video className="h-6 w-6" />} link="/training" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Currently Signed In Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {signedInStaff.map((staff) => (
                <li key={staff.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={staff.name} />
                      <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-gray-500">{staff.site}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{staff.signInTime}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Shift Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {shiftResponses.map((response) => (
                <li key={response.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={response.name} />
                      <AvatarFallback>{response.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-medium">{response.name}</p>
                      <p className="text-sm text-gray-500">{response.shift}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={response.response === 'accepted' ? 'default' : response.response === 'declined' ? 'destructive' : 'secondary'}
                  >
                    {response.response === 'accepted' && <CheckCircle className="h-4 w-4 mr-1" />}
                    {response.response === 'declined' && <XCircle className="h-4 w-4 mr-1" />}
                    {response.response.charAt(0).toUpperCase() + response.response.slice(1)}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expiring Certifications & Licenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {expiringItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Expires {item.expiryDate}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Absences</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {scheduledAbsences.map((absence) => (
                <li key={absence.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{absence.name}</p>
                    <p className="text-sm text-gray-500">{absence.type}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {absence.startDate} - {absence.endDate}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({ title, icon, link }: { title: string; icon: React.ReactNode; link: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Link href={link}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Manage {title.toLowerCase()}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

