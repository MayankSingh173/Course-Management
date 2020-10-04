import { Auth } from 'aws-amplify';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../styles/FormStyles'

export default Home = (props) => {
    if(props.authState === "signedIn") return (
        <View>
          <Text>Home</Text>
          <TouchableOpacity 
              style={styles.done}
              onPress = {() => Auth.signOut()}>
              <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Log Out</Text>
          </TouchableOpacity>
        </View>
      );
      else return null
}