export interface IGraphTestService {
  deleteUsers(group: string, users: string[]): Promise<void>;
  addUsers(group: string, users: string[]): Promise<void>;
  addUsersInBatch(group: string, users: string[]): Promise<void>;
}
