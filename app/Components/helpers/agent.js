import React from 'react';
import firebase from 'react-native-firebase';
import GeoFire from 'geofire';

import realm from './realm';


/*import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';*/

/*
import history from './history';
*/
/*import flattener from './jsonFlattener';
import aggregator from './aggregator';*/

// Firebase.initializeApp({
//     apiKey: "AIzaSyCTZX0lG1JyIBUphH7m5SDoPCpRamPNm24",
//     authDomain: "journeyapp91.firebaseapp.com",
//     databaseURL: "https://journeyapp91.firebaseio.com",
//     projectId: "journeyapp91",
//     storageBucket: "journeyapp91.appspot.com",
//     messagingSenderId: "515548202082"
// });
//
// var authService = Firebase.auth();
// var database = Firebase.database();

let token = null;

const database = firebase.database();
const storage = firebase.storage();
const geoFireRef = new GeoFire(database.ref('geoFireCommunities'));


const locationService = {
    addCommunity: (value) => {
        var key = database.ref('communities/').push().key;

        database.ref('communities/' + key).set(value).then(function () {

                geoFireRef.set(key, [value.region.latitude, value.region.longitude]).then(function () {
                    console.log("Provided key has been added to GeoFire");
                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        )


    },
    queryCommunities: (latitude, longitude) => {
        return dispatch => {
            var geoQuery = geoFireRef.query({
                center: [latitude, longitude],
                radius: 0.5
            });
            geoQuery.on("ready", function (key, location, distance) {
                onKeyEnteredRegistration.cancel();

            });

            var onKeyEnteredRegistration = geoQuery.on("key_entered", function (key, location, distance) {
                console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            });

            dispatch({type: 'COMMUNITIES_DETECTED', communities: geoQuery});
        }

    },
    two: (id) => {
        return dispatch => {
            var linkWatcher = database.ref('api/v1/responses/' + id);
            linkWatcher.on('value', function (snapshot) {

                if (snapshot.val()) {
                }
                dispatch({type: 'LINK', link: 'https://gifty.link/' + id});
            });
            linkWatcher.off();
        }
    },
}

/*
 const requests = {
 del: url =>
 superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
 get: url =>
 superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
 post: (url, body) =>
 superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
 put: (url, body) =>
 superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
 };
 */

const query = `
 { createSession(journey_id: "asdfaf", journey_name: "asdf", user_id: "Jacob", user_name: "jinglehimer", journey_description: "This is the description") {
    token
    session_id}}
`


const Streamer = {
    generateToken: (sessionId) => {
        console.log('this is the sessionID: ' + sessionId)
        const query = `{ requestToken(session_id: "${sessionId}", user_id: "Jason Ho", journey_id: "1238apsfnp98", name: "Jason Ho" ) }`
        return fetch('https://us-central1-journeyapp91.cloudfunctions.net/graphql/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query})
        })
    },
    createSession: () => {
        return fetch('https://us-central1-journeyapp91.cloudfunctions.net/graphql/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query})
        }).then((response => console.log(response)))
    },
    fetchJourneysList: () => {
        return database.ref('streaming_journeys/').limitToLast(10).once('value');
    }
}

const Auth = {
    current: () => {
        return new Promise(function (resolve, reject) {
            authService.onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {
                    /*
                                         history.push('/');
                    */
                    reject('There was an error bish');
                }
            })
        })
    },
    login: (email, password) => {
        return authService.signInWithEmailAndPassword(email, password);
    },
    register: (email, password) => {
        return authService.createUserWithEmailAndPassword(email, password);
    },
    assignConsole: (uid) => {
        return database.ref('users/' + uid).push();
    },
    lookupConsole: (uid) => {
        return database.ref('users/' + uid).once('value');
    },
    lookupConsole2: (uid) => {
        return dispatch => {
            var consoleWatch = database.ref('users/' + uid);
            consoleWatch.on('value', function (snapshot) {
                /*
                 console.log(snapshot.val());
                 */

                dispatch(FirebaseQuery.fetchConsole(snapshot.val()))
            });
        }
    },
    logout: () => {
        authService.signOut();
    }
};


const FirebaseWatcher = {
    links: (id) => {
        return dispatch => {
            var linkWatcher = database.ref('api/v1/responses/' + id);
            linkWatcher.on('value', function (snapshot) {

                if (snapshot.val()) {
                }
                dispatch({type: 'LINK', link: 'https://gifty.link/' + id});
            });
            linkWatcher.off();
        }
    },
    chartDataWatcher: (campaign) => {
        return database.ref('stats/stats_by_campaign/' + campaign)
    },
    campaignWatcher: (console_id) => {
        return database.ref('consoles/' + console_id + '/campaigns')
    }

}

const FirebaseQuery = {
    fetchQuote: () => {
        return dispatch => {
            console.log('FETCH_QUOTE');
            database.ref('quotes/uid1').once('value', (snapshot) => {

                console.log(snapshot.val());
                console.log('inside snaphsot');
                dispatch({
                    type: 'QUOTE_UPDATE',
                    quoteMeta: snapshot.val()
                })

                return (snapshot.val());
            });

        }
    },
    uploadImage: (journey, uuid) => {
        let metadata = {
            contentType: 'image/jpeg',
            customMetadata: {
                uid: uuid
            }
        };

        console.log('upload image called');
        console.log('file:////storage/emulated/0/Pictures/' + journey + '/' + uuid + '.jpg');
        storage.ref(journey + '/' + uuid + '.jpg')
            .putFile('file:////storage/emulated/0/Pictures/' + journey + '/' + uuid + '.jpg', metadata)
            .then(uploadedFile => {
                console.log('uploaded file')
                console.log(uploadedFile);
                //success
            })
            .catch(err => {
                console.log('there was an error');
                console.log(err)
                //Error
            });
    },
    updateGifty: (key1, dashboard, editGifty) => {
        return dispatch => {
            var Gifty = database.ref('consoles/' + dashboard + '/giftys/' + key1);
            Gifty.set(editGifty);
            Gifty.off();
            dispatch({
                type: 'MODAL_TOGGLE',
                value: 'close'
            })
        }
    },
    updateTransactionInfo: (id, gift, startDate, endDate) => {
        return dispatch => {

            /*If there is no gift, then grab all transaction History*/
            if (gift === 'all') {
                database.ref('transactions/' + id).orderByChild("timestamp").startAt(startDate.unix()).endAt(endDate.unix()).once("value", function (snapshot) {
                    if (snapshot.val() === null) {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: {}
                        });
                    } else {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: snapshot.val()
                        });
                    }
                })
            } else {
                database.ref('transactions/' + id).limitToLast(50).orderByChild("timestamp").startAt(startDate.unix()).endAt(endDate.unix()).once("value", function (snapshot) {
                    if (snapshot.val() === null) {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: {}
                        });
                    } else {
                        dispatch({
                            type: 'UPDATE_TRANSACTIONS',
                            transactions: snapshot.val()
                        });
                    }

                })
            }
        }
    },

    requestData: (searchTerm, campaign) => {
        return dispatch => {

            let newTerm = "*" + searchTerm + "*";
            let key = database.ref().child('search/request').push({
                index: 'firebase',
                type: 'offers',
                q: newTerm
            }).key;

            var searchResult = {};
            if (searchTerm === '') {
                dispatch({
                    type: 'CAMPAIGN_SEARCH',
                    key: key,
                    searchResult: {}
                })
            } else {

                database.ref('search/response/' + key + '/hits').on('value',
                    function (snapshot) {
                        if (snapshot.val()) {
                            searchResult = snapshot.val();

                            dispatch({
                                type: 'CAMPAIGN_SEARCH',
                                key: key,
                                campaign: campaign,
                                searchResult: searchResult.hits
                            })
                        }

                    });
            }
        }


    },
    consoleEndpoint: (key, type, dashboard, endpoint, bundle) => {
        /*       return dispatch=> {*/
        var newPostRef = database.ref('api/v1/requests').push();
        var id = newPostRef.key;
        var json = {};
        switch (type) {
            case 'create_console':
                json = {
                    type: type,
                    bundle: bundle
                }
                console.log(json);
                break;
            case 'link_create':
                json = {
                    console_id: dashboard,
                    vendor: 'gravity_yyc',
                    type: type,
                    wait_for_response_at: id,
                    offer: key
                };
                break;
            case 'create_campaign':
                json = {
                    console_id: dashboard,
                    type: type,
                    wait_for_response_at: id,
                    bundle: bundle
                };
                console.log(json);
                break;
            case 'remove_user':
                json = {
                    console_id: dashboard,
                    type: type,
                    wait_for_response_at: id,
                    name: bundle
                }
                break;
            case 'assign_default':
                json = {
                    console_id: dashboard,
                    type: type,
                    wait_for_response_at: endpoint,
                    name: bundle
                }
                break;
        }
        newPostRef.set(json
        )/*.then(FirebaseWatcher.links(id))*/.then(
            /*
             database.ref('api/v1/responses/' + id).set({gifty: key, link: id})
             */
        ).then(
            /*   //This is only for the purposes of being able to mock and fake data
             database.ref('stats/stats_by_campaign/-KmMclctWZDKexyM_9Xo/' + moment().unix()).set({
             created: 1,
             new: Math.floor(Math.random() * 2),
             redeemed: Math.floor(Math.random() * 2),
             gross: Math.round(Math.random() * 2 *100)/100
         })*/
        );
        switch (type) {
            case 'link_create': {
                var linkWatcher = database.ref('api/v1/responses/' + dashboard + '/' + id);
                linkWatcher.on('value', function (snapshot) {
                    if (snapshot.val()) {
                        /*
                                                    dispatch({type: 'LINK', link: 'https://gifty.link/' + snapshot.val().link, key: key});
                                                    */
                    }
                });
            }
        }
        /*        }*/
    }
}


export default {
    Auth,
    FirebaseQuery,
    FirebaseWatcher,
    locationService,
    Streamer

    // authService
};
