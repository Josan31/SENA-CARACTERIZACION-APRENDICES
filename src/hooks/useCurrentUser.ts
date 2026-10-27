"use client";

import { useEffect, useState } from "react";
import type { UserAccount } from "@/lib/users";

/**
 * Reads the authenticated user stored in localStorage after login.
 * Returns null while hydrating (SSR) or when no session exists.
 */
export function useCurrentUser(): UserAccount | null {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sena_user");
      if (raw) {
        setUser(JSON.parse(raw) as UserAccount);
      }
    } catch {
      // localStorage unavailable or JSON malformed — leave null
    }
  }, []);

  return user;
}

/**
 * Derives up to two uppercase initials from a full name.
 * e.g. "Carlos Alberto Restrepo" → "CR"
 */
export function getInitials(nombre: string): string {
  const parts = nombre.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  // First word + last word gives first + last name initials
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
