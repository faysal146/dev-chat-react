import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signUpUser} from '@/app/store/reducers/user.reducer';
import {errorMessage} from '@/firebase/utils'
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
const { StringType } = Schema.Types;
const model = Schema.Model({
    name: StringType().isRequired('Please Provide Your Name'),
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('Please Provide Your Email.'),
    password: StringType()
        .minLength(6, 'Password is Too Short')
        .isRequired('Please Provide Your Password'),
    confirmPassword: StringType()
        .addRule(
            (value, data) => value === data.password,
            'The two passwords do not match'
        )
        .isRequired('This field is required.'),
});

export const RegisterPage = (props) => {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const dispatch = useDispatch()
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    return (
        <FormContainer>
            <FormMain>
                <FormTitle>Dev Chat - Register </FormTitle>
                <Form
                    fluid
                    model={model}
                    formValue={value}
                    onChange={setValue}
                    onSubmit={(isNotError) => {
                        if (isNotError) {
                            setLoading(true);
                                dispatch(signUpUser({...value}))
                                .then(res => {
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
                            <span>Name</span>
                            <HelpBlock tooltip style={{ marginTop: 0 }}>
                                Required
                            </HelpBlock>
                        </ControlLabel>
                        <FormControl
                            name='name'
                            type='text'
                            size='lg'
                            placeholder='Enter Your Name'
                        />
                    </FormGroup>
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
                    <FormGroup>
                        <ControlLabel style={{ marginBottom: '10px' }}>
                            <span>Confirm Password</span>
                            <HelpBlock tooltip style={{ marginTop: 0 }}>
                                Required
                            </HelpBlock>
                        </ControlLabel>

                        <FormControl
                            name='confirmPassword'
                            type='password'
                            size='lg'
                            placeholder='Retype Your Password'
                        />
                    </FormGroup>
                    <Button
                        appearance='primary'
                        size='lg'
                        type='submit'
                        loading={loading}
                        block
                    >
                        Register
                    </Button>
                </Form>
                <FormFooter>
                    Have Account ? <Link to='/login'>Login Now</Link>
                </FormFooter>
            </FormMain>
        </FormContainer>
    );
};
export default RegisterPage;
