import React from 'react'
import Card from './Card.js';

export default function Hand({ placeTask, hand, highlight, pray, smithingTime, canSmithMap, taskFunction }) {
    let onClick = highlight ? placeTask : () => { console.log('no click')}

    return (
        <div className={`padding hand-container ${highlight ? 'highlight' : ''}`}>
          Your hand:
          <div className="hand">
            { 
                hand.map((card, index) => {
                  const smithable = smithingTime && canSmithMap[card.role];
                  if (smithable) onClick = taskFunction; 

                  return   <Card 
                  onClick={onClick}
                  key={`${card.id}hand`} 
                  highlight
                  wiggle={smithingTime && canSmithMap[card.role]}
                  card={card} />
                }
                )
              }
        </div>
          <button disabled={!highlight} onClick={pray}>Pray</button>
        </div>
    )
}
