import { lazy } from 'react';

export const Project = lazy(() => import('./Project'));
export const Plan = lazy(() => import('./Plan'));
export const Test = lazy(() => import('./Test'));
export const MyPage = lazy(() => import('./MyPage'));
export const Temp = lazy(() => import('./Temp'));

// export { default as Project } from './Project';
// export { default as Plan } from './Plan';
