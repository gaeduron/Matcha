import React from 'react';
import moment from 'moment';
import { range } from 'ramda';

/* 
	BirthdatePicker Props:  
		minAge<int>, 
		getTimestamp<func> 
*/

export default class BirthdatePicker extends React.Component {

	constructor(props) {
		super(props);

		this.months =  [
			{ name: 'MM', value: 0, ndays: 31 },
			{ name: 'Jan', value: 1, ndays: 31 },
			{ name: 'Feb', value: 2, ndays: 28 },
			{ name: 'Mar', value: 3, ndays: 31 },
			{ name: 'Apr', value: 4, ndays: 30 },
			{ name: 'May', value: 5, ndays: 31 },
			{ name: 'Jun', value: 6, ndays: 30 },
			{ name: 'Jul', value: 7, ndays: 31 },
			{ name: 'Aug', value: 8, ndays: 31 },
			{ name: 'Sep', value: 9, ndays: 30 },
			{ name: 'Oct', value: 10, ndays: 31 },
			{ name: 'Nov', value: 11, ndays: 30 },
			{ name: 'Dec', value: 12, ndays: 31 }
		],

		this.state = {
			month: this.props.birthDate ? this.props.birthDate.getMonth() + 1 : 0,
			year: this.props.birthDate ? this.props.birthDate.getFullYear() : 0,
			day: this.props.birthDate ? this.props.birthDate.getDate() : 0
		};
	}

	getDaysRange = () => {
		let daysInMonth = this.months[this.state.month].ndays;
		if (this.state.month == 2 
			&& this.state.year % 4 == 0 
			&& this.state.year != 0
			&& this.state.year % 100 != 0
		) 
			daysInMonth = 29;
		return range(1, daysInMonth + 1);
	};

	handleYear = (e) => {
		const year = Number(e.target.value);
		this.setState({year});
	};

	handleDay = (e) => {
		const day = Number(e.target.value);
		this.setState({day});
	};

	handleMonth = (e) => {
		const month = Number(e.target.value);
		this.setState({month});
	};

	getTimestamp = () => {
		if (this.state.month && this.state.day && this.state.year) {
			const dateString = `${this.state.month}-${this.state.day}-${this.state.year}`;
			this.props.getTimestamp(new Date(dateString));
		}
		else 
			this.props.getTimestamp('');
	};

	componentDidUpdate(prevProps, prevState) {
	  if (prevState !== this.state)
		this.getTimestamp();
	}

	render () {
		let startYear = new Date().getFullYear() - 7;
		let endYear = startYear - 90;
		let months =  this.months;
		let days = this.getDaysRange();
		let years = Array.from({length: startYear - endYear}, (v, k) => k + endYear).reverse();

		let { day, year, month } = this.state;

		return (
			<div>
				<div className="c-form-input c-form-box__first-input">
					<h5 className="c-form-input__title">Firstname</h5>
					<select 
						className="c-form-input__content"
						onChange={this.handleMonth}
						defaultValue={month}
					>
						{months.map(({ value, name }, idx) => (<option key={idx} value={value} >{name}</option>))}	
					</select> 
				</div>
				<select 
					onChange={this.handleDay}
					defaultValue={day}
				>
					<option key="0" value="0">DD</option>
					{days.map((day) => (<option key={day} value={day}>{day}</option>))}	
				</select> 
				<select 
					onChange={this.handleYear}
					defaultValue={year}
				>
					<option key="0" value="0">YYYY</option>
					{years.map((year) => (<option key={year} value={year}>{year}</option>))}	
				</select> 
				<p>{this.state.error}</p>

			</div>
		);
	}
}
