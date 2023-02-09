import './imageMsg.scss';

interface Props {
  url: string;
}

const ImageMsg = ({ url }: Props) => {
  return (
    <div className='img__msg__wrapper'>
      <img src={url} className='img__msg' />
    </div>
  );
};

export default ImageMsg;
