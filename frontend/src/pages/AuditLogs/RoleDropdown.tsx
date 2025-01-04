import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Role } from '../../types/role.ts';
import toast from 'react-hot-toast';
import { updateRole } from '../../services/role.ts';

interface RoleDropdownProps {
  userId: number;
  currentRoleId: number;
  roles: Role[];
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  userId,
  currentRoleId,
  roles,
}) => {
  const [selectedRole, setSelectedRole] = useState<number>(currentRoleId);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (event: SelectChangeEvent<number>) => {
    const newRoleId = event.target.value as number;
    setSelectedRole(newRoleId);
    setLoading(true);
    try {
      await updateRole({
        userId,
        roleId: newRoleId,
      });
      // TODO fetchUserDetails();
      toast.success('Update role successful');
    } catch (err) {
      setSelectedRole(currentRoleId); // Revert to previous role on error
      toast.error('Update Role Failed ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="role-select-label">Role</InputLabel>
      <Select
        label="Role"
        labelId="role-select-label"
        value={selectedRole}
        onChange={handleChange}
        disabled={loading}
      >
        {roles.map((role) => (
          <MenuItem key={role.roleId} value={role.roleId}>
            {role.roleName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>select a role to update</FormHelperText>
    </FormControl>
  );
};

export default RoleDropdown;
