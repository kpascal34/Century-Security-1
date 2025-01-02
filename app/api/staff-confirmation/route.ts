import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get date range from query params
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!startDate || !endDate) {
      return new NextResponse('Missing date range', { status: 400 })
    }

    // Fetch staff confirmations from the database
    const shifts = await prisma.shift.findMany({
      where: {
        startTime: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    })

    // Calculate confirmation stats
    const stats = {
      confirmed: shifts.filter(shift => shift.status === 'CONFIRMED').length,
      rejected: shifts.filter(shift => shift.status === 'REJECTED').length,
      unconfirmed: shifts.filter(shift => shift.status === 'PENDING').length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching staff confirmations:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 