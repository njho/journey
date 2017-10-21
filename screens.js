import { Navigation } from 'react-native-navigation';

import Login from './app/Components/Login';
import QuotePage from './app/Components/QuotePage';
import NeighborhoodDetected from './app/Components/QuotePage/neighborhoodDetected';
import Neighbors from './app/Components/LoginFlow/Neighbors';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('login', () => QuotePage, store, Provider);
    Navigation.registerComponent('neighborhoodDetected', () => NeighborhoodDetected, store, Provider);
    Navigation.registerComponent('neighbors', () => Neighbors, store, Provider);

}