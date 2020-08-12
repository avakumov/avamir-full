import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Main = styled.div`
    margin: 20px auto;
    width: 450px;
    display: flex;
    flex-direction: column;
    line-height: 100%;
    padding: 1rem !important;
    background-color: skyblue;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;
`

const TestAccountMessage = ({ loggedIn }) => {
    if (loggedIn) {
        return ''
    } else {
        return (
            <Main>
                <div>Данные для входа тестового аккаунта: </div>
                <div>email: test@test.ru</div>
                <div>pass: testaccount</div>
            </Main>
        )
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication
    return {
        loggedIn,
    }
}

const connectedTestAccountMessage = connect(
    mapStateToProps,
    null
)(TestAccountMessage)
export { connectedTestAccountMessage as TestAccountMessage }
