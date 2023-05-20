import { RootState } from "..";

export const selectCounterValue = (state: RootState) => state.counter.value;
