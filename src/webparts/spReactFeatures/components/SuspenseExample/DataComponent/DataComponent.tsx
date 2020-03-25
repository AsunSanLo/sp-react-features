import * as React from 'react';
import { fetchData, IItem } from './mock/mockDataHelper';
import { Spinner } from 'office-ui-fabric-react/lib/components/Spinner';


const DataComponent = () => {

  const [items, setItems] = React.useState<IItem[]>(null);
  React.useEffect(() => {
    fetchData().then(data => setItems(data));
  }, []);

  return <div>
    <p>Hi there! I'm a lazy loaded component with mock data </p>
    {!items && <Spinner />}
    {items && <ul>
      {items.map((item, index) => <li key={index}>{item.name} - {item.goal}</li>)}
    </ul>}
  </div>;
}

export default DataComponent;
