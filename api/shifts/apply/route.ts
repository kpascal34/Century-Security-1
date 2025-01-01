import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

// Input validation schema
const applyShiftSchema = z.object({
  shiftId: z.string(),
  userId: z.string().optional(), // Optional since we'll get it from the session
  notes: z.string().optional()
})

export async function POST(req: Request) {
  try {
    // Get authenticated user
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    const validatedData = applyShiftSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validatedData.error },
        { status: 400 }
      )
    }

    const { shiftId, notes } = validatedData.data

    // Check if shift exists and is available
    const shift = await db.shift.findUnique({
      where: { id: shiftId }
    })

    if (!shift) {
      return NextResponse.json(
        { error: 'Shift not found' },
        { status: 404 }
      )
    }

    if (shift.status !== 'OPEN') {
      return NextResponse.json(
        { error: 'Shift is no longer available' },
        { status: 400 }
      )
    }

    // Create shift application
    const application = await db.shiftApplication.create({
      data: {
        shiftId,
        userId: session.user.id,
        status: 'PENDING',
        notes: notes || '',
      }
    })

    // Update shift status
    await db.shift.update({
      where: { id: shiftId },
      data: { status: 'PENDING' }
    })

    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        application 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Shift application error:', error)
    return NextResponse.json(
      { error: 'Failed to process shift application' },
      { status: 500 }
    )
  }
}

