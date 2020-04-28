export const SET_TEAM_DATA = '[LISTING] SET_TEAM_DATA';

export function setTeamData(data) {
  return {
    type: SET_TEAM_DATA,
    payload: data,
  };
}