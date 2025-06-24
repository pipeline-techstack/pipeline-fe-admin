'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Search } from 'lucide-react'
import { AddOrganizationDialog } from '@/components/ui/add-organization-dialog'

interface OrganizationData {
  id: string
  srNo: string
  company: string
  customer: string
  quotaPlan: string
  checked: boolean
}

interface OrganizationFormData {
  organizationName: string
  enterpriseId: string
  email: string
  plan: string
  quota: string
}

const mockData: OrganizationData[] = [
  { id: '1', srNo: '#20462', company: 'Google INC.', customer: 'Matt Dickerson', quotaPlan: '45/100-Basic', checked: true },
  { id: '2', srNo: '#18933', company: 'Microsoft', customer: 'Wiktoria', quotaPlan: '98/100-Premium', checked: false },
  { id: '3', srNo: '#20462', company: 'Google INC.', customer: 'Matt Dickerson', quotaPlan: '45/100-Basic', checked: false },
  { id: '4', srNo: '#18933', company: 'Microsoft', customer: 'Wiktoria', quotaPlan: '98/100-Premium', checked: false },
  { id: '5', srNo: '#20462', company: 'Google INC.', customer: 'Matt Dickerson', quotaPlan: '45/100-Basic', checked: true },
]

export function OrganizationTable() {
  const [data, setData] = useState<OrganizationData[]>(mockData)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked } : item
      )
    )
  }

  const handleAddOrganization = (orgData: OrganizationFormData) => {
    // Generate a new organization entry
    const newOrganization: OrganizationData = {
      id: (data.length + 1).toString(),
      srNo: `#${Math.floor(Math.random() * 99999)}`,
      company: orgData.organizationName,
      customer: orgData.email.split('@')[0], // Extract username from email
      quotaPlan: `0/${orgData.quota}-${orgData.plan.charAt(0).toUpperCase() + orgData.plan.slice(1)}`,
      checked: false
    }

    setData(prev => [...prev, newOrganization])
  }

  const filteredData = data.filter(item =>
    item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.srNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Search and Add Button */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search workbook..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <AddOrganizationDialog onAddOrganization={handleAddOrganization} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[calc(100vh-250px)]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="font-medium text-gray-900">Sr. No.</TableHead>
              <TableHead className="font-medium text-gray-900">Company</TableHead>
              <TableHead className="font-medium text-gray-900">Customer</TableHead>
              <TableHead className="font-medium text-gray-900">Quota+Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(item.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {item.srNo}
                </TableCell>
                <TableCell className="text-gray-900">{item.company}</TableCell>
                <TableCell className="text-gray-700">{item.customer}</TableCell>
                <TableCell className="text-gray-700">{item.quotaPlan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer with pagination info */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredData.length} of {data.length} organizations
          </p>
        </div>
      </div>
    </div>
  )
}