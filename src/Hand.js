import React from 'react'
import Card from './Card.js';

export default function Hand({ placeTask, hand, highlight, pray }) {
    return (
        <div className={`padding hand-container ${highlight ? 'highlight' : ''}`}>
          Your hand:
          <div className="hand">
            { 
                hand.map((card, index) => 
                  <Card 
                  onClick={highlight ? placeTask : () => { console.log('no click')}}
                  key={`${card.id}hand`} 
                  highlight
                  card={card} />)
              }
        </div>
          <button disabled={!highlight} onClick={pray}>Pray</button>
        </div>
    )
}
