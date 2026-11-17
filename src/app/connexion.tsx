import { useState } from 'react';
import { Button, View } from 'react-native';

function SignIn() {
    return <View><Button title="Sign In" /></View>;
}

function SignUp() {
    return <View><Button title="Sign Up" /></View>;
}

export default function ConnexionPage() {
    const [option, setOption] = useState<'signIn' | 'signUp'>('signIn');

    return (
        <View>
            <Button title="Sign In" onPress={() => setOption('signIn')} />
            <Button title="Sign Up" onPress={() => setOption('signUp')} />
            
            {option === 'signIn' ? <SignIn /> : <SignUp />}
        </View>
    )
}