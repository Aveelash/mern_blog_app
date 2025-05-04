import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../redux/features/auth/authApi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UpdateUserModal from "./UpdateUserModal";

const ManageUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteUser({ userId: id }).unwrap();
      alert("User Deleted Successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) return <div className="p-4">Loading users...</div>;
  if (error)
    return <div className="p-4 text-red-600">Failed to load users.</div>;

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center justify-between">
                <h3 className="font-semibold text-base text-blueGray-700">
                  All Users
                </h3>
                <button
                  className="bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-1 rounded"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    {["No.", "User email", "User role", "Edit", "Delete"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 bg-blueGray-50 text-blueGray-500 border border-blueGray-100 py-3 text-xs uppercase font-semibold text-left"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.length > 0 ? (
                    data.users.map((user, index) => (
                      <tr key={user._id}>
                        <td className="border-t-0 px-6 text-xs p-4">
                          {index + 1}
                        </td>
                        <td className="border-t-0 px-6 text-xs p-4">
                          {user?.email}
                        </td>
                        <td className="border-t-0 px-6 text-xs p-4">
                          <span
                            className={`rounded-full py-[2px] px-3 ${
                              user?.role === "admin"
                                ? "bg-indigo-500 text-white"
                                : "bg-amber-300"
                            }`}
                          >
                            {user?.role}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 text-xs p-4">
                          <button
                            className="hover:text-blue-700 flex items-center gap-1"
                            onClick={() => handleEdit(user)}
                          >
                            <MdModeEdit /> Edit
                          </button>
                        </td>
                        <td className="border-t-0 px-6 text-xs p-4">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUser;
