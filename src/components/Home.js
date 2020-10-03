import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../styles/FormStyles'

export default Home = (props) => {
    console.log(props.authState, "Hello");
    if(props.authState === "signedIn") return (
        <View>
          <Text>Home</Text>
          <TouchableOpacity 
              style={styles.done}
              onPress = {() => props.onStateChange('signIn')}>
              <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      );
      else return null
}