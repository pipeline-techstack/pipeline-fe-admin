"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTeamMemberDialog } from "@/components/dialog/add-team-member";
import { Member } from "@/lib/types/member-types";
import MemberCard from "../../../../components/members/memberCard";
import { useQuery } from "@tanstack/react-query";
import { getMembers, removeTeamMember } from "@/services/member-apis";
import { normalizePermissions } from "@/lib/utils";
import EditTeamMember from "@/components/dialog/edit-team-member";

export default function OrganizationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [organizationName, setOrganizationName] = useState<string>("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [seats, setSeats] = useState(0);
  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => getMembers({ id: id as string }),
    retry: false,
  });

  const handleEditMember = (id: string) => {
    setIsEditMemberOpen(true);
    console.log("id", id);
    setSelectedMemberId(id);
  };

  const handleRemoveMember = async (member: Member) => {
    await removeTeamMember({
      organizationId: id as string,
      email: member.email,
    });
    setMembers((prev) =>
      prev.filter((m) => m.organizationId !== member.organizationId)
    );
  };

  useEffect(() => {
    if (fetchedData) {
      const transformedMembers: Member[] = fetchedData.data.map(
        (member: any) => ({
          _id: member._id,
          userId: member.userId,
          email: member.email,
          organizationId: member._id,
          rowQuota: member.rowQuota,
          usedRows: member.usedRows,
          role: member.role,
          updatedAt: member.updatedAt,
          permissions: normalizePermissions(member.permissions || []),
        })
      );

      setMembers(transformedMembers);
      setOrganizationName(fetchedData.organization);
      setSeats(fetchedData.seats);
    }
  }, [fetchedData]);

  const handleAddMember = () => {
    if (members.length >= seats) {
      alert(
        "You have reached the maximum number of members for this organization. Add more seats to continue"
      );
      return;
    }
    setIsAddMemberOpen(true);
  };

  if (isLoading) return <p>Loading organizations...</p>;
  if (isError)
    return <p className="text-red-600">Error: {(error as Error).message}</p>;

  return (
    <div className="flex bg-gray-50 h-screen">
      <div className="flex-1 bg-gray-50">
        <div className="px-8 py-6">
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
                <h1 className="font-medium text-gray-900 text-2xl">
                  {organizationName}
                </h1>
                <p className="mt-1 text-gray-500 text-sm">
                  See the members who can read, write and edit
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleAddMember}>
              + Add Team Member
            </Button>
          </div>
        </div>

        <div className="p-8">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member: Member) => (
              <MemberCard
                key={member.organizationId}
                member={member}
                onEdit={handleEditMember}
                onRemove={handleRemoveMember}
              />
            ))}
          </div>

          <div className="mt-8 text-gray-500 text-sm text-center">
            Showing {members.length} of {members.length} members
          </div>
        </div>
      </div>

      <AddTeamMemberDialog
        isAddMemberOpen={isAddMemberOpen}
        setIsAddMemberOpen={setIsAddMemberOpen}
        organizationId={id as string}
      />
      <EditTeamMember
        isOpen={isEditMemberOpen}
        setIsOpen={setIsEditMemberOpen}
        organizationId={id as string}
        members={members}
        memberId={selectedMemberId || ""}
      />
    </div>
  );
}
