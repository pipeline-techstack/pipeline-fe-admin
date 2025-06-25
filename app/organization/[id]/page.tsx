'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Search, Plus, MoreVertical, ArrowLeft, Home, Users, Copyright } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AddTeamMemberDialog } from '@/components/ui/dialog/add-team-member'

interface Member {
  id: string
  name: string
  email: string
  avatar: string
  role: 'Admin' | 'Member'
}

interface Organization {
  id: string
  name: string
  members: Member[]
}

const mockMembers: Member[] = [
  { id: '1', name: 'Kyle Jenner', email: 'jenner.kyle123@gmail.com', avatar: '👩‍💼', role: 'Admin' },
  { id: '2', name: 'Mike Jackson', email: 'mike105@gmail.com', avatar: '👨‍💼', role: 'Member' },
  { id: '3', name: 'Henry Goldburg', email: 'henry02.30@gmail.com', avatar: '👨‍💻', role: 'Member' }
]

const organizations: Record<string, Organization> = {
  '1': { id: '1', name: 'Google INC.', members: mockMembers },
  '2': { id: '2', name: 'Microsoft', members: mockMembers },
  '3': { id: '3', name: 'Google INC.', members: mockMembers },
  '4': { id: '4', name: 'Microsoft', members: mockMembers },
  '5': { id: '5', name: 'Google INC.', members: mockMembers }
}

const navigation = [
  { name: 'Dashboard', key: 'dashboard', icon: Home, href: '/' },
  { name: 'Organization', key: 'organization', icon: Users, href: '/' }
]

const Sidebar = ({ organizationName }: { organizationName: string }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full">
      <div className="px-6 py-4 border-b border-gray-200 mt-6">
        <h1 className="text-4xl px-4 py-2 font-bold text-gray-900">Pipeline</h1>
        <p className="text-md px-4 py-1 text-gray-500">Admin Dashboard</p>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map(({ name, key, icon: Icon, href }) => (
          <button
            key={name}
            onClick={() => router.push(href)}
            type="button"
            className={cn(
              'flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left',
              key === 'organization' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <Icon className="w-5 h-5 mr-3" />{name}
          </button>
        ))}
      </nav>
      <div className="px-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Current Organization</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{organizationName}</p>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Pipeline Admin Dashboard</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Copyright className="w-3 h-3" /> 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const MemberCard = ({ member }: { member: Member }) => (
  <div className="bg-white rounded-5xl p-6 text-center relative group hover:shadow-sm transition-shadow">
    <button type="button" className="absolute top-4 right-4 p-1 opacity-0 group-hover:opacity-100 transition-opacity" title="More options">
      <MoreVertical className="w-4 h-4 text-gray-400" />
    </button>
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4">{member.avatar}</div>
      <h3 className="font-semibold text-gray-900 text-lg mb-1">{member.name}</h3>
      <p className="text-sm text-gray-500 mb-6">{member.email}</p>
      <span className={cn('inline-block w-full py-2 px-4 rounded text-sm font-medium',
        member.role === 'Admin' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-700 border border-gray-200'
      )}>{member.role}</span>
    </div>
  </div>
)

export default function OrganizationPage() {
  const { id } = useParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const organization = organizations[id as keyof typeof organizations]

  const handleAddMember = (newMember: Omit<Member, 'id'>) => {
    const memberWithId = {
      ...newMember,
      id: Date.now().toString()
    }
    setMembers(prev => [...prev, memberWithId])
  }

  if (!organization) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar organizationName="Unknown" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Organization Not Found</h1>
            <p className="text-gray-500 mb-4">The organization you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/')}>Go Back to Dashboard</Button>
          </div>
        </div>
      </div>
    )
  }

  const filteredMembers = members.filter(({ name, email }: { name: string; email: string }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar organizationName={organization.name} />
      <div className="flex-1 bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push('/')} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Members</h1>
                <p className="text-gray-500 text-sm mt-1">See who can read, write and edit</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsAddMemberOpen(true)}
            >
              + Add Team Member
            </Button>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map((member: Member) => <MemberCard key={member.id} member={member} />)}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        </div>
      </div>

      <AddTeamMemberDialog 
        onAddMember={handleAddMember}
        isAddMemberOpen={isAddMemberOpen}
        setIsAddMemberOpen={setIsAddMemberOpen}
      />
    </div>
  )
}