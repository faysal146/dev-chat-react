import React, { useState, useCallback } from 'react';
import { firebaseAuth } from '@/firebase/firebase';
import {
    Modal,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Alert,
    Schema,
} from 'rsuite';
import { createChannel } from '@/firebase/controller';

const model = Schema.Model({
    channel: Schema.Types.StringType().isRequired('Channel Name Reqired'),
});

const init = { channel: '', descriptions: '' };

export default ({ show, toggleModel, user }) => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(init);

    const resetModelState = useCallback(() => {
        setValues(init);
        toggleModel(false);
    }, [toggleModel]);

    return (
        <Modal size='md' show={show} onHide={() => toggleModel(false)}>
            <Form
                fluid
                formValue={values}
                onChange={setValues}
                model={model}
                onSubmit={async (hasNoError) => {
                    if (hasNoError) {
                        setLoading(true);
                        try {
                            await createChannel({
                                data: values,
                                creator: {
                                    id: user.id,
                                    name: user.name,
                                },
                            });
                            setLoading(false);
                            setValues(init);
                            Alert.success('Successfully Channel Created', 3000);
                            toggleModel(false);
                        } catch (err) {
                            setLoading(false);
                            Alert.error(err.message, 5000);
                        }
                    }
                }}
            >
                <Modal.Header>
                    <Modal.Title className='size-10'>
                        Create New Channel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-3'>
                    <FormGroup>
                        <ControlLabel>Channel Name</ControlLabel>
                        <FormControl
                            name='channel'
                            size='lg'
                            className='mt-2'
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Descriptions</ControlLabel>
                        <FormControl
                            name='descriptions'
                            rows={7}
                            componentClass='textarea'
                            className='mt-2'
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        appearance='primary'
                        loading={loading}
                        type='submit'
                    >
                        Create
                    </Button>
                    <Button
                        disabled={loading}
                        appearance='subtle'
                        onClick={resetModelState}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
