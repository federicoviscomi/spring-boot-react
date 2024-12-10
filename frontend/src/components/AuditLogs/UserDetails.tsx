import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Blocks } from "react-loader-spinner";
import toast from "react-hot-toast";

import InputField from "../common/InputField";
import Error from "../common/Error";
import api from "../../services/api";
import { useMyContext } from "../../store/AppContext";
import { getUser } from "../../services/user";
import { getRoles } from "../../services/role";
import { User } from "../../types/user";
import { Role } from "../../types/role";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import RoleDropdown from "./RoleDropdown";

const renderSkeleton = () => (
  <div className="flex flex-col justify-center items-center h-72">
    <span>
      <Blocks
        height="70"
        width="70"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </span>
    <span>Please wait...</span>
  </div>
);

const UserDetails = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const [loading, setLoading] = useState(false);
  const [updateRoleLoader, setUpdateRoleLoader] = useState(false);
  const [passwordLoader, setPasswordLoader] = useState(false);

  const { currentUser } = useMyContext();

  const userId = Number(useParams().userId);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const fetchUserDetails = useCallback(async () => {
    if (userId === undefined || userId === null || isNaN(userId)) {
      toast.error("user id is undefined");
      return;
    }
    setLoading(true);
    try {
      const response = await getUser(userId);
      setUser(response.data);

      setSelectedRole(response.data.role?.roleName || "");
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
      toast.error("Error fetching user details" + err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    //if user exist set the value by using the setValue function provided my react-hook-form
    if (user && Object.keys(user).length > 0) {
      setValue("username", user.username);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
      toast.error("Error fetching roles" + err);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
  }, [fetchUserDetails, fetchRoles]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleDeleteUser = async (userIdToDelete: number) => {
    if (!currentUser) {
      return;
    }
    try {
      if (currentUser.id === userIdToDelete) {
        toast.error(
          (t) => (
            <span id="cannot-delete-self">
              Cannot delete yourself!
              <Button
                id="close-cannot-delete-self"
                onClick={() => toast.dismiss(t.id)}
                style={{
                  marginLeft: "10px",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Close
              </Button>
            </span>
          ),
          {
            duration: Infinity,
          },
        );
        return;
      }
      // TODO use api.delete /admin/users/id!!!!
      await api.get(`/admin/delete-user/${userIdToDelete}`);

      toast.success(
        (t) => (
          <span id="user-deleted">
            User deleted
            <Button
              id="close-user-deleted-toast"
              onClick={() => toast.dismiss(t.id)}
              style={{
                marginLeft: "10px",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Close
            </Button>
          </span>
        ),
        {
          duration: Infinity,
        },
      );

      navigate("/admin/users");
    } catch (deleteUserError) {
      toast.error("Error deleting user " + deleteUserError);
    }
  };

  const handleSavePassword = async (data: any) => {
    if (!userId) {
      toast.error("User id is undefined");
      return;
    }
    setPasswordLoader(true);
    const newPassword = data.password;

    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId.toString());
      formData.append("password", newPassword);

      await api.put("/admin/update-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setIsEditingPassword(false);
      setValue("password", "");
      //fetchUserDetails();
      toast.success("password update success");
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        toast.error("Error updating password " + err.response?.data);
      } else {
        toast.error("Error updating password");
      }
    } finally {
      setPasswordLoader(false);
    }
  };

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    updateUrl: string,
  ) => {
    if (!userId) {
      toast.error("User id is undefined");
      return;
    }
    const { name, checked } = e.target;

    let message = null;
    if (name === "lock") {
      message = "Update Account Lock status Successful";
    } else if (name === "expire") {
      message = "Update Account Expiry status Successful";
    } else if (name === "enabled") {
      message = "Update Account Enabled status Successful";
    } else if (name === "credentialsExpire") {
      message = "Update Account Credentials Expired status Successful";
    }

    try {
      const formData = new URLSearchParams();
      formData.append("userId", userId.toString());
      formData.append(name, String(checked));

      await api.put(updateUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      fetchUserDetails();
      toast.success(message);
    } catch (err) {
      if (err && axios.isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
      toast.error(`Error updating ${name}:`);
    } finally {
      message = null;
    }
  };

  if (error) {
    return <Error message={error} />;
  }
  if (!userId) {
    return <Error message="user id is undefined" />;
  }
  if (loading) {
    return renderSkeleton();
  }

  const renderProfileInformation = () => (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Profile Information</Typography>
      <Box sx={{ padding: 2 }}>
        <form
          className="flex flex-col gap-2 "
          onSubmit={handleSubmit(handleSavePassword)}
        >
          <InputField
            label="Username"
            required
            id="username"
            className="w-full"
            type="text"
            message="*Username is required"
            placeholder="Enter your Username"
            register={register}
            errors={errors}
            readOnly
          />
          <InputField
            label="Email"
            required
            id="email"
            className="flex-1"
            type="text"
            message="*Email is required"
            placeholder="Enter your Email"
            register={register}
            errors={errors}
            readOnly
          />
          <InputField
            label="Password"
            required
            autoFocus={isEditingPassword}
            id="password"
            className="w-full"
            type="password"
            message="*Password is required"
            placeholder="Enter your Password"
            register={register}
            errors={errors}
            readOnly={!isEditingPassword}
            min={6}
          />
          {!isEditingPassword ? (
            <Button
              type="button"
              onClick={() => setIsEditingPassword(!isEditingPassword)}
            >
              Click To Edit Password
            </Button>
          ) : (
            <div className="flex items-center gap-2 ">
              <Button
                type="submit"
                className="bg-btnColor mb-0 w-fit px-4 py-2 rounded-md text-white"
              >
                {passwordLoader ? "Loading.." : "Save"}
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditingPassword(!isEditingPassword)}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </Box>
    </Paper>
  );

  const renderRoles = () => {
    if (!user) {
      return;
    }
    return (
      <Box sx={{ padding: 2 }}>
        <RoleDropdown
          roles={roles}
          userId={user.userId}
          currentRoleId={user.role.roleId}
        />
      </Box>
    );
  };

  const renderAdmin = () => (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Admin Actions</Typography>
      <Box sx={{ padding: 2 }}>
        {renderRoles()}
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-2">
            <label className="text-slate-600 text-sm font-semibold uppercase">
              Lock Account
            </label>
            <input
              className="text-14 w-5 h-5"
              type="checkbox"
              name="lock"
              checked={!user?.accountNonLocked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(e, "/admin/update-lock-status")
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-slate-600 text-sm font-semibold uppercase">
              Account Expiry
            </label>
            <input
              className="text-14 w-5 h-5"
              type="checkbox"
              name="expire"
              checked={!user?.accountNonExpired}
              onChange={(e) =>
                handleCheckboxChange(e, "/admin/update-expiry-status")
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-slate-600 text-sm font-semibold uppercase">
              Account Enabled
            </label>
            <input
              className="text-14 w-5 h-5"
              type="checkbox"
              name="enabled"
              checked={user?.enabled}
              onChange={(e) =>
                handleCheckboxChange(e, "/admin/update-enabled-status")
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-slate-600 text-sm font-semibold uppercase">
              Credentials Expired
            </label>
            <input
              className="text-14 w-5 h-5"
              type="checkbox"
              name="credentialsExpire"
              checked={!user?.credentialsNonExpired}
              onChange={(e) =>
                handleCheckboxChange(
                  e,
                  `/admin/update-credentials-expiry-status?userId=${userId}&expire=${user?.credentialsNonExpired}`,
                )
              }
            />
          </div>
        </div>

        <Button
          id="delete-user"
          className="bg-btnColor hover:text-slate-300 px-4 py-2 rounded-md text-white "
          onClick={() => handleDeleteUser(userId)}
        >
          Delete user
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Stack
      direction="column"
      spacing={3}
      alignItems="stretch"
      sx={{ padding: 2 }}
    >
      {renderProfileInformation()}
      {renderAdmin()}
    </Stack>
  );
};

export default UserDetails;
