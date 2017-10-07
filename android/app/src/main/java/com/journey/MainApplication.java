package com.journey;

import android.app.Application;
import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.wix.interactable.Interactable;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication /*implements ReactApplication */{

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

/*  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }*/

/*  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new Interactable(),
            new LottiePackage(),
            new FBSDKPackage(mCallbackManager)
      );
    }


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
            new FBSDKPackage(mCallbackManager)
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }


}
