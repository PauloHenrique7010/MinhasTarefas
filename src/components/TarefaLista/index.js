import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList  } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const AnimatatedSafeArea = Animatable.createAnimatableComponent(SafeAreaView);

export default function TarefaLista({ data, handleDelete }){
    return (
        <AnimatatedSafeArea
         style={styles.container}
         animation="bounceIn"
         useNativeDriver
        >
            <TouchableOpacity onPress={() => handleDelete(data) }>
                <Ionicons name="md-checkmark-circle" size={30} color="#121212"/>
            </TouchableOpacity>
            <View>
                <Text style={styles.tarefa}>{data.tarefa}</Text>
            </View>

        </AnimatatedSafeArea>
    );    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin:8,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#FFF',
      borderRadius:5,
      padding:7,
      elevation:1.5,
      shadowColor:'#000',
      shadowOpacity:0.2,
      shadowOffset:{
          width:1,
          height:3
      },      
    },
    tarefa:{
        color:'#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20, 
    }
});