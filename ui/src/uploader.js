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
    return isJpgOrPng;
};

class Uploader extends React.Component {
    state = {
        loading: false,
        preds: null,
    };

    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            this.props.loading(true);
            return;
        }
        if (info.file.status === "done") {
            console.log(info.file.response)
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    preds: info.file.response,
                })
            );
            this.props.loading(false);
            this.props.onResponse(info);
        }
        if (info.file.status === "error") {
            this.setState({
                loading: false
            });
            this.props.loading(false);
            console.log("error");
        }
    };

    render() {
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
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                        uploadButton
                    )
                }
            </Upload>
        );
    }
}

const UploadForm = Form.create()(Uploader);

export default UploadForm;
