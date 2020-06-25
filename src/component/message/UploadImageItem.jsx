import React from 'react';
import {Icon,Progress, Loader} from 'rsuite';
import {PrevieImage, UploadImageProcess, LoaderContainer, LoaderBackDrop} from '@/styles/Messages.style'
const { Circle } = Progress;


const mapStatus = (status, {hanlder, index, progress }) => {
	if(status === 'init') return (
		<button 
			className="position-absolute rounded-circle text-center d-flex align-items-center justify-content-center pointer" 
			onClick={() => hanlder(index)}>
				<Icon icon="close"/>
		</button>
	)

	if(status === 'running') return (
		<UploadImageProcess>
    	    <div id="item-container">
      			<Circle percent={Math.round(progress)} status='active'/>
    		</div>
    	</UploadImageProcess>
	)

	if(status === 'success') return (
		<UploadImageProcess>
	      	<div id="item-container">
  				<Circle percent={100} status='success'/>
			</div>
    	</UploadImageProcess>
	)
	if(status === 'error') return (
		<UploadImageProcess>
	      	<div id="item-container">
  				<Circle status='fail'/>
			</div>
    	</UploadImageProcess>
	)
}

const UploadImageItem = ({handleRemove, index, src, progress,status}) => {
	return (
		<PrevieImage className="mr-2 mb-2">
			<div style={{height:'100%', width:"100%"}}>
				{mapStatus(status, {
	         		hanlder: handleRemove, 
	         		index, 
	         		progress: progress
				})}
				<img src={src} alt='upload'/>
			</div>
			<LoaderBackDrop>
				<LoaderContainer>
					<Loader size="sm"/>
	            </LoaderContainer>
			</LoaderBackDrop>
		</PrevieImage>
	)
}
export default React.memo(UploadImageItem);