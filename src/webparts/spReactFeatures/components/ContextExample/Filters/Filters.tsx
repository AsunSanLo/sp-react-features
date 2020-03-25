
import * as React from 'react';
import { AppContext, ActionType } from '../_code/appContext';
import {DefaultButton, Label} from 'office-ui-fabric-react';


export const Filters = () => {

  const {dispatch, props: contextProps} = React.useContext(AppContext);

  return (
    <div>
      <small>Current User (example of using context props): {contextProps.currentUser} </small>
      <br />
      <Label>Agrupar por:</Label>
      <DefaultButton onClick={() => dispatch({type: ActionType.GroupBy, payload: "topic"})}>Topic</DefaultButton>
      <DefaultButton onClick={() => dispatch({type: ActionType.GroupBy, payload: "status"})}>Estado</DefaultButton>
    </div>);
}
