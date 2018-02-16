import {
    updateProfiles,
	updateProfilesCount,
} from '../../actions/search';

const searchListener = (dispatch, socket) => {
    socket.on('SERVER/GET_PROFILES', ({ profiles }) => {
        dispatch([
            updateProfiles(profiles),
        ]);
    });
    socket.on('SERVER/GET_PROFILES_COUNT', ({ profilesCount }) => {
        dispatch([
            updateProfilesCount(profilesCount),
        ]);
    });
};

export default searchListener;
