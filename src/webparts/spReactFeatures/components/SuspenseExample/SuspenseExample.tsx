import * as React from 'react';
import { Suspense } from 'react';
import { Spinner  } from "office-ui-fabric-react/lib/Spinner";
const DataComponent = React.lazy(() => import('./DataComponent/DataComponent'));

export const SuspenseExample = () => {

  return <Suspense fallback={() => <Spinner />}>
      <DataComponent />
    </Suspense>;
}
