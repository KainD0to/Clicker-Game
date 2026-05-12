import React from "react";
import useGameStore from "../store/gameStore";
import useUpgradeStore from "../store/upgradeStore";


export default function Stats() {
    
    const coins = useGameStore(state => state.coins);
    const totalCoins = useGameStore(state => state.totalCoins);
    const clicks = useGameStore(state => state.clicks);
    const powerNow = useUpgradeStore(state => state.powerNow);

    return(
        <div>
            <h1>Статистика</h1>
            <h3>Всего кликов ({clicks})</h3>
            <h3>Количество монет ({totalCoins})</h3>
            <h3>Текущая сила ({powerNow})</h3>
        </div>
    );
}