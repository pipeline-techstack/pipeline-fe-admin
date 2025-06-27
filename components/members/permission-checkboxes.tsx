import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  TeamMemberFormData,
  VALID_PERMISSIONS,
} from "@/lib/types/member-types";

const PermissionCheckboxes = ({
  formPermissions,
  setFormPermissions,
}: {
  formPermissions: {
    workbooks: string[];
    prompt: string[];
    CRM: string[];
  };
  setFormPermissions: (
    section: keyof TeamMemberFormData["permissions"],
    value: string,
    isSelectAll?: boolean
  ) => void;
}) => {
  // Flatten all permissions
  const allPermissions = Object.entries(VALID_PERMISSIONS).reduce(
    (acc, [section, perms]) => {
      //@ts-expect-error Ignore this
      acc[section as keyof typeof formPermissions] = perms;
      return acc;
    },
    {} as typeof VALID_PERMISSIONS
  );

  const allSelected = Object.entries(allPermissions).every(([section, perms]) =>
    perms.every((perm) =>
      formPermissions[section as keyof typeof formPermissions].includes(perm)
    )
  );

  const handleSelectAll = (checked: boolean) => {
    Object.entries(allPermissions).forEach(([section, perms]) => {
      perms.forEach((perm) => {
        // Only call setFormPermissions if change is needed
        const isAlreadyIncluded =
          formPermissions[section as keyof typeof formPermissions]?.includes(
            perm
          );
        if (checked && !isAlreadyIncluded) {
          setFormPermissions(
            section as keyof typeof formPermissions,
            perm,
            true
          ); // Add only if not present
        } else if (!checked && isAlreadyIncluded) {
          setFormPermissions(
            section as keyof typeof formPermissions,
            perm,
            false
          ); // Remove only if present
        }
      });
    });
  };

  return (
    <div className="space-y-4">
      <div className="gap-4 space-y-2 grid grid-cols-4">
        <Label className="font-medium">Permissions</Label>
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={allSelected}
            onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
          />
          <Label htmlFor="select-all" className="text-sm">
            Select All
          </Label>
        </div>
      </div>

      {Object.entries(VALID_PERMISSIONS).map(([section, values]) => (
        <div key={section} className="gap-4 space-y-2 grid grid-cols-4">
          <div className="text-sm capitalize">{section}</div>
          <div className="flex flex-wrap gap-4">
            {values.map((perm) => (
              <div key={perm} className="flex items-center gap-2">
                <Checkbox
                  id={`${section}-${perm}`}
                  checked={formPermissions[
                    section as keyof typeof formPermissions
                  ]?.includes(perm)}
                  onCheckedChange={() =>
                    setFormPermissions(
                      section as keyof typeof formPermissions,
                      perm
                    )
                  }
                />
                <Label htmlFor={`${section}-${perm}`}>{perm}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionCheckboxes;
