'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Operation {
  id: string
  venue: { name: string }
  user: { name: string }
  status: string
  startTime: string
  endTime: string
  verification: string
}

interface StaffConfirmation {
  confirmed: number
  rejected: number
  unconfirmed: number
}

interface SecurityLicence {
  name: string
  dueDate: string
  status: string
}

interface Reminder {
  name: string
  type: string
  dueDate: string
  status: string
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Live Operations */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Live Operations</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Site</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">Site A</td>
                        <td className="px-4 py-2 text-sm text-green-600">Active</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">Site B</td>
                        <td className="px-4 py-2 text-sm text-yellow-600">Pending</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Availability/Leave Requests */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Availability/Leave Requests</h2>
                <p className="text-sm text-gray-500">No pending requests</p>
              </div>
            </div>

            {/* Staff Confirmation */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Staff Confirmation</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Confirmed</p>
                    <p className="text-2xl font-bold text-green-600">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">2</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Unconfirmed</p>
                    <p className="text-2xl font-bold text-yellow-600">5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reminders/Compliance */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Reminders/Compliance</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">Training Update</td>
                        <td className="px-4 py-2 text-sm text-red-600">Overdue</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">Document Review</td>
                        <td className="px-4 py-2 text-sm text-yellow-600">Next Week</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Security Licences */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Security Licences</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Staff</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
                        <td className="px-4 py-2 text-sm text-green-600">Valid</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900">Jane Smith</td>
                        <td className="px-4 py-2 text-sm text-yellow-600">Expiring Soon</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Subcontractor Reminders */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Subcontractor Reminders</h2>
                <p className="text-sm text-gray-500">No critical renewals at this time</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 