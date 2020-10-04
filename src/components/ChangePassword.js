import React, {useState} from 'react';
import { 
    View,
    Text, 
    TextInput, 
    TouchableOpacity,
     Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {validateCode, validatePassword} from '../Validation';
import {Auth} from 'aws-amplify'
import {styles} from '../styles/FormStyles'

const changePassword = (props) => {
    if(props.authState == "changePassword"){
        const [state, setState] = useState({
            email: "mayankayush173@gmail.com",
            code: "",
            password: "",
        });

        const [error, setError] = useState({code: '', password: ''});

        async function onSubmit(){
            const codeError = validateCode(state.code);
            const passwordError = validatePassword(state.password);
            const username = state.email;
            const code = state.code;
            const pass = state.password;
            if( codeError || passwordError){
                setError({ code: codeError, password: passwordError})
            }else{
                try{
                    setError({ code: '', password: ''})
                    const user = await Auth.forgotPasswordSubmit(username, code, pass);
                    props.onStateChange('signIn', user);
                    Alert.alert("Your Password has changed");
                }catch(error){
                    Alert.alert(error.message);
                }
            }
        }

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Change Password</Text>
                <View style={{height: 20}}></View>
                <Text style={styles.label}>Confirmation Code</Text>
                <View style= {styles.inputView}> 
                    <FontAwesome name="user" size={24} color="black" style={styles.iconSize}/>
                    <TextInput
                        autoCapitalize='none'
                        style={styles.inputStyle}
                        placeholder="Enter confirmation Code"
                        onChangeText = {text => setState({...state, code: text})}
                        value={state.code}
                    />
                </View>
                <Text style={styles.error}>{error.email}</Text>

                <Text style={styles.label}>New Password</Text>
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
                    <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Submit</Text>
                </TouchableOpacity>

                <View style={styles.buttonsView}>
                    <TouchableOpacity 
                        onPress = {() => props.onStateChange('signIn',{})}>
                        <Text style={styles.textStyle}>Back to signIn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }  
    else return <></>; 
}


export default changePassword;