export const SaveFarmState = (farmObject) => {
  return {
    type: "SAVE_FARM",
    payload: farmObject,
  };
};
