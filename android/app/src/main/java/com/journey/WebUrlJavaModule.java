package com.journey;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by machinatron on 2017-11-28.
 */

public class WebUrlJavaModule extends ReactContextBaseJavaModule {

    WebUrlSingleton webUrlSingleton = WebUrlSingleton.get();


    public WebUrlJavaModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WebUrl";
    }

    @ReactMethod
    public void getUrl(Callback callback) {
        Log.i("Balls", "getUrl called");
        String url = webUrlSingleton.getWEB_URL();

        callback.invoke(url);
    }

}
