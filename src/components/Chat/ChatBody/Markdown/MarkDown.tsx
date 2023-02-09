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

const MarkDown = ({ emotions, text }: Props) => {
  return (
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
  );
};

export default MarkDown;
