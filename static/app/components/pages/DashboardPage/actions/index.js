import * as Types from './types';

export const changeUserStats = (newStats) => ({
  type: Types.CHANGE_USER_STATS,
  newStats
});
