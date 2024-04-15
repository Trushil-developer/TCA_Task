import React from 'react';
import { View, Text } from 'react-native';
import styles from '../screens/Detail/DetailScreenStyles';

type DetailRowProps = {
  label: string;
  value: string | number;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default DetailRow;
