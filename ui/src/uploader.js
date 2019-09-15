import React from "react";

import { Form, Upload, Icon, message } from "antd";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

class Uploader extends React.Component {
    state = {
        loading: false
    };

    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            console.log("uploading");
            return;
        }
        if (info.file.status === "done") {
            console.log(info.response)
            console.log(info.event)
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false
                })
            );
        }
        if (info.file.status === "error") {
            // Get this url from response in real world.
            this.setState({
                loading: false
            });
            console.log("error");
        }
    };

    dummyRequest = (file, onSuccess) => {
        setTimeout(() => {
            console.log(file);
        }, 1);
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
                name="query_img"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://cifar-10.herokuapp.com/classify"
                // customRequest={this.dummyRequest}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            // onError={() => console.log("Error")}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                        uploadButton
                    )
                }
            </Upload>
            // <Form onSubmit={this.handleSubmit}>
            //     <Form.Item>
            //         {
            //             getFieldDecorator("file", {
            //                 valuePropName: 'fileList',
            //                 getValueFromEvent: this.handleChange
            //             })(

            //             )
            //         }
            //     </Form.Item>
            // </Form>
        );
    }
}

const UploadForm = Form.create()(Uploader);

export default UploadForm;
