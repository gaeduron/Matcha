import React from 'react';

export class LikeButton extends React.Component {
	render() {
		if (this.props.liked) {
			return (
				<button
					className="l-onb-nav__buttons-left c-button c-button--active c-button--circle c-user-desc__edit"
					onClick={this.props.onUnlike}
					>
					<i className="material-icons">favorite</i>
				</button>
			);
		} else {
			return (
				<button
					className="l-onb-nav__buttons-left c-button c-button--circle c-user-desc__edit"
					onClick={this.props.onLike}
					>
					<i className="material-icons">favorite_border</i>
				</button>
			);
		}
	}
}

export class ReportButton extends React.Component {
	render() {
		if (this.props.reported) {
			return (
				<div
					className="c-user-desc__report-block"
					onClick={this.props.onUnreport}
					>
					<p className="o-little-title o-little-title--button">UNREPORT</p>
				</div>
			);
		} else {
			return (
				<div
					className="c-user-desc__report-block"
					onClick={this.props.onReport}
					>
					<p className="o-little-title o-little-title--button">REPORT</p>
				</div>
			);
		}
	}
}

export class BlockButton extends React.Component {
	render() {
		if (this.props.blocked) {
			return (
				<div
					className="c-user-desc__report-block"
					onClick={this.props.onUnblock}
					>
					<p className="o-little-title o-little-title--button">UNBLOCK</p>
				</div>
			);
		} else {
			return (
				<div
					className="c-user-desc__report-block"
					onClick={this.props.onBlock}
					>
					<p className="o-little-title o-little-title--button">BLOCK</p>
				</div>
			);
		}
	}
}
