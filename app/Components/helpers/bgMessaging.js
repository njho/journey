import BackgroundGeolocation from "react-native-background-geolocation";

const TRACKER_HOST_TWO = 'https://us-central1-journeyapp91.cloudfunctions.net/graphql/locationUpdate';

export default async (RemoteMessage) => {
    // handle your message
    console.log('You have Received a remote Message');
    console.log(RemoteMessage);

    BackgroundGeolocation.configure({
            disableElasticity: true,
            distanceFilter: 10,
            stopOnTerminate: false,
            enableHeadless: true,
            heartbeatInterval: 60,
            startOnBoot: true,
            foregroundService: true,
            url: TRACKER_HOST_TWO,
            extras: {
                journey_id: 'test_journey'
            },
            autoSync: true,
            debug:
                true,
            logLevel:
            BackgroundGeolocation.LOG_LEVEL_VERBOSE
        },
        (state) => {
            console.log('Background Geolocation configured');
            console.log('Starting Background Geolocation');
            BackgroundGeolocation.start();
        })


    return Promise.resolve();
}