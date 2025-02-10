import React, { useState } from 'react';
import { useFloating, offset, shift, flip } from '@floating-ui/react';

interface UserInputModalProps {
  showModal: boolean;
  maxCount?: number;
  onConfirm: (count: number) => void;
  onCancel: () => void;
}

export const UserInputModal: React.FC<UserInputModalProps> = ({
  showModal,
  maxCount = 128,
  onConfirm,
  onCancel,
}) => {
  // if (!showModal) return;
  const [inputValue, setInputValue] = useState<number>(Math.floor(maxCount / 2));
  const { x, y, strategy, refs } = useFloating({
    strategy: 'fixed',
    middleware: [offset(4), shift(), flip()],
    placement: 'top',
  });

  const quarterValues = [
    { value: 0, label: '0' },
    { value: Math.floor(maxCount * 0.25), label: Math.floor(maxCount * 0.25).toString() },
    { value: Math.floor(maxCount * 0.5), label: Math.floor(maxCount * 0.5).toString() },
    { value: Math.floor(maxCount * 0.75), label: Math.floor(maxCount * 0.75).toString() },
    { value: maxCount, label: maxCount.toString() },
  ];

  const handleConfirm = () => {
    if (inputValue > 0 && inputValue <= maxCount) {
      onConfirm(inputValue);
    }
  };

  return (
    <>
      <div className='modal-overlay' ref={refs.setReference}>
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className="modal-container"
        >
          <div className="quantity-input-container">
            <label htmlFor="count-input">Quantity:</label>
            <input
              type="number"
              id="count-input"
              value={inputValue}
              min={0}
              max={maxCount}
              onChange={(e) => {
                let value = Number(e.target.value);
                // Clamp the value between 0 and maxCount
                if (value < 0) value = 0;
                if (value > maxCount) value = maxCount;
                setInputValue(value);
              }}
              className="quantity-input"
            />
          </div>
          <div className="slider-container">
            <input
              type='range'
              min={0}
              max={maxCount}
              value={inputValue}
              onChange={e => setInputValue(Number(e.target.value))}
              className="range-slider"
            />
            <div className="slider-labels">
              {quarterValues.map((item, index) => (
                <span key={index} className="slider-label">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          <div className='modal-buttons'>
            <button className='cancel' onClick={onCancel}>Cancel</button>
            <button className='confirm' onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
};