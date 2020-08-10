import _ from 'lodash'
import { getRandomNumbers } from './utils'

class SapperGame {
    constructor(xCount, yCount) {
        const field = []
        let id = 0
        for (let x = 0; x < xCount; x++) {
            for (let y = 0; y < yCount; y++) {
                field.push({
                    view: 'hidden',
                    visible: false,
                    bomb: false,
                    flag: false,
                    x,
                    y,
                    count: 0,
                    id,
                })
                id++
            }
        }
        this.gameOver = false
        this.success = false
        this.xCount = xCount
        this.yCount = yCount
        this.field = field
        this.bombCount = 0
        this.clearCount = xCount * yCount
    }

    fillBombs = (count) => {
        this.bombCount = count
        this.clearCount = this.clearCount - count
        const randoms = getRandomNumbers(count, this.field.length)
        randoms.forEach((r) => {
            const idx = this.field.findIndex((item) => item.id === r)
            this.field[idx].bomb = true
        })
        return this
    }

    stopGame = (success) => {
        if (this.gameOver) return

        this.gameOver = true
        if (success) {
            this.success = true
        } else {
            this.success = false
            this.field.forEach((el) => {
                if (el.bomb) {
                    el.view = 'bomb'
                    el.visible = true
                }
            })
        }
    }

    onClick = (id) => {
        const el = this.field[id]
        if (this.gameOver) return

        if (el.bomb) {
            return this.stopGame(false)
        }

        if (!el.visible) {
            if (el.count === 0) {
                this._recurseVisibleCells(id)
            }
            el.visible = true
            el.view = el.count
        }

        //check game finish with success
        let hiddenCount = this.xCount * this.yCount
        this.field.forEach((el) => {
            if (el.visible) hiddenCount--
        })
        this.clearCount = hiddenCount - this.bombCount
        if (hiddenCount === this.bombCount) {
            return this.stopGame(true)
        }
    }

    toggleFlag = (id) => {
        const el = this.field[id]

        if (el.visible) return

        el.flag = !el.flag
        if (el.flag) {
            el.view = 'flag'
        } else {
            el.view = 'hidden'
        }
    }

    _recurseVisibleCells = (id) => {
        const arrZero = this._getNeighborsFromZeroCount(id)
        arrZero.forEach((_id) => {
            if (this.field[_id].visible === false) {
                this.field[_id].visible = true
                this.field[_id].view = this.field[_id].count
                this._recurseVisibleCells(_id)
            }
        })
    }
    _getNeighborsFromZeroCount = (id) => {
        const el = this.field[id]
        if (el.count !== 0) return []
        const arr = [
            this._getUpCellId(id),
            this._getRightCellId(id),
            this._getDownCellId(id),
            this._getLeftCellId(id),
        ]
        const filteredArr = arr.filter((_id) => _id !== undefined)
        return filteredArr
    }

    _getCountNeigborIds = (id) => {
        const resArr = [
            this._getUpCellId(id),
            this._getRightCellId(id),
            this._getDownCellId(id),
            this._getLeftCellId(id),
            this._getLeftCellId(this._getUpCellId(id)),
            this._getRightCellId(this._getUpCellId(id)),
            this._getLeftCellId(this._getDownCellId(id)),
            this._getRightCellId(this._getDownCellId(id)),
        ]
        return resArr.filter((el) => el !== undefined)
    }

    _getRowWithId = (id) => {
        const countInterval = Math.floor(id / this.xCount)
        const start = countInterval * this.xCount
        const end = start + this.xCount
        const interval = _.range(start, end)

        return interval
    }

    _getUpCellId = (id) => {
        const resId = +id - this.xCount
        if (resId >= 0) return resId
    }
    _getDownCellId = (id) => {
        const resId = +id + this.xCount
        const len = this.field.length
        if (resId < len) {
            return resId
        }
    }
    _getLeftCellId = (id) => {
        const interval = this._getRowWithId(id)
        const resId = +id - 1
        return interval.find((el) => el === resId)
    }
    _getRightCellId = (id) => {
        const interval = this._getRowWithId(id)
        const resId = +id + 1
        return interval.find((el) => el === resId)
    }

    fillDigits = () => {
        this.field.forEach((item) => {
            const arrIds = this._getCountNeigborIds(item.id)
            let count = 0
            arrIds.forEach((id) => {
                if (this.field[id].bomb) {
                    count++
                    item.count = count
                }
            })
        })

        return this
    }
}

export default SapperGame
