import React from 'react'
import Card from './Card';
import { WORKSHOP, GALLERY } from './useGame';

export default function Works({ works }) {
    return (
     <div className="padding">
          <div class="text-center">Your works</div>
            <div className="works-container">
                <div className="workshop">
                    Workshop
                    <div className="works">
                    { 
                        !!works[WORKSHOP].length && works[WORKSHOP].map((card, i) =>  {
                            return <Card 
                            key={`${card.id}works`} 
                            card={card} />
                        })
                    }
                    </div>
                    
                </div>
                <div className="gallery">
                    Gallery
                    <div className="works">
                    { 
                        !!works[GALLERY].length && works[GALLERY].map((card, i) =>  {
                            return <Card 
                            key={`${card.id}works`} 
                            card={card} />
                        })
                    }
                    </div>
                </div>
            </div>
        </div>

    )
}
