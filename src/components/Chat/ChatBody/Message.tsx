import { format } from 'timeago.js';
import './message.scss';
import {
  userIdSelector,
  userSelector,
  conversationSelector,
} from '../../../store/selectors';
import { useSelector } from 'react-redux';
import MarkDown from './MarkDown';
import { Trash2, CornerUpLeft, Smile } from 'react-feather';

interface Props {
  _id: string;
  senderId: string;
  text: string;
  createdAt: Date;
}

const Message = ({ _id, senderId, text, createdAt }: Props) => {
  const currentUserId = useSelector(userIdSelector)!;
  const currentUser = useSelector(userSelector);
  const conSelector = useSelector(conversationSelector);
  const isOwner = senderId === currentUserId;

  const deleteMessageHandler = () => {};

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
        <div className='message__option__wrapper'>
          <MarkDown text={text} />
          <div className='message__option'>
            <Smile size={18} className='feather' />
            <CornerUpLeft size={18} className='feather' />
            <Trash2
              size={18}
              className='feather'
              onClick={deleteMessageHandler}
            />
          </div>
        </div>
        <div className='message__time'>{format(createdAt)}</div>
      </div>
    </div>
  );
};

export default Message;
