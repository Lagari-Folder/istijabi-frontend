import axios from "axios";

export const getSessionId = async (payload: {
  id: string;
  amount: string;
  message: string;
}) => {
  if (
    !payload.amount ||
    isNaN(Number(payload.amount)) ||
    Number(payload.amount) <= 0
  ) {
    throw new Error("Invalid donation amount.");
  }

  const response = await axios.post("/getsessionid", {
    amount: payload.amount,
    message: payload.message.trim(),
    project_id: payload.id,
  });

  if (!response.data?.sessionId) {
    throw new Error("Session ID not returned from server.");
  }

  return response.data;
};
