'use client'

import { useState, useEffect } from 'react'
import { format, startOfWeek, addWeeks, parseISO } from 'date-fns'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PaysheetPDF } from '@/components/PaysheetPDF'

interface Employee {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

interface PayEntry {
  id: string
  shift: string
  startTime: string
  endTime: string
  breakMins: number
  site: string
  payCategory: string
  hoursUnit: number
  rate: number
  total: number
}

interface ExportOptions {
  format: 'pdf' | 'quickbooks' | 'xero'
  dateRange?: {
    start: string
    end: string
  }
  includeDetails: boolean
}

export default function PaysheetPage() {
  const [payCycle, setPayCycle] = useState<'Weekly'>('Weekly')
  const [cycleStartDate, setCycleStartDate] = useState(format(startOfWeek(new Date()), 'yyyy-MM-dd'))
  const [activeTab, setActiveTab] = useState<'Active' | 'Inactive'>('Active')
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeDetails: true
  })
  const [employees, setEmployees] = useState<Employee[]>([])
  const [payEntries, setPayEntries] = useState<PayEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    if (selectedEmployee) {
      fetchPayEntries()
    }
  }, [selectedEmployee, cycleStartDate])

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees')
      if (!response.ok) throw new Error('Failed to fetch employees')
      const data = await response.json()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
      alert('Failed to load employees')
    }
  }

  const fetchPayEntries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/payentries?employeeId=${selectedEmployee}&startDate=${cycleStartDate}`
      )
      if (!response.ok) throw new Error('Failed to fetch pay entries')
      const data = await response.json()
      setPayEntries(data)
    } catch (error) {
      console.error('Error fetching pay entries:', error)
      alert('Failed to load pay entries')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    setShowExportModal(true)
  }

  const handleExportConfirm = async () => {
    try {
      switch (exportOptions.format) {
        case 'pdf':
          // PDF export is handled by PDFDownloadLink component
          break
        case 'quickbooks':
          await exportToQuickBooks()
          break
        case 'xero':
          await exportToXero()
          break
      }
      setShowExportModal(false)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export paysheet')
    }
  }

  const exportToQuickBooks = async () => {
    if (!selectedEmployee) return

    const payrollData = {
      employeeId: selectedEmployee,
      payPeriodStart: cycleStartDate,
      earnings: payEntries.map(entry => ({
        amount: entry.total,
        hours: entry.hoursUnit,
        payType: entry.payCategory,
        date: entry.shift
      }))
    }

    try {
      const response = await fetch('/api/export/quickbooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payrollData)
      })

      if (!response.ok) throw new Error('Failed to export to QuickBooks')
      
      alert('Successfully exported to QuickBooks')
    } catch (error) {
      console.error('QuickBooks export failed:', error)
      throw error
    }
  }

  const exportToXero = async () => {
    if (!selectedEmployee) return

    const payrollData = {
      employeeId: selectedEmployee,
      payPeriodStart: cycleStartDate,
      earnings: payEntries.map(entry => ({
        amount: entry.total,
        hours: entry.hoursUnit,
        payType: entry.payCategory,
        date: entry.shift
      }))
    }

    try {
      const response = await fetch('/api/export/xero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payrollData)
      })

      if (!response.ok) throw new Error('Failed to export to Xero')
      
      alert('Successfully exported to Xero')
    } catch (error) {
      console.error('Xero export failed:', error)
      throw error
    }
  }

  const handleReprocess = async () => {
    if (!selectedEmployee) return

    try {
      const response = await fetch('/api/paysheets/reprocess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: selectedEmployee,
          startDate: cycleStartDate
        })
      })

      if (!response.ok) throw new Error('Failed to reprocess paysheet')

      await fetchPayEntries()
      alert('Successfully reprocessed paysheet')
    } catch (error) {
      console.error('Failed to reprocess paysheet:', error)
      alert('Failed to reprocess paysheet')
    }
  }

  const handleReprocessDefault = async () => {
    if (!selectedEmployee) return

    try {
      const response = await fetch('/api/paysheets/reprocess-default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: selectedEmployee,
          startDate: cycleStartDate
        })
      })

      if (!response.ok) throw new Error('Failed to reprocess paysheet with default settings')

      await fetchPayEntries()
      alert('Successfully reprocessed paysheet with default settings')
    } catch (error) {
      console.error('Failed to reprocess paysheet with default settings:', error)
      alert('Failed to reprocess paysheet with default settings')
    }
  }

  const handleCancel = async () => {
    if (!selectedEmployee) return

    try {
      const response = await fetch('/api/paysheets/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: selectedEmployee,
          startDate: cycleStartDate
        })
      })

      if (!response.ok) throw new Error('Failed to cancel paysheet')

      await fetchPayEntries()
      alert('Successfully cancelled paysheet')
    } catch (error) {
      console.error('Failed to cancel paysheet:', error)
      alert('Failed to cancel paysheet')
    }
  }

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const calculateTotals = () => {
    return payEntries.reduce(
      (acc, entry) => {
        acc.totalWork += entry.hoursUnit
        acc.totalLeave = 0 // Implement leave calculation if needed
        acc.totalCost += entry.total
        return acc
      },
      { totalWork: 0, totalLeave: 0, totalCost: 0 }
    )
  }

  const totals = calculateTotals()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-century-blue"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-full mx-auto">
        {/* Header Controls */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">PAY CYCLE</label>
                <select
                  value={payCycle}
                  onChange={(e) => setPayCycle(e.target.value as 'Weekly')}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option>Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">CYCLE START DATE</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={cycleStartDate}
                    onChange={(e) => setCycleStartDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                onClick={handleExport}
                className="px-4 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 mt-5"
              >
                Export
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleReprocess}
                className="px-4 py-2 text-sm font-medium bg-century-gold text-white rounded hover:bg-century-gold-dark"
                disabled={!selectedEmployee}
              >
                Reprocess
              </button>
              <button
                onClick={handleReprocessDefault}
                className="px-4 py-2 text-sm font-medium bg-century-gold text-white rounded hover:bg-century-gold-dark"
                disabled={!selectedEmployee}
              >
                Reprocess (default)
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50"
                disabled={!selectedEmployee}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Left Sidebar - Employee List */}
          <div className="w-64 border-r border-gray-200 min-h-screen bg-white">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="flex mt-4 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('Active')}
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'Active'
                      ? 'text-century-gold border-b-2 border-century-gold'
                      : 'text-gray-500'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab('Inactive')}
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'Inactive'
                      ? 'text-century-gold border-b-2 border-century-gold'
                      : 'text-gray-500'
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
            <div className="overflow-y-auto">
              {filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => setSelectedEmployee(employee.id)}
                  className={`w-full flex items-center px-4 py-2 hover:bg-gray-50 ${
                    selectedEmployee === employee.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                    {employee.avatar}
                  </div>
                  <span className="ml-3 text-sm">{employee.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - Pay Details */}
          <div className="flex-1 p-6">
            {selectedEmployee ? (
              <div>
                <h2 className="text-xl font-medium mb-6">
                  {employees.find(emp => emp.id === selectedEmployee)?.name}
                </h2>

                {/* Totals */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-gray-500">Total Work</p>
                    <p className="text-2xl font-bold">{totals.totalWork.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Leave</p>
                    <p className="text-2xl font-bold">{totals.totalLeave.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Cost</p>
                    <p className="text-2xl font-bold">£{totals.totalCost.toFixed(2)}</p>
                  </div>
                </div>

                {/* Earnings Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Earnings</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b border-gray-200">
                        <th className="text-left py-2">Shift</th>
                        <th className="text-left py-2">Start Time</th>
                        <th className="text-left py-2">End Time</th>
                        <th className="text-left py-2">Break (Mins)</th>
                        <th className="text-left py-2">Site</th>
                        <th className="text-left py-2">Pay Category</th>
                        <th className="text-left py-2">Hours/Unit</th>
                        <th className="text-left py-2">Rate</th>
                        <th className="text-left py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payEntries.map((entry) => (
                        <tr key={entry.id} className="border-b border-gray-200">
                          <td className="py-2">{entry.shift}</td>
                          <td className="py-2">{entry.startTime}</td>
                          <td className="py-2">{entry.endTime}</td>
                          <td className="py-2">{entry.breakMins}</td>
                          <td className="py-2">{entry.site}</td>
                          <td className="py-2">{entry.payCategory}</td>
                          <td className="py-2">{entry.hoursUnit}</td>
                          <td className="py-2">£{entry.rate}</td>
                          <td className="py-2">£{entry.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                Select an employee to view pay details
              </div>
            )}
          </div>
        </div>

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Export Paysheet</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Export Format
                  </label>
                  <select
                    value={exportOptions.format}
                    onChange={(e) => setExportOptions({
                      ...exportOptions,
                      format: e.target.value as ExportOptions['format']
                    })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="pdf">PDF</option>
                    <option value="quickbooks">QuickBooks</option>
                    <option value="xero">Xero</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeDetails}
                      onChange={(e) => setExportOptions({
                        ...exportOptions,
                        includeDetails: e.target.checked
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Include detailed breakdown</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  {exportOptions.format === 'pdf' && selectedEmployee ? (
                    <PDFDownloadLink
                      document={
                        <PaysheetPDF
                          employee={employees.find(emp => emp.id === selectedEmployee)}
                          payEntries={payEntries}
                          includeDetails={exportOptions.includeDetails}
                        />
                      }
                      fileName={`paysheet-${selectedEmployee}-${cycleStartDate}.pdf`}
                      className="px-4 py-2 text-sm font-medium text-white bg-century-gold hover:bg-century-gold-dark rounded"
                    >
                      {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
                    </PDFDownloadLink>
                  ) : (
                    <button
                      onClick={handleExportConfirm}
                      className="px-4 py-2 text-sm font-medium text-white bg-century-gold hover:bg-century-gold-dark rounded"
                      disabled={!selectedEmployee}
                    >
                      Export
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
} 