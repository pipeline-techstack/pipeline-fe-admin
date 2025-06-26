"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Plus,
  MoreVertical,
  ArrowLeft,
  Home,
  Users,
  Copyright,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddTeamMemberDialog } from "@/components/ui/dialog/add-team-member";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Admin" | "Member";
}

interface Organization {
  id: string;
  name: string;
  members: Member[];
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Kyle Jenner",
    email: "jenner.kyle123@gmail.com",
    avatar: "👩‍💼",
    role: "Admin",
  },
  {
    id: "2",
    name: "Mike Jackson",
    email: "mike105@gmail.com",
    avatar: "👨‍💼",
    role: "Member",
  },
  {
    id: "3",
    name: "Henry Goldburg",
    email: "henry02.30@gmail.com",
    avatar: "👨‍💻",
    role: "Member",
  },
];

const organizations: Record<string, Organization> = {
  "1": { id: "1", name: "Google INC.", members: mockMembers },
  "2": { id: "2", name: "Microsoft", members: mockMembers },
  "3": { id: "3", name: "Google INC.", members: mockMembers },
  "4": { id: "4", name: "Microsoft", members: mockMembers },
  "5": { id: "5", name: "Google INC.", members: mockMembers },
};

const navigation = [
  { name: "Dashboard", key: "dashboard", icon: Home, href: "/" },
  { name: "Organization", key: "organization", icon: Users, href: "/" },
];

const Sidebar = ({ organizationName }: { organizationName: string }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-white border-gray-200 border-r w-64 h-full">
      <div className="mt-6 px-6 py-4 border-gray-200 border-b">
        <h1 className="px-4 py-2 font-bold text-gray-900 text-4xl">Pipeline</h1>
        <p className="px-4 py-1 text-gray-500 text-md">Admin Dashboard</p>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map(({ name, key, icon: Icon, href }) => (
          <button
            key={name}
            onClick={() => router.push(href)}
            type="button"
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
              key === "organization"
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Icon className="mr-3 w-5 h-5" />
            {name}
          </button>
        ))}
      </nav>
      <div className="mb-4 px-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-medium text-gray-500 text-xs uppercase tracking-wide">
            Current Organization
          </p>
          <p className="mt-1 font-medium text-gray-900 text-sm">
            {organizationName}
          </p>
        </div>
      </div>
      <div className="p-4 border-gray-200 border-t">
        <div className="flex items-center">
          <div className="bg-gray-300 rounded-full w-8 h-8" />
          <div className="ml-3">
            <p className="font-medium text-gray-700 text-sm">
              Pipeline Admin Dashboard
            </p>
            <p className="flex items-center gap-1 text-gray-500 text-xs">
              <Copyright className="w-3 h-3" /> 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberCard = ({ member }: { member: Member }) => (
  <div className="group relative bg-white hover:shadow-sm p-6 rounded-5xl text-center transition-shadow">
    <button
      type="button"
      className="top-4 right-4 absolute opacity-0 group-hover:opacity-100 p-1 transition-opacity"
      title="More options"
    >
      <MoreVertical className="w-4 h-4 text-gray-400" />
    </button>
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-full w-20 h-20 text-3xl">
        {member.avatar}
      </div>
      <h3 className="mb-1 font-semibold text-gray-900 text-lg">
        {member.name}
      </h3>
      <p className="mb-6 text-gray-500 text-sm">{member.email}</p>
      <span
        className={cn(
          "inline-block w-full py-2 px-4 rounded text-sm font-medium",
          member.role === "Admin"
            ? "bg-blue-50 text-blue-700 border border-blue-200"
            : "bg-gray-50 text-gray-700 border border-gray-200"
        )}
      >
        {member.role}
      </span>
    </div>
  </div>
);

export default function OrganizationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const organization = organizations[id as keyof typeof organizations];

  const handleAddMember = (newMember: Omit<Member, "id">) => {
    const memberWithId = {
      ...newMember,
      id: Date.now().toString(),
    };
    setMembers((prev) => [...prev, memberWithId]);
  };

  if (!organization) {
    return (
      <div className="flex bg-gray-50 h-screen">
        <Sidebar organizationName="Unknown" />
        <div className="flex flex-1 justify-center items-center">
          <div className="text-center">
            <h1 className="mb-2 font-bold text-gray-900 text-2xl">
              Organization Not Found
            </h1>
            <p className="mb-4 text-gray-500">
              The organization you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push("/")}>
              Go Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const filteredMembers = members.filter(
    ({ name, email }: { name: string; email: string }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 h-screen">
      <div className="flex-1 bg-gray-50">
        <div className="bg-white px-8 py-6 border-gray-200 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="font-bold text-gray-900 text-2xl">Members</h1>
                <p className="mt-1 text-gray-500 text-sm">
                  See who can read, write and edit
                </p>
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
          <div className="relative mb-8 max-w-md">
            <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
            <Input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembers.map((member: Member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          <div className="mt-8 text-gray-500 text-sm text-center">
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
  );
}
