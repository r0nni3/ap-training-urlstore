import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button } from './common'

const UrlDetail = ({ url, onDelete, onPressItem }) => {
  const { key, link } = url;

  return (
    <TouchableOpacity
        onPress={() => onPressItem({key, link})}>
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
    </TouchableOpacity>
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
