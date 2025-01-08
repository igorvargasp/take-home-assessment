"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Welcome() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Hello {user?.name}</h1>
    </section>
  );
}
