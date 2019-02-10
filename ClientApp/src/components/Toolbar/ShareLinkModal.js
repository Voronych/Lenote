import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Modal from '../common/Modal'
import TextInput from '../common/TextInput'
import { getShareLink } from '../../actions/shareLink'

const Title = styled.h2`
	font-weight: 300;
`

const LinkInput = styled(TextInput)`
	margin-top: 15px;
	width: calc(100% - 20px);
`

const ShareLinkModal = ({ visible, onClose, user, getShareLink, shareLink }) => {
	useEffect(
		() => {
			if (visible) getShareLink(user.currentFile.nameHash)
		},
		[visible]
	)

	return (
		<Modal visible={visible} onClose={onClose}>
			<Title>Send this link to your friends to share a file with them</Title>
			<LinkInput
				placeholder="Generating a link for you"
				value={shareLink.link ? `${window.location.origin}/${shareLink.link}` : ''}
				onChange={() => {}}
			/>
		</Modal>
	)
}

const mapStateToProps = ({ user, shareLink }) => ({ user, shareLink })

const mapDispatchToProps = { getShareLink }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShareLinkModal)
