import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInfoThunk } from '../../../store/authSlice';
import { getAllConversationsThunk } from '../../../store/chatBarSlice';
import {
  conversationSelectors,
  isLoginSelector,
  userIdSelector,
} from '../../../store/selectors';
import { useAppDispatch } from '../../../store/store';
import './chatbar.scss';
import Conversation from './Conversation';
import FindingPerson from './FindingPerson';

interface Props {}

const ChatBar = ({}: Props) => {
  const currentUserId = useSelector(userIdSelector)!;
  const isLogin = useSelector(isLoginSelector);
  const dispatch = useAppDispatch();
  const conversations = useSelector(conversationSelectors);

  useEffect(() => {
    if (isLogin) dispatch(getUserInfoThunk({ id: currentUserId }));
  }, [isLogin]);

  useEffect(() => {
    if (isLogin) {
      dispatch(getAllConversationsThunk());
    }
  }, [isLogin]);

  return (
    <div className='chatbar'>
      <FindingPerson />
      {conversations.map((con) => {
        return (
          <Conversation
            key={con._id}
            name={
              con.receiverId._id === currentUserId
                ? con.senderId.email
                : con.receiverId.email
            }
            img={con.image}
            conversation={con}
          />
        );
      })}
    </div>
  );
};

export default ChatBar;
