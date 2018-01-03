import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';

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
			currentImg: "",
		};
	}

	openModal = (e) => {
		this.setState({ 
			modalIsOpen: true,
			currentImg: e.target.files[0]
		});
		e.target.value = null;
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	}

	handleScale = (e) => {
	    const scale = parseFloat(e.target.value);
	    this.setState({ scale });				  
	}

	handleClearPhoto = () => {
	    this.setState({ preview: null });				  
	}

	handleSave = data => {
		const img = this.editor.getImage().toDataURL();
		//const img = this.editor.getImage().toBlob((blob) => console.log(URL.createObjectURL(blob)));
		const rect = this.editor.getCroppingRect();

		this.setState({
			preview: {
				img,
				rect,
				scale: this.state.scale,
				width: this.state.width,
				height: this.state.height,
				borderRadius: this.state.borderRadius
			}
		});
		this.closeModal();
		console.log(img);
	}

	setEditorRef = (editor) => this.editor = editor;

	render () {

		return (
				<div>
					{this.state.preview && 
						<div 
							className="photo-uploader" 
							style={{ 
								backgroundImage:	`url(${this.state.preview.img})`,
							    backgroundSize:		'cover',                      
							    backgroundRepeat:   'no-repeat',
							    backgroundPosition: 'center center'	
							}}
						>
							<label htmlFor="clear-photo-btn" className="custom-file-upload">
								<span>x</span>
							</label>
							<button id="clear-photo-btn" onClick={this.handleClearPhoto}>x</button>
						</div>
					}
					{!this.state.preview && 
						<div className="photo-uploader">
							<label htmlFor="image_uploads" className="custom-file-upload">
								<span>+</span>
							</label>
							<input onChange={this.openModal} type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .gif" />
								
						</div>
					}

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
							image={this.state.currentImg}
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
				  			max='2'
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

