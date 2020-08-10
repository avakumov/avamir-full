import React from 'react'

import Cell from './cell-view'
import russuanSapperImg from './img/russian-sapper.jpg'

const FieldView = (props) => {
    const { field, xCount: x, yCount: y } = props.game
    const { onClickCell } = props

    if (!field)
        return (
            <div>
                <img src={russuanSapperImg} alt="Russian sapper"></img>
            </div>
        )

    const bobyTableView = []
    for (let w = 0; w < y; w++) {
        const rowItems = field.slice(x * w, x * (w + 1))
        const viewRow = rowItems.map((item) => (
            <Cell
                key={item.id}
                count={item.count}
                name={item.view}
                id={item.id}
            />
        ))
        const wrappedRow = <tr key={w}>{viewRow}</tr>
        bobyTableView.push(wrappedRow)
    }

    return (
        <div className="field-sapper">
            <table style={{ borderCollapse: 'collapse' }}>
                <tbody onClick={onClickCell} onContextMenu={onClickCell}>
                    {bobyTableView}
                </tbody>
            </table>
        </div>
    )
}

export default FieldView
