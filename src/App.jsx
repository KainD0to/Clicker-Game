import React, { useState } from 'react';
import Clicker from './components/Clicker';
import Stats from './components/Stats';
import Upgrades from './components/Upgrades';
import Inventory from './components/Inventory';

function App() {
    const [currentPage, setCurrentPage] = useState('clicker');

    return (
        <div>
            <h1>Clicker Game</h1>
            
            <div>
                <button 
                    onClick={() => setCurrentPage('clicker')}
                >
                    Кликер
                </button>
                
                <button 
                    onClick={() => setCurrentPage('stats')}
                >
                    Статистика
                </button>
                <button
                    onClick={() => setCurrentPage('upgrades')}
                >
                    Улучшения
                </button>
                <button
                    onClick={() => setCurrentPage('inventory')}
                >
                    Инвентарь
                </button>
            </div>

        <div>
            {currentPage === 'clicker' && <Clicker />}
            {currentPage === 'stats' && <Stats />}
            {currentPage === 'upgrades' && <Upgrades />}
            {currentPage === 'inventory' && <Inventory />}
        </div>
        </div>
    );
}

export default App;