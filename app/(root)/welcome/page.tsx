"use client";

import { CustomModal } from "@/components/CustomModal";
import { List } from "@/components/List";
import { useState } from "react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface Data {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export default function Dashboard() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const [userList, setUserList] = useState<Data | undefined>(undefined);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const addUser = () => {
    const newUser = {
      first_name: form.name.split(" ")[0],
      last_name: form.name.split(" ")[1] ?? "",
      email: form.email,
      avatar: "https://github.com/shadcn.png",
    };

    setUserList((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          data: [...prevState.data, newUser],
        };
      }
    });
    handleCloseCreateModal();
  };

  const updateUser = () => {
    const newUser = {
      first_name: form.name.split(" ")[0],
      last_name: form.name.split(" ")[1] ?? "",
      email: form.email,
    };

    setUserList((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          data: prevState.data.map((user) => {
            if (user.email === form.email) {
              return {
                avatar: user.avatar,
                ...newUser,
              };
            }
            return user;
          }),
        };
      }
    });
    handleCloseUpdateModal();
  };

  const deleteUser = async (email: string) => {
    setUserList((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          data: prevState.data.filter((user) => user.email !== email),
        };
      }
    });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center ">
      <h1 className="text-4xl font-bold text-start my-10">Dashboard</h1>
      <div className="flex w-96">
        <button
          onClick={() => {
            setForm({
              email: "",
              name: "",
            });
            handleOpenCreateModal();
          }}
          className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add User
        </button>
      </div>
      <List
        userList={userList}
        setUserList={setUserList}
        deleteUser={deleteUser}
        openUpdateModal={handleOpenUpdateModal}
        setForm={setForm}
      />
      <CustomModal
        form={form}
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        setForm={setForm}
        title="Add User"
        handleSubmit={addUser}
      />
      <CustomModal
        form={form}
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        setForm={setForm}
        title="Update User"
        handleSubmit={updateUser}
      />
    </section>
  );
}
