"use client";
import React, { useState } from "react";
import { Mail, LockKeyhole, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import HeaderOrIntro from "@/components/ui/header";
import Note from "./_components/note";

const Notes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (id === "pagar" && password === "VASCA") {
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Invalid ID or Password");
      }
      setIsLoading(false);
    }, 800); // fake loading
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">

          {/* Header */}
          <HeaderOrIntro
            className="relative"
            title={{ text: "Login", highlight: "" }}
            subtitle=""
          />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative space-y-4 sm:space-y-5 lg:space-y-6"
          >
            {/* ID (instead of email) */}
            <div>
              <label className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail className="size-4" />
                <span>User ID</span>
              </label>

              <Input
                value={id}
                name="id"
                type="text"
                placeholder="Enter your ID"
                className="mt-1 px-3 rounded-md w-full h-10 text-sm"
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-gray-500 text-sm">
                <LockKeyhole className="size-4" />
                <span>Password</span>
              </label>

              <div className="relative mt-1">
                <Input
                  value={password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="px-3 pr-10 rounded-md w-full h-10 text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="top-1/2 right-3 absolute text-gray-500 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isloading}
              className="bg-primary hover:bg-primary/90 disabled:opacity-60 py-2.5 rounded-md w-full text-white text-sm transition"
            >
              {isloading ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // After login
  return (
  <Note />
  );
};

export default Notes;