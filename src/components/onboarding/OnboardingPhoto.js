import React from 'react';
import { Button, Upload, Message } from 'element-react';
import 'element-theme-default';

export default class OnboardingPhoto extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			imageUrl: '',
		};
	}

	handleAvatarScucess = (res, file) => {
		this.setState({ imageUrl: URL.createObjectURL(file.raw) });
	}
	
	beforeAvatarUpload = (file) => {
		const isJPG = file.type === 'image/jpeg';
		const isLt2M = file.size / 1024 / 1024 < 2;
	
		if (!isJPG) {
			Message('Avatar picture must be JPG format!');
		}
		if (!isLt2M) {
			Message('Avatar picture size can not exceed 2MB!');
		}
		return isJPG && isLt2M;
	}

	getPhoto = () => {
		this.props.getPhoto();
	};

	render () {
		const { imageUrl } = this.state;

		return (
			<div>
				<p>Photo</p>

				<Upload
					className="avatar-uploader"
					action="//jsonplaceholder.typicode.com/posts/"
					showFileList={false}
					onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
					beforeUpload={file => this.beforeAvatarUpload(file)}
				>
					{ imageUrl 
							? <img src={imageUrl} className="avatar" /> 
							: <i className="el-icon-plus avatar-uploader-icon"></i> }
				</Upload>

				<button onClick={this.getPhoto}>Continue</button>
			</div>
		);
	}
}
