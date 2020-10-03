import React, {useState} from 'react';
import { 
    View,
    Text, 
    TextInput, 
    TouchableOpacity,
     Alert,
     StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {validateEmail} from '../Validation';
import {Auth} from 'aws-amplify'
import {styles} from '../styles/FormStyles'

const ForgotPassword = (props) => {

    if(props.authState == "forgotPassword"){
        const [state, setState] = useState({
            email: "",
        });
    
        const [error, setError] = useState({email: ''});
    
        async function onSubmit(){
            const emailError = validateEmail(state.email);
            const { email: username} = state;
            if(emailError){
                setError({ email: emailError})
            }else{
                try{
                    setError({ email: ''})
                    const user = await Auth.forgotPassword(username);
                    props.onStateChange('changePassword', user);
                }catch(error){
                    Alert.alert(error.message);
                }
            }
        }
        return (
            <View style={styles.container}>
                <Text style={fontStyles.heading}>Reset your password</Text>
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

                <TouchableOpacity 
                    style={styles.done}
                    onPress = {() => onSubmit()}>
                    <Text style={{textAlign:'center',fontSize: 18, color: 'white'}}>SEND</Text>
                </TouchableOpacity>

                <View style={styles.buttonsView}>
                    <TouchableOpacity 
                        onPress = {() => props.onStateChange('signIn',{})}>
                        <Text style={styles.textStyle}>Back to Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }  
    else return <></>; 
}

const fontStyles = StyleSheet.create({
    heading: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '700',
        color: '#20B2AA',
        marginBottom: 10
    }
})

export default ForgotPassword;