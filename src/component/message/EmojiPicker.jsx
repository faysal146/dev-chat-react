import React from 'react';
import styled from 'styled-components';
import {Animation} from 'rsuite';
import { Picker } from 'emoji-mart';
import { PickerContainer } from '@/styles/Messages.style'

const WithPicker = styled(Picker)`
	width: 320px;
	top: 360px; 
	left: 0px;
`
const EmojiPicker = ({show, handleSelect}) => {
	return (
		<Animation.Fade in={show} exitedClassName="d-none">
            <PickerContainer className="position-absolute">
                <WithPicker theme="dark" 
                	tooltip 
                	showSkinTones={false} 
                	emojiSize={20} 
                	showPreview={false} 
                	onSelect={emoji => handleSelect(emoji.native)}/>
            </PickerContainer>
        </Animation.Fade>
	)
}

export default React.memo(EmojiPicker)