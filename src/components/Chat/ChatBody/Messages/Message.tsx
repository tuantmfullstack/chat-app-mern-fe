import { CornerUpLeft, Trash2 } from 'react-feather';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import './message.scss';
import {
  userIdSelector,
  userSelector,
  conversationSelector,
} from '../../../../store/selectors';
import { useAppDispatch } from '../../../../store/store';
import { deleteMessageThunk } from '../../../../store/chatBodySlice';
import MarkDown from '../Markdown/MarkDown';
import Emotion from '../Emotion/Emotion';

interface Props {
  _id: string;
  id: string;
  senderId: string;
  text: string;
  createdAt: Date;
  emotions: string[];
}

const Message = ({ _id, id, senderId, text, createdAt, emotions }: Props) => {
  const currentUserId = useSelector(userIdSelector)!;
  const currentUser = useSelector(userSelector);
  const conSelector = useSelector(conversationSelector);
  const isOwner = senderId === currentUserId;
  const dispatch = useAppDispatch();

  const deleteMessageHandler = () => {
    dispatch(deleteMessageThunk(_id));
  };

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
          <MarkDown text={text} emotions={emotions} />
          <div className='message__option'>
            <Emotion _id={_id} id={id} />
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
