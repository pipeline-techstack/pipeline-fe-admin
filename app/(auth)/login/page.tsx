import LoginCard from "@/components/cards/login-card";
import React from "react";

const Login = () => {
  return (
    <div>
      <main className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-md">
          <LoginCard />
        </div>
      </main>
    </div>
  );
};

export default Login;
