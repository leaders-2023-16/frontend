import { RootState } from "..";

export const getSelectedDirectionTrain = (state: RootState) =>
  state.submitApplicationScreen.selectedDirectionTrain;

export const getIsSubmitingApplication = (state: RootState) =>
  state.submitApplicationScreen.isSubmitingApplication;

export const getDirectionTrainSelectError = (state: RootState) =>
  state.submitApplicationScreen.directionTrainSelectError;
