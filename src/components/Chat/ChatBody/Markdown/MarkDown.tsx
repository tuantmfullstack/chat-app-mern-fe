import { Emoji } from 'emoji-picker-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import EmotionType from '../Emotion/EmotionType';
import '../Messages/message.scss';

interface Props {
  text: string;
  emotions: string[];
}

const findEmoji = (type: string) => {
  return EmotionType.find((emotion) => emotion.type === type)?.unified;
};

const MarkDown = ({ emotions, text }: Props) => {
  return (
    <div className='textNEmotion'>
      <ReactMarkdown
        children={text}
        className='message__text'
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                PreTag='div'
                {...props}
                style={darcula}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
      <div className='emotion__list'>
        {emotions.map((emotion, idx) => {
          const unified = findEmoji(emotion)!;
          return <Emoji key={idx} unified={unified} size={18} />;
        })}
      </div>
    </div>
  );
};

export default MarkDown;
