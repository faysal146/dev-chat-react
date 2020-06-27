import React from 'react';
import { Icon,Whisper,Popover, Button } from 'rsuite';


const CreateNewChannelWizard = ({ totalChannel, toggleModel }) => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <p className="font-weight-bold"><Icon icon="exchange" className="mr-1"/>Channels <span className="ml-2">{totalChannel}</span> </p>
            <Whisper
                placement='right'
                    speaker={
                        <Popover title='Channel'>
                            <p>Create New Channel</p>
                        </Popover>
                    }
                >
                    <Button onClick={toggleModel} className="rounded-circle" style={{background: "var(--secondary-bg)"}}>
                        <Icon icon='plus' />
                    </Button>
                </Whisper>
        </div>
    )
}
export default CreateNewChannelWizard;