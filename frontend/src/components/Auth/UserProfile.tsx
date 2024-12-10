import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Blocks } from "react-loader-spinner";
import moment from "moment";

import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Switch from "@mui/material/Switch";

import Error from "../common/Error";
import api from "../../services/api";
import { useMyContext } from "../../store/AppContext";
import Button from "@mui/material/Button";
import axios from "axios";
import { TextField } from "@mui/material";

const UserProfile = () => {
  const { currentUser, token } = useMyContext();

  const [loginSession, setLoginSession] = useState<string | undefined>(
    undefined,
  );

  const [credentialExpireDate, setCredentialExpireDate] = useState<
    string | undefined
  >(undefined);
  const [pageError, setPageError] = useState<string | undefined>(undefined);

  const [accountExpired, setAccountExpired] = useState<boolean | undefined>(
    undefined,
  );
  const [accountLocked, setAccountLock] = useState<boolean | undefined>(
    undefined,
  );
  const [accountEnabled, setAccountEnabled] = useState<boolean | undefined>(
    undefined,
  );
  const [credentialExpired, setCredentialExpired] = useState<
    boolean | undefined
  >(undefined);

  const [openAccount, setOpenAccount] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [disabledLoader, setDisbledLoader] = useState(false);
  const [twofaCodeLoader, settwofaCodeLoader] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
      password: "",
    },
    mode: "onTouched",
  });

  //fetching the 2fa sttaus

  useEffect(() => {
    setPageLoader(true);

    const fetch2FAStatus = async () => {
      try {
        const response = await api.get("/auth/user/2fa-status");
        setIs2faEnabled(response.data.is2faEnabled);
      } catch (error) {
        if (error && axios.isAxiosError(error)) {
          setPageError(error.response?.data?.message);
        }
        toast.error("Error fetching 2FA status " + error);
      } finally {
        setPageLoader(false);
      }
    };
    fetch2FAStatus();
  }, []);

  //enable the 2fa
  const enable2FA = async () => {
    setDisbledLoader(true);
    try {
      const response = await api.post("/auth/enable-2fa");
      setQrCodeUrl(response.data);
      setStep(2);
    } catch (error) {
      toast.error("Error enabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  //diable the 2fa

  const disable2FA = async () => {
    setDisbledLoader(true);
    try {
      await api.post("/auth/disable-2fa");
      setIs2faEnabled(false);
      setQrCodeUrl("");
    } catch (error) {
      toast.error("Error disabling 2FA");
    } finally {
      setDisbledLoader(false);
    }
  };

  const verify2FA = async () => {
    if (!code || code.trim().length === 0) {
      return toast.error("Please Enter The Code To Verify");
    }
    settwofaCodeLoader(true);

    try {
      const formData = new URLSearchParams();
      formData.append("code", code);

      await api.post("/auth/verify-2fa", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("2FA verified successful");

      setIs2faEnabled(true);
      setStep(1);
    } catch (error) {
      toast.error("Invalid 2FA Code " + error);
    } finally {
      settwofaCodeLoader(false);
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      setValue("username", currentUser.username);
      setValue("email", currentUser.email);
      setAccountExpired(!currentUser.accountNonExpired);
      setAccountLock(!currentUser.accountNonLocked);
      setAccountEnabled(currentUser.enabled);
      setCredentialExpired(!currentUser.credentialsNonExpired);

      const expiredFormatDate: string = moment(
        currentUser?.credentialsExpiryDate,
      ).format("D MMMM YYYY");
      setCredentialExpireDate(expiredFormatDate);
    }
  }, [currentUser, setValue]);

  useEffect(() => {
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      if (decodedToken?.iat) {
        const lastLoginSession: string = moment
          .unix(decodedToken.iat)
          .format("dddd, D MMMM YYYY, h:mm A");
        setLoginSession(lastLoginSession);
      }
    }
  }, [token]);

  const handleUpdateCredential = async (data: any) => {
    if (!token) {
      toast.error("Token error");
      return;
    }
    const newUsername = data.username;
    const newPassword = data.password;

    try {
      setLoading(true);
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("newUsername", newUsername);
      formData.append("newPassword", newPassword);
      await api.post("/auth/update-credentials", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Credential successful");
    } catch (error) {
      toast.error("Update Credential failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAccountExpiryStatus = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!token) {
      toast.error("Token error");
      return;
    }

    setAccountExpired(event.target.checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("expire", String(event.target.checked));

      await api.put("/auth/update-expiry-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Account Expirey Status");
    } catch (error) {
      toast.error("Update expirey status failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAccountLockStatus = async (event: any) => {
    if (!token) {
      toast.error("Token error");
      return;
    }

    setAccountLock(event.target.checked);

    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("lock", event.target.checked);

      await api.put("/auth/update-lock-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Account Lock Status");
    } catch (error) {
      toast.error("Update Account Lock status failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAccountEnabledStatus = async (event: any) => {
    if (!token) {
      toast.error("Token error");
      return;
    }
    setAccountEnabled(event.target.checked);
    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("enabled", event.target.checked);

      await api.put("/auth/update-enabled-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Account Enabled Status");
    } catch (error) {
      toast.error("Update Account Enabled status failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialExpiredStatus = async (event: any) => {
    if (!token) {
      toast.error("Token error");
      return;
    }

    setCredentialExpired(event.target.checked);
    try {
      const formData = new URLSearchParams();
      formData.append("token", token);
      formData.append("expire", event.target.checked);

      await api.put("/auth/update-credentials-expiry-status", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //fetchUser();
      toast.success("Update Credentials Expiry Status");
    } catch (error) {
      toast.error("Credentials Expiry Status Failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageError) {
    return <Error message={pageError} />;
  }

  const onOpenAccountHandler = () => {
    setOpenAccount(!openAccount);
    setOpenSetting(false);
  };

  const onOpenSettingHandler = () => {
    setOpenSetting(!openSetting);
    setOpenAccount(false);
  };

  return (
    <div className="min-h-[calc(100vh-74px)] py-10">
      {pageLoader ? (
        <>
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
        </>
      ) : (
        <>
          <div className="xl:w-[70%] lg:w-[80%] sm:w-[90%] w-full sm:mx-auto sm:px-0 px-4   min-h-[500px] flex lg:flex-row flex-col gap-4 ">
            <div className="flex-1 flex flex-col shadow-lg shadow-gray-300 gap-2 px-4 py-6">
              <div className="flex flex-col items-center gap-2   ">
                <Avatar
                  alt={currentUser?.username}
                  src="/static/images/avatar/1.jpg"
                />
                <h3 className="font-semibold text-2xl">
                  {currentUser?.username}
                </h3>
              </div>
              <div className="my-4 ">
                <div className="space-y-2 px-4 mb-1">
                  <h1 className="font-semibold text-md text-slate-800">
                    Username :
                    <span className=" text-slate-700 font-normal">
                      {currentUser?.username}
                    </span>
                  </h1>
                  <h1 className="font-semibold text-md text-slate-800">
                    Role :
                    <span className=" text-slate-700 font-normal">
                      {currentUser && currentUser["roles"][0]}
                    </span>
                  </h1>
                </div>
                <div className="py-3">
                  <Accordion expanded={openAccount}>
                    <AccordionSummary
                      className="shadow-md shadow-gray-300"
                      onClick={onOpenAccountHandler}
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <h3 className="text-slate-800 text-lg font-semibold ">
                        Update User Credentials
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails className="shadow-md shadow-gray-300">
                      <form
                        className=" flex flex-col gap-3"
                        onSubmit={handleSubmit(handleUpdateCredential)}
                      >
                        <TextField
                          label="Username"
                          required
                          id="username"
                          className="text-sm"
                          type="text"
                          //message="*Username is required"
                          placeholder="Enter your username"
                          //register={register}
                          //errors={errors}
                        />
                        <TextField
                          label="Email"
                          required
                          id="email"
                          className="text-sm"
                          type="email"
                          //message="*Email is required"
                          placeholder="Enter your email"
                          //register={register}
                          //errors={errors}
                          //readOnly
                        />
                        <TextField
                          label="Enter New Password"
                          id="password"
                          className="text-sm"
                          type="password"
                          //message="*Password is required"
                          placeholder="type your password"
                          //register={register}
                          // TODO errors={errors}
                          //min={6}
                        />
                        <Button
                          disabled={loading}
                          className="bg-customRed font-semibold flex justify-center text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
                          type="submit"
                        >
                          {loading ? <span>Loading...</span> : "Update"}
                        </Button>
                      </form>
                    </AccordionDetails>
                  </Accordion>
                  <div className="mt-6">
                    <Accordion expanded={openSetting}>
                      <AccordionSummary
                        className="shadow-md shadow-gray-300"
                        onClick={onOpenSettingHandler}
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <h3 className="text-slate-800 text-lg font-semibold">
                          Account Setting
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails className="shadow-md shadow-gray-300">
                        <div className="flex flex-col gap-4">
                          <div>
                            <h3 className="text-slate-700 font-customWeight text-sm ">
                              Account Expired
                            </h3>
                            <Switch
                              checked={accountExpired}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                              ) => handleAccountExpiryStatus(event)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </div>

                          <div>
                            <h3 className="text-slate-700 font-customWeight text-sm ">
                              Account Locked
                            </h3>
                            <Switch
                              checked={accountLocked}
                              onChange={handleAccountLockStatus}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </div>

                          <div>
                            <h3 className="text-slate-700 font-customWeight text-sm ">
                              Account Enabled
                            </h3>
                            <Switch
                              checked={accountEnabled}
                              onChange={handleAccountEnabledStatus}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </div>
                          <>
                            <div className="mb-2">
                              <h3 className="text-slate-700 font-customWeight text-sm ">
                                Credential Setting
                              </h3>
                              <div className="shadow-gray-300 shadow-md px-4 py-4 rounded-md">
                                <p className="text-slate-700 text-sm ">
                                  Your credential will expired
                                  <span>{credentialExpireDate}</span>
                                </p>
                              </div>
                            </div>
                          </>
                          <div>
                            <h3 className="text-slate-700 font-customWeight text-sm">
                              Credential Expired
                            </h3>
                            <Switch
                              checked={credentialExpired}
                              onChange={handleCredentialExpiredStatus}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  <div className="pt-10 ">
                    <h3 className="text-slate-800 text-lg font-semibold mb-2 px-2">
                      Last Login Session
                    </h3>
                    <div className="shadow-md shadow-gray-300 px-4 py-2 rounded-md">
                      <p className="text-slate-700 text-sm">
                        Your Last LogIn Session when you are loggedin <br />
                        <span>{loginSession}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col shadow-lg shadow-gray-300 gap-2 px-4 py-6">
              <div className="space-y-1">
                <h1 className="text-slate-800 flex items-center gap-1 text-2xl font-bold">
                  <span>Authentication (MFA)</span>
                  <span
                    className={` ${
                      is2faEnabled ? "bg-green-800" : "bg-customRed"
                    } px-2 text-center py-1 text-xs mt-2 rounded-sm text-white`}
                  >
                    {is2faEnabled ? "Activated" : "Deactivated"}
                  </span>
                </h1>
                <h3 className="text-slate-800 text-xl font-semibold">
                  Multi Factor Authentication
                </h3>
                <p className="text-slate-800 text-sm ">
                  Two Factor Authentication Add a additional layer of security
                  to your account
                </p>
              </div>

              <div>
                <Button
                  disabled={disabledLoader}
                  onClick={is2faEnabled ? disable2FA : enable2FA}
                  className={` ${
                    is2faEnabled ? "bg-customRed" : "bg-btnColor"
                  } px-5 py-1 hover:text-slate-300 rounded-sm text-white mt-2`}
                >
                  {disabledLoader ? (
                    <>Loading...</>
                  ) : (
                    <>
                      {is2faEnabled
                        ? "Disabled Two Factor Authentication"
                        : "Enable Two Factor Authentication"}
                    </>
                  )}
                </Button>
              </div>
              {step === 2 && (
                <div className="py-3">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <h3 className="font-bold text-lg text-slate-700 uppercase">
                        QR Code To Scan
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="">
                        <img src={qrCodeUrl} alt="QR Code" />
                        <div className="flex items-center gap-2 mt-4">
                          <input
                            type="text"
                            placeholder="Enter 2FA code"
                            value={code}
                            required
                            className="mt-4 border px-2 py-1 border-slate-800 rounded-md"
                            onChange={(e) => setCode(e.target.value)}
                          />
                          <Button onClick={verify2FA}>
                            {twofaCodeLoader ? "Loading..." : "Verify 2FA"}
                          </Button>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;