import { Action } from "@reduxjs/toolkit";

type ActionCreator<T, R> = (...args: T[]) => { type: string; payload: R };
type CreatedAction<T> = { type: string; payload: T };

export const isSameAction = <R>(
  action1: CreatedAction<any>,
  action2: ActionCreator<any, R> & Action
): action1 is CreatedAction<R> => action1.type === action2.type;

export const includeOrExclude = <T>(arr: T[], value: T) => {
  if (arr.includes(value)) {
    arr = arr.filter((v) => v !== value);
  } else {
    arr.push(value);
  }

  return arr;
};
