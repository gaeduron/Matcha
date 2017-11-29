import React from 'react';
import { Button, Upload, Message } from 'element-react';
import { range } from 'ramda';
import 'element-theme-default/lib/upload.css';

export default class OnboardingPhoto extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			//photosUrl: this.props.photos ? this.props.photos : ''
			photosUrl: [
				'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg', 
				'https://s3.amazonaws.com/uifaces/faces/twitter/kastov_yury/128.jpg', 
				undefined,
				undefined,
				undefined
			]
		};
	}

	handleAvatarScucess = (res, file, idx) => {
		let photosUrl = this.state.photosUrl.slice();
		photosUrl[idx] = URL.createObjectURL(file.raw);
		photosUrl.sort((a, b) => a == undefined);

		this.setState({ photosUrl });
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
		const { photosUrl } = this.state;

		return (
			<div>
				<p>Photo</p>

				{ photosUrl.map((photo, idx) => (
					<Upload
						className="avatar-uploader"
						action="//jsonplaceholder.typicode.com/posts/"
						showFileList={false}
						onSuccess={(res, file) => this.handleAvatarScucess(res, file, idx)}
						beforeUpload={file => this.beforeAvatarUpload(file)}
						key={idx}
					>
						{ photo 
								? <img src={photo} className="avatar" /> 
								: <i className="el-icon-plus avatar-uploader-icon"></i> }
					</Upload>
				)) }

				<button onClick={this.getPhoto}>Continue</button>
			</div>
		);
	}
}
