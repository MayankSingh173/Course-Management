import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { 
  Authenticator,
} from 'aws-amplify-react-native';

import ConfirmSignUp from './src/components/ConfirmSignUp';
import SignUp from './src/components/SignUp';
import SignIn from './src/components/SignIn';
import ForgotPassword from './src/components/ForgotPassword';
import ChangePassword from './src/components/ChangePassword';
import Home from './src/components/Home';

console.disableYellowBox=true;

Amplify.configure(awsconfig);

// function Test(props){
//   console.log(props.authState);
//   return null;
// }

export default function App() {
  return (
    <View style={Appstyles.container}>
      <Authenticator 
        usernameAttributes="email" 
        hideDefault={true}>
          {/* <Test /> */}
          <Home/>
          <SignUp/>
          <SignIn/>
          <ConfirmSignUp/>
          <ForgotPassword/>
          <ChangePassword/>
      </Authenticator>
    </View>
  );
}

const Appstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
