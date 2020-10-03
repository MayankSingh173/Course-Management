import React, {useState} from 'react';
import { 
    View,
    Text, 
    TextInput, 
    TouchableOpacity,
     Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {validateEmail, validateCode} from '../Validation';
import {Auth} from 'aws-amplify'
import {styles} from '../styles/FormStyles'

const ConfirmSignUp = (props) => {


    if(props.authState == "confirmSignUp"){
        const [state, setState] = useState({
            email: "",
            confirmationCode: "",
        });
    
        const [error, setError] = useState({email: '', code: ''});
    
        async function onSubmit(){
            const emailError = validateEmail(state.email);
            const codeError = validateCode(state.confirmationCode);
            const { email: username, confirmationCode: code} = state;
            if(emailError || codeError){
                setError({ email: emailError, code: codeError})
            }else{
                try{
                    setError({ email: '', code: ''})
                    const user = await Auth.confirmSignUp(username, code);
                    setState({email: '', confirmationCode: ''});
                    props.onStateChange('signIn', user);
                }catch(error){
                    Alert.alert(error.message);
                }
            }
        }
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Confirm Sign Up</Text>
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

                <Text style={styles.label}>Confirmation Code</Text>
                <View style= {styles.inputView}> 
                    <FontAwesome name="lock" size={24} color="black" style={styles.iconSize}/>
                    <TextInput 
                        secureTextEntry={true}
                        style={styles.inputStyle}
                        placeholder="Enter Confirmation Code"
                        onChangeText = {text => setState({...state, confirmationCode: text})}
                        value={state.confirmationCode}
                    />
                </View>
                <Text style={styles.error}>{error.code}</Text>
                <TouchableOpacity 
                    style={styles.done}
                    onPress = {() => onSubmit()}>
                    <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>Confirm Code</Text>
                </TouchableOpacity>

                <View style={styles.buttonsView}>
                    <TouchableOpacity 
                        onPress = {() => props.onStateChange('signIn',{})}>
                        <Text style={styles.textStyle}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }  
    else return <></>; 
}


export default ConfirmSignUp;