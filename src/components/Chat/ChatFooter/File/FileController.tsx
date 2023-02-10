import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent } from 'react';
import { File } from 'react-feather';
import storage from '../../../../firebase/firebase';
import useMessenger from '../../../../hook/useMessenger';
import '../chatFooter.scss';

interface Props {}

const FileController = ({}: Props) => {
  const messageController = useMessenger();

  const fileChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    let type = 'file';

    if (files) {
      const file = files[0];

      if (file.type.startsWith('image')) type = 'img';

      const fileRef = ref(storage, `${type}s/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      messageController({
        type,
        fileName: file.name,
        fileUrl: url,
      });
    }
  };

  return (
    <div className='emoji__wrapper'>
      <label htmlFor='file__msg__input' className='file__msg__label'>
        <File strokeWidth={1.5} />
      </label>
      <input
        id='file__msg__input'
        type={'file'}
        accept='.txt, .pdf, .doc, image/*'
        onChange={fileChangeHandler}
      />
    </div>
  );
};

export default FileController;
