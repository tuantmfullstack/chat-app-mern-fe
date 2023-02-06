import { format } from 'timeago.js';
import './message.scss';
import {
  userIdSelector,
  userSelector,
  conversationSelector,
} from '../../../store/selectors';
import { useSelector } from 'react-redux';

interface Props {
  senderId: string;
  text: string;
  createdAt: Date;
}

const Message = ({ senderId, text, createdAt }: Props) => {
  const currentUserId = useSelector(userIdSelector)!;
  const currentUser = useSelector(userSelector);
  const conSelector = useSelector(conversationSelector);
  const isOwner = senderId === currentUserId;

  console.log({ senderId, text });

  return (
    <div className={`message ${isOwner ? '' : 'your__message'}`}>
      <img
        src={
          isOwner
            ? currentUser?.avatar
            : conSelector?.senderId._id === currentUserId
            ? conSelector?.receiverId.avatar
            : conSelector?.senderId.avatar
        }
        alt=''
      />
      <div className='message__wrapper'>
        <div className='message__text'>{text}</div>
        <div className='message__time'>{format(createdAt)}</div>
      </div>
    </div>
  );
};

export default Message;
