import styled from 'styled-components';
import { Modal } from 'rsuite'

export const PickerContainer = styled.div`
	top: -360px; 
	left: 0px;
	z-index: 20;
`

export const PrevieImage = styled.div`
	width: 60px;
	height: 60px;
	overflow:hidden;
	border-radius: 5px;
	position:relative;
	img {
		object-fit:cover;
		width: 100%;
		min-height: 100%;
		display: block;
	}
	button {
		width: 15px;
		height: 15px;
		background: #f18a23;
		top: 5px;
		left: 5px;
		font-size: 8px;
		&:focus {
			outline: none;
		}
		i {
			font-size: 9px;
		}
	}
`

export const UploadImageProcess = styled.div`
	display: flex;
	justify-content:center;
	align-items:center;
	height: 100%;
	width: 100%;
	position: absolute;
	background: rgba(000,000,000,.7);
	#item-container {
		width: 40px;
		height: 40px;
	}
	.rs-progress-icon-success {
		font-size: 15px;
	}
	.rs-progress-circle-info{
		font-size: 14px;
    	line-height: 2.6;
	}
`

export const LoaderContainer = styled.div`
	display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const LoaderBackDrop = styled.div`
	position:absolute;
	background: rgba(000,000,000,.5);
	width: 100%;
	height: 100%;
`

export const ImagePreview = styled(Modal)`
	.rs-modal-content {
		padding: 0;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit:cover;
	}
`