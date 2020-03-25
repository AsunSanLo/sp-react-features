
import * as React from 'react';
import { AppContext } from '../_code/appContext';
import {Issue} from './Issue/Issue';
export const Items = () => {
  const { state: contextState } = React.useContext(AppContext);
  const issues = contextState.issues;
  return (<div>
    {issues && Object.keys(issues).map(groupName => {
      return (<div>
        <h2>{groupName}</h2>
        <div>
          {issues[groupName].filter(issue => !issue.hidden).map((issue, index) => <Issue key={"issue" + index} item={issue} />)}
        </div>
      </div>)
    })}
  </div>);
}
