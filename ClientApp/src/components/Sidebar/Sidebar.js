import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledSidebar = styled.div`
	margin-top: 40px;
	width: calc((var(--max-width) - var(--container-width)) / 2);
	position: fixed;
	margin-left: 50vw;
	left: calc((var(--max-width) / -2));
`

const Item = styled.div`
	background-color: ${({ hl }) => (hl ? 'var(--c-white-hl)' : 'transparent')};
	border-left: ${({ hl }) => (hl ? '4px' : 0)} solid var(--c-blue-hl);
	padding: 8px 21px;
	padding-left: ${({ hl }) => (hl ? '17px' : '21px')};
	font-weight: 200;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--c-darkgrey-text);
	cursor: pointer;
	&:hover {
		color: black;
	}
`

const Text = styled.p`
	margin: 50px 0 3px 21px;
	font-weight: 500;
	font-size: 0.9rem;
	text-transform: uppercase;
	color: var(--c-grey-text);
`

const Sidebar = ({ user }) => (
	<StyledSidebar>
		{!!user.ownFiles.length && (
			<>
				<Text>Own files</Text>
				{user.ownFiles.map(({ name, highlighted, nameHash }) => (
					<Item key={nameHash} hl={nameHash === user.currentFile.nameHash}>
						{name}
					</Item>
				))}
			</>
		)}
		{!!user.secondFiles.length && (
			<>
				<Text>Other's files</Text>
				{user.secondFiles.map(({ name, highlighted, nameHash }) => (
					<Item key={nameHash} hl={nameHash === user.currentFile.nameHash}>
						{name}
					</Item>
				))}
			</>
		)}
	</StyledSidebar>
)

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(Sidebar)
