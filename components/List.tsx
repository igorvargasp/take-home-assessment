/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import { Data } from "@/app/(root)/welcome/page";
import { ThemeContext } from "./Theme";

interface ListProps {
  userList: Data | undefined;
  setUserList: React.Dispatch<React.SetStateAction<Data | undefined>>;
  deleteUser: (email: string) => void;
  openUpdateModal: () => void;
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
    }>
  >;
}

export const List = ({
  userList,
  setUserList,
  deleteUser,
  openUpdateModal,
  setForm,
}: ListProps) => {
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const { isDark } = useContext(ThemeContext);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setUserList(data);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch users");
    }
  };

  useMemo(() => {
    getUsers();
  }, [page]);

  return (
    <>
      <section className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
          {userList?.data
            .map((user, index: number) => (
              <div
                key={index}
                role="button"
                className="text-slate-800 flex w-full items-center justify-between rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800 dark:active:bg-zinc-800 shadow-sm"
                onClick={() => {
                  setForm({
                    email: user.email,
                    name: user.first_name + " " + user.last_name,
                  });
                  openUpdateModal();
                }}
              >
                <div className="mr-4 grid place-items-center">
                  <Image
                    alt={user.first_name}
                    src={user.avatar}
                    className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h6 className="text-slate-800 font-medium dark:text-white">
                    {user.first_name} {user.last_name}
                  </h6>
                  <p className="text-slate-500 text-sm dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
                <button
                  className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-red-600 hover:bg-red-200 focus:bg-red-200 active:bg-red-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUser(user.email);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))
            .reverse()}
        </nav>
      </section>
      <Pagination
        count={userList?.total_pages}
        page={page}
        onChange={handleChange}
        variant="text"
        sx={{
          "   .MuiPaginationItem-root": {
            color: isDark ? "white" : "black",
            "&.Mui-selected": {
              backgroundColor: isDark ? "white" : "black",
              color: isDark ? "black" : "white",
            },
          },
        }}
      />
    </>
  );
};
