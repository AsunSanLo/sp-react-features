import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { MockGraphTestService } from "./services/MockGraphTestService";
import { GraphTestService } from "./services/GraphTestService";
import { IGraphTestService } from "./services/IGraphTestService";

type AppMode = "Local" | "Cloud";

type ServicesContainer = {
  [serviceName: string]: {
    "Local": new (serviceScope: ServiceScope) => any,
    "Cloud": new (serviceScope: ServiceScope) => any
  }
};

const _container: ServicesContainer = {
  IGraphTestService: {
    "Local": MockGraphTestService,
    "Cloud": GraphTestService
  }
};

declare interface IServiceKeys {
  IGraphTestService?: ServiceKey<IGraphTestService>;
}

export const serviceKeys: IServiceKeys = {};

export const configureServices = (appMode: AppMode) => {
  for(let serviceName in _container) {
    serviceKeys[serviceName] = ServiceKey.create(serviceName, _container[serviceName][appMode]);
  }
};
