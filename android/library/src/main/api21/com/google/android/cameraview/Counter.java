package com.google.android.cameraview;

/**
 * Created by machinatron on 2018-03-03.
 */

public class Counter {
    private static int mCounter = 0;

    public void updateCounter() {
        mCounter++;
    }

    ;

    public Integer getCounter() {
        return mCounter;
    }

    public void resetCounter() {
        mCounter = 0;
    }

}
