import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
// import AdsClickRoundedIcon from '@mui/icons-material/AdsClickRounded';
import { IconHandClick } from '@tabler/icons-react';
import { IconUserShare } from '@tabler/icons-react';
import { IconDoorExit } from '@tabler/icons-react';
import { IconInfoCircle } from '@tabler/icons-react';
// import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
// import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
// import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import UsefulControls from './UsefulControls';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber % 1 !== 0 || isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0)
      event.target.valueAsNumber = 0;
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  const handleSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.slice(0, 9);
  }

  const handleFocusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = '';
  };

  return (
    <>
      <div className="inventory-control">
        <div className="inventory-control-wrapper">
        <input size={1} className="inventory-control-input" type="number" onChange={handleSize} defaultValue={itemAmount} onFocus={handleFocusEvent} onBlur={inputHandler} max={9999} />
        </div>
      </div>
    </>
  );
};

export default InventoryControl;
