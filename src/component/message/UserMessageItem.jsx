import React, {useState} from 'react';
import { UserMessage } from '@/styles/dashboard.style';
import { ImagePreview } from '@/styles/Messages.style'
import { Avatar, Container, Sidebar, Header, Content, Loader } from 'rsuite';

const UserMessageItem = ({ createdBy, created_at, message, images }) => {
    const [selectedImage,setSelectedImage] = useState(null) 
    return (
        <UserMessage className='py-2'>
            <Container>
                <Sidebar style={{ width: 'auto', flex: '0' }}>
                    <Avatar size='md' circle src={createdBy.avatar}></Avatar>
                </Sidebar>
                <Container>
                    <Header className='mb-1'>
                        <h3 className='size-3 d-inline-block mx-2'>
                            {createdBy.name}
                        </h3>
                        <span style={{ opacity: '.75' }} className='size-2'>
                            {new Date(created_at).toDateString()}
                        </span>
                    </Header>
                    <Content>
                        <div
                            className='p-2 rounded d-inline-block'
                            style={{ background: 'var(--bg-dark)' }}
                        >
                            {
                                images && images.length ? (
                                    <div>
                                       {
                                           images.map(file => <div key={file} className="rounded overflow-hidden mb-2 mr-2 pointer d-inline-block position-relative" style={{
                                               width: '150px',
                                               height: '110px'
                                           }} onClick={() => setSelectedImage(file)}>
                                              <div className="d-inline-block position-absolute" style={{
                                                  top: "50%",
                                                  left: "50%",
                                                  transform: "translate(-50%, -50%)"
                                              }}>
                                                  <Loader size="sm"/>
                                              </div>
                                               <img src={file} className="w-100 position-relative" alt={file} style={{zIndex: '2'}}/>
                                            </div>)
                                       }
                                       <ImagePreview 
                                         show={!!selectedImage} 
                                         onHide={() => setSelectedImage(null)}>
                                          <img src={selectedImage} alt="user-photo"/>
                                      </ImagePreview>
                                    </div>
                                ) : null
                            }
                            <p>{message}</p>
                        </div>
                    </Content>
                </Container>
            </Container>
        </UserMessage>
    );
};

export default UserMessageItem;
