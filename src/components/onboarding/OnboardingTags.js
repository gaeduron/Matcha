import React from 'react';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class OnboardingTags extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tags: [
				'harry potter',
				'LOTR'
			]			
		};	
	}

	handleAddtag = (tag) => {
		const tags = [...this.state.tags, tag];
		this.setState({ tags });
	};	 

	handleDeletetag = (tag, index) => {
		const tags = this.state.tags.filter((elem) => elem !== tag);
		this.setState({ tags });
	};	 

	getTags	= () => {
		const tags = this.state.tags.map((tag) => tag.toLowerCase().trim());
		this.props.getTags(tags);
	};

	render () {

		return (
			<MuiThemeProvider>
				<div>
					<p>Tags</p>
					<ChipInput
						value={this.state.tags}
						onRequestAdd={(tag) => this.handleAddtag(tag)}
						onRequestDelete={(tag, index) => this.handleDeletetag(tag, index)}
						underlineStyle={{display: 'none'}}
					/>
					<button onClick={this.getTags}>Continue</button>
				</div>
			</MuiThemeProvider>
		);
	}
}
