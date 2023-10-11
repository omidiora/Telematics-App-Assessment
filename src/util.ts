import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export const BODY_IMAGE = {
  card: require('./images/Home_card.png'),
};

export const NofifySuccess = (title: string, description: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: title,
    textBody: description,
  });
};


