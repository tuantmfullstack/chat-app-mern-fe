import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { createMessage } from '../../../store/chatFooterSlice';
import { conversationSelector, userIdSelector } from '../../../store/selectors';
import { useAppDispatch } from '../../../store/store';
import { ConversationI, MessageClient } from '../../../store/type';
import { socket } from '../Chat';
import './chatFooter.scss';
import { useRef } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

interface Props {}

const ChatFooter = ({}: Props) => {
  const [conversation, setConversation] = useState<ConversationI>();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const conSelector = useSelector(conversationSelector);
  const currentUserId = useSelector(userIdSelector)!;
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (conSelector) {
      setConversation({ ...conSelector });
    }
  }, [conSelector]);

  const sendMessageHandler = (e: FormEvent) => {
    e.preventDefault();
    const message: MessageClient = {
      text: input.trim(),
      conversationId: conversation!._id!,
      senderId: currentUserId!,
    };

    dispatch(createMessage(message));

    const msg = {
      ...message,
      _id: Math.random().toString(),
      createdAt: new Date(Date.now()),
      receiverId:
        conversation?.senderId._id === currentUserId
          ? conversation?.receiverId._id
          : conversation?.senderId._id,
    };
    socket.emit('sendMessage', msg);

    setInput('');
  };

  const emojiClickHandler = (e: EmojiClickData) => {
    setInput((prev) => prev + e.emoji);
    console.log(e);
    const time = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(time);
  };

  const showPickerHandler = () => {
    setShow((prev) => !prev);
  };

  const textareaHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.value && e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form className='chatFooter' onSubmit={sendMessageHandler} ref={formRef}>
      <div className='chatFooter__wrapper'>
        <ReactTextareaAutosize
          placeholder='Type something...'
          onChange={inputChangeHandler}
          value={input}
          onKeyUp={textareaHandler}
          minRows={1}
        />
        <div className='emoji__wrapper' onClick={showPickerHandler}>
          <Emoji unified='1f44b' />
        </div>
      </div>
      {show && (
        <div className='emoji__picker'>
          <EmojiPicker
            onEmojiClick={emojiClickHandler}
            lazyLoadEmojis
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.TWITTER}
          />
        </div>
      )}
      <button className='btn send__btn'>Send</button>
    </form>
  );
};

export default ChatFooter;
