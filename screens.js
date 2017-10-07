import { Navigation } from 'react-native-navigation';

import Login from './app/Components/Login';
import QuotePage from './app/Components/QuotePage';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('login', () => QuotePage, store, Provider);
}