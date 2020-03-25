import { Filters } from "./Filters/Filters";
import { Items } from "./Items/Items";
import { AppContext, issuesReducer, ActionType } from "./_code/appContext";
import { useReducer, useEffect } from "react";
import * as React from 'react';
import { getIssues } from "./_code/mockData";

export interface IContextExampleProps {
  currentUser: string;
}

export const ContextExample = (props: IContextExampleProps) => {

  const [contextState, dispatch] = useReducer(issuesReducer, {
    issues: null
  });
  useEffect(() => {
    getIssues().then(data => dispatch({type: ActionType.SetIssues, payload: data}))
  }, []);

  return (<div>
    <AppContext.Provider value={{
      state: contextState,
      dispatch,
      props: {
        currentUser: props.currentUser
      }
      }
    }>
      <Filters />
      <Items />
    </AppContext.Provider>
  </div>);
}
