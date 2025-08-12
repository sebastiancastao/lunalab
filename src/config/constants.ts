// src/lib/constants.ts

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://webpagebackend.onrender.com";
export const apiBaseUrl = baseUrl + "/api";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

console.log("apiBaseUrl", apiBaseUrl);
console.log("isDevelopment", isDevelopment);
