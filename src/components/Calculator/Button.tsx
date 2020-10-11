import styled from '@emotion/styled';

type ButtonProps = {
    operator?: number;
};

export const Button = styled.div<ButtonProps>`
    background-color: ${(props: ButtonProps) =>
        props.operator === 1 ? '#193543' : '#343434'};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e8e8e8;
    font-size: 26px;
    border-radius: 5px;
    margin: 10px;
    height: 100%;
    cursor: pointer;
    &:hover {
        background-color: #00d4d4;
    }
`;
