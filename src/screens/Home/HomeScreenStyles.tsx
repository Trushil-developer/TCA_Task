import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415FA6',
    padding: 10,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 20,
  },
  txtSearchField: {
    height: 40,
    borderWidth: 1,
    borderColor: '#F7CD46',
    textAlign: 'center',
    width: 300,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#fff',
  },
});
