/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useActionState, useEffect, useState } from "react";
import Input from "@/components/Input";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "@/actions/auth";

const initialState = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const [form, setForm] = useState<{
    email?: string;
    password?: string;
  } | null>(null);
  const { signIn: login } = useAuth();

  useEffect(() => {
    if (state && form?.email) {
      login(state.token, form.email);
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <header className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign In to your account
          </h2>
        </header>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <Input
              label="Email address"
              id="email"
              htmlFor="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              required
              autoComplete="email"
              onChange={handleInputChange}
            />

            <Input
              label="Password"
              id="password"
              htmlFor="password"
              name="password"
              type="password"
              placeholder="Your password"
              required
              autoComplete="current-password"
              onChange={handleInputChange}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don&apos;t you have an account?{" "}
            <Link
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {pending ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                >
                  loading
                </svg>
              ) : (
                "Sign Up"
              )}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
