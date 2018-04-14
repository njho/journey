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

public class VideoJavaModule extends ReactContextBaseJavaModule {

    WebUrlSingleton mVideoSingleton = WebUrlSingleton.get();


    public VideoJavaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "videoPackage";
    }

    @ReactMethod
    public void takeVideo(String journeyId, String fileName, Callback callback) {
        Intent i = VideoService.newIntent(getReactApplicationContext());
        i.putExtra("JOURNEY_ID", journeyId);
        i.putExtra("FILENAME", fileName);

        mVideoSingleton.SET_VIDEO_CALLBACK(callback);
        getReactApplicationContext().startService(i);
        Log.i("videoPackage", "videoPackage Module called //VideoJavaModule.java");

    }
}
