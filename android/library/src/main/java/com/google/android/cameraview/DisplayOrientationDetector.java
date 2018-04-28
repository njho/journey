/*
 * Copyright (C) 2016 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.android.cameraview;

import android.content.Context;
import android.util.Log;
import android.util.SparseIntArray;
import android.view.Display;
import android.view.OrientationEventListener;
import android.view.Surface;
import android.view.WindowManager;


/**
 * Monitors the value returned from {@link Display#getRotation()}.
 */
abstract class DisplayOrientationDetector {

    private final OrientationEventListener mOrientationEventListener;

    /**
     * Mapping from Surface.Rotation_n to degrees.
     */
    static final SparseIntArray DISPLAY_ORIENTATIONS = new SparseIntArray();

    static {
        DISPLAY_ORIENTATIONS.put(Surface.ROTATION_0, 0);
        DISPLAY_ORIENTATIONS.put(Surface.ROTATION_90, 90);
        DISPLAY_ORIENTATIONS.put(Surface.ROTATION_180, 180);
        DISPLAY_ORIENTATIONS.put(Surface.ROTATION_270, 270);
    }

    Display mDisplay;

    private int mLastKnownDisplayOrientation = 0;

    public DisplayOrientationDetector(Context context) {

        Log.d("CameraPackage", "DisplayOrientationDetector Initialized");

        final Context mContext = context;


        mOrientationEventListener = new OrientationEventListener(context) {
            /** This is either Surface.Rotation_0, _90, _180, _270, or -1 (invalid). */
            private int mLastKnownRotation = -1;

            @Override
            public void onOrientationChanged(int orientation) {
                Log.d("CameraPackage", "DisplayOrientationDetector.java: Orientation Changed callback: " + Integer.toString(orientation));
                if (orientation == OrientationEventListener.ORIENTATION_UNKNOWN) {
//                    || mDisplay == null;
                    return;
                }

                //  REMOVED APRIL 12, 2018 in Favor of Using get Resource
                //  These lines added to for service hack on getting display parameters ================>
                //  WindowManager window = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
                //  Display mDisplay = window.getDefaultDisplay();
                //  final int rotation = mDisplay.getRotation();
                //  Log.d("CameraPackage", "mDisplay.getRotation() : " + Integer.toString(rotation));
                //   ====================================================================================>


                //APRIL 12, 2018. THE DEVICE ORIENTATION AND THE DISPLAY ORIENTATION ARE OPPOSITE INTEGERS
                int rotation = 0;
                if (orientation >= 0 && orientation <= 45) {
                    rotation = 0;
                } else if (orientation > 45 && orientation <= 135) {
                    rotation = 3;
                } else if (orientation > 225 && orientation <= 315) {
                    rotation = 1;
                } else if (orientation > 315 && orientation <= 360) {
                    rotation = 0;
                }

                Log.d("CameraPackage", "mContext.getResource()" + rotation);

                if (mLastKnownRotation != rotation) {
                    mLastKnownRotation = rotation;
                    dispatchOnDisplayOrientationChanged(DISPLAY_ORIENTATIONS.get(rotation));
                }
            }
        };
    }

    public void enable() {//Display display removed
//        mDisplay = display;
        mOrientationEventListener.enable();
        // Immediately dispatch the first callback
//        dispatchOnDisplayOrientationChanged(DISPLAY_ORIENTATIONS.get(display.getRotation()));
    }

    public void disable() {
        mOrientationEventListener.disable();
        mDisplay = null;
    }

    public int getLastKnownDisplayOrientation() {
        return mLastKnownDisplayOrientation;
    }

    void dispatchOnDisplayOrientationChanged(int displayOrientation) {
        Log.d("CameraPackage", "DOGACAT");

        Log.d("CameraPackage", Integer.toString(displayOrientation));
        mLastKnownDisplayOrientation = displayOrientation;
        onDisplayOrientationChanged(displayOrientation);
    }

    /**
     * Called when display orientation is changed.
     *
     * @param displayOrientation One of 0, 90, 180, and 270.
     */
    public abstract void onDisplayOrientationChanged(int displayOrientation);

}
