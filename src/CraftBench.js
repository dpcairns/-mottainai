import React from 'react'
import Card from './Card.js';

export default function CraftBench({ craftBench, highlight, enableMoveToSales, moveToSales }) {
    return (
        <div className={`padding hand-container ${highlight ? 'highlight' : ''}`}>
          Your Craft Bench:
          <div className="hand">
            { 
                craftBench.map((card, i) => 
                  <Card key={`${card.id}bench`} card={card} highlight={enableMoveToSales} onClick={moveToSales}/>)
              }
        </div>
        </div>
    )
}
