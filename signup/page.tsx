import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Signup() {
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    setStep(step + 1)
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign Up - BS7858 Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && <PersonalInfo onNext={handleNextStep} />}
          {step === 2 && <EmploymentHistory onNext={handleNextStep} />}
          {step === 3 && <DocumentUpload onNext={handleNextStep} />}
          {step === 4 && <Confirmation />}
        </CardContent>
      </Card>
    </div>
  )
}

function PersonalInfo({ onNext }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" required />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" required />
        </div>
        <Button type="submit">Next</Button>
      </div>
    </form>
  )
}

function EmploymentHistory({ onNext }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="employer1">Most Recent Employer</Label>
          <Input id="employer1" required />
        </div>
        <div>
          <Label htmlFor="position1">Position</Label>
          <Input id="position1" required />
        </div>
        <div>
          <Label htmlFor="dates1">Dates of Employment</Label>
          <Input id="dates1" required />
        </div>
        <Button type="submit">Next</Button>
      </div>
    </form>
  )
}

function DocumentUpload({ onNext }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="idDocument">Upload ID Document</Label>
          <Input id="idDocument" type="file" required />
        </div>
        <div>
          <Label htmlFor="proofOfAddress">Upload Proof of Address</Label>
          <Input id="proofOfAddress" type="file" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="consent" required />
          <Label htmlFor="consent">I consent to background checks as per BS7858</Label>
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

function Confirmation() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Thank You for Signing Up</h2>
      <p>Your application has been received and will be processed according to BS7858 standards. We will contact you shortly.</p>
    </div>
  )
}

