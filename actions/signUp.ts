"use server";

export async function signUp(_prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${process.env.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  } catch (e) {
    console.log(e);
    throw new Error("Failed to sign up");
  }
}
