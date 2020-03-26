import { IGraphTestService } from "./IGraphTestService";
import { ServiceScope } from "@microsoft/sp-core-library";
import { MSGraphClientFactory} from "@microsoft/sp-http";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export class GraphTestService implements IGraphTestService {

  private _graphFactory: MSGraphClientFactory;


  constructor(serviceScope: ServiceScope) {

    serviceScope.whenFinished(() => {
      this._graphFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
    });
  }

  public async deleteUsers(groupName: string, users: string[]): Promise<void> {
    const client = await this._graphFactory.getClient();
    const group = await client.api(`/groups?$filter=displayName eq '${groupName}'`).get() as {value: MicrosoftGraph.Group[]};
    const usersWithId = await Promise.all(users.map(user => client.api(`/users/${user}`).get() as Promise<MicrosoftGraph.User>));
    await Promise.all(usersWithId.map(user => client.api(`/groups/${group.value[0].id}/members/${user.id}/$ref`).delete()));
  }

  public async addUsers(groupName: string, users: string[]): Promise<void> {
    const client = await this._graphFactory.getClient();
    const group = await client.api(`/groups?$filter=displayName eq '${groupName}'`).get() as {value: MicrosoftGraph.Group[]};
    const usersWithId = await Promise.all(users.map(user => client.api(`/users/${user}`).get() as Promise<MicrosoftGraph.User>));
    await Promise.all(usersWithId.map(user => client.api(`/groups/${group.value[0].id}/members/$ref`).post(
      {
        "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${user.id}`      }
    )));
  }


  public async addUsersInBatch(groupName: string, users: string[]): Promise<void> {
    const getRequests = [{
      "id": "group",
      "method": "GET",
      "url": `/groups?$filter=displayName eq '${groupName}'`
    }];

    getRequests.push(...users.map((user, index) => ({
      id: `user-${index}`,
      method: "GET",
      url: `/users/${user}`
    })));


    const client = await this._graphFactory.getClient();
    const results = await client.api(`/$batch`).post({
      requests: getRequests
    });

    const postRequests = [];

    const groupResult = results.responses.filter(result => result.id === "group")[0];
    const groupId = groupResult.body.value[0].id;
    results.responses.forEach(result => {
      if (result.id !== "group") {
        const userId = result.body.id;
        postRequests.push({
          id: `add-${result.id}`,
          method: "POST",
          url: `/groups/${groupId}/members/$ref`,
          body: {
                "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${userId}`
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    });

    await client.api(`/$batch`).post({
      requests: postRequests
    }) as Array<any>;
  }

}
