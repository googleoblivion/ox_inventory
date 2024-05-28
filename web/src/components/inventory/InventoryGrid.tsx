import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import InventoryControl from './InventoryControl';

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory, side: String }> = ({ inventory, side }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <>
      <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
        <div>
          <div className="inventory-grid-header-wrapper">
            <p>{inventory.label}</p>{side === 'left' ? (<InventoryControl /> ) : ('')}
            {inventory.maxWeight && (
              <p>
                {(weight / 16).toFixed(1)}/{(inventory.maxWeight / 16).toFixed(0)}
              </p>
            )}
          </div>
          <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
        </div>
        {side === 'left' ? (
          <div className='inventory-left-wrapper'>
            <div className='inventory-left-container'>
              <div className='inventory-left-hotbar'>{inventory.items.slice(0, 5).map((item, index) => (
                <InventorySlot
                  key={`${inventory.type}-${inventory.id}-${item.slot}`}
                  item={item}
                  ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              ))}
              </div>
              <div className="inventory-grid-container" ref={containerRef}>
                <>
                  {inventory.items.slice(5, (page + 1) * PAGE_SIZE).map((item, index) => (
                    <InventorySlot
                      key={`${inventory.type}-${inventory.id}-${item.slot}`}
                      item={item}
                      ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                      inventoryType={inventory.type}
                      inventoryGroups={inventory.groups}
                      inventoryId={inventory.id}
                    />
                  ))}
                </>
              </div>
            </div></div>) : (<div className="inventory-grid-container" ref={containerRef}>
              <>
                {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
                  <InventorySlot
                    key={`${inventory.type}-${inventory.id}-${item.slot}`}
                    item={item}
                    ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                    inventoryType={inventory.type}
                    inventoryGroups={inventory.groups}
                    inventoryId={inventory.id}
                  />
                ))}
              </>
            </div>)
        }

      </div>
    </>
  );
};

export default InventoryGrid;
