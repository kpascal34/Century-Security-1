import './globals.css'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Century Security Services - Security Management System',
  description: 'Comprehensive security management system for Century Security Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/docs/styles.css">
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState('admin') // This would be set based on actual user authentication
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const navItems = {
    admin: [
      { href: "/", label: "Dashboard" },
      { href: "/staff", label: "Staff" },
      { href: "/scheduling", label: "Scheduling" },
      { href: "/timesheets", label: "Timesheets" },
      { href: "/invoicing", label: "Invoicing" },
      { href: "/reports", label: "Reports" },
      { href: "/compliance", label: "Compliance" },
      { href: "/training", label: "Training" },
      { href: "/venues", label: "Venues" },
    ],
    staff: [
      { href: "/staff/dashboard", label: "Dashboard" },
      { href: "/staff/shifts", label: "Available Shifts" },
      { href: "/staff/schedule", label: "My Schedule" },
      { href: "/staff/timesheets", label: "My Timesheets" },
      { href: "/staff/training", label: "Training" },
      { href: "/staff/sign-in", label: "Sign In" },
    ],
    client: [
      { href: "/client/dashboard", label: "Dashboard" },
      { href: "/client/services", label: "Our Services" },
      { href: "/client/invoices", label: "Invoices" },
      { href: "/client/reports", label: "Reports" },
    ],
  }

  return (
    <header className="bg-[#1c3664] text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="relative">
          <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-2">
              <span className="text-[#1c3664] font-bold text-xs">CENTURY</span>
            </div>
          </button>
          {isSettingsOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</a>
              </div>
            </div>
          )}
        </div>
        <nav className="hidden md:flex space-x-4">
          {navItems[userRole].map((item) => (
            <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center py-4">
            {navItems[userRole]?.map((item) => (
              <NavLink 
                href={item.href}
                key={item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-gray-300 py-2 md:py-0">
      {children}
    </Link>
  )
}

function Footer() {
  return (
    <footer className="bg-[#1c3664] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Century Security Services</h3>
            <p>Providing top-tier security solutions since 1995</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p>123 Security Street, London, UK</p>
            <p>Phone: +44 20 1234 5678</p>
            <p>Email: info@centurysecurity.com</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-300 block">About Us</Link></li>
              <li><Link href="/services" className="hover:text-gray-300 block">Our Services</Link></li>
              <li><Link href="/careers" className="hover:text-gray-300 block">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300 block">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Century Security Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

