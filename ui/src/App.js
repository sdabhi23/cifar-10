import React from 'react';
import './App.css';

import { Table, Typography } from 'antd';

import UploadForm from './uploader';

const { Title } = Typography;

const columns = [
    {
        title: 'Class',
        dataIndex: 'class'
    },
    {
        title: 'Confidence',
        dataIndex: 'confidence'
    }
];


class App extends React.Component {

    state = {
        loading: false,
        preds: null,
    };

    handleResponse = info => {
        let arr = [];
        Object.keys(info.file.response).forEach(key => arr.push({ "class": key, "confidence": (info.file.response[key] * 100).toFixed(3) }));
        this.setState({
            preds: arr.sort((a, b) => b.confidence - a.confidence),
        })
    }

    changeLoading = value => {
        this.setState({
            loading: value
        })
    }

    render() {
        return (
            <div className="App">
                <Title style={{ marginBottom: '1em', color: '#fff' }}>Cifar 10 Classifier</Title>

                <div className="main-content">
                    <UploadForm
                        onResponse={this.handleResponse}
                        loading={this.changeLoading} />

                    <Table
                        columns={columns}
                        pagination={false}
                        loading = {this.state.loading}
                        dataSource={this.state.preds}
                        style={{ marginTop: '1em' }}
                    />
                </div>
            </div>
        );
    }
}

export default App;
