'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("customers")

  const renderCustomersTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Manage Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input id="customerName" placeholder="Enter customer name" />
            </div>
            <div>
              <Label htmlFor="customerRate">Rate Charged (£/hour)</Label>
              <Input id="customerRate" type="number" placeholder="Enter rate" />
            </div>
          </div>
          <Button>Add Customer</Button>
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Rate (£/hour)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>ABC Corp</TableCell>
                <TableCell>25.00</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

  const renderVenuesTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Manage Venues</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="venueName">Venue Name</Label>
              <Input id="venueName" placeholder="Enter venue name" />
            </div>
            <div>
              <Label htmlFor="venueAddress">Address</Label>
              <Input id="venueAddress" placeholder="Enter venue address" />
            </div>
          </div>
          <Button>Add Venue</Button>
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venue Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>XYZ Nightclub</TableCell>
                <TableCell>123 Party St, London</TableCell><TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

  const renderStaffRatesTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Manage Staff Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="staffName">Staff Name</Label>
              <Input id="staffName" placeholder="Enter staff name" />
            </div>
            <div>
              <Label htmlFor="staffRate">Rate Earned (£/hour)</Label>
              <Input id="staffRate" type="number" placeholder="Enter rate" />
            </div>
          </div>
          <Button>Add Staff Rate</Button>
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Name</TableHead>
                <TableHead>Rate (£/hour)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>15.00</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

  const renderApiIntegrationTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>API Integrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="siaApiKey">SIA API Key</Label>
            <Input id="siaApiKey" type="password" placeholder="Enter SIA API key" />
          </div>
          <div>
            <Label htmlFor="xeroApiKey">Xero API Key</Label>
            <Input id="xeroApiKey" type="password" placeholder="Enter Xero API key" />
          </div>
          <div>
            <Label htmlFor="googleCalendarApiKey">Google Calendar API Key</Label>
            <Input id="googleCalendarApiKey" type="password" placeholder="Enter Google Calendar API key" />
          </div>
          <Button>Save API Keys</Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1c3664] mb-8">Settings</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="staffRates">Staff Rates</TabsTrigger>
          <TabsTrigger value="apiIntegration">API Integration</TabsTrigger>
        </TabsList>
        <TabsContent value="customers">{renderCustomersTab()}</TabsContent>
        <TabsContent value="venues">{renderVenuesTab()}</TabsContent>
        <TabsContent value="staffRates">{renderStaffRatesTab()}</TabsContent>
        <TabsContent value="apiIntegration">{renderApiIntegrationTab()}</TabsContent>
      </Tabs>
    </div>
  )
}

