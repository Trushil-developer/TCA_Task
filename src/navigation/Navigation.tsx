import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import DetailScreen from '../screens/Detail/DetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

type HeaderTitleProps = {
  children: String;
};


const Navigation = () => {
  const headerTitleComponent = ({ children }: HeaderTitleProps) => (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>{children}</Text>
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: styles.header }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitleAlign: 'left', headerTitle: headerTitleComponent}}/>
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F7CD46',
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navigation;
