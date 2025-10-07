// src/utils/navigation.ts
"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for reusable router actions.
 * Provides shortcuts for common navigation patterns.
 */
export const useAppRouter = () => {
  const router = useRouter();

  const goToWithParams = (path: string, params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    router.push(`${path}?${query}`);
  };

  
  /** Navigate to a specific path */
  const goTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  /** Replace the current route */
  const replaceTo = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router]
  );

  /** Go back one page */
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  /** Reload current route */
  const reload = useCallback(() => {
    router.refresh();
  }, [router]);

  /** Redirect to home */
  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  /** Redirect to login */
  const goLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  return { goToWithParams, goTo, replaceTo, goBack, reload, goHome, goLogin };
};