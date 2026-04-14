"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import LoadingScreen from "./_components/loading-animation";
import { useAuth } from "@/hooks/use-auth";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const hasCalled = useRef(false);

  useEffect(() => {
    const runLogin = async () => {
      if (hasCalled.current) return;
      hasCalled.current = true;

      try {
        const email = searchParams.get("email");
        const password = searchParams.get("password");

        if (!email || !password) {
          router.replace("/login");
          return;
        }

        // 🔥 LOGIN CALL
        await login({ email, password });

        toast.success("Login successful!");

        setTimeout(() => {
          router.replace("/customers/new/");
        }, 800);

      } catch (error: any) {
        console.error(error);

        toast.error(error?.message || "Login failed!");

        setTimeout(() => {
          router.replace("/login");
        }, 800);
      }
    };

    runLogin();
  }, [login, router, searchParams]);

  return <LoadingScreen isLoading={true} />;
}

export default Page;