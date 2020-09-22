import React, { Component } from 'react';
import { View, Text, ToastAndroid, AsyncStorage, } from 'react-native';
import BackgroundJob from 'react-native-background-job';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';


const everRunningJobKey = "everRunningJobKey";

BackgroundJob.register({
  jobKey: everRunningJobKey,
  job: () => {
    console.log(`Ever Running Job fired! Key=${everRunningJobKey}`);
    ToastAndroid.show('hello', 3000);
    // setInterval(() => {
    //   console.log(`Ever Running Job fired! Key=${everRunningJobKey}`);
    //   ToastAndroid.show('hello', 3000);
    // }, 4000);
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // this.backgroundRunApp();
  }

  disable_battery_optimizations() {
    RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then((isEnabled) => {
      if (isEnabled) {
        RNDisableBatteryOptimizationsAndroid.enableBackgroundServicesDialogue();
      }
    });
  }

  backgroundRunApp() {
    BackgroundJob.isAppIgnoringBatteryOptimization(
      (error, ignoringOptimization) => {
        if (ignoringOptimization === true) {
          BackgroundJob.schedule({
            jobKey: everRunningJobKey,
            period: 10,
            exact: true,
            // allowWhileIdle: true,
            allowExecutionInForeground: true
          });
        } else {
          console.log("To ensure app functions properly,please manually remove app from battery optimization menu.");
          this.disable_battery_optimizations()
        }
      }
    );
  }

  render() {
    return (
      <View>
        <Text> App </Text>
      </View>
    );
  }
}
