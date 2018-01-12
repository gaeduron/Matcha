/* TO DO	
 *
 * [1] Trigger warning notofications  
 * [2] Add a transparent dark background when loading
 *
 *
 **/

import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';
import MDSpinner from "react-md-spinner";

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};


export default class PhotoUploader extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			scale: 1,
			modalIsOpen: false,
			file: "",
			loading: false,
			cloudinary: null,
		};
	}

	openModal = (e) => {
		const file = e.target.files[0];
		console.log('image size', file.size);

		if (this.validatePhoto(file)) {
			this.setState({ 
				modalIsOpen: true,
				file
			});
		}
//		e.target.value = null;
	}

	validatePhoto = (file) => {
		return (file.size < 2500000) ? true : false; 
		/* TO DO 1 */
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	}

	handleScale = (e) => {
	    const scale = parseFloat(e.target.value);
	    this.setState({ scale });				  
	}

	handleClearPhoto = () => {
		let cl = this.state.cloudinary;

		if (cl) {
			var timeDiffInMin = Math.round((new Date() - new Date(cl.created_at)) / 60000);
		}

		/* With unsigned upload, the user is able to delete his photo from cloudinary 
		 * with the delete token up to 10 min after upload */
		if (timeDiffInMin < 10) {
			axios.post('https://api.cloudinary.com/v1_1/matcha/delete_by_token', { 
				token: this.state.cloudinary.delete_token 
			})
			.catch(error => { console.log('delete token has expired') });
		}
		
		this.props.onClearSuccess(this.props.pos);
	    this.setState({ 
			cloudinary: null,
			file: null
	   	});				  
	}

	handleSave = data => {
		const img = this.editor.getImage().toDataURL();

		this.closeModal();
		this.uploadPhoto(img);
	}

	uploadPhoto = (file) => {

		const cloudName = 'matcha';
		const unsignedUploadPreset = 'l37etlko';
		const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

		this.setState({ loading: true });

		axios.post(url, { upload_preset: unsignedUploadPreset, file: file })
			.then(({ data }) => {
				//const url = data.secure_url;
				//let tokens = url.split('/');
				//tokens.splice(-2, 0, 'w_150,c_scale');
				//let img = new Image(); 
				//img.src = tokens.join('/');
				//img.alt = data.public_id;
				//document.getElementById('gallery').appendChild(img);
				
				let photoUrl = data.secure_url;

				//document.getElementsByClassName('photo-uploader')[this.props.photoId].style.backgroundImage = `url(${url})`; 

				this.props.onSuccess(photoUrl, this.props.pos);
				this.setState({ 
					cloudinary: data,
					loading: false,
			   	});

		});
	}  


	setEditorRef = (editor) => this.editor = editor;

	render () {
	
		let photoUrl = this.props.url;	
		let { pos } = this.props;
		let { loading } = this.state;


		return (
				<div>
					{/* Image state after cropping */}	

					{(this.props.url || loading) &&  
						<div 
							className="photo-uploader"
							style={{
								backgroundImage: `url(${photoUrl})`
							}}	
						>
							<label htmlFor={`clear${this.props.photoId}`} className="custom-file-upload">
								<span>x</span>
							</label>
							<button id={`clear${this.props.photoId}`} onClick={this.handleClearPhoto}>x</button>

							<div>
								{loading && 
									<MDSpinner 
										size={40}	
										singleColor="rgb(255, 255, 255)"
									/>
								}
								{/* TO DO 2 */}
							</div>

							<label htmlFor={`leftSwap${this.props.photoId}`} className="custom-file-upload">
								<span>LEFT</span>
							</label>
							<button id={`leftSwap${this.props.photoId}`} onClick={() => this.props.leftSwap(pos)}>left</button>

						</div>
					}


					{/* Image state before cropping */}	

					{(!this.props.url && !loading) && 
						<div 
							className="photo-uploader"
						>
							<label htmlFor={`image_uploads${this.props.photoId}`} className="custom-file-upload">
								<span>+</span>
							</label>
							<input onChange={this.openModal} type="file" id={`image_uploads${this.props.photoId}`} name="image_uploads" accept=".jpg, .jpeg, .png" />
								
						</div>
					}


					{/* Modal displaying cropping feature */}	

					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Example Modal"
						ariaHideApp={false}
					>

						<AvatarEditor
							ref={this.setEditorRef}
							image={this.state.file}
							width={250}
							height={250}
							border={50}
							color={[255, 255, 255, 0.6]} // RGB
							scale={this.state.scale}
							rotate={0}
							onSave={this.handleSave}
						/>	

						<br />
						Zoom:
						<input
							name='scale'
					   		type='range'
							onChange={this.handleScale}
				  			min={this.state.allowZoomOut ? '0.1' : '1'}
				  			max='3'
				  			step='0.01'
				  			defaultValue='1'
						/>
						<br />		
						<button onClick={this.closeModal}>close</button>
						<button onClick={this.handleSave}>save</button>
					</Modal>
					<br />
				</div>
		);
	}
}
