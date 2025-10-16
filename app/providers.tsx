"use client";

import { ReactNode } from "react";
// import { Provider as ReduxProvider } from "react-redux";
// import { store, persistor } from "@/store/store";
// import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          duration: 4000,
          style: { fontSize: "0.95rem" },
        }}
      />
      {/* 
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        </PersistGate>
      </ReduxProvider> 
      */}
    </QueryClientProvider>
  );
}
