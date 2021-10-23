import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'



export default function appButton({style, title, onPress}) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: '#560CCE',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 45,
    textAlign: 'center',
    color: '#91DFFF'
  },
})
