import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../screens/Home/HomeScreenStyles';

const Pagination = ({ onNextPage, onPrevPage}) => {

  console.log("onNextPage",onNextPage,onPrevPage)
  return (
    <View style={styles.paginationContainer}>
      {onPrevPage && (
        <TouchableOpacity onPress={onPrevPage} style={[styles.paginationButton, styles.paginationButtonLeft]}>
          <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>
      )}

      {onNextPage && (
        <TouchableOpacity onPress={onNextPage}  style={[styles.paginationButton, styles.paginationButtonRight]}>
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Pagination;
