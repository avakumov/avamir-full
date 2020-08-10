import React from 'react'
import styled from 'styled-components'

const Main = styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction};
    height: fit-content;
`
const NavItem = styled.div`
    margin-bottom: 0.2rem;
    cursor: pointer;
    padding: 5px 10px 5px 10px;
    color: ${(props) => (props.active ? props.colorActiveItemText : 'black')};
    background-color: ${(props) =>
        props.active ? props.colorActiveItem : props.colorItem};
`

const Name = styled.div`
    font-weight: bold;
    margin-bottom: 0.2rem;
    padding: 5px 10px 5px 10px;
`

const Navbar = ({
    name,
    menuItems,
    activeMenuItemId,
    setMenuItemId,
    direction,
    colorActiveItem,
    colorActiveItemText,
}) => {
    const changeCurrentItem = (id) => {
        setMenuItemId(id)
    }

    const links = menuItems.map(({ title, _id: id }) => {
        let active = false

        if (id === activeMenuItemId) {
            active = true
        }
        return (
            <NavItem
                active={active}
                key={id}
                onClick={() => changeCurrentItem(id)}
                colorActiveItemText={colorActiveItemText}
                colorActiveItem={colorActiveItem}
            >
                {title}
            </NavItem>
        )
    })

    return (
        <Main className="paper" direction={direction}>
            <Name>{name}</Name>
            {links}
        </Main>
    )
}

export default Navbar
