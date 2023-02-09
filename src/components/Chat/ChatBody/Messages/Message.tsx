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
import FileMsg from '../File/FileMsg';
import ImageMsg from '../Image/ImageMsg';
import { MessageI } from '../../../../store/type';
import EmotionType from '../Emotion/EmotionType';
import { Emoji } from 'emoji-picker-react';

interface Props {
  _id: string;
  id: number;
  senderId: string;
  text: string | undefined;
  createdAt: Date;
  emotions: string[];
  type: string;
  forwardMessage: MessageI | undefined;
  fileName: string | undefined;
  fileUrl: string | undefined;
}

const Message = ({
  _id,
  id,
  senderId,
  text,
  createdAt,
  emotions,
  type,
  forwardMessage,
  fileName,
  fileUrl,
}: Props) => {
  const currentUserId = useSelector(userIdSelector)!;
  const currentUser = useSelector(userSelector);
  const conSelector = useSelector(conversationSelector);
  const isOwner = senderId === currentUserId;
  const dispatch = useAppDispatch();

  const deleteMessageHandler = () => {
    dispatch(deleteMessageThunk(_id));
  };

  let component;

  switch (type) {
    case 'text':
      component = <MarkDown text={text!} emotions={emotions} />;
      break;

    case 'file':
      component = <FileMsg name={fileName!} url={fileUrl!} />;
      break;

    case 'img':
      component = <ImageMsg url={fileUrl!} />;
      break;

    default:
      break;
  }

  const findEmoji = (type: string) => {
    return EmotionType.find((emotion) => emotion.type === type)?.unified;
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
        className='message__avatar'
      />
      <div className='message__wrapper'>
        <div className='message__option__wrapper'>
          <div className='textNEmotion'>
            {component}
            <div className='emotion__list'>
              {emotions.map((emotion, idx) => {
                const unified = findEmoji(emotion)!;
                return <Emoji key={idx} unified={unified} size={18} />;
              })}
            </div>
          </div>
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
