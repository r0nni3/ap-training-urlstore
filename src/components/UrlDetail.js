import React from 'react';
import { View, Text, Linking } from 'react-native';
import Card from './Card'
import CardSection from './CardSection'
import Button from './Button'

const UrlDetail = ({ url, onDelete }) => {
  const { key, link } = url;

  return (
    <Card>
      <CardSection>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>{link}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(link)}>
          open
        </Button>
        <Button onPress={() => onDelete(key)}>
          Remove
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  textHeader: {
    fontSize: 18
  }
};

export default UrlDetail;
