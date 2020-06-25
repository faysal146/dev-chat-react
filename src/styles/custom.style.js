import styled from 'styled-components';
import { Dropdown as DRO, Icon, Placeholder } from 'rsuite';
const { Paragraph } = Placeholder;
export const Dropdown = styled(DRO)`
    .rs-btn-subtle {
        display: flex;
        align-items: center;
        text-transform: capitalize;
    }
    .rs-dropdown-toggle-caret {
        top: 50% !important;
        transform: translateY(-50%) !important;
        right: 10% !important;
    }
`;

export const IconWithSize = styled(Icon)`
    font-size: 20px;
`;

export const MessagePlaceholder = styled(Paragraph)`
    .rs-placeholder-paragraph-graph {
        width: 40px;
        height: 40px;
    }
`;
