import { useSelector } from 'react-redux';
import { conversationSelector, userIdSelector } from '../store/selectors';
import { MessageClient, MessageI } from '../store/type';
import { useAppDispatch } from '../store/store';
import { createMessageThunk } from '../store/chatFooterSlice';
import { socket } from '../components/Chat/Chat';

interface Props {}

interface DataI {
  type: string;
  text?: string;
  fileName?: string;
  fileUrl?: string;
}

const useMessenger = () => {
  const conSelector = useSelector(conversationSelector);
  const currentUserId = useSelector(userIdSelector);
  const dispatch = useAppDispatch();

  const messageHandler = (data: DataI) => {
    const message: MessageClient = {
      ...data,
      conversationId: conSelector?._id!,
      senderId: currentUserId!,
    };

    dispatch(createMessageThunk(message));

    const msg: MessageI = {
      ...message,
      _id: Math.random().toString(),
      emotions: [],
      createdAt: new Date(Date.now()),
      receiverId:
        conSelector?.senderId._id === currentUserId
          ? conSelector?.receiverId._id
          : conSelector?.senderId._id,
    };

    socket.emit('sendMessage', msg);
  };

  return messageHandler;
};

export default useMessenger;
