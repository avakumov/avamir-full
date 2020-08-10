import React from 'react'
import bomb from './img/bomb.png'
import flag from './img/flag.png'

const getView = (name, count, id) => {
    if (name === 'flag')
        return (
            <img cellid={id} className="cell-image-sapper" src={flag} alt="f" />
        )
    if (name === 'bomb')
        return <img className="cell-image-sapper" src={bomb} alt="bomb" />

    if (name === 'hidden')
        return <div cellid={id} className="hidden-cell-sapper"></div>

    if (count === 0) return <div className="cell-count-0-sapper"></div>
    if (count === 1) return <div className="cell-count-1-sapper">{count}</div>
    if (count === 2) return <div className="cell-count-2-sapper">{count}</div>
    if (count === 3) return <div className="cell-count-3-sapper">{count}</div>
    if (count === 4) return <div className="cell-count-4-sapper">{count}</div>
    if (count === 5) return <div className="cell-count-5-sapper">{count}</div>
    if (count === 6) return <div className="cell-count-6-sapper">{count}</div>
    if (count === 7) return <div className="cell-count-7-sapper">{count}</div>
    if (count === 8) return <div className="cell-count-8-sapper">{count}</div>
}

const Cell = ({ name, count, id }) => {
    return <td className="cell-div-sapper">{getView(name, count, id)}</td>
}

export default Cell
