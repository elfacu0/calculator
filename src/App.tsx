import React from 'react';
import styled from '@emotion/styled';
import { Calculator } from './Calculator';

const AppWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f4045;
`;

function App() {
    return (
        <AppWrapper>
            <Calculator />
        </AppWrapper>
    );
}

export default App;
