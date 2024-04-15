import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415FA6',
  },
  topHalf: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHalf: {
    flex: 1.3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  tableContainer: {
      flex: 1,
      marginTop:20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    height: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#555',
  },
});
