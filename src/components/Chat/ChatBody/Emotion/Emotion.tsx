import { Smile } from 'react-feather';
import { useState } from 'react';
import { Emoji } from 'emoji-picker-react';
import './emotion.scss';
import { useAppDispatch } from '../../../../store/store';
import EmotionType from './EmotionType';
import EmotionItem from './EmotionItem';
interface Props {
  _id: string;
  id: number;
}

const Emotion = ({ _id, id }: Props) => {
  const [show, setShow] = useState(false);

  const showEmotionHandler = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className='emotion__wrapper'>
      {show && (
        <div className='emotion'>
          {EmotionType.map((emotion, idx) => (
            <EmotionItem
              key={idx}
              _id={_id}
              id={id}
              type={emotion.type}
              unified={emotion.unified}
            />
          ))}
        </div>
      )}
      <div onClick={showEmotionHandler}>
        <Smile size={18} className='feather' />
      </div>
    </div>
  );
};

export default Emotion;
