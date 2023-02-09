import { Download, FileText } from 'react-feather';
import './fileMsg.scss';

interface Props {
  name: string;
  url: string;
}

const FileMsg = ({ name, url }: Props) => {
  return (
    <div className='file__msg__wrapper'>
      <a href={url} target='_blank' download className='file__msg__href'>
        <FileText size={32} />
        <div>
          <div className='file__msg'>{name}</div>
          <Download className='file__msg__download' size={16} />
        </div>
      </a>
    </div>
  );
};

export default FileMsg;
