export interface ConversationI {
  _id: string;
  name: string;
  image: string;
  senderId: UserI;
  receiverId: UserI;
  createdAt: Date;
}

export interface MessageI {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId?: string;
  text?: string | undefined;
  emotions: string[];
  type: string;
  forwardMessage?: MessageI | undefined;
  fileName?: string | undefined;
  fileUrl?: string | undefined;
  createdAt: Date;
}

export interface MessageClient {
  conversationId: string;
  senderId: string;
  text?: string | undefined;
  fileName?: string | undefined;
  fileUrl?: string | undefined;
  type: string;
}

export interface UserI {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
}

export interface authState {
  name: string | undefined | null;
  // avatar:string
  id: string | null;
  isLogin: boolean;
  user: UserI | null;
}

export interface AuthUserI {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface ChatBarStateI {
  isLoading: boolean | null;
  isConversationCreated: boolean;
  users: UserI[];
  activeUsers: string[];
  conversations: ConversationI[];
  conversation: ConversationI | null;
  err: boolean | null;
}

export interface ChatBodyStateI {
  isLoading: boolean | null;
  isContinue: boolean;
  messages: General[];
  err: boolean | null;
}

export interface General {
  id: number;
  data: MessageI[];
}

export interface ChatFooterStateI {
  isLoading: boolean | null;
  message: MessageI | null;
  err: boolean | null;
}
