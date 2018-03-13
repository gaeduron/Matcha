import {
    updateProfiles,
	updateProfilesCount,
	updateSortBy,
	updateDistance,
	updateAge,
	updatePopularity,
	updateFiltersTags,
    updateProfile,
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
    socket.on('SERVER/UPDATE_FILTERS', (filters) => {
   		console.log('redux filters:', filters);
	    dispatch([
			updateSortBy(filters.sort),
			updateDistance({
				min: filters.distanceRange[0] / 1000,
				max: filters.distanceRange[1] / 1000,
			}),
			updateAge({
				min: filters.ageRange[0],
				max: filters.ageRange[1],
			}),
			updatePopularity({
				min: filters.popularityRange[0],
				max: filters.popularityRange[1],
			}),
			updateFiltersTags(filters.tags),
        ]);
    });
    socket.on('SERVER/GET_PROFILE_BY_ID', ({ profile }) => {
        dispatch([
            updateProfile(profile),
        ]);
    });
    socket.on('SERVER/REPORT_PROFILE', ({ profile }) => {
    });
};

export default searchListener;
