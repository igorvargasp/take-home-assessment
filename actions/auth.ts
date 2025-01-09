"use server";

import { cookies } from "next/headers";

export async function signIn(_prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const cookieStore = await cookies();
    const data = await response.json();
    cookieStore.set("token", JSON.stringify(data.token));

    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to sign In");
  }
}

export async function signUp(_prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const cookieStore = await cookies();
    const data = await response.json();
    cookieStore.set("token", JSON.stringify(data.token));

    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to sign up");
  }
}
