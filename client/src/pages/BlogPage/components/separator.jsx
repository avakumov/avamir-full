import React from 'react'
import styled from 'styled-components'

const M = styled.div`
    text-align: center;
`
const Line = styled.hr`
    border-top: 3px solid #bbb;
`

const Separator = () => {
    return (
        <M>
            <Line />
        </M>
    )
}

export default Separator
