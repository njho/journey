package com.journey;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.app.ActivityOptionsCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.cmcewen.blurview.BlurViewPackage;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.rnopentok.RNOpenTokPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import io.realm.react.RealmReactPackage; // add this import


import io.invertase.firebase.RNFirebasePackage;
//
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // Firebase Firestore
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage


import com.wix.interactable.Interactable;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactPackage;
import com.horcrux.svg.SvgPackage;
import com.transistorsoft.rnbackgroundgeolocation.*;


import com.facebook.CallbackManager;

import com.reactnativenavigation.NavigationApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.soloader.SoLoader;


import java.util.Arrays;
import java.util.List;

import com.journey.WebUrlSingleton;

public class MainApplication extends NavigationApplication /*implements ReactApplication */ {

    WebUrlSingleton pictureSingleton = WebUrlSingleton.get();


    //This is for handling event broadcasts from the pictureJavaModule and associated Service

    private BroadcastReceiver BReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
            //put here whaterver you want your activity to do with the intent received
            Log.d("cameraPackage", "BroadcastReceived");
            pictureSingleton.INVOKE_CALLBACK();
        }
    };


    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    void handleWebsiteShare(Intent intent) {

        String webUrl = intent.getStringExtra(Intent.EXTRA_TEXT);
        if (webUrl != null) {
            Log.i("Balls", webUrl);

            WebUrlSingleton webUrlSingleton = WebUrlSingleton.get();

            webUrlSingleton.setWEB_URL(webUrl);


            // Update UI to reflect text being shared
        }
    }

    ///This overrides the default seen in the NavigationApplication.java

    @Override
    public void startActivity(Intent intent) {

        Log.d("ReactNative", "startActivity");
        String action = intent.getAction();
        String type = intent.getStringExtra("EXTRA_TEXT");

        if (Intent.ACTION_VIEW.equals(action)) {
            handleWebsiteShare(intent); // Handle text being sent

        } else {
            // Handle other intents, such as being started from the home screen
            return;
        }

        String animationType = intent.getStringExtra("animationType");
        if (animationType != null && animationType.equals("fade")) {
            Log.d("ReactNative", "startActivityOUtHere");

            Bundle bundle = ActivityOptionsCompat.makeCustomAnimation(getApplicationContext(),
                    android.R.anim.fade_in,
                    android.R.anim.fade_out
            ).toBundle();
            super.startActivity(intent, bundle);
        } else {
            Log.d("ReactNative", "startActivityinHere");

            super.startActivity(intent);
        }

    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);


        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

            }

            @Override
            public void onActivityStarted(Activity activity) {

            }

            @Override
            public void onActivityResumed(Activity activity) {
                //This is for handling the broadcast receiver
                //APRIL 12 2018. REMOVED IN FAVOR OF USING PICTURE CALLBACK SINGLETON
                //LocalBroadcastManager.getInstance(getApplicationContext()).registerReceiver(BReceiver, new IntentFilter("message"));


            }

            @Override
            public void onActivityPaused(Activity activity) {
                //This is for handling the broadcast receiver
                //LocalBroadcastManager.getInstance(getApplicationContext()).unregisterReceiver(BReceiver);


            }

            @Override
            public void onActivityStopped(Activity activity) {

            }

            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                super.onActivityResult(requestCode, resultCode, data);
                MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
            }

            @Override
            public void onActivityDestroyed(Activity activity) {

            }
        });
    }


    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

/*  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RealmReactPackage(),
            new RNGestureHandlerPackage(),
            new BlurViewPackage(),
            new RNDeviceInfo(),
            new ImageResizerPackage(),
            new RNBackgroundGeolocation(),
            new NfcReactNativePackage(),
            new NfcReactNativePackage(),
            new RNOpenTokPackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNFirebasePackage(),
            new Interactable(),
            new LottiePackage(),
            new FBSDKPackage(mCallbackManager)
      );
    }
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
=======
>>>>>>> theirs

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
<<<<<<< ours
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  };
>>>>>>> theirs


  };*/
/*
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }*/
/*
  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());

    SoLoader.init(this, *//* native exopackage *//* false);
  }*/

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
/*
            new MainReactPackage(),
*/
                new LottiePackage(),
                new FBSDKPackage(mCallbackManager),
                new LinearGradientPackage(),
                new Interactable(), // Add this line
                // Add these packages as appropriate
                new RNFirebasePackage(),
                new RNFirebaseAuthPackage(),
                new RNFirebaseDatabasePackage(),
                new RNFirebaseFirestorePackage(),
                new RNFirebaseMessagingPackage(),
                new RNFirebaseStoragePackage(),
                new MapsPackage(),
                new RNOpenTokPackage(),
                new SvgPackage(),
                new RNBackgroundGeolocation(),
                new RNDeviceInfo(),
                new BlurViewPackage(),
                new RNGestureHandlerPackage(),
                new RealmReactPackage(),

                //Custom Packages
                new WebUrlPackage(),
                new PicturePackage(),
                new VideoPackage()


        );
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }


}
