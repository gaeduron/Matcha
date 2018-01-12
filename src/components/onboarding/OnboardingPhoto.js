import React from 'react';
import { Button, Upload, Message } from 'element-react';
import { range, sort } from 'ramda';
import PhotoUploader from '../photo/PhotoUploader';
import 'element-theme-default/lib/upload.css';


export default class OnboardingPhoto extends React.Component {

	constructor(props) {
		super(props);

		const photosUrl = this.preparePhotosUrl(props.photos);
		
		this.state = {
			photosUrl
		};
	}

	preparePhotosUrl = (photos) => {
		let photosUrl = Array(5).fill(undefined);
				
		if (photos.length == 0)
			return photosUrl;
		for (let i = 0; i < photos.length && i < 5; i++)
			photosUrl[i] = photos[i];

		return photosUrl;
	};

	setAsProfile = (id) => {
		let photosUrl = this.state.photosUrl.slice(); 
		const profile = photosUrl.splice(id, 1)[0];
		photosUrl.unshift(profile);

		this.setState({ photosUrl });
	};

	handleAvatarScucess = (res, file, idx) => {
		let photosUrl = this.state.photosUrl.slice();
		photosUrl[idx] = URL.createObjectURL(file.raw);
		photosUrl.sort((a, b) => a == undefined);

		this.setState({ photosUrl });
	}
	
	// TO DEFINE 
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

	handleRemove = (id) => {
		let photosUrl = this.state.photosUrl.slice(); 
		photosUrl.splice(id, 1);
		photosUrl.push(undefined);

		this.setState({ photosUrl });
	};

	getPhoto = () => {
		this.props.getPhoto(this.state.photosUrl);
	};

	photoUploadSuccess = (url) => {
		this.setState({ url });
	}; 


	render () {
		const { photosUrl } = this.state;

		return (
			<div>	
				
				{ photosUrl.map((photo, idx) => (			
					<div key={idx}>					
						<PhotoUploader photoId={`sample${idx}`}/>
					</div>
				)) }
				
				<p>Photo</p>

				{ /*
				{ photosUrl.map((photo, idx) => (
					<div key={idx}>
						<Upload
							className="avatar-uploader"
							action="//jsonplaceholder.typicode.com/posts/"
							showFileList={false}
							onSuccess={(res, file) => this.handleAvatarScucess(res, file, idx)}
							beforeUpload={file => this.beforeAvatarUpload(file)}
							onClick={(file) => this.handleOnRemove(file)}
							key={idx}
						>
							{ photo 
									? <img src={photo} className="avatar" /> 
									: <i className="el-icon-plus avatar-uploader-icon"></i> }
						</Upload>
						{ photo && <button onClick={() => this.handleRemove(idx)}>x</button> }
						{ (photo && idx > 0) && <button onClick={() => this.setAsProfile(idx)}>set as profile</button> }
					</div>
				)) }

				*/}
				<button onClick={this.getPhoto}>Continue</button>
			</div>
		);
	}
}

		///		<PhotoUploader 
		///			key={0}
		///			photoId={0} 
		///			url="https://s3.amazonaws.com/uifaces/faces/twitter/sillyleo/128.jpg" 
		///			onSuccess={this.photoUploadSuccess}
		///		/>
