import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Blocks} from "react-loader-spinner";
import toast from "react-hot-toast";

import InputField from "../common/InputField";
import Button from "../common/Button";
import Error from "../common/Error";
import api from "../../services/api";
import {useMyContext} from '../../store/AppContext';
import {User} from "../../types/user";
import {Role} from "../../types/role";

const renderSkeleton = () => {
    return <div className="flex flex-col justify-center items-center h-72">
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
    </div>;
};

const UserDetails = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
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

    const {currentUser} = useMyContext();


    const {userId} = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [error, setError] = useState(null);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const fetchUserDetails = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get(`/admin/user/${userId}`);
            setUser(response.data);

            setSelectedRole(response.data.role?.roleName || "");
        } catch (err) {
            if (err && axios.isAxiosError(err)) {
                setError(err.response?.data?.message);
            }
            console.error("Error fetching user details", err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        //if user exist set the value by using the setValue function provided my react-hook-form
        if (user && Object.keys(user).length > 0) {
            setValue("username", user.userName);
            setValue("email", user.email);
        }
    }, [user, setValue]);

    const fetchRoles = useCallback(async () => {
        try {
            const response = await api.get("/admin/roles");
            setRoles(response.data);
        } catch (err) {
            if (err && axios.isAxiosError(err)) {
                setError(err.response?.data?.message);
            }
            console.error("Error fetching roles", err);
        }
    }, []);

    useEffect(() => {
        fetchUserDetails();
        fetchRoles();
    }, [fetchUserDetails, fetchRoles]);

    //set the selected role
    const handleRoleChange = (e: any) => {
        setSelectedRole(e.target.value);
    };

    //handle update role
    const handleUpdateRole = async () => {
        if (!userId) {
            toast.error("User id is undefined");
            return;
        }
        setUpdateRoleLoader(true);
        try {
            const formData = new URLSearchParams();
            formData.append("userId", userId);
            formData.append("roleName", selectedRole);

            await api.put(`/admin/update-role`, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            fetchUserDetails();
            toast.success("Update role successful");
        } catch (err) {
            console.log(err);
            toast.error("Update Role Failed");
        } finally {
            setUpdateRoleLoader(false);
        }
    };

    const handleDeleteUser = async (userIdToDelete: any) => {
        try {
            if (parseInt(currentUser.id) === parseInt(userIdToDelete)) {
                toast.error(
                    (t) => (
                        <span
                            id='cannot-delete-self'
                        >
                            Cannot delete yourself!<button
                            id='close-cannot-delete-self'
                            onClick={() => toast.dismiss(t.id)}
                            style={{
                                marginLeft: '10px',
                                color: 'blue',
                                cursor: 'pointer'
                            }}>
                            Close
                        </button>
                        </span>
                    ), {
                        duration: Infinity
                    });
                return;
            }
            // TODO use api.delete /admin/users/id!!!!
            await api.get(`/admin/delete-user/${userIdToDelete}`);

            toast.success(
                (t) => (
                    <span
                        id='user-deleted'
                    >
                        User deleted
                        <button
                            id='close-user-deleted-toast'
                            onClick={() => toast.dismiss(t.id)}
                            style={{
                                marginLeft: '10px',
                                color: 'blue',
                                cursor: 'pointer'
                            }}>
                            Close
                        </button>
                    </span>
                ), {
                    duration: Infinity
                });

            navigate('/admin/users');
        } catch (error) {
            console.log(error);
            toast.error("Error deleting user " + error);
        }
    };

    //handle update the password
    const handleSavePassword = async (data: any) => {
        if (!userId) {
            toast.error("User id is undefined");
            return;
        }
        setPasswordLoader(true);
        const newPassword = data.password;

        try {
            const formData = new URLSearchParams();
            formData.append("userId", userId);
            formData.append("password", newPassword);

            await api.put(`/admin/update-password`, formData, {
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

    const handleCheckboxChange = async (e: any, updateUrl: any) => {
        if (!userId) {
            toast.error("User id is undefined");
            return;
        }
        const {name, checked} = e.target;

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
            formData.append("userId", userId);

            formData.append(name, checked);

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
            console.log(`Error updating ${name}:`);
        } finally {
            message = null;
        }
    };

    if (error) {
        return <Error message={error}/>;
    }
    if (!userId) {
        return <Error message='user id is undefined'/>;
    }

    return (
        <div className="sm:px-12 px-4 py-10 ">
            {loading ? renderSkeleton() : (
                <>
                    <div className="lg:w-[70%] sm:w-[90%] w-full mx-auto shadow-lg shadow-gray-300 p-8 rounded-md">
                        <div>
                            <h1 className="text-slate-800 text-2xl font-bold pb-4">
                                Profile Information
                                <hr/>
                            </h1>
                            <form
                                className="flex flex-col gap-2 "
                                onSubmit={handleSubmit(handleSavePassword)}
                            >
                                <InputField
                                    label="UserName"
                                    required
                                    id="username"
                                    className="w-full"
                                    type="text"
                                    message="*UserName is required"
                                    placeholder="Enter your UserName"
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
                                        onClickHandler={() =>
                                            setIsEditingPassword(!isEditingPassword)
                                        }
                                        className="bg-customRed mb-0 w-fit px-4 py-2 rounded-md text-white"
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
                                            onClickHandler={() =>
                                                setIsEditingPassword(!isEditingPassword)
                                            }
                                            className="bg-customRed mb-0 w-fit px-4 py-2 rounded-md text-white"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="lg:w-[70%] sm:w-[90%] w-full mx-auto shadow-lg shadow-gray-300 p-8 rounded-md">
                        <h1 className="text-slate-800 text-2xl font-bold pb-4">
                            Admin Actions
                            <hr/>
                        </h1>

                        <button
                            id='delete-user'
                            className="bg-btnColor hover:text-slate-300 px-4 py-2 rounded-md text-white "
                            onClick={() => handleDeleteUser(userId)}
                        >
                            Delete user
                        </button>

                        <div className="py-4 flex sm:flex-row flex-col sm:items-center items-start gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-slate-600 text-lg font-semibold ">
                                    Role:
                                </label>
                                <select
                                    className=" px-8 py-1 rounded-md border-2 uppercase border-slate-600 "
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                >
                                    {roles.map((role) => (
                                        <option
                                            className="bg-slate-200 flex flex-col gap-4 uppercase text-slate-700"
                                            key={role.roleId}
                                            value={role.roleName}
                                        >
                                            {role.roleName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className="bg-btnColor hover:text-slate-300 px-4 py-2 rounded-md text-white "
                                onClick={handleUpdateRole}
                            >
                                {updateRoleLoader ? "Loading..." : "Update Role"}
                            </button>
                        </div>

                        <hr className="py-2"/>
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
                                    onChange={(e) =>
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
                                            `/admin/update-credentials-expiry-status?userId=${userId}&expire=${user?.credentialsNonExpired}`
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDetails;