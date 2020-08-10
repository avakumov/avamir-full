import React, { Component } from 'react'
import SapperGame from './sapper-logic'
import FieldView from './field-view'
import './sapper.css'

const INTERVAL = 1000
const SECONDS_TO_GAME_OVER = 999
const EASY = 'EASY'
const MIDDLE = 'MIDDLE'
const HARD = 'HARD'
const GAME_OPTIONS = {
    EASY: { x: 13, y: 10, bombs: 10 },
    MIDDLE: { x: 15, y: 15, bombs: 25 },
    HARD: { x: 20, y: 20, bombs: 50 },
}

class Sapper extends Component {
    state = { game: '', difficalty: '', time: 0, hidden: 0, running: false }
    intervalID = 0
    game = null

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    incrementTime = () => {
        if (this.state.time === SECONDS_TO_GAME_OVER) {
            clearInterval(this.intervalID)
            const game = this.state.game
            game.stopGame()
            this.setState({
                game,
            })
        } else {
            this.setState((prevState) => ({
                time: prevState.time + 1,
            }))
        }
    }

    restartGame = () => {
        this.onPrepareGame(this.state.difficalty)
        clearInterval(this.intervalID)
        this.intervalID = setInterval(this.incrementTime, INTERVAL)
    }

    startGame = () => {
        if (this.state.difficalty === '') return
        if (this.state.running) {
            this.restartGame()
        } else {
            clearInterval(this.intervalID)
            this.intervalID = setInterval(this.incrementTime, INTERVAL)
        }

        this.setState({
            running: true,
        })
    }

    onPrepareGame = (difficalty) => {
        clearInterval(this.intervalID)
        let game = ''
        if (difficalty === EASY) {
            game = new SapperGame(GAME_OPTIONS.EASY.x, GAME_OPTIONS.EASY.y)
            game.fillBombs(GAME_OPTIONS.EASY.bombs)
            game.fillDigits()
        } else if (difficalty === MIDDLE) {
            game = new SapperGame(GAME_OPTIONS.MIDDLE.x, GAME_OPTIONS.MIDDLE.y)
            game.fillBombs(GAME_OPTIONS.MIDDLE.bombs)
            game.fillDigits()
        } else if (difficalty === HARD) {
            game = new SapperGame(GAME_OPTIONS.HARD.x, GAME_OPTIONS.HARD.y)
            game.fillBombs(GAME_OPTIONS.HARD.bombs)
            game.fillDigits()
        }

        this.setState({
            game,
            time: 0,
            difficalty,
            running: false,
        })
    }

    onClickCell = (e) => {
        e.preventDefault()
        if (!this.state.running) return
        const id = e.target.getAttribute('cellid')

        if (id) {
            const game = this.state.game

            //rigth click to flag
            if (e.button === 2) {
                game.toggleFlag(id)
            } else {
                game.onClick(id)
                if (game.gameOver) {
                    clearInterval(this.intervalID)
                }
            }

            this.setState({ game })
        }
    }

    getStatus = () => {
        const { gameOver, success } = this.state.game
        if (this.state.game === '')
            return 'Welcome to game. Сhoose difficulty and start'
        if (gameOver && success) return 'Сongratulations you won!!!'
        if (gameOver && !success) return 'Sorry you lose. Try again.'
        if (!gameOver) return 'Game is running'
    }

    getButtons = (difficalty) => {
        let classesEasy = 'item-sapper  btn-sapper'
        let classesMiddle = 'item-sapper  btn-sapper'
        let classesHard = 'item-sapper  btn-sapper'

        if (difficalty === EASY) {
            classesEasy = classesEasy + ' active-sapper'
        } else if (difficalty === MIDDLE) {
            classesMiddle = classesMiddle + ' active-sapper'
        } else if (difficalty === HARD) {
            classesHard = classesHard + ' active-sapper'
        }
        return (
            <>
                <button
                    className={classesEasy}
                    onClick={() => this.onPrepareGame(EASY)}
                >
                    Easy
                </button>
                <button
                    className={classesMiddle}
                    onClick={() => this.onPrepareGame(MIDDLE)}
                >
                    Middle
                </button>
                <button
                    className={classesHard}
                    onClick={() => this.onPrepareGame(HARD)}
                >
                    Hard
                </button>
            </>
        )
    }

    render() {
        const { clearCount } = this.state.game
        const { difficalty } = this.state

        return (
            <div className="sapper-main">
                <div className="sapper-head-sapper">
                    <div className="buttons-sapper">
                        {this.getButtons(difficalty)}
                    </div>

                    <div className="digits-start-sapper">
                        <div className="item-sapper  digit-sapper">
                            {clearCount}
                        </div>
                        <button
                            className="item-sapper btn-sapper"
                            onClick={this.startGame}
                        >
                            Start
                        </button>
                        <div className="item-sapper digit-sapper">
                            {this.state.time}
                        </div>
                    </div>
                    <div className="status-sapper"> {this.getStatus()}</div>
                </div>

                <FieldView
                    game={this.state.game}
                    onClickCell={this.onClickCell}
                />
            </div>
        )
    }
}

export default Sapper
