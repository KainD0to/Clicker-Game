import React, { useState } from 'react';
import Clicker from './components/Clicker';
import Stats from './components/Stats';
import Upgrades from './components/Upgrades';

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
            </div>

        <div>
            {currentPage === 'clicker' && <Clicker />}
            {currentPage === 'stats' && <Stats />}
            {currentPage === 'upgrades' && <Upgrades />}
        </div>
        </div>
    );
}

export default App;