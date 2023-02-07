import { format } from 'timeago.js';
import './message.scss';
import {
  userIdSelector,
  userSelector,
  conversationSelector,
} from '../../../store/selectors';
import { useSelector } from 'react-redux';
import MarkDown from './MarkDown';

interface Props {
  senderId: string;
  text: string;
  createdAt: Date;
}

const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`;

const Message = ({ senderId, text, createdAt }: Props) => {
  const currentUserId = useSelector(userIdSelector)!;
  const currentUser = useSelector(userSelector);
  const conSelector = useSelector(conversationSelector);
  const isOwner = senderId === currentUserId;

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
        <MarkDown text={text} />
        <div className='message__time'>{format(createdAt)}</div>
      </div>
    </div>
  );
};

export default Message;
