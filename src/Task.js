import React from 'react'
import Card from './Card.js';

export default function Task({ 
  task, 
  pray, 
  highlight, 
  craft,
  canCraft,
  doTask
 }) {
    return (
        <div className={`task-container padding ${highlight ? 'highlight' : ''}`}>
          Your task:
          <div className="task">
            { 
              task.role && <>
                <Card onClick={doTask} card={task} />
              </> 
            }
          </div>
          <button disabled={!highlight} onClick={pray}>Pray</button>
          <button disabled={!canCraft || !highlight} className={canCraft && highlight ? 'wiggle' : ''} onClick={craft}>Craft</button>
        </div>
    )
}
