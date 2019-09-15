import React from 'react';
import './App.css';

import { Card, Icon, Table, Typography, Progress } from 'antd';

import UploadForm from './uploader';

const { Title, Text } = Typography;

const columns = [
    {
        title: 'Class',
        dataIndex: 'class'
    },
    {
        title: 'Confidence',
        dataIndex: 'confidence',
        render: conf => (<Progress percent={conf} size="small" showInfo={false} status="active" />)
    }
];


class App extends React.Component {

    state = {
        loading: false,
        preds: null,
    };

    handleResponse = info => {
        let arr = [];
        Object.keys(info.file.response).forEach(key => arr.push({ "class": key, "confidence": (info.file.response[key] * 100).toFixed(2) }));
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
                <Title
                    style={{ marginBottom: '0.35em', color: '#fff' }}>
                    Cifar 10 Classifier
                </Title>

                <Text
                    strong
                    style={{ marginBottom: '1em', color: '#fff', fontSize: '1.08rem' }}>
                    Made by @<a href="https://github.com/sdabhi23">sdabhi23</a>
                </Text>

                <a
                    href="https://github.com/sdabhi23/cifar-10"
                    rel="noopener noreferrer"
                    target="_blank">
                    <Icon
                        type="github"
                        style={{ fontSize: '32px', color: '#fff', marginBottom: '0.75em' }} />
                </a>

                <div className="main-content">
                    <UploadForm
                        onResponse={this.handleResponse}
                        loading={this.changeLoading} />

                    <Card>
                        <Table
                            columns={columns}
                            pagination={false}
                            loading={this.state.loading}
                            dataSource={this.state.preds}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

export default App;
