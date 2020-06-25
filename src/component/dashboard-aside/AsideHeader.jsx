import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { Dropdown } from '@/styles/custom.style';
import { Avatar, Icon, Whisper, Alert, Loader } from 'rsuite';
import { ManuDropDown, Brand, DashbordHeaderAvatar } from '@/styles/dashboard.style'
import {logoutUser} from '@/app/store/reducers/user.reducer';

const AsideHeader = ({user}) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [loading,setLoading] = useState(false)
	return (
		<>
		 	<Brand className='my-3'>DevChat</Brand>
		 	<Whisper
		      placement="rightStart"
		      trigger="click"
		      full
		      speaker={
		      	<ManuDropDown full>
				    <Dropdown.Menu>
				      	<Dropdown.Item className='p-2'>
                    		<Icon icon='gear-circle' /> Settings
                		</Dropdown.Item>
                		<Dropdown.Item className='p-2' disabled={loading} onClick={async () => {
                			setLoading(true)
                			try {
	                			await dispatch(logoutUser())
	                			history.replace('/login')
                			} catch (err) {
                				console.log(err)
                				setLoading(false)
                				Alert.error('Some Thing Went Wrong')
                			}
                		}}>
                			<div className="d-flex justify-content-between align-items-center pl-1">
                    			<span><Icon icon='sign-out' />  Logout</span>
	                    		{loading && <Loader />}
                			</div>
                    		
                		</Dropdown.Item>
				    </Dropdown.Menu>
				</ManuDropDown>
		      }
    		>
      			<DashbordHeaderAvatar className='mb-3'>
      				<Avatar circle size='sm' src={user.avatar} className='mr-2' />
      				<span className="flex-grow-1 text-left">{user.name}</span>
      				<Icon icon="arrow-right" style={{fontSize: '10px'}}/>
      			</DashbordHeaderAvatar>
    		</Whisper>
    	</>
	)
}

export default AsideHeader;

