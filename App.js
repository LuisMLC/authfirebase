/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Alert, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';

import * as firebase from 'firebase';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyD8O1FPhOq1qiBvJ7AQIqqXc-NnIx24fyA',
  authDomain: 'authtest-8f2d9.firebaseapp.com',
  projectId: 'authtest-8f2d9',
  storageBucket: 'authtest-8f2d9.appspot.com',
  messagingSenderId: '258489840836',
  appId: '1:258489840836:web:01a9bf8b24b885ef040591',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{title: 'Authentication'}}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AuthenticationScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const emailInput = React.createRef();
  const passwordInput = React.createRef();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        clearInputs();
        navigation.navigate('Home');
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;

        switch (errorCode) {
          case 'auth/wrong-password':
            Alert.alert(null, 'Wrong password.');
            break;
          case 'auth/invalid-email':
            Alert.alert(null, 'The email is invalid.');
            break;
          case 'auth/user-disabled':
            Alert.alert(null, 'This user has been disabled.');
            break;
          case 'auth/user-not-found':
            Alert.alert(null, 'This user was not found');
            break;
          default:
            alert(errorMessage);
            break;
        }
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setEmail('');
        setPassword('');
      })
      .then(() => Alert.alert(null, 'User has signed out!'))
      .catch(error => {
        console.log(error);
      });
  };

  const signUp = () => {
    if (password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert(null, 'User account created & signed in');
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            Alert.alert(null, 'This email is already in use!');
          } else {
            Alert.alert(errorMessage);
          }
          console.log(error);
        });
    }
  };

  const clearInputs = () => {
    emailInput.current.clear();
    passwordInput.current.clear();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Input
        ref={emailInput}
        label="Email"
        onChangeText={value => setEmail(value)}
        defaultValue={email}
      />
      <Input
        ref={passwordInput}
        label="Password"
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
      />
      <View style={styles.button}>
        <Button
          title="Login"
          onPress={() => {
            login();
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Sign in"
          onPress={() => {
            signUp();
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation, route}) => {
  return <Text>LOGIN</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    margin: 10,
  },
});

export default App;
