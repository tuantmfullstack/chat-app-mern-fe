import './conversation.scss';
import { useAppDispatch } from '../../../store/store';
import chatBarSlice from '../../../store/chatBarSlice';
import { ConversationI } from '../../../store/type';
import chatBodySlice from '../../../store/chatBodySlice';
import { useSelector } from 'react-redux';
import {
  userIdSelector,
  conversationSelectors,
} from '../../../store/selectors';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { conversationSelector } from '../../../store/selectors';

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

  const conversationHandler = () => {
    divRef.current?.classList.add('active');
    dispatch(chatBodySlice.actions.resetMessages());
    dispatch(chatBarSlice.actions.changeConversation(conversation));
  };

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
      <div className='convesation__name'>
        {isOwner ? conversation.receiverId.name : conversation.senderId.name}
      </div>
    </div>
  );
};

export default Conversation;
