package com.journey;

import android.util.Log;
import com.facebook.react.bridge.Callback;

/**
 * Created by machinatron on 2017-11-29.
 */

public class WebUrlSingleton {

    private static WebUrlSingleton sWebUrlSingleton;

    private String WEB_URL;

    private Callback callbackRef;

    public static WebUrlSingleton get() {
        if (sWebUrlSingleton == null) {
            sWebUrlSingleton = new WebUrlSingleton();
        }
        return sWebUrlSingleton;
    }

    public void setWEB_URL(String url) {
        Log.i("Balls", "setWebURL called");

        WEB_URL = url;
    };

    public String getWEB_URL() {
        Log.i("Balls", "getUrl called");

        return WEB_URL;
    };


    public void SET_CALLBACK (Callback callback) {
        Log.i("cameraPackage", "callback set");
        callbackRef = callback;
    }

    public void INVOKE_CALLBACK () {
        Log.i("cameraPackage", "callback invoked");

        callbackRef.invoke();

    }

}
