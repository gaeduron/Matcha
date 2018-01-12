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
		this.setState({ photosUrl });
	}; 

	photoClearSuccess = (pos) => {
		let photosUrl = this.state.photosUrl.map(
			({ value, id }, idx) => idx === pos 
				? ({ value: undefined, id }) 
				: ({ value, id })
		);				
		this.setState({ photosUrl });
	};

	leftSwap = (pos) => {
		let arr =  this.state.photosUrl.slice();	
		
		console.log('swaping', arr);
		console.log('pos', pos);

		/* protect boundaries */
		let tmp = arr[(pos - 1) % 5];
		arr[(pos - 1) % 5] = arr[pos % 5];
		arr[pos % 5] = tmp;
	
		console.log('swaped', arr);

		this.setState({ photosUrl: arr });	
	};
	

	render () {
		const { photosUrl } = this.state;
		const { shouldStartGetPhotosUrl, getPhotosUrl } = this.props;

		if (shouldStartGetPhotosUrl) 
			getPhotosUrl(photosUrl.map(({ value }) => value )); 

		return (
			<div>	
				
				{ photosUrl.map(({ value, id }, idx) => (			
					<PhotoUploader 
						key={id} 
						photoId={id} 
						url={value}
						pos={idx}	
						onSuccess={this.photoUploadSuccess}
						onClearSuccess={this.photoClearSuccess}
						leftSwap={this.leftSwap}
					/>
				)) }
				
			</div>
		);
	}

}
