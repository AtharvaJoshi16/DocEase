import { ThemeType } from '@ui-kitten/components';
import { StyleSheet, Text } from 'react-native';

export const AppTitle = ({ theme }: { theme: ThemeType }) => {
  return (
    <Text style={[styles.text, { color: theme[styles.text.color] }]}>
      Doc Ease
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontFamily: 'Barlow-Bold',
    color: 'color-primary-500',
    bottom: 50,
  },
});
