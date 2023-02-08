import { Emoji } from 'emoji-picker-react';
import { useAppDispatch } from '../../../../store/store';
import { emotionMessageThunk } from '../../../../store/chatBodySlice';
import chatBodySlice from '../../../../store/chatBodySlice';

interface Props {
  _id: string;
  id: string;
  type: string;
  unified: string;
}

const EmotionItem = ({ _id, id, type, unified }: Props) => {
  const dispatch = useAppDispatch();

  const emojiHandler = () => {
    dispatch(emotionMessageThunk({ _id, type }));
    dispatch(chatBodySlice.actions.addingEmotion({ _id, id, type }));
  };

  return (
    <div
      onClick={() => {
        emojiHandler();
      }}
    >
      <Emoji unified={unified} />
    </div>
  );
};

export default EmotionItem;
