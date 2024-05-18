import { BRIDGE_API_URL, DASHBOARD_API_URL } from "@constants/index";
import { TrackingInformation } from "../model/tracking";
import { DashboardInformation } from "../model/dashboard";
import { Challenge } from "../model/rewards";

// Monitoring
export const getTrackingInformation = async (address: string) =>
  request<TrackingInformation[]>(
    `${BRIDGE_API_URL}/bridge_requests?addr=${address}`,
    "getTrackingInformation"
  );

// Dashboard
export const getDashboardInformation = async () =>
  request<DashboardInformation>(
    `${DASHBOARD_API_URL}/stats`,
    "getDashboardInformation"
  );

// Challenges
export const getChallengesInformation = async (address: string) =>
  request<Challenge[]>(
    `${DASHBOARD_API_URL}/challenges/${address}`,
    "getChallengesInformation"
  );

// Functions
async function request<T>(
  url: string,
  name: string,
  method: "GET" | "POST" = "GET",
  body?: any
) {
  const response: Response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`${name} call failed.`);
  }

  const data: T = await response.json();

  return data;
}
