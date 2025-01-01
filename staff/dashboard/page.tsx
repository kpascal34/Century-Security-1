import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText } from 'lucide-react'
import Link from "next/link"

export default function StaffDashboard() {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-[#1c3664] mb-6">Staff Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Available Shifts" 
          icon={<Calendar className="h-6 w-6" />}
          content="5 shifts available"
          link="/staff/shifts"
        />
        <DashboardCard 
          title="My Schedule" 
          icon={<Clock className="h-6 w-6" />}
          content="Next shift: Today, 18:00"
          link="/staff/schedule"
        />
        <DashboardCard 
          title="My Timesheets" 
          icon={<FileText className="h-6 w-6" />}
          content="2 pending approvals"
          link="/staff/timesheets"
        />
      </div>
    </div>
  )
}

function DashboardCard({ title, icon, content, link }: { title: string; icon: React.ReactNode; content: string; link: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{content}</p>
        <Link href={link}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

