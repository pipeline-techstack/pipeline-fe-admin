'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Users, X } from 'lucide-react'

interface AddOrganizationDialogProps {
  onAddOrganization?: (orgData: OrganizationFormData) => void
}

interface OrganizationFormData {
  organizationName: string
  enterpriseId: string
  email: string
  plan: string
  quota: string
}

export function AddOrganizationDialog({ onAddOrganization }: AddOrganizationDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: '',
    enterpriseId: '',
    email: '',
    plan: '',
    quota: ''
  })

  const handleInputChange = (field: keyof OrganizationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onAddOrganization) {
      onAddOrganization(formData)
    }
    // Reset form
    setFormData({
      organizationName: '',
      enterpriseId: '',
      email: '',
      plan: '',
      quota: ''
    })
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
    // Reset form when closing without saving
    setFormData({
      organizationName: '',
      enterpriseId: '',
      email: '',
      plan: '',
      quota: ''
    })
  }

  const isFormValid = formData.organizationName && formData.enterpriseId && formData.email && formData.plan && formData.quota

  return (
    <>
      <Button 
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Organization
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-2xl mx-4 px-2 py-2">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-7 h-7 text-gray-600" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Add enterprise organization
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Enterprise organization model & value proposition
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName" className="text-base font-medium text-gray-700">
                  Organization name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="organizationName"
                  type="text"
                  required
                  placeholder="e.g. google.com"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enterpriseId" className="text-base font-medium text-gray-700">
                  Enterprise ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="enterpriseId"
                  type="text"
                  required
                  placeholder="893qdefshnnqjdh"
                  value={formData.enterpriseId}
                  onChange={(e) => handleInputChange('enterpriseId', e.target.value)}
                  className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="e.g. amina103@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent invalid:border-red-300 invalid:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan" className="text-base font-medium text-gray-700">
                  Plan <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)} required>
                  <SelectTrigger className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quota" className="text-base font-medium text-gray-700">
                  Quota <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.quota} onValueChange={(value) => handleInputChange('quota', value)} required>
                  <SelectTrigger className="w-full px-3 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder="Select quota" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="250">250</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 text-base rounded-md transition-colors"
              >
                Add organization
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}