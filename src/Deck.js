import React from 'react'
import Card from './Card.js';

export default function Deck({ deck, label}) {
    return (
        <div className="deck-container padding">
            <div className="deck" >
                {deck.map((card, i) => 
                    <Card key={`${card.id}deck${i}`} card={card} index={i} facedown/>)}
            </div>
            <p>{label}</p>
        </div>
    )
}
