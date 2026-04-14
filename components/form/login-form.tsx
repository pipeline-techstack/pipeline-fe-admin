"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import HeaderOrIntro from "../ui/header";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {isloading, login} = useAuth();
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const query = new URLSearchParams({
    email,
    password,
  }).toString();

  router.push(`/loading?${query}`);
};

  return (
    <>
      {/* Dashed grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
      linear-gradient(to right, #e9e9ee 2px, transparent 2px),
      linear-gradient(to bottom, #e9e9ee 2px, transparent 2px)
    `,
          backgroundSize: "120px 120px",
          backgroundRepeat: "repeat",
        }}
      />
      {/* Secondary smaller grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
      linear-gradient(to right, #f2f2f6 2px, transparent 2px),
      linear-gradient(to bottom, #f2f2f6 2px, transparent 2px)
    `,
          backgroundSize: "24px 24px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
      radial-gradient(
        ellipse 60% 80% at 50% 50%,
        rgba(124, 92, 255, 0.15) 0%,
        rgba(124, 92, 255, 0.08) 30%,
        rgba(124, 92, 255, 0.03) 55%,
        transparent 75%
      )
    `,
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

       <HeaderOrIntro
            className="relative"
            title={{
              text: "Login",
              highlight: "",
            }}
            subtitle=""
          />
      <form
        onSubmit={handleSubmit}
        className="relative space-y-4 sm:space-y-5 lg:space-y-6"
      >
        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-gray-500 text-sm sm:text-sm">
            <Mail className="flex-shrink-0 size-3 sm:size-4" />
            <span>Email Address</span>
          </label>

          <Input
            value={email}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mt-1 h-9 sm:h-10 lg:h-11 w-full rounded-md px-3 placeholder:text-zinc-500 text-sm sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="flex items-center gap-2 text-gray-500 text-sm sm:text-sm capitalize">
            <LockKeyhole className="flex-shrink-0 size-3 sm:size-4" />
            <span>Password</span>
          </label>

          <div className="relative mt-1">
            <Input
              value={password}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pr-9 sm:pr-10 lg:pr-12 h-9 sm:h-10 lg:h-11 w-full rounded-md px-3 placeholder:text-zinc-500 text-sm sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="button"
              variant={"outline"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="top-1/2 right-2 sm:right-3 lg:right-4 absolute p-1 text-gray-500 hover:text-gray-700 transition-colors -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
              ) : (
                <Eye className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Remember + Forgot */}
        {/* <div className="flex justify-between gap-2 sm:gap-3 lg:gap-4">
    <label className="flex items-center space-x-2 cursor-pointer">
      <Input
        type="checkbox"
        name="remember"
        className="border-zinc-700"
      />
      <span className="text-gray-500 text-sm sm:text-sm">
        Remember me
      </span>
    </label>

    <Link
      href="/forgot-password"
      className="text-primary hover:text-primary/80 text-sm sm:text-sm underline transition-colors"
    >
      Forgot password?
    </Link>
  </div> */}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isloading}
          className="bg-primary hover:bg-primary/90 py-2 sm:py-2.5 lg:py-3 rounded-md w-full text-white text-sm sm:text-sm lg:text-base transition-colors disabled:opacity-60"
        >
          {isloading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="w-3 sm:w-4 h-3 sm:h-4 animate-spin" />
              <span>Loging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </>
  );
}
