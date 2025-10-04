import { Button, Card, Input, Layout, useTheme } from '@ui-kitten/components';
import { Dispatch, SetStateAction, useState } from 'react';
import {
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

export const RegisterScreen = () => {
  const theme = useTheme();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

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
});
