import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './Chat.scss';
import ChatBar from './ChatBar/ChatBar';
import ChatFooter from './ChatFooter/ChatFooter';
import ChatUser from './ChatUser/ChatUser';
import { useSelector } from 'react-redux';
import { conversationSelector, userIdSelector } from '../../store/selectors';
import ChatBody from './ChatBody/Messages/ChatBody';
import { useAppDispatch } from '../../store/store';
import chatBarSlice from '../../store/chatBarSlice';

interface Props {}

export const socket = io('https://chat-app-mern-jb38.onrender.com', {
  withCredentials: true,
});
// export const socket = io('http://localhost:3000');

const Chat = ({}: Props) => {
  const conSelector = useSelector(conversationSelector);
  const currentUserId = useSelector(userIdSelector)!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit('sendUser', currentUserId);
  }, []);

  useEffect(() => {
    socket.on('getUsers', (data) => {
      dispatch(chatBarSlice.actions.getActiveUsers(data));
    });
  }, []);

  return (
    <div className='chat'>
      <ChatBar />
      <div className='chat__wrapper'>
        {conSelector ? (
          <>
            <ChatBody />
            <ChatFooter />
          </>
        ) : (
          <div className='choose__conversation__wrapper'>
            <div className='choose__conversation'>
              Select conversation on the left to start a conversation
            </div>
          </div>
        )}
      </div>
      <div className='chat__user'>
        <ChatUser />
      </div>
    </div>
  );
};

export default Chat;
