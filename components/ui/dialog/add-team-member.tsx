'use client'

import React, { useState } from 'react'
import { Plus, UserPlus, X, AlertCircle } from 'lucide-react'
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

interface Member {
  name: string
  email: string
  avatar: string
  role: 'Admin' | 'Member'
}

interface AddTeamMemberDialogProps {
  onAddMember: (member: Member) => void
  isAddMemberOpen: boolean
  setIsAddMemberOpen: (open: boolean) => void
}

interface TeamMemberFormData {
  name: string
  email: string
  quota: string
  role: string
  permissions: string
  workbooks: string[]
  prompt: string[]  // Changed from string to string[]
  crm: string[]
}

const FormField = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="flex items-center gap-4">
    <Label className="text-sm font-medium text-gray-700 w-24 text-left">
      {label}
    </Label>
    <div className="flex-1">
      {children}
    </div>
  </div>
)

const Member = ({
  newMemberForm,
  setMemberForm,
}: {
  newMemberForm: TeamMemberFormData
  setMemberForm: React.Dispatch<React.SetStateAction<TeamMemberFormData>>
}) => {
  const [emailTouched, setEmailTouched] = useState(false)
  
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMemberForm.email)

  const handleChange = (field: keyof TeamMemberFormData, value: string | string[]) =>
    setMemberForm((prev) => ({ ...prev, [field]: value }))

  const toggleCheckbox = (field: 'workbooks' | 'crm' | 'prompt', value: string, checked: boolean) =>
    setMemberForm((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((v) => v !== value),
    }))

  // Handle "Select All" for permissions
  const handlePermissionsChange = (value: string) => {
    if (value === 'select-all') {
      // Select all workbooks, prompt, and CRM options
      setMemberForm((prev) => ({
        ...prev,
        permissions: value,
        workbooks: ['editor', 'exec'],
        prompt: ['editor'],
        crm: ['get', 'admin']
      }))
    } else {
      // Just update permissions, don't auto-select checkboxes for other options
      handleChange('permissions', value)
    }
  }

  return (
    <div className="space-y-4">
      <FormField label="Name">
        <Input
          value={newMemberForm.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Doe"
          className="w-full"
        />
      </FormField>

      <FormField label="Email">
        <div className="space-y-1">
          <Input
            value={newMemberForm.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => setEmailTouched(true)}
            placeholder="john@example.com"
            type="email"
            className={
              emailTouched && !isEmailValid ?
                'border-red-300 ring-red-500 focus:ring-red-500 w-full' : 'w-full'
            }
          />
          {emailTouched && !isEmailValid && (
            <div className="flex items-center mt-1 text-sm text-red-600 gap-1">
              <AlertCircle className="w-4 h-4" />
              Please enter a valid email (e.g. john@example.com)
            </div>
          )}
        </div>
      </FormField>

      <FormField label="Quota">
        <Input
          value={newMemberForm.quota}
          onChange={(e) => handleChange('quota', e.target.value)}
          placeholder="1000"
          className="w-full"
        />
      </FormField>

      <FormField label="Role">
        <Select value={newMemberForm.role} onValueChange={(val) => handleChange('role', val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Team Member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="team-member">Team Member</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Permissions">
        <Select
          value={newMemberForm.permissions}
          onValueChange={handlePermissionsChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="select-all">Select All</SelectItem>
            <SelectItem value="read-only">Read Only</SelectItem>
            <SelectItem value="read-write">Read & Write</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Workbooks">
        <div className="flex gap-6">
          {['editor', 'exec'].map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newMemberForm.workbooks.includes(key)}
                onChange={(e) => toggleCheckbox('workbooks', key, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm capitalize">{key}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Prompt">
        <div className="flex gap-6">
          {['editor'].map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newMemberForm.prompt.includes(key)}
                onChange={(e) => toggleCheckbox('prompt', key, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm capitalize">{key}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="CRM">
        <div className="flex gap-6">
          {['get', 'admin'].map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newMemberForm.crm.includes(key)}
                onChange={(e) => toggleCheckbox('crm', key, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm capitalize">{key}</span>
            </label>
          ))}
        </div>
      </FormField>
    </div>
  )
}

export function AddTeamMemberDialog({ 
  onAddMember, 
  isAddMemberOpen, 
  setIsAddMemberOpen 
}: AddTeamMemberDialogProps) {
  const [member, setMemberForm] = useState<TeamMemberFormData>({
    name: '',
    email: '',
    quota: '',
    role: '',
    permissions: '',
    workbooks: [],
    prompt: [],  // Changed from empty string to empty array
    crm: [],
  })

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)
  const isFormValid = member.name && isEmailValid && member.quota && member.role

  const handleSubmit = () => {
    if (!isFormValid) return
    
    const avatars = ['👨\u200d💼', '👩\u200d💼', '👨\u200d💻', '👩\u200d💻', '👨\u200d🎓', '👩\u200d🎓']
    onAddMember({
      name: member.name,
      email: member.email,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      role: member.role === 'admin' ? 'Admin' : 'Member',
    })
    
    // Reset form
    setMemberForm({
      name: '',
      email: '',
      quota: '',
      role: '',
      permissions: '',
      workbooks: [],
      prompt: [],  // Changed from empty string to empty array
      crm: [],
    })
    setIsAddMemberOpen(false)
  }

  if (!isAddMemberOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-20">
      <div className="bg-white rounded-lg shadow-xl border max-w-5xl w-screen p-6 relative">
        <Button
          onClick={() => setIsAddMemberOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </Button>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Add New Team Member</h2>
          <p className="text-sm text-gray-500 mt-1">
            Add a new member to your team. They will receive an invitation email.
          </p>
        </div>
        
        <div className="space-y-4">
          <Member newMemberForm={member} setMemberForm={setMemberForm} />
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsAddMemberOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              Add Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}