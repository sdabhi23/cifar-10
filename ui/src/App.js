import React from 'react';
import './App.css';

import { Typography } from 'antd';

import UploadForm from './uploader';

const { Title } = Typography;


function App() {
    return (
        <div className="App">
            <Title style={{ marginBottom: '1em' }}>Cifar 10 Classifier</Title>
            <div style={{ width: '50%' }}>
                <UploadForm />
            </div>
        </div>
    );
}

export default App;
