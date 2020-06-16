let initialState = {
  farmState: {
    farmId: "",
    siteId: "",
    farmSiteId: "",
    cropId: "",
    workerGroupId: "",
  },
};

const SaveFarmStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_FARM":
      return Object.assign({}, state, {
        ...state,
        farmState: {
          ...state.farmState,
          [action.payload.key]: action.payload[action.payload.key],
        },
      });
    default:
      return state;
  }
};

export default SaveFarmStateReducer;
