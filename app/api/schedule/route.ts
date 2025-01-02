import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyUser } from '@/lib/notifications'
import { createCalendarEvent, updateCalendarEvent } from '@/lib/calendar'
import type { Shift, PublishOptions } from '@/types/schedule'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const venueId = searchParams.get('venue')

  try {
    const shifts = await prisma.shift.findMany({
      where: {
        startTime: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
        venueId: venueId || undefined,
      },
      include: {
        venue: true,
        employee: true,
      },
    })

    return NextResponse.json(shifts)
  } catch (error) {
    console.error('Failed to fetch shifts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shifts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const shift: Shift = await request.json()

  try {
    // Create shift in database
    const createdShift = await prisma.shift.create({
      data: {
        startTime: new Date(shift.startTime),
        endTime: new Date(shift.endTime),
        venueId: shift.venue.id,
        employeeId: shift.employee?.id,
        status: shift.status,
        mealBreak: shift.mealBreak,
        cost: shift.cost,
        chargeOut: shift.chargeOut,
        published: false,
      },
      include: {
        venue: true,
        employee: true,
      },
    })

    // Create calendar event
    if (createdShift.employee) {
      await createCalendarEvent(createdShift)
    }

    return NextResponse.json(createdShift)
  } catch (error) {
    console.error('Failed to create shift:', error)
    return NextResponse.json(
      { error: 'Failed to create shift' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const { shift, publishOptions }: { shift: Shift; publishOptions: PublishOptions } = await request.json()

  try {
    // Update shift in database
    const updatedShift = await prisma.shift.update({
      where: { id: shift.id },
      data: {
        startTime: new Date(shift.startTime),
        endTime: new Date(shift.endTime),
        venueId: shift.venue.id,
        employeeId: shift.employee?.id,
        status: shift.status,
        mealBreak: shift.mealBreak,
        cost: shift.cost,
        chargeOut: shift.chargeOut,
        published: true,
      },
      include: {
        venue: true,
        employee: true,
      },
    })

    // Update calendar event
    if (updatedShift.employee) {
      await updateCalendarEvent(shift.id, updatedShift)

      // Send notifications
      const message = `Your shift at ${updatedShift.venue.name} has been ${updatedShift.status}.\n` +
        `Start: ${updatedShift.startTime}\n` +
        `End: ${updatedShift.endTime}`

      const notificationTypes = []
      if (publishOptions.notificationMethods.email) notificationTypes.push('email')
      if (publishOptions.notificationMethods.sms) notificationTypes.push('sms')
      if (publishOptions.notificationMethods.mobileApp) notificationTypes.push('push')

      await notifyUser(updatedShift.employee.id, message, notificationTypes)
    }

    return NextResponse.json(updatedShift)
  } catch (error) {
    console.error('Failed to update shift:', error)
    return NextResponse.json(
      { error: 'Failed to update shift' },
      { status: 500 }
    )
  }
} 