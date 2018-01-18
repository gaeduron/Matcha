import { history } from '../routers/AppRouter';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
	position: 'topRight',
	transitionIn: 'fadeInLeft',
	maxWidth: 1000,
	progressBar: false,
});

const success = (message) => {
	iziToast.success({
		title: 'OK',
		message,
	});
};

const info = (message) => {
	iziToast.info({
		title: 'Info',
		message,
	});
};

const warning = (message) => {
	iziToast.warning({
		title: 'Caution',
		message,
	});
};

const error = (message) => {
	iziToast.error({
		title: 'Error',
		message,
	});
};

const visit = ({ login, profilePicture }) => {
	iziToast.show({
		message: `${login} visited your profile !`,
		image: profilePicture,
		theme: 'dark',
		progressBarColor: '#E90F4D',
		timeout: 10000,
		icon: 'fa fa-eye',
		layout: 2,
		messageLineHeight: '22',
		buttons: [
			['<a>See Profile</a>', (instance, toast) => {
				history.push(`profile/${login}`);
				instance.hide(toast, { transitionOut: 'fadeOutRight' });
			}],
		],
	});
};

const like = ({ login, profilePicture }) => {
	iziToast.show({
		message: `${login} just liked you !`,
		image: profilePicture,
		theme: 'dark',
		progressBarColor: '#E90F4D',
		timeout: 10000,
		icon: 'fa fa-smile-o',
		layout: 2,
		messageLineHeight: '22',
		buttons: [
			['<a>See Profile</a>', (instance, toast) => {
				history.push(`profile/${login}`);
				instance.hide(toast, { transitionOut: 'fadeOutRight' });
			}],
		],
	});
};

const unlike = ({ login, profilepicture }) => {
	iziToast.show({
		message: `${login} unliked your profile !`,
		image: profilepicture,
		theme: 'dark',
		progressbarcolor: '#e90f4d',
		timeout: 10000,
		icon: 'fa fa-times-circle',
		layout: 2,
		messagelineheight: '22',
		buttons: [
			['<a>see profile</a>', (instance, toast) => {
				history.push(`profile/${login}`);
				instance.hide(toast, { transitionout: 'fadeoutright' });
			}],
		],
	});
};

const match = ({ login, profilePicture }) => {
	iziToast.show({
		message: `${login} matched with you !`,
		image: profilePicture,
		theme: 'dark',
		progressBarColor: '#E90F4D',
		timeout: 10000,
		icon: 'fa fa-heart',
		layout: 2,
		messageLineHeight: '22',
		buttons: [
			['<a>Chat</a>', (instance, toast) => {
				history.push(`chat/${login}`);
				instance.hide(toast, { transitionOut: 'fadeOutRight' });
			}],
			['<a>See Profile</a>', (instance, toast) => {
				history.push(`profile/${login}`);
				instance.hide(toast, { transitionOut: 'fadeOutRight' });
			}],
		],
	});
};

const chat = ({ login, profilePicture, message }) => {
	iziToast.show({
		title: login,
		message,
		image: profilePicture,
		theme: 'dark',
		progressBarColor: '#E90F4D',
		timeout: 10000,
		layout: 2,
		buttons: [
			['<a>Respond</a>', (instance, toast) => {
				history.push(`chat/${login}`);
				instance.hide(toast, { transitionOut: 'fadeOutRight' });
			}],
		],
	});
};

export default {
	success,
	info,
	warning,
	error,
	visit,
	like,
	unlike,
	match,
	chat,
};

//	OLD

export const pushNotification = notification => ({
	type: 'ADD_NOTIFICATION',
	notification,
});
