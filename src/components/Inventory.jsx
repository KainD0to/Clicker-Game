import React from 'react';
import useGameStore from '../store/gameStore';
import useInventoryStore from '../store/inventoryStore';

export default function Inventory() {
    
    const coins = useGameStore(state => state.coins);
    const slots = useInventoryStore(state => state.slots);
    
    const items = slots ? slots.filter(slot => !slot.isFree) : [];

    const itemsPerRow = 5;

    return (
        <div>
        <h1>Инвентарь</h1>
        <p>Монеты: {coins}</p>
        
        <h3>Ресурсы в инвентаре:</h3>
        {slots.filter(slot => !slot.isFree).length === 0 ? (
            <p>Инвентарь пуст</p>
        ) : (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
                    gap: '10px'
                }}>
                {slots.map(slot => (
                    <div
                        key={slot.id}
                        style={{
                            aspectRatio: '1',
                            border: '2px solid #555',
                            backgroundColor: slot.isFree ? '#222' : '#333',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px'
                        }}
                        title={slot.isFree ? 'Пусто' : `${slot.itemHere}: ${slot.quantity}`}
                    >
                        {slot.isFree ? (
                            <span></span>
                        ) : (
                            <>
                                <span>
                                    {slot.itemHere === 'iron' ? '/_/' :
                                     slot.itemHere === 'wood' ? '|_|' : ''}
                                </span>
                                <span>{slot.itemHere}</span>
                                <span>x{slot.quantity}</span>
                            </>
                        )}
                    </div>
                ))}
            </div>
        )}
    </div>
    );
}