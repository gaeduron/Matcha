import React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'element-react';
import 'element-theme-default';

// data {
//	error: ['error1', 'error2'],
//	info: ['info1'],
// }

//server
//

export class Notifications extends React.Component {
	constructor(props) {
		super(props);
	};

	createNotification = () => {
		//if (data.error) { notifyError }
		//if (data.info) { notifyInfo }
		//notifyError = () => {
			//	foreach Notification
			//	type: 
			//	message:
			//	title: = type
		//}
		Notification({
			title: 'Error',
			message: this.props.notif[0],
			type: 'error'
		});
	};

	render() {
		return (
			<div>
				{this.props.notif ? this.createNotification() : <div></div>}
			</div>
		)
	};
};

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	}
};

export default connect(mapStateToProps, undefined)(Notifications);

