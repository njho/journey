import {Navigation} from 'react-native-navigation';

// import Login from './app/Components/Login';
import QuotePage from './app/Components/QuotePage';
import NeighborhoodDetected from './app/Components/QuotePage/neighborhoodDetected';
import Neighbors from './app/Components/LoginFlow/Neighbors';
import LocationCommunity from './app/Components/Community/LocationCommunity';
import LocationConfirmation from './app/Components/Community/LocationConfirmation';
import Locations from './app/Components/Community/Locations';
import Streamer from './app/Components/Streamer/TokBox';
import LiveStreams from './app/Components/Streamer/LiveStreams';
import MainActions from './app/Components/Main/MainActions';
import Bump from './app/Components/Bump/Bump'
import PersonalJourneyStart from './app/Components/Main/PersonalJourneyStart';
import BumpConfirmation from './app/Components/Bump/BumpConfirmation';
import UrlShare from './app/Components/Social/UrlShare';
import MyWeb from './app/Components/helpers/MyWeb';
import JourneyView from "./app/Components/Journey/JourneyView";
import Timeline from "./app/Components/Journey/Timeline";
import IndividualTimeline from "./app/Components/Journey/IndividualTimeline";
import LiveStoryView from './app/Components/Journey/LiveStoryView';
import LiveStoryMapView from './app/Components/Journey/MapView/LiveStoryMapView';
import JourneyStart from './app/Components/Journey/JourneyStart/JourneyStart';
import JourneyPicker from './app/Components/Generic/JourneyPicker';



// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('login', () => QuotePage, store, Provider);
    Navigation.registerComponent('neighborhoodDetected', () => NeighborhoodDetected, store, Provider);
    Navigation.registerComponent('neighbors', () => Neighbors, store, Provider);
    Navigation.registerComponent('locationCommunity', () => LocationCommunity, store, Provider);
    Navigation.registerComponent('locationConfirmation', () => LocationConfirmation, store, Provider);
    Navigation.registerComponent('locations', () => Locations, store, Provider);
    Navigation.registerComponent('streamer', () => Streamer, store, Provider);
    Navigation.registerComponent('liveStreams', () => LiveStreams, store, Provider);
    Navigation.registerComponent('mainActions', () => MainActions, store, Provider);
    Navigation.registerComponent('bump', () => Bump, store, Provider);
    Navigation.registerComponent('personalJourneyStart', ()=> PersonalJourneyStart, store, Provider);
    Navigation.registerComponent('bumpConfirmation', ()=> BumpConfirmation, store, Provider)
    Navigation.registerComponent('UrlShare', ()=> UrlShare, store, Provider);
    Navigation.registerComponent('MyWeb', ()=>  MyWeb, store, Provider);
    Navigation.registerComponent('JourneyView', ()=> JourneyView, store, Provider);
    Navigation.registerComponent('Timeline', ()=> Timeline, store, Provider);
    Navigation.registerComponent('IndividualTimeline', ()=> IndividualTimeline, store, Provider);
    Navigation.registerComponent('LiveStoryView', ()=> LiveStoryView, store, Provider);
    Navigation.registerComponent('LiveStoryMapView', ()=> LiveStoryMapView, store, Provider);
    Navigation.registerComponent('JourneyStart', ()=> JourneyStart, store, Provider);
    Navigation.registerComponent('JourneyPicker', ()=> JourneyPicker, store, Provider);


}