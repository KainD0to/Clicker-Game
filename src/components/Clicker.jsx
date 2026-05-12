import React from "react";
import useGameStore from "../store/gameStore";
import useUpgradeStore from "../store/upgradeStore";


export default function Clicker() {
    
    const coins = useGameStore(state => state.coins);
    const increaseCoins = useGameStore(state => state.increaseCoins);
    const powerNow = useUpgradeStore(state => state.powerNow);

    return(
        <div>
            <h1>Кликай на кнопку!</h1>
            <h3>Текущая сила ({powerNow})</h3>
            <button onClick={increaseCoins}>Клик!</button>
        </div>
    );
}