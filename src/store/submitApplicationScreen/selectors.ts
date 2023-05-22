import { RootState } from "..";

export const getSelectedDirectionTrain = (state: RootState) =>
  state.submitApplicationScreen.selectedDirectionTrain;
