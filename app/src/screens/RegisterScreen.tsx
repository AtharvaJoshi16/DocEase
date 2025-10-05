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
  ScrollView,
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

const Footer = ({ handleSubmit }: { handleSubmit: () => void }) => {
  return (
    <Button style={styles.registerCta} onPress={handleSubmit}>
      Register
    </Button>
  );
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
  const [form, setForm] = useState<Record<string, string>>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const data = new FormData();

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

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    // data.append('email', form.email);
    // data.append('password', form.password);
    // data.append('confirmPassword', form.confirmPassword);
    // data.append('firstName', form.firstName);
    // data.append('lastName', form.lastName);
  };

  return (
    <Layout level="3" style={styles.container}>
      <AppTitle theme={theme} />
      <Layout level="2" style={styles.form}>
        <Card
          header={Header}
          footer={() => <Footer handleSubmit={handleSubmit} />}
        >
          <Layout level="1">
            <ScrollView>
              <Layout level="1" style={styles.formContent}>
                <Input
                  placeholder="Enter email"
                  label="Email"
                  onChangeText={text => handleChange('email', text)}
                  value={form.email}
                />
                <Input
                  placeholder="Enter firstname"
                  label="Firstname"
                  onChangeText={text => handleChange('firstName', text)}
                  value={form.firstName}
                />
                <Input
                  placeholder="Enter lastname"
                  label="Lastname"
                  onChangeText={text => handleChange('lastName', text)}
                  value={form.lastName}
                />
                <Input
                  placeholder="Choose a password"
                  label="Password"
                  id="password"
                  secureTextEntry={showPwd}
                  accessoryRight={props => Eye(props!, showPwd, setShowPwd)}
                  caption={() => (
                    <Text style={{ margin: 4, color: '#8f9bb3' }}>
                      Should have minimum length 12 and contain atleast one
                      uppercase,lowercase, number and special character
                    </Text>
                  )}
                  onChangeText={text => handleChange('password', text)}
                  value={form.password}
                />
                <Input
                  placeholder="Confirm password"
                  label="Confirm Password"
                  id="confirmPassword"
                  secureTextEntry={showConfirmPwd}
                  accessoryRight={props =>
                    Eye(props!, showConfirmPwd, setShowConfirmPwd)
                  }
                  onChangeText={text => handleChange('confirmPassword', text)}
                  value={form.confirmPassword}
                  caption={() => {
                    if (form?.password !== form?.confirmPassword) {
                      return (
                        <Text
                          style={{
                            color: theme['color-danger-600'],
                            margin: 4,
                          }}
                        >
                          Passwords do not match
                        </Text>
                      );
                    }
                    return null;
                  }}
                />
              </Layout>
            </ScrollView>
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
