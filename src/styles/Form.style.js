import styled from 'styled-components';

export const FormContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    input::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
`;

export const FormMain = styled.div`
    width: 450px;
    margin: auto;
`;

export const FormTitle = styled.h2`
    margin-bottom: 30px;
    text-align: center;
`;

export const FormFooter = styled.div`
    margin-top: 20px;
    padding: 10px;
    text-align: center;
`;
