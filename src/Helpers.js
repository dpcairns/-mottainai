import React from 'react'
import Card from './Card.js';

export default function Helpers({ helpers, highlight }) {
    return (
        <div className={`padding hand-container ${highlight ? 'highlight' : ''}`}>
          Your Helpers:
          <div className="hand">
            { 
                helpers.map((card, i) => 
                  <Card key={`${card.id}helpers`} card={card} />)
              }
        </div>
        </div>
    )
}
