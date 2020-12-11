import React from 'react'
import Card from './Card';

export default function Floor({ floor, doTask, highlight }) {
    return (
     <div className={`padding floor-container ${highlight ? 'highlight' : ''}`}>
          <div class="text-center">Your floor</div>
          <div className="floor">
            { 
                !!floor.length && floor.map((card, i) =>  {
                    return <Card 
                    highlight
                    onClick={doTask}
                    key={`${card.id}floor`} 
                    card={card} />
                })
              }
        </div>
        </div>
    )
}
