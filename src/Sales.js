import React from 'react'
import Card from './Card.js';

export default function Sales({ sales, highlight }) {
    return (
        <div className={`padding sales-container ${highlight ? 'highlight' : ''}`}>
          Your Sales:
          <div className="sales">
            { 
                sales.map((card, i) => 
                  <Card key={`${card.id}sales`} card={card} />)
              }
        </div>
        </div>
    )
}
