import * as React from 'react';
import { IIssue } from './IIssue';
import { reGroupIssuesBy, groupIssuesBy } from './issuesHelper';

export interface IAppContextState {
  issues: { [groupTitle: string]: Array<IIssue>};
}

export interface IAppContextProps {
  currentUser: string;
}
export interface IAppContext {
  state: IAppContextState;
  dispatch: React.Dispatch<IAction>;
  props: IAppContextProps;
}

export enum ActionType {
  SetIssues, GroupBy
}

export interface IAction {
  type: ActionType;
  payload: any;
}

export const AppContext = React.createContext({} as IAppContext);

export const issuesReducer = (currentState: IAppContextState, action: IAction ): IAppContextState => {
  switch (action.type) {
    case ActionType.SetIssues: {
      return {
        ...currentState,
        issues: groupIssuesBy(action.payload, "topic")
      };
    }
    case ActionType.GroupBy: {
      return {
        ...currentState,
        issues: reGroupIssuesBy(currentState.issues, action.payload)
      };
    }
    default:
      return currentState;
  }
};
