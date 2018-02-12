import React from 'react';
import PhotoUploader from './PhotoUploader';
import keyIndex from 'react-key-index';

export default class UserPhotos extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			photosUrl: this.preparePhotosUrl(this.props.initialPhotos)
		};
	};

	onChange = () => { 
		this.props.onChange(this.state.photosUrl.map(({ value }) => value ));
	}

	preparePhotosUrl = (photos) => {
		let photosUrl = Array(5).fill(undefined);
				
		if (photos.length == 0)
			return photosUrl;
		for (let i = 0; i < photos.length && i < 5; i++)
			photosUrl[i] = photos[i];
		photosUrl = keyIndex(photosUrl, 1);
		return photosUrl;
	};

	photoUploadSuccess = (url, pos) => {
		let photosUrl = this.state.photosUrl.map(
			({ value, id }, idx) => idx === pos 
				? ({ value: url, id }) 
				: ({ value, id })
		);
		photosUrl.sort((a, b) => a.value == undefined);
		this.setState({ photosUrl }, this.onChange);
	}; 

	photoClearSuccess = (pos) => {
		let photosUrl = this.state.photosUrl.map(
			({ value, id }, idx) => idx === pos 
				? ({ value: undefined, id }) 
				: ({ value, id })
		);				
		photosUrl.sort((a, b) => a.value == undefined);
		this.setState({ photosUrl }, this.onChange);
	};

	rightSwap = (pos) => {
		let arr =  this.state.photosUrl.slice();	

		const right = (pos == 4) ? 0 : pos + 1;
		if (arr[right].value !== undefined) {
			[arr[right], arr[pos]] = [arr[pos], arr[right]];	
			this.setState({ photosUrl: arr }, this.onChange);	
		}
	};

	leftSwap = (pos) => {
		let arr =  this.state.photosUrl.slice();	

		const left = (pos == 0) ? 4 : pos - 1;
		if (arr[left].value !== undefined) {
			[arr[left], arr[pos]] = [arr[pos], arr[left]];	
			this.setState({ photosUrl: arr }, this.onChange);	
		}
	};

	render () {
		const { photosUrl } = this.state;

		return (
			<div className="container--photo-uploader">	
				
				{ photosUrl.map(({ value, id }, idx) => (			
					<PhotoUploader 
						key={id} 
						photoId={id} 
						url={value}
						pos={idx}	
						onSuccess={this.photoUploadSuccess}
						onClearSuccess={this.photoClearSuccess}
						leftSwap={this.leftSwap}
						rightSwap={this.rightSwap}
						className=""
					/>
				)) }
				
			</div>
		);
	}
}
