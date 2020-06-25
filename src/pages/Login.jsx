import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signInUser} from '@/app/store/reducers/user.reducer';
import {
    Form,
    FormGroup,
    FormControl,
    HelpBlock,
    ControlLabel,
    Button,
    Schema,
    Alert,
} from 'rsuite';
import {
    FormContainer,
    FormTitle,
    FormMain,
    FormFooter,
} from '@/styles/Form.style';
import {errorMessage} from '@/firebase/utils'
const { StringType } = Schema.Types;

const model = Schema.Model({
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('Email Address is required.'),
    password: StringType()
        .minLength(6, 'Password is Too Short')
        .isRequired('Password is Required'),
});

export const LoginPage = (props) => {
    const [value, setValue] = useState({ email: '', password: '' });
    const history = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    return (
        <FormContainer>
            <FormMain>
                <FormTitle>Dev Chat - Login</FormTitle>
                <Form
                    fluid
                    model={model}
                    formValue={value}
                    onChange={setValue}
                    onSubmit={async (isNotError) => {
                        if (isNotError) {
                            setLoading(true);
                            dispatch(signInUser({...value})).then(res => {
                                console.log(res)
                                if(res.error) {
                                    console.log(res.error)
                                    setLoading(false);
                                    Alert.error(errorMessage(res.error.code), 5000);
                                } else {
                                    history.replace('/')
                                }
                            })
                        }
                    }}
                >
                    <FormGroup>
                        <ControlLabel style={{ marginBottom: '10px' }}>
                            <span>Email</span>
                            <HelpBlock tooltip style={{ marginTop: 0 }}>
                                Required
                            </HelpBlock>
                        </ControlLabel>

                        <FormControl
                            name='email'
                            type='email'
                            size='lg'
                            placeholder='Enter Your Email'
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel style={{ marginBottom: '10px' }}>
                            <span>Password</span>
                            <HelpBlock tooltip style={{ marginTop: 0 }}>
                                Required
                            </HelpBlock>
                        </ControlLabel>

                        <FormControl
                            name='password'
                            type='password'
                            size='lg'
                            placeholder='Enter Your Password'
                        />
                    </FormGroup>
                    <Button
                        appearance='primary'
                        size='lg'
                        type='submit'
                        loading={loading}
                        block
                    >
                        Login
                    </Button>
                </Form>
                <FormFooter>
                    Not User Yet ? <Link to='/register'>Register Now</Link>
                </FormFooter>
            </FormMain>
        </FormContainer>
    );
};
export default LoginPage;