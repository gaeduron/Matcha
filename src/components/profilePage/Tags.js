import React from 'react';
import { connect } from 'react-redux';

export class Tags extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="o-tag-box">
				{this.props.tags.map((tag, id) =>
				<p className="o-tag" key={id}>{tag}</p>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	};
};

export default connect(mapStateToProps, undefined)(Tags);
