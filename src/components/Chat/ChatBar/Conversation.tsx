import './conversation.scss';
import { useAppDispatch } from '../../../store/store';
import chatBarSlice from '../../../store/chatBarSlice';
import { ConversationI, UserI } from '../../../store/type';
import chatBodySlice from '../../../store/chatBodySlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  userIdSelector,
  conversationSelectors,
} from '../../../store/selectors';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useState,
} from 'react';
import {
  conversationSelector,
  activeUserSelectors,
} from '../../../store/selectors';

interface Props {
  name: string;
  img: string;
  conversation: ConversationI;
  // className: string;
}

const Conversation = ({ name, img, conversation }: Props, ref: any) => {
  const conSelector = useSelector(conversationSelector);
  const dispatch = useAppDispatch();
  const currentUserId = useSelector(userIdSelector);
  const isOwner = conversation?.senderId?._id === currentUserId;
  const divRef = useRef<HTMLDivElement>(null);
  const activeUsers = useSelector(activeUserSelectors);
  const [receiver, setReceiver] = useState<UserI>();
  const [active, setActive] = useState(true);

  useEffect(() => {
    console.log({ activeUsers, receiver });
    if (receiver && activeUsers?.includes(receiver._id)) setActive(true);
    else setActive(false);
  }, [activeUsers, receiver]);

  const conversationHandler = () => {
    dispatch(chatBodySlice.actions.resetMessages());
    dispatch(chatBarSlice.actions.changeConversation(conversation));
  };

  useEffect(() => {
    if (conversation?.senderId?._id === currentUserId) {
      setReceiver(conversation.receiverId);
    } else {
      setReceiver(conversation.senderId);
    }
  }, [conSelector]);

  return (
    <div
      className={`conversation ${
        conSelector?._id === conversation._id && 'active'
      }`}
      onClick={conversationHandler}
      ref={divRef}
    >
      <img
        src={
          isOwner
            ? conversation.receiverId.avatar
            : conversation.senderId.avatar
        }
        style={{ borderRadius: '50%' }}
      />
      <div
        className='status'
        style={{
          display: `${active ? 'block' : ''}`,
        }}
      />
      <div className='convesation__name'>
        {isOwner ? conversation.receiverId.name : conversation.senderId.name}
      </div>
    </div>
  );
};

export default Conversation;
