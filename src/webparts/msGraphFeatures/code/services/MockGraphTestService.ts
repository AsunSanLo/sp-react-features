import { IGraphTestService } from "./IGraphTestService";

export class MockGraphTestService implements IGraphTestService {

  public addUsers(group: string, users: string[]): Promise<void> {
    return Promise.resolve();
  }
  public addUsersInBatch(group: string, users: string[]): Promise<void> {
    return Promise.resolve();
  }
  public deleteUsers(group: string, users: string[]): Promise<void> {
    return Promise.resolve();
  }
}
