import EmojiPicker, {
  Emoji,
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import ReactTextareaAutosize from 'react-textarea-autosize';
import useMessenger from '../../../hook/useMessenger';
import { conversationSelector, userIdSelector } from '../../../store/selectors';
import './chatFooter.scss';
import FileController from './File/FileController';
import { socket } from '../Chat';

interface Props {}

const ChatFooter = ({}: Props) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const conSelector = useSelector(conversationSelector);
  const formRef = useRef<HTMLFormElement>(null);
  const messageController = useMessenger();
  const currentUserId = useSelector(userIdSelector);

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const sendMessageHandler = (e: FormEvent) => {
    e.preventDefault();

    messageController({
      type: 'text',
      text: input.trim(),
    });

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

  useEffect(() => {
    socket.emit(
      'sendKeyUp',
      conSelector?.senderId._id === currentUserId
        ? conSelector.receiverId._id
        : conSelector?.senderId._id
    );
  }, [input]);

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
          maxRows={2}
        />
        <div className='emoji__wrapper' onClick={showPickerHandler}>
          <Emoji unified='1f44b' size={28} />
        </div>
        <FileController />
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
