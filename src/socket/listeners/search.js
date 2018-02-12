import {
    updateProfiles,
} from '../../actions/search';

const searchListener = (dispatch, socket) => {
    socket.on('SERVER/GET_PROFILES', ({ profiles }) => {
        dispatch([
            updateProfiles(profiles),
        ]);
    });
};

export default searchListener;
