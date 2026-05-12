import React from 'react';
import useGameStore from '../store/gameStore';
import useInventoryStore from '../store/inventoryStore';

export default function Upgrades() {
    
    const coins = useGameStore(state => state.coins);
    const slots = useInventoryStore(state => state.slots);
    
    const items = slots ? slots.filter(slot => !slot.isFree) : [];

    return (
        <div>
            <h1>Улучшения</h1>
            
            <h3>Ресурсы в инвентаре:</h3>
            {items.length === 0 ? (
                <p>Инвентарь пуст</p>
            ) : (
                <ul>
                    {items.map(slot => (
                        <li key={slot.id}>
                            {slot.itemHere}: {slot.quantity} шт.
                        </li>
                    ))}
                </ul>
            )}
            
            <p>Монеты: {coins}</p>
        </div>
    );
}