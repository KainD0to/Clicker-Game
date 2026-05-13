import React from 'react';
import useGameStore from '../store/gameStore';
import useInventoryStore from '../store/inventoryStore';
import useItemsStore from '../store/itemsStore';
import useUpgradeStore from '../store/upgradeStore';

export default function Upgrades() {
    
    const coins = useGameStore(state => state.coins);
    const slots = useInventoryStore(state => state.slots);
    const items = useItemsStore(state => state.items);
    const upgrades = useUpgradeStore(state => state.upgrades);
    const buyUpgrade = useUpgradeStore(state => state.buyUpgrade);

    return (
        <div>
            <h1>Улучшения</h1>
            <div className='itemBar'>
                <p>Монеты: {coins}</p>
                <ul>
                {items.map(item => {
                    const hasItem = slots.some(slot => !slot.isFree && slot.itemHere === item.id);
                    return (
                    <li key={item.id}>
                        {item.id} {hasItem ? 'ИМЕЕТСЯ' : 'НЕ ИМЕЕТСЯ'}
                        {hasItem && ` x${slots.find(s => s.itemHere === item.id).quantity}`}
                    </li>
                    )
                })}
                </ul>
            </div>

            <div className='upgrades'>
                {upgrades.map (upgrade => {
                const canBuy = !upgrade.purchased && upgrade.isAvailable;

                    return (
                        <div key={upgrade.id}>
                            <h3>{upgrade.name}</h3>
                            <p>Стоимость {upgrade.cost.coins}</p>
                            {canBuy ? (
                                <div>
                                    <p>Можно купить: ДА</p>
                                    <button onClick={() => buyUpgrade(upgrade.id)}>КУПИТЬ</button>
                                </div>
                            ) : (
                                    <p>Можно купить: НЕТ</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}