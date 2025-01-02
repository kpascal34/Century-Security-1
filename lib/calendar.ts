import { google } from 'googleapis'
import type { Shift } from '@prisma/client'

const calendar = google.calendar('v3')

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL
)

export async function createCalendarEvent(shift: Shift) {
  try {
    const event = {
      summary: `Security Shift at ${shift.venueId}`,
      location: 'Venue Address', // TODO: Get from venue
      description: `Security shift from ${shift.startTime} to ${shift.endTime}`,
      start: {
        dateTime: new Date(shift.startTime).toISOString(),
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: new Date(shift.endTime).toISOString(),
        timeZone: 'Europe/London',
      },
      attendees: [
        { email: 'employee@email.com' }, // TODO: Get from employee
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    }

    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    })

    return response.data
  } catch (error) {
    console.error('Failed to create calendar event:', error)
    throw error
  }
}

export async function updateCalendarEvent(eventId: string, shift: Shift) {
  try {
    const event = {
      summary: `Security Shift at ${shift.venueId}`,
      location: 'Venue Address', // TODO: Get from venue
      description: `Security shift from ${shift.startTime} to ${shift.endTime}`,
      start: {
        dateTime: new Date(shift.startTime).toISOString(),
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: new Date(shift.endTime).toISOString(),
        timeZone: 'Europe/London',
      },
    }

    const response = await calendar.events.update({
      auth: oauth2Client,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
      requestBody: event,
    })

    return response.data
  } catch (error) {
    console.error('Failed to update calendar event:', error)
    throw error
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    await calendar.events.delete({
      auth: oauth2Client,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
    })

    return true
  } catch (error) {
    console.error('Failed to delete calendar event:', error)
    throw error
  }
}

export async function getCalendarEvents(timeMin: Date, timeMax: Date) {
  try {
    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    return response.data.items
  } catch (error) {
    console.error('Failed to get calendar events:', error)
    throw error
  }
} 