import { Outlet } from "react-router-dom";
import AppWrapper from "../components/app-wrapper";
import { cn } from "@/lib/utils";
import useChatId from "@/hooks/use-chat-id";
import ChatList from "@/components/chat/chat-list";

export default function AppLayout() {
  const chatId = useChatId();
  return (
    <AppWrapper>
      <div className="h-full">
        <div className={cn(chatId ? "hidden lg:block" : "block")}>
          <ChatList />
        </div>
        <div
          className={cn(
            "lg:!pl-95 pl-7",
            !chatId ? "hidden lg:block" : "block",
          )}
        >
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
}
