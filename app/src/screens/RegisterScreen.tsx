import { IOS_CLIENTID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  Button,
  Card,
  Input,
  Layout,
  Spinner,
  useTheme,
} from '@ui-kitten/components';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Alert,
  ImageProps,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppTitle } from '../components/AppTitle';
const Header = () => {
  const theme = useTheme();
  return (
    <View style={styles.header}>
      <Text
        style={[styles.headerText, { color: theme[styles.headerText.color] }]}
      >
        Register here
      </Text>
    </View>
  );
};

const Footer = () => {
  return <Button style={styles.registerCta}>Register</Button>;
};

const Eye = (
  props: Partial<ImageProps>,
  value: boolean,
  setter: Dispatch<SetStateAction<boolean>>,
): React.ReactElement => {
  return (
    <TouchableWithoutFeedback onPress={() => setter(!value)}>
      <Icon name={value ? 'eye-off' : 'eye'} size={20} color={'#8f9bb3'} />
    </TouchableWithoutFeedback>
  );
};

GoogleSignin.configure({
  webClientId: IOS_CLIENTID,
  iosClientId: IOS_CLIENTID,
});

export const RegisterScreen = () => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [googleSignInLoading, setGoogleSignInLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleSignInLoading(true);
      const res = await GoogleSignin.signIn();
      const { user, idToken } = res.data!;
      console.log(user, idToken);
    } catch (e: any) {
      console.log(e);
      Alert.alert('Oops!', 'Something went wrong!');
    } finally {
      setGoogleSignInLoading(false);
    }
  };

  return (
    <Layout level="3" style={styles.container}>
      <AppTitle theme={theme} />
      <Layout level="2" style={styles.form}>
        <Card header={Header} footer={Footer}>
          <Layout level="1" style={styles.formContent}>
            <Input placeholder="Enter email" label="Email" />
            <Input
              placeholder="Choose a password"
              label="Password"
              id="password"
              secureTextEntry={showPwd}
              accessoryRight={props => Eye(props!, showPwd, setShowPwd)}
            />
            <Input
              placeholder="Confirm password"
              label="Confirm Password"
              id="confirmPassword"
              secureTextEntry={showConfirmPwd}
              accessoryRight={props =>
                Eye(props!, showConfirmPwd, setShowConfirmPwd)
              }
            />
          </Layout>
        </Card>
      </Layout>

      <Text style={styles.or}>OR</Text>
      <Button
        appearance="outline"
        style={styles.googleLoginCta}
        disabled={googleSignInLoading}
        accessoryRight={props =>
          googleSignInLoading ? (
            <Spinner />
          ) : (
            <Icon
              {...props}
              name="logo-google"
              size={22}
              color={theme['color-primary-600']}
              style={{
                margin: 'auto',
              }}
            />
          )
        }
        onPress={handleGoogleSignIn}
      >
        {!googleSignInLoading ? (
          <Text>SIGN IN WITH GOOGLE</Text>
        ) : (
          <Text>SIGNING IN</Text>
        )}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'color-primary-600',
  },
  form: {
    width: '100%',
  },
  formContent: {
    flexDirection: 'column',
    gap: 16,
  },
  registerCta: {
    margin: 10,
  },
  or: {
    fontSize: 18,
    fontWeight: 700,
    color: '#8f9bb3',
    marginVertical: 10,
  },
  googleLoginCta: {
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
});
