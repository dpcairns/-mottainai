import React from 'react'
import Card from './Card';

export default function Works({ works }) {
    return (
     <div className={`padding works-container`}>
          Your works:
          <div className="works">
            { 
                !!works.length && works.map((card, i) =>  {
                    return <Card 
                    key={`${card.id}works`} 
                    card={card} />
                })
              }
        </div>
        </div>
    )
}
