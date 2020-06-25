import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Sidebar, Content } from 'rsuite';
import DashboardAside from '@/component/dashboard-aside';
import Message from '@/component/message';
const HomePage = () => {
    return (
        <Container style={{ height: '100vh' }}>
            <Sidebar>
                <DashboardAside />
            </Sidebar>
            <Content>
                <Route path='/chat/:id' exect component={Message} />
            </Content>
            <Sidebar>Sidebar</Sidebar>
        </Container>
    );
};

export default HomePage;
