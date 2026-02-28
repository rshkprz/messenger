import ChatModel from "../models/chat.model";
import messageModel from "../models/message.model";
import UserModel from "../models/user.model";
import { BadRequestException } from "../utils/app-error";

export const findByIdUserService = async (userId: string) => {
  return await UserModel.findById(userId);
};

export const getUsersService = async (userId: string) => {
  const users = await UserModel.find({ _id: { $ne: userId } }).select(
    "-password",
  );

  return users;
};

export const getSingleChatService = async (chatId: string, userId: string) => {
  const chat = ChatModel.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });

  if (!chat) {
    throw new BadRequestException(
      "Chat not found or you are not authorized to view this chat",
    );
  }

  const messages = await messageModel
    .find({ chatId })
    .populate("sender", "name avatar")
    .populate({
      path: "replyTo",
      select: "Content image sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
    .sort({ createdAt: 1 });
  return { chat, messages };
};
