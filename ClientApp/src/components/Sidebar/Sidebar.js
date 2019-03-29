import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { createFile, deleteFile } from '../../actions/user'
import { useModal } from '../common/Modal'
import CreateFileModal from './CreateFileModal'
import useMatchMobile from '../hooks/useMatchMobile'
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg'

const StyledSidebar = styled.div`
	margin-top: 40px;
	width: calc((var(--max-width) - var(--container-width)) / 2);
	position: fixed;
	margin-left: 50vw;
	left: calc((var(--max-width) / -2));
`

const Item = styled.div`
	display: flex;
	justify-content: space-between;
	text-decoration: none;
	background-color: ${({ hl }) => (hl ? 'var(--c-white-hl)' : 'transparent')};
	border-left: ${({ hl }) => (hl ? '4px' : 0)} solid var(--c-blue-hl);
	padding: 8px;
	padding-left: ${({ hl }) => (hl ? '17px' : '21px')};
	font-weight: 200;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--c-darkgrey-text);
	cursor: pointer;
	transition: color 0.3s;
	&:hover {
		color: black;
		svg {
			fill: var(--c-red-hl);
			pointer-events: auto;
		}
	}
	svg {
		fill: transparent;
		pointer-events: none;
		transition: fill 0.3s 0.1s;
	}
`

const NewFileButton = styled(Item)`
	display: block;
	margin-top: 10px;
	&::before {
		content: '+';
		font-size: 1.3rem;
		font-weight: 400;
		opacity: 0.7;
		vertical-align: middle;
		margin-left: -10px;
		margin-right: 10px;
	}
`

const Text = styled.p`
	margin: 50px 0 3px 21px;
	font-weight: 500;
	font-size: 0.9rem;
	text-transform: uppercase;
	color: var(--c-grey-text);
`

const Sidebar = ({ user, createFile, deleteFile, match, history }) => {
	const [createFileVisible, hideCreateFile, showCreateFile] = useModal()
	const isMobile = useMatchMobile()

	const currentFile =
		[...user.ownFiles, ...user.secondFiles].find(file => file.nameHash === match.params.nameHash) || {}

	if (isMobile) return null

	return (
		<StyledSidebar>
			{!!user.ownFiles.length && (
				<>
					<Text>Own files</Text>
					{user.ownFiles.map(({ name, highlighted, nameHash }) => (
						<Item
							key={nameHash}
							hl={nameHash === currentFile.nameHash}
							onClick={() => history.push(`/${nameHash}`)}
						>
							{name}
							<DeleteIcon
								onClick={e => {
									e.stopPropagation()
									deleteFile(nameHash)
								}}
							/>
						</Item>
					))}
				</>
			)}
			{!!user.secondFiles.length && (
				<>
					<Text>Other's files</Text>
					{user.secondFiles.map(({ name, highlighted, nameHash }) => (
						<Item
							key={nameHash}
							hl={nameHash === currentFile.nameHash}
							onClick={() => history.push(`/${nameHash}`)}
						>
							{name}
							<DeleteIcon
								onClick={e => {
									e.stopPropagation()
									deleteFile(nameHash)
								}}
							/>
						</Item>
					))}
				</>
			)}
			<NewFileButton onClick={showCreateFile}>Add a new file</NewFileButton>
			<CreateFileModal
				visible={createFileVisible}
				onClose={hideCreateFile}
				error={newFileName =>
					user.ownFiles.some(({ name }) => name === newFileName) && 'File with this name already exists'
				}
				submit={createFile}
			/>
		</StyledSidebar>
	)
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = { createFile, deleteFile }

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Sidebar)
)
