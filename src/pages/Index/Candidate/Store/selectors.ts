import { RootState } from "@/store";

export const getSelectedDirectionTrain = (state: RootState) =>
  state.candidateIndexPage.selectedDirectionTrain;
