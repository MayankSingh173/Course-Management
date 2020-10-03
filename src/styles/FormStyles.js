import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        width: windowWidth,
        padding:20
    },
    inputView: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 30,
        width: windowWidth-50,
        marginTop: 10
    },
    inputStyle: {
        height: 50,
        marginLeft: 10,
        marginRight: 50
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        color: '#20B2AA'
    },
    label: {
        marginTop:5,
        marginLeft: 5,
        fontSize: 15,
        fontWeight: '700'
    },
    buttonsView: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    textStyle: {
        color: '#20B2AA', 
        fontSize: 15, 
        fontWeight: '200',
    },
    done: {
        backgroundColor: '#20B2AA',
        height: 40,
        justifyContent: 'center',
        borderRadius: 30,
        width: windowWidth-50,
        alignSelf: 'center',
        marginTop: 5
    },
    iconSize: {
        alignSelf: 'center',
        marginLeft: 15
    },
    error: {
        color: 'red',
        marginLeft: 8
    }
});