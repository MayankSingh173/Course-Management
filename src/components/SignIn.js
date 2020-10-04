import React, {useState} from 'react';
import { 
    View,
    Text, 
    TextInput, 
    TouchableOpacity,
     Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {validateEmail, validatePassword} from '../Validation';
import {Auth} from 'aws-amplify'
import {styles} from '../styles/FormStyles'

const SignIn = (props) => {

    if(props.authState == "signIn"){
        const [state, setState] = useState({
            email: "",
            password: "",
        });

        const [error, setError] = useState({email: '', password: ''});
    
        async function onSubmit(){
            const emailError = validateEmail(state.email);
            const passwordError = validatePassword(state.password);
            if( emailError || passwordError){
                setError({ email: emailError, password: passwordError})
            }else{
                try{
                    setError({ email: '', password: ''})
                    const user = await Auth.signIn({
                        username: state.email,
                        password: state.password
                    });
                    props.onStateChange('Home', user);
                }catch(error){
                    Alert.alert(error.message);
                }
            }
        }


        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Sign In</Text>
                <Text style={styles.label}>Email</Text>
                <View style= {styles.inputView}> 
                    <FontAwesome name="user" size={24} color="black" style={styles.iconSize}/>
                    <TextInput
                        autoCapitalize='none'
                        style={styles.inputStyle}
                        placeholder="Enter email address"
                        onChangeText = {text => setState({...state, email: text})}
                        value={state.email}
                    />
                </View>
                <Text style={styles.error}>{error.email}</Text>

                <Text style={styles.label}>Password</Text>
                <View style= {styles.inputView}> 
                    <FontAwesome name="lock" size={24} color="black" style={styles.iconSize}/>
                    <TextInput 
                        secureTextEntry={true}
                        style={styles.inputStyle}
                        placeholder="Enter password"
                        onChangeText = {text => setState({...state, password: text})}
                        value={state.password}
                    />
                </View>
                <Text style={styles.error}>{error.password}</Text>

                <TouchableOpacity 
                    style={styles.done}
                    onPress = {() => onSubmit()}>
                    <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.done}
                    onPress = {() => Auth.federatedSignIn({ provider: "Google" })}>
                    <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.done}
                    onPress = {() => Auth.federatedSignIn({ provider: "Facebook" })}>
                    <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.done}
                    onPress = {() => Auth.federatedSignIn()}>
                    <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Open Hosted UI</Text>
                </TouchableOpacity>

                <View style={styles.buttonsView}>
                    <TouchableOpacity 
                        onPress = {() => props.onStateChange('forgotPassword',{})}>
                        <Text style={styles.textStyle}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress = {() => props.onStateChange('signUp',{})}>
                        <Text style={styles.textStyle}>Register</Text>
                    </TouchableOpacity>
    
                </View>
            </View>
        );
    }  
    else return <></>; 
}
// https://rnamplifyf23ac0cc-f23ac0cc-native.auth.ap-south-1.amazoncognito.com/oauth2/idpresponse

// 15211185005-lvho4pcldpfuuh6nictrra08li7trf7t.apps.googleusercontent.com
// XCvWlrjIt_bM_-RyQ-rLm4so

export default SignIn;