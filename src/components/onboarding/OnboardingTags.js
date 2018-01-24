import React from 'react';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import OnboardingNav from './OnboardingNav';

export default class OnboardingTags extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tags: this.props.tags ? this.props.tags : []
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
				<div className="l-onb-form__container">
				
					<h4 className="c-onb-form__title">WHAT ARE YOU INTERESTED IN ?</h4>
					<div className="l-tags">
						<ChipInput
							value={this.state.tags}
							onRequestAdd={(tag) => this.handleAddtag(tag)}
							onRequestDelete={(tag, index) => this.handleDeletetag(tag, index)}
							underlineStyle={{ }}
							hintText={'Add some tags (ex. Batman, Ramen, ...)'}
							chipContainerStyle={{
								backgroundColor: 'red'
							}}
							underlineFocusStyle={{
								borderBottom: '2px solid #fc2b68'
							}}
							style={{
								width: 330
							}}
						/>
					</div>

					<OnboardingNav action={this.getTags} />
				</div>
			</MuiThemeProvider>
		);
	}
}


/*
 * [ ] Add chip validation : https://github.com/TeamWertarbyte/material-ui-chip-input/issues/145
 *
 * */
