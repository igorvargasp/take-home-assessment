/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useActionState, useMemo, useState } from "react";
import { signUp } from "@/actions/signUp";
import Input from "@/components/Input";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const initialState = {
  email: "",
  password: "",
};

export default function Home() {
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const [form, setForm] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  } | null>(null);
  const { signUp: registerUser } = useAuth();
  const passwordMatch = form?.confirmPassword === form?.password;

  useMemo(() => {
    if (state && form?.name && form?.email) {
      registerUser(state.token, form.name, form.email);
    }
  }, [state]);

  return (
    <>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <header className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Welcome
          </h2>
          <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </header>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <Input
              label="Name"
              id="name"
              htmlFor="name"
              name="name"
              placeholder="Your name"
              type="name"
              required
              autoComplete="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Email address"
              id="email"
              htmlFor="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              required
              autoComplete="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={!passwordMatch}
            />

            <Input
              label="Confirm Password"
              id="confirmPassword"
              htmlFor="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Your password again"
              required
              autoComplete="current-confirmPassword"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              error={!passwordMatch}
            />
            {!passwordMatch && (
              <span className="text-red-500">Passwords do not match</span>
            )}

            <div>
              <button
                type="submit"
                disabled={!passwordMatch}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Do you have an account?{" "}
            <Link
              href="/sign-in"
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
                "Sign In"
              )}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
