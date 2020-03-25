import * as React from 'react';
import styles from './SpReactFeatures.module.scss';
import { ISpReactFeaturesProps } from './ISpReactFeaturesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {  Route, Link, HashRouter } from "react-router-dom";
import { SuspenseExample } from "./SuspenseExample/SuspenseExample";
import { ContextExample } from "./ContextExample/ContextExample";
import { Separator } from 'office-ui-fabric-react';

export default class SpReactFeatures extends React.Component<ISpReactFeaturesProps, {}> {
  public render(): React.ReactElement<ISpReactFeaturesProps> {
    return (
      <div className={styles.spReactFeatures}>

        <HashRouter>
        <p>Here is the site to try and test the different interesting features of React:</p>
          <ul>
            <li><Link to='/nestedRoutes'>Nested routes: level 1</Link></li>
            <li><Link to='/nestedRoutes/level2'>Nested routes: level 2</Link></li>
            <li><Link to='/suspense'>Suspense</Link></li>
            <li><Link to='/context'>Context</Link></li>
            <li>Custom Hooks</li>
            <li>Use Ref</li>
            <li>Use Imperative Handler</li>
          </ul>
          <Separator />
          <Route path="/nestedRoutes"><h2>With router you can nest components and top levels will show up. This is level 1</h2></Route>
          <Route path="/nestedRoutes/level2"><h3>This is level 2</h3></Route>
          <Route exact path="/suspense"><SuspenseExample /></Route>
          <Route exact path="/context"><ContextExample currentUser={this.props.currentUser} /></Route>
        </HashRouter>
      </div>
    );
  }
}
