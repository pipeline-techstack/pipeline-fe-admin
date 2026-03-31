"use client";

import { ReactNode } from "react";
// import { Provider as ReduxProvider } from "react-redux";
// import { store, persistor } from "@/store/store";
// import { PersistGate } from "redux-persist/integration/react";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

let isRedirecting = false;

const handleAuthError = (error: any) => {
  if (error?.response?.status === 401 && !isRedirecting) {
    isRedirecting = true;
    window.location.href = "/login?sessionExpired=true";
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleAuthError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleAuthError(error);
    },
  }),
  defaultOptions: {
queries: {
      retry: false,
    },
  },
});

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
