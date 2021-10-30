import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native';

import { Button } from '../Button';

import { COLORS } from '../../theme';

import { styles } from './styles';
import { api } from '../../services/api';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const formattedMessage = message.trim();

    if (formattedMessage.length > 0) {
      setSendingMessage(true);

      await api.post('/messages', {
        message: formattedMessage
      });

      Keyboard.dismiss();
      
      setMessage('');
      setSendingMessage(false);
      Alert.alert('Mensagem enviada com sucesso!');
    } else {
      Alert.alert('Escreva a mensagem que deseja enviar.');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
        style={styles.input}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
