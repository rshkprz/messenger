import { useChat } from "@/hooks/use-chat";
import type { MessageType } from "@/types/chat.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Paperclip, Send, X } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import ChatReplyBar from "./chat-reply-bar";

interface Props {
  chatId: string | null;
  currentUserId: string | null;
  replyTo: MessageType | null;
  onCancelReply: () => void;
}

export default function ChatFooter({
  chatId,
  currentUserId,
  replyTo,
  onCancelReply,
}: Props) {
  const messageSchema = z.object({
    message: z.string().optional(),
  });

  const { sendMessage, isSendingMsg } = useChat();

  const [image, setImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  // Handle image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // Submit
  const onSubmit = (values: { message?: string }) => {
    if (isSendingMsg) return;

    if (!chatId) {
      toast.error("Invalid chat");
      return;
    }

    if (!values.message?.trim() && !image) {
      toast.error("Please enter a message or select an image");
      return;
    }

    sendMessage({
      chatId,
      content: values.message?.trim() || "",
      image: image || undefined,
      replyTo: replyTo,
    });

    onCancelReply();
    handleRemoveImage();
    form.reset({ message: "" });
  };

  return (
    <>
      <div className="sticky bottom-0 inset-x-0 z-[999] bg-card border-t border-border py-4">
        
        {/* 📷 Image Preview */}
        {image && !isSendingMsg && (
          <div className="max-w-6xl mx-auto px-8.5 mb-2">
            <div className="relative w-fit">
              <img
                src={image}
                className="object-contain h-16 bg-muted min-w-16 rounded"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 bg-black/50 text-white rounded-full"
                onClick={handleRemoveImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* 💬 Form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-6xl px-8.5 mx-auto flex items-end gap-2"
        >
          {/* 📎 File Upload */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isSendingMsg}
            className="rounded-full"
            onClick={() => imageInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <input
            type="file"
            hidden
            accept="image/*"
            ref={imageInputRef}
            disabled={isSendingMsg}
            onChange={handleImageChange}
          />

          {/* 📝 Message Input */}
          <FieldGroup className="flex-1">
            <Controller
              name="message"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="Type a message"
                    className="min-h-[40px] bg-background"
                    disabled={isSendingMsg}
                  />
                </Field>
              )}
            />
          </FieldGroup>

          {/* 🚀 Send */}
          <Button
            type="submit"
            size="icon"
            className="rounded-lg"
            disabled={isSendingMsg}
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>

      {/* 🔁 Reply Bar */}
      {replyTo && !isSendingMsg && (
        <ChatReplyBar
          replyTo={replyTo}
          currentUserId={currentUserId}
          onCancel={onCancelReply}
        />
      )}
    </>
  );
}