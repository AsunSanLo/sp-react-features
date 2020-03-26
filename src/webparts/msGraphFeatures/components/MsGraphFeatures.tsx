import * as React from 'react';
import styles from './MsGraphFeatures.module.scss';
import { ServiceScope } from '@microsoft/sp-core-library';
import { serviceKeys } from '../code/appStartup';
import { TextField, Label, Stack, Button, ITextField, Icon, Separator, PrimaryButton } from 'office-ui-fabric-react';
export interface IMsGraphFeaturesProps {
  serviceScope: ServiceScope;
}

export const MsGraphFeatures = (props: IMsGraphFeaturesProps) => {
  const graphService = props.serviceScope.consume(serviceKeys.IGraphTestService);

  const [teamName, setTeamName] = React.useState<string>("Manual Team Test");
  const [users, setUsers] = React.useState<string[]>([
    "spteam.user1@sanlotest.onmicrosoft.com",
    "spteam.user2@sanlotest.onmicrosoft.com",
    "spteam.user3@sanlotest.onmicrosoft.com",
    "spteam.user4@sanlotest.onmicrosoft.com",
    "spteam.user5@sanlotest.onmicrosoft.com",
    "spteam.user6@sanlotest.onmicrosoft.com"
  ]);
  const [listTime, setListTime] = React.useState<number>(null);
  const [batchTime, setBatchTime] = React.useState<number>(null);
  const newUserField = React.useRef<ITextField>(null);
  const _addUser = () => {
    setUsers([
      ...users,
      newUserField.current.value
    ]);
  }
  const _removeUser = (index) => {
    users.splice(index, 1);
    setUsers([
      ...users
    ]);
  }

  const _executeActionsList = async () => {
    const startTime = new Date().getTime();
    graphService.addUsers(teamName, users)
    .then(() => {
      const endTime = new Date().getTime();
      setListTime(endTime - startTime);
      return graphService.deleteUsers(teamName, users);
    })
    .catch(error => alert(error));
  }

  const _executeActionsInBatch = async () => {
    const startTime = new Date().getTime();
    graphService.addUsersInBatch(teamName, users)
    .then(() => {
      const endTime = new Date().getTime();
      setBatchTime(endTime - startTime);
      return graphService.deleteUsers(teamName, users);
    })
    .catch(error => alert(error));
  }

  return (
    <div className={styles.msGraphFeatures}>
      <h1>Example using Graph $batch</h1>
      <p>What we are going to do is: </p>
      <ul>
        <li>Search group id by name</li>
        <li>Add each user to the group</li>
        <li>Remove each user from the group</li>
      </ul>
      <TextField label="Group to use: " value={teamName} onChange={(event, newValue) => setTeamName(newValue)} />
      <br />
      <Label>Users to add: </Label>
      <table>
        {users.map((user, index) => <tr>
          <td>{user}</td>
          <td><Icon iconName="Delete" onClick={() => _removeUser(index)} /></td>
        </tr>)}
      </table>
      <br />
      <Stack horizontal verticalAlign="end">
        <Stack.Item grow={2}>
          <TextField label="New user" componentRef={newUserField} />
        </Stack.Item>
        <Button onClick={_addUser} >Add user</Button>
      </Stack>

      <Separator />
      {
        (listTime || batchTime) && <>

          <p>Times:</p>
          <p>In order: {listTime}</p>
          <p>In batch: {batchTime}</p>
        </>
      }

      <PrimaryButton onClick={_executeActionsList} >Execute in order</PrimaryButton>
      <PrimaryButton onClick={_executeActionsInBatch} >Execute in batch</PrimaryButton>

    </div>
  );
}
