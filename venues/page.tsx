'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 51.5074,
  lng: -0.1278
}

export default function VenuesPage() {
  const [venues, setVenues] = useState([
    { id: 1, name: "XYZ Nightclub", address: "123 Party St, London", lat: 51.5074, lng: -0.1278 },
    { id: 2, name: "ABC Arena", address: "456 Concert Ave, Manchester", lat: 53.4808, lng: -2.2426 },
  ])
  const [newVenue, setNewVenue] = useState({ name: '', address: '', lat: '', lng: '' })

  const addVenue = (e) => {
    e.preventDefault()
    setVenues([...venues, { id: venues.length + 1, ...newVenue }])
    setNewVenue({ name: '', address: '', lat: '', lng: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1c3664] mb-8">Manage Venues</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Venue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addVenue} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venueName">Venue Name</Label>
                <Input 
                  id="venueName" 
                  value={newVenue.name} 
                  onChange={(e) => setNewVenue({...newVenue, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="venueAddress">Address</Label>
                <Input 
                  id="venueAddress" 
                  value={newVenue.address} 
                  onChange={(e) => setNewVenue({...newVenue, address: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="venueLat">Latitude</Label>
                <Input 
                  id="venueLat" 
                  value={newVenue.lat} 
                  onChange={(e) => setNewVenue({...newVenue, lat: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="venueLng">Longitude</Label>
                <Input 
                  id="venueLng" 
                  value={newVenue.lng} 
                  onChange={(e) => setNewVenue({...newVenue, lng: e.target.value})}
                  required
                />
              </div>
            </div>
            <Button type="submit">Add Venue</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Venue Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={10}
            >
              {venues.map((venue) => (
                <Marker
                  key={venue.id}
                  position={{ lat: venue.lat, lng: venue.lng }}
                  title={venue.name}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Venue List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Venue Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {venues.map((venue) => (
                <TableRow key={venue.id}>
                  <TableCell>{venue.name}</TableCell>
                  <TableCell>{venue.address}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="outline" size="sm">Delete</Button>
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

