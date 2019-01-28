import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as ArrowDownIcon } from '../../icons/arrow-down.svg'
import Buttons from './Buttons'
import Avatar from '../common/Avatar'

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
	z-index: 2;
`

const Wrapper = styled.div`
	width: 100vw;
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

const LoginButton = styled.a`
	font-weight: 500;
	color: var(--c-blue-hl);
	text-decoration: none;
`

const UserName = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	height: 100%;
	${Avatar} {
		margin-left: 10px;
	}
`

const Toolbar = ({ renderMarkdown, toggleRenderMarkdown, user }) => (
	<StyledToolbar>
		<Wrapper>
			<Group>
				{user.currentFile.name}
				<Button>
					<ArrowDownIcon />
				</Button>
			</Group>
			<Group>
				<Buttons />
			</Group>
			<Group>
				{user.name ? (
					<UserName>
						{user.name} {user.secondName}
						{user.photoURI && <Avatar src={user.photoURI} />}
					</UserName>
				) : (
					<LoginButton href={`http://localhost:5000/auth/google`}>Login</LoginButton>
				)}
			</Group>
		</Wrapper>
	</StyledToolbar>
)

const mapStateToProps = ({ renderMarkdown, user }) => ({ renderMarkdown, user })

export default connect(
	mapStateToProps,
	null
)(Toolbar)
