import { BRIDGE_API_URL } from "@constants/index";
import { TrackingInformation } from "../model/tracking";

// Monitoring
export const getTrackingInformation = async (address: string) =>
  request<TrackingInformation[]>(
    `${BRIDGE_API_URL}/bridge_requests?addr=${address}`,
    "getTrackingInformation"
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