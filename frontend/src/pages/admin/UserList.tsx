import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdDateRange, MdOutlineEmail } from "react-icons/md";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

import Error from "../../components/common/Error";
import { User } from "../../types/user";
import { getUsers } from "../../services/user";

export const userListsColumns: GridColDef[] = [
  {
    field: "userName",
    headerName: "UserName",
    minWidth: 200,
    headerAlign: "center",
    disableColumnMenu: true,
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">UserName</span>,
  },
  {
    field: "email",
    headerName: "Email",
    align: "center",
    width: 260,
    editable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center ",
    disableColumnMenu: true,
    renderHeader: (params) => <span>Email</span>,
    renderCell: (params) => {
      return (
        <div className=" flex items-center justify-center gap-1 ">
          <span>
            <MdOutlineEmail className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.email}</span>
        </div>
      );
    },
  },
  {
    field: "created",
    headerName: "Created At",
    headerAlign: "center",
    width: 220,
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border ",
    align: "center",
    disableColumnMenu: true,
    renderHeader: (params) => <span>Created At</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center items-center gap-1">
          <span>
            <MdDateRange className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.created}</span>
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    width: 200,
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border ",
    cellClassName: "text-slate-700 font-normal border ",
    renderHeader: (params) => <span className="ps-10">Status</span>,
  },
  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-cente",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 200,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      console.log("params row", params.row);
      return (
        <Link
          to={`/admin/users/${params.id}`}
          className="h-full flex items-center justify-center"
        >
          <button
            id={`view-user-${params.row.userName}`}
            className="bg-btnColor text-white px-4 flex justify-center items-center h-9 rounded-md "
          >
            View
          </button>
        </Link>
      );
    },
  },
];

const renderSkeleton = () => {
  return (
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
};
const renderUserList = (users: User[]) => {
  const rows = users.map((item) => {
    //console.log('item', item);
    const formattedDate = moment(item.createdDate).format(
      "MMMM DD, YYYY, hh:mm A",
    );

    //set the data for each rows in the table according to the field name in columns
    //Example: username is the keyword in row it should match with the field name in column so that the data will show on that column dynamically
    return {
      id: item.userId,
      userName: item.userName,
      email: item.email,
      created: formattedDate,
      status: item.enabled ? "Active" : "Inactive",
    };
  });

  return (
    <div id="user-list">
      <DataGrid
        className="w-fit mx-auto"
        rows={rows}
        columns={userListsColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[6]}
        disableColumnResize
      />
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers();
        setUsers(data);
      } catch (error) {
        if (error && axios.isAxiosError(error)) {
          setError(error.response?.data?.message);
        }
        toast.error("Error fetching users " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="p-4">
      <div className="py-4">
        <h1 className="text-center text-2xl font-bold text-slate-800 uppercase">
          All Users
        </h1>
      </div>
      <div className="overflow-x-auto w-full mx-auto">
        {loading ? renderSkeleton() : renderUserList(users)}
      </div>
    </div>
  );
};

export default UserList;
