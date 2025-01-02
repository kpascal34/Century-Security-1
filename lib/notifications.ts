import sgMail from '@sendgrid/mail'
import twilio from 'twilio'
import admin from 'firebase-admin'
import { prisma } from './prisma'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    await sgMail.send({
      to,
      from: 'noreply@centurysecurity.com',
      subject,
      text,
    })

    await prisma.notification.create({
      data: {
        type: 'email',
        recipient: to,
        message: text,
        status: 'sent',
      },
    })

    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export async function sendSMS(to: string, message: string) {
  try {
    await twilioClient.messages.create({
      body: message,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    })

    await prisma.notification.create({
      data: {
        type: 'sms',
        recipient: to,
        message,
        status: 'sent',
      },
    })

    return true
  } catch (error) {
    console.error('Failed to send SMS:', error)
    return false
  }
}

export async function sendPushNotification(token: string, title: string, body: string) {
  try {
    await admin.messaging().send({
      token,
      notification: {
        title,
        body,
      },
    })

    await prisma.notification.create({
      data: {
        type: 'push',
        recipient: token,
        message: `${title}: ${body}`,
        status: 'sent',
      },
    })

    return true
  } catch (error) {
    console.error('Failed to send push notification:', error)
    return false
  }
}

export async function notifyUser(userId: string, message: string, notificationTypes: string[]) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) return false

  const notifications = []

  if (notificationTypes.includes('email')) {
    notifications.push(sendEmail(user.email, 'Century Security Shift Update', message))
  }

  if (notificationTypes.includes('sms') && user.phone) {
    notifications.push(sendSMS(user.phone, message))
  }

  if (notificationTypes.includes('push')) {
    // TODO: Store and retrieve user's FCM token
    // notifications.push(sendPushNotification(user.fcmToken, 'Shift Update', message))
  }

  await Promise.all(notifications)
  return true
} 