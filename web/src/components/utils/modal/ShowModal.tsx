import { UserInputModal } from './UserInput';
import { createRoot } from 'react-dom/client';

export const showModal = (maxCount: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);

    const handleConfirm = (count: number) => {
      resolve(count);
      cleanup();
    };

    const handleCancel = () => {
      reject();
      cleanup();
    };

    const cleanup = () => {
      root.unmount();
      document.body.removeChild(modalContainer);
    };

    const root = createRoot(modalContainer);

    root.render(
      <UserInputModal
        showModal={true}
        maxCount={maxCount}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  });
};