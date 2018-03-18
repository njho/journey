package com.journey;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;
import android.widget.Toast;

import com.google.android.cameraview.CameraView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by Machinatron on 2017-07-14.
 */

public class ExampleService extends IntentService {


    private CameraView mCameraView;
    private Handler mBackgroundHandler;

    private static final String TAG = "CAMERAPACKAGE";

    public static Intent newIntent(Context context) {
        return new Intent(context, ExampleService.class);
    }

    public ExampleService() {
        super(TAG);
    }

    @Override
    protected void onHandleIntent(Intent intent) {

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "This has started");
        Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show();
        mCameraView.start();
        return START_STICKY;
    }

    private CameraView.Callback mCallback
            = new CameraView.Callback() {

        @Override
        public void onCameraOpened(CameraView cameraView) {
            Log.d(TAG, "onCameraOpened");
        }

        @Override
        public void onCameraClosed(CameraView cameraView) {
            Log.d(TAG, "onCameraClosed");
        }

        @Override
        public void onPictureTaken(CameraView cameraView, final byte[] data) {
            Log.d(TAG, "onPictureTaken " + data.length);
            Toast.makeText(getApplicationContext(), R.string.picture_taken, Toast.LENGTH_SHORT)
                    .show();
            getBackgroundHandler().post(new Runnable() {
                @Override
                public void run() {

                    Log.d(TAG, "in the run cycle");
                    File file = new File(getExternalFilesDir(Environment.DIRECTORY_PICTURES),
                            "picture.jpg");

                    Log.d(TAG, file.getPath());
                    Log.d(TAG, file.getAbsolutePath());


                    OutputStream os = null;
                    try {
                        os = new FileOutputStream(file);
                        os.write(data);
                        os.close();
                    } catch (IOException e) {
                        Log.w(TAG, "Cannot write to " + file, e);
                    } finally {
                        if (os != null) {
                            try {
                                os.close();
                            } catch (IOException e) {
                                // Ignore
                            }
                        }
                    }
                }
            });
        }

    };

    private Handler getBackgroundHandler() {
        if (mBackgroundHandler == null) {
            HandlerThread thread = new HandlerThread("background");
            thread.start();
            mBackgroundHandler = new Handler(thread.getLooper());
        }
        return mBackgroundHandler;
    }

    @Override
    public void onCreate() {

        mCameraView = new CameraView(getApplicationContext());
        if (mCameraView != null) {
            Log.d("MainActivity", "Adding Callbacks");
            mCameraView.addCallback(mCallback);
        }
    }

    @Override
    public void onDestroy() {
        mCameraView.stop();
        if (mBackgroundHandler != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
                mBackgroundHandler.getLooper().quitSafely();
            } else {
                mBackgroundHandler.getLooper().quit();
            }
            mBackgroundHandler = null;
        }

    }
}
