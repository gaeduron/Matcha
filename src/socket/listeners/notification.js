import notification from '../../actions/notification';

const notificationListener = (dispatch, socket) => {
	//	izitoast
	//	classic toast
	socket.on('notificationSuccess', (res) => {
		notification.success(res);
	});
	socket.on('notificationInfo', (res) => {
		notification.info(res);
	});
	socket.on('notificationWarning', (res) => {
		notification.warning(res);
	});
	socket.on('notificationError', (res) => {
		notification.error(res);
	});
	//	matcha
	socket.on('notificationVisit', (res) => {
		notification.visit(res);
		notification.addOne();
	});
	socket.on('notificationLike', (res) => {
		notification.like(res);
		notification.addOne();
	});
	socket.on('notificationUnlike', (res) => {
		notification.unlike(res);
		notification.addOne();
	});
	socket.on('notificationMatch', (res) => {
		notification.match(res);
		notification.addOne();
	});
	socket.on('notificationChat', (res) => {
		notification.chat(res);
		notification.addOne();
	});
};

export default notificationListener;
