import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import EmojiPicker from './EmojiPicker'
import {
    MessageFormContainer,
    MessageInputGroup,
    SendMessageButton,
} from '@/styles/dashboard.style';
import { ReactComponent as EmojiIcon } from '@/assets/icons/emoji-icon.svg';
import { ReactComponent as Plus } from '@/assets/icons/plus-icon.svg';
import { ReactComponent as SendMessageIcon } from '@/assets/icons/send-message-icon.svg';
import {  Alert, Loader } from 'rsuite';
import { createMessage } from '@/firebase/controller';
import { userSelector } from '@/app/store/selectors/user.selector';
import UploadImageItem from './UploadImageItem'
import {uploadImages} from '@/firebase/controller'

const inputRef = React.createRef()
const uuid = () => Math.random().toString(36).substr(2)

const MessageForm = () => {
	const [files, setFiles] = useState([]);
    const { id: channelId} = useParams()
    const [messageSubmiting, setMessageSubmiting] = useState(false);
    const [showEmoji,setShowEmoji] = useState(false)
    const [message, setMessage] = useState('');
    const user = useSelector(userSelector);
    const selectEmoji = useCallback((value) => {
    	if(inputRef.current) {
    		setMessage(prev => {
    			return prev.substr(0,inputRef.current.selectionStart)
    				+ value
    				+ prev.substr(inputRef.current.selectionStart)
    		})
    	}
    }, []);
    const handleFileRemove = useCallback((index) => {
    	setFiles(prev => {
    		const copyFiles = [...prev];
    		copyFiles.splice(index, 1);
    		return copyFiles
    	})
    }, [])

    const handleFiles = useCallback(e => {
	    e.persist()
	    const inputFiles = Array.from(e.target.files);
	    if (inputFiles.length) {
	      setFiles(prev => {
	        const newFile = inputFiles.reduce((acc,val) => {
	        	if(val.type.startsWith('image')) {
		          acc.push({
		          	file: val, 
		          	src: URL.createObjectURL(val),
		          	status: 'init',
		          	progress: 0
		          })
	        	}
	          return acc;
	        }, [])
	        return [...prev, ...newFile]
	      })
	    }
  	}, []);

  	const sendMessage = useCallback(async (urls) => {
  		try {
            await createMessage(channelId, {
				message,
				images: Array.isArray(urls) ? urls : null,
                user: {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                },
           	});
            setMessageSubmiting(false);
            setMessage('');
            setFiles([]);
        } catch (err) {
            setMessageSubmiting(false);
            Alert.error(err.message, 2000);
        }
  	}, [channelId,user, message])

    useEffect(() => {
    	files.forEach(file => URL.revokeObjectURL(file.preview));
    },[files])
    return (
        <MessageFormContainer
            className='py-2 px-4 rounded position-relative'
        >
			{ files.length ? (
					<div className="d-flex flex-wrap mb-2">
						{ files.map((file,index) =>( 
							<UploadImageItem {...file} 
								key={uuid()}
								index={index}
								handleRemove={handleFileRemove}/>
						))}
					</div>
				) : null
			}
           <EmojiPicker show={showEmoji} handleSelect={selectEmoji}/>
            <form className="d-flex" onSubmit={async (e) => {
                if(showEmoji) setShowEmoji(false)
                e.preventDefault();
            	if(files.length) {
            		setMessageSubmiting(true)
            		const imageUrls = []
            		files.forEach((file,index) => {
	            		const uploadProcessData = uploadImages(`public/${channelId}/${uuid()}.${file.file.type.split('/')[1]}`, file.file)
	            		uploadProcessData((data) => {
	            			setFiles(state => {
	            				return state.map((fi,ind) => {
					    			if(ind === index) {
					    				fi.progress = data.progress
					    				fi.status = data.status
					    			}
				    				return fi;
				    			})	            			
				    		})
				    		if(data.status === 'success' && data.url) {
    							imageUrls.push(data.url)
    						}
    						const allUploadFinished = files.every((fileInfo) => {
    							return fileInfo.status === 'success' || fileInfo.status === 'error' 
    						});
    						if(allUploadFinished) {
    							sendMessage(imageUrls)
    						}
	            		})
            		})
            	} else {
            		setMessageSubmiting(true);
    				sendMessage()
            	}
            }}>
                <MessageInputGroup className='flex-grow-1 rounded'>
                    <div className='icon-container'>
                        <label
                        	id="file"
                            className='chat-icon plus mr-2 pointer'
                            onClick={() => {
                                    if(showEmoji) setShowEmoji(false)
                                }
                            }
                        >
                        	<input type="file" 
                        		className="d-none" 
                        		htmlFor="file" 
                        		onChange={handleFiles}
                        		multiple
                        		accept="image/jpeg, image/png, image/jpg"/>
                            <Plus />
                        </label>
                        <div className='chat-icon' onClick={() => setShowEmoji(prev => !prev)}>
                            <EmojiIcon />
                        </div>
                    </div>
                    <input
                        className='rounded w-100'
                        style={{ paddingLeft: '80px' }}
                        type='text'
                        placeholder='Write Meassage Here...'
                        value={message}
                        onChange={(e) => {
                            if(showEmoji) setShowEmoji(false)
                            setMessage(e.target.value)
                        }}
                        ref={inputRef}
                        disabled={messageSubmiting}
                    />
                </MessageInputGroup>
                <SendMessageButton
                    disabled={messageSubmiting}
                    className='ml-2'
                    type='submit'
                >
                    {messageSubmiting ? <Loader size='sm' /> : <SendMessageIcon />}
                </SendMessageButton>
            </form>
        </MessageFormContainer>
    );
};

export default MessageForm;
