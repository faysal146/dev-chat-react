import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --bg-dark: #202343;
        --bg-dark-light: #2c315b;
        --bg-dark-light-hover: #3f446ffc;
        --secondary-bg: #592e83;
        --optional-bg: #2f1847;
        --body-color: rgba(255,255,255,.7);
        --font-family: 'Quicksand', 'Lucida Grande', 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', STXihei, sans-serif;
        --base-font-size: 16px;
    }
    body {
        font-weight: 500;
        min-height: 100vh;
        color: var(--body-color);
    }
    #root {
        height:100%;
    }
    .is-active-list {
        background: #3f446f69;
    }
    .drop-upload {
        width:90%;
        margin: auto;
        padding: 40px 0;
        text-align: center;
        border: 1px solid rgba(255,255,255,.3);
        border-radius: 10px;
        cursor:pointer;
        &:hover {
            transform: scale(1.01);
        }
        &:focus {
            input {
                border:none;
                outline: none;
            }
        }
    }
    .rs-uploader-trigger-btn{
        display: flex !important;
        justify-content: center;
        align-items: center;
        width: 100% !important;
        margin-bottom: 20px;
    }
    .rs-uploader-picture {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .rs-uploader-picture .rs-uploader-file-item {
        width: 120px;
        height: auto;
    }
`;
