import React, { Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  Project, Plan, Test, MyPage, NotFound,
} from './pages';

const Routers = () => (
  <Suspense fallback={<LoadingIndicator />}>
    <Switch>
      <Route exact path={['/', '/project']} component={Project} />
      <Route exact path={['/project/:pId/test/:tId', '/project/:pId/?apply', '/project/:pId/test', '/project/:pId']} component={Test} />
      <Route exact path={['/plan', '/plan/purchase']} component={Plan} />
      <Route exact path={['/my', '/my/profile', '/my/payment']} component={MyPage} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default withRouter(Routers);
