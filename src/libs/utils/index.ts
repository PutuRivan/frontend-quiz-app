import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TUserResult } from "../types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export async function hashPassword(password: string) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem('stored_users') || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users: any) {
  localStorage.setItem('stored_users', JSON.stringify(users));
}

export function loadStoredResults() {
  return JSON.parse(localStorage.getItem('quizResults') || '[]');
}

export function setStoredResults(result: TUserResult, existing: TUserResult[]) {
  localStorage.setItem("quizResults", JSON.stringify([result, ...existing]))
}

export function loadUserQuizSession(user: string) {
  try {
    return JSON.parse(localStorage.getItem(`quizSession_${user}`) || 'null');
  } catch {
    return null;
  }
}

export function setUserQuizSession(user: string, session: any) {
  localStorage.setItem(`quizSession_${user}`, JSON.stringify(session));
}

export function decodeHTMLEntities(text: string) {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = text
  return textarea.value
}