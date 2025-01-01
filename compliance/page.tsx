'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export default function CompliancePage() {
  const [complianceItems, setComplianceItems] = useState([])

  useEffect(() => {
    fetchComplianceItems()
  }, [])

  const fetchComplianceItems = async () => {
    // In a real application, this would be an API call
    setComplianceItems([
      { id: 1, name: 'John Doe', type: 'SIA License', status: 'valid', expiryDate: '2024-05-15' },
      { id: 2, name: 'Jane Smith', type: 'First Aid Certificate', status: 'expiring', expiryDate: '2023-07-20' },
      { id: 3, name: 'Mike Johnson', type: 'CCTV Certification', status: 'expired', expiryDate: '2023-05-01' },
      { id: 4, name: 'Alice Brown', type: 'SIA License', status: 'valid', expiryDate: '2024-08-30' },
      { id: 5, name: 'Bob Wilson', type: 'Health & Safety Training', status: 'expiring', expiryDate: '2023-06-15' },
    ])
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'valid':
        return <Badge variant="outline" className="bg-green-100 text-green-800"><CheckCircle className="h-4 w-4 mr-1" /> Valid</Badge>
      case 'expiring':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-4 w-4 mr-1" /> Expiring Soon</Badge>
      case 'expired':
        return <Badge variant="outline" className="bg-red-100 text-red-800"><XCircle className="h-4 w-4 mr-1" /> Expired</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1c3664] mb-8">Compliance Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Staff Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Compliance Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Update</Button>
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

