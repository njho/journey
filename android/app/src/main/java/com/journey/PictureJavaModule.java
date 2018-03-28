package com.journey;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by machinatron on 2017-11-28.
 */

public class PictureJavaModule extends ReactContextBaseJavaModule {

    WebUrlSingleton pictureSingleton = WebUrlSingleton.get();


    public PictureJavaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "picturePackage";
    }

    @ReactMethod
    public void takePicture(String journeyId, String fileName, Callback callback) {
        Intent i = ExampleService.newIntent(getReactApplicationContext());
        i.putExtra("JOURNEY_ID", journeyId);
        i.putExtra("FILENAME", fileName);

        pictureSingleton.SET_CALLBACK(callback);
        getReactApplicationContext().startService(i);
        Log.i("cameraPackage", "picture Module called");

    }

}
