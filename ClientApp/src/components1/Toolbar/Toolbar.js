import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ArrowDownIcon } from '../../icons/arrow-down.svg'
import Buttons from './Buttons'

const Button = styled.span`
	cursor: pointer;
`

const StyledToolbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--c-darkgrey-bg);
	position: fixed;
	top: 0;
	left: 0;
`

const Wrapper = styled.div`
    width: 100%;
    max-width: var(--container-width);
    height: 60px;
    display: flex;
	justify-content: space-between;
`

const Group = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--c-lightgrey-text);
    font-weight: 200;
    &:nth-of-type(3n - 1) {
        display: flex;
        justify-content: center;
    }
    &:nth-of-type(3n) {
        display: flex;
        justify-content: flex-end;
    }
    svg {
      margin-left: 15px;
    }
`

const LoginButton = styled.div`
	font-weight: 500;
	color: var(--c-blue-hl)
`

const Toolbar = () => (
    <StyledToolbar>
        <Wrapper>
			<Group>
				Lorem Ipsum Dolor <Button><ArrowDownIcon /></Button>
			</Group>
			<Group><Buttons /></Group>
			<Group>
				<LoginButton>Login</LoginButton>
			</Group>
        </Wrapper>
    </StyledToolbar>
)

export default Toolbar
