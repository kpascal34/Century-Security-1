'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QRCodeSVG } from 'qrcode.react'
import { Camera } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

export default function StaffSignInPage() {
  const [location, setLocation] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [qrCode, setQrCode] = useState('')
  const [isOnSite, setIsOnSite] = useState(false)

  useEffect(() => {
    // Generate a unique QR code for this sign-in session
    setQrCode(`https://example.com/sign-in/${Date.now()}`)

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  const handleTakePhoto = (dataUri) => {
    setPhoto(dataUri)
  }

  const handleSignIn = () => {
    // Here you would typically send the sign-in data to your backend
    console.log("Signing in with:", { location, photo, qrCode })
    // For demo purposes, we'll just set isOnSite to true
    setIsOnSite(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#1c3664] mb-8">Staff Sign-In</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Scan QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <QRCodeSVG value={qrCode} size={256} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Take Photo</CardTitle>
          </CardHeader>
          <CardContent>
            {!photo ? (
              <Camera onTakePhoto={handleTakePhoto} />
            ) : (
              <img src={photo} alt="Staff photo" className="w-full" />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Location Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {location ? (
            <p>Your current location: Latitude {location.lat}, Longitude {location.lng}</p>
          ) : (
            <p>Getting your location...</p>
          )}
          {isOnSite ? (
            <p className="text-green-600 font-bold mt-4">You are verified to be on site.</p>
          ) : (
            <Button onClick={handleSignIn} disabled={!location || !photo}>Sign In</Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

