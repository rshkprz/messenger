import { useSocket } from "@/hooks/use-socket";

export const isUserOnline = (userId?: string) => {
  if (!userId) return false;
  const { onlineUsers } = useSocket();
  return onlineUsers.includes(userId);
};
