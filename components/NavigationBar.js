import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react'

export default function NavigationBar({onBack, onForward, canGoBack, canGoForward}) {

  
  return (
    <View style={[styles.container, (!canGoBack && !canGoForward) && styles.$hide]}>

      {canGoBack && (<TouchableOpacity style={styles.button} onPress={onBack}>
      <FontAwesome5 name="arrow-left" size={20} color="black" />
            <Text style={styles.buttonTitle}>Back</Text>
      </TouchableOpacity>)}


      {canGoForward && (<TouchableOpacity style={styles.button} onPress={onForward}>
      <FontAwesome5 name="arrow-right" size={20} color="black" />
            <Text style={styles.buttonTitle}>Forward</Text>
      </TouchableOpacity>)}

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopColor: 'blue',
        borderTopWidth: 2
    },

    button: {
      alignItems: 'center',
    },

    buttonTitle: {
      fontSize: 16
    },

    $hide: {
      display: 'none'
    }


})