package com.journey;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.provider.MediaStore;
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

 interface VideoCompleteListener {

    void captureCompleted();
    void setFile(File file);
}


public class VideoService extends IntentService implements VideoCompleteListener {

    private static final String TAG = "VIDEOPACKAGE";

    private Camera2Video mCamera2Video;

    private String mFilename;
    private String mJourneyId;
    private File mFilePath;

    private Context mContext;

    public static Intent newIntent(Context context) {
        Toast.makeText(context, "service starting", Toast.LENGTH_SHORT).show();
        return new Intent(context, VideoService.class);
    }

    public VideoService() {
        super(TAG);
    }

    @Override
    public void captureCompleted() {
        Log.d(TAG, "captureCompleted() is called");

//        sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,Uri.fromFile(mFilePath)));
//        MediaScannerConnection.scanFile(mContext, new String[] { mFilePath.getAbsolutePath() }, null, new MediaScannerConnection.OnScanCompletedListener() {
//            public void onScanCompleted(String path, Uri uri) {
//                Log.i(TAG, "Scanned " + path + ":");
//                Log.i(TAG, "-> uri=" + uri);
//            }
//        });
        stopSelf();
    }

    @Override
    public void setFile(File file) {
        mFilePath = file;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate Service");

    }
    @Override
    protected void onHandleIntent(Intent intent) {
        Log.d(TAG, "This has started");
//        Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        mJourneyId = intent.getStringExtra("JOURNEY_ID");
        mFilename = intent.getStringExtra("FILENAME");
        mContext = getApplicationContext();

        //No callbacks like in ExampleService for PhotoCapture, therefore pass all information into the constructor.

        Log.d(TAG, mJourneyId);
        Log.d(TAG, mFilename);
        mCamera2Video = new Camera2Video(this, mJourneyId, mFilename);
        //mCamera2Video.newInstance(this);
        mCamera2Video.startBackgroundThread();
        mCamera2Video.openCamera(1, 1);

        Log.d(TAG, "This has started");
        Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show();
        return START_STICKY;

    }



    @Override
    public void onDestroy() {
        Log.d(TAG, "intent Destroyed");

//        mCameraView.stop();
//
//        if (mBackgroundHandler != null) {
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
//                mBackgroundHandler.getLooper().quitSafely();
//            } else {
//                mBackgroundHandler.getLooper().quit();
//            }
//            mBackgroundHandler = null;
//        }

        //Reset the string as the Strings may retain their value in memory
        mFilename = "";
        mJourneyId = "";

        WebUrlSingleton mVideoSingleton = WebUrlSingleton.get();
        mVideoSingleton.INVOKE_VIDEO_CALLBCK();

    }
}
