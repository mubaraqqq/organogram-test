import { PiX } from 'react-icons/pi';

type ModalTitleProps = {
  title: string;
  onClose?: () => void;
};

const ModalTitle: React.FC<ModalTitleProps> = ({ title, onClose }) => {
  return (
    <div className='mb-10 flex items-center justify-between'>
      <h4 className='text-xl font-medium'>{title}</h4>

      {!!onClose && (
        <button className='text-xl' onClick={onClose}>
          <PiX />
        </button>
      )}
    </div>
  );
};

export default ModalTitle;
