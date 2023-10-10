import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../Metric';

interface QuickCardProps {
  image: string;
  subTitle: string;
  onPress: () => void;
  url?: string;
  title:string;
}

const QuickCard = ({image, subTitle, onPress, url,title}: QuickCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{width: verticalScale(70), marginLeft: 10}}>
      <View style={styles.imageContainer}>{image}</View>
      <Text style={styles.text}>{subTitle}</Text>
      <Text style={[styles.text,{color:'orange',width:verticalScale(70)}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default QuickCard;

const styles = StyleSheet.create({
  //   card: {
  //     marginTop: HP(1),
  //     marginBottom: HP(3),
  //     marginHorizontal: WP(2),
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     flexWrap: 'wrap',
  //   },
  text: {
    fontWeight: 'bold',
    paddingTop: 2,
    color: 'black',
    fontSize: verticalScale(13),
    textAlign: 'center',
  },
  imageContainer: {
    marginVertical: 10,
  },
});
