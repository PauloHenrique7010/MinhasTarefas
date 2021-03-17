import React, { useState, useCallback, useEffect  } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput, AsyncStorage  } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TarefaLista from './src/components/TarefaLista'
import * as Animatable from 'react-native-animatable';


const AnimatatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [tarefa,setTarefa] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@tarefa');

      if (taskStorage){
        setTarefa(JSON.parse(taskStorage));
      }      
    }

    loadTasks();
  }, []);

  useEffect(() => {
    async function saveTasks(){
      await AsyncStorage.setItem('@tarefa', JSON.stringify(tarefa));      
    }
    saveTasks();
  }, [tarefa]);

  

  function handleAdd(){
    if(input === "") return;

    const data = {
      key: input,
      tarefa: input
    };

    setTarefa([...tarefa, data]);
    setOpen(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = tarefa.filter(r => r.key  !== data.key);
    setTarefa(find);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171b31" barStyle="light-content"/> 
      <View >
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>  
      <FlatList marginHorizontal={10} 
      showsHorizontalScrollIndicator={false}
      data={tarefa}
      keyExtractor={(item)=>String(item.key)}
      renderItem={ ({item}) => <TarefaLista data={item} handleDelete={handleDelete}/> }
      >
      </FlatList>    

      <Modal animationType="slide" transparent={false} visible={open} >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{marginLeft:5, marginRight:5}} name="md-arrow-back" size={40} color="#FFF"/>
            </TouchableOpacity>
            <Text>Nova Tarefa</Text>
          </View>
          
          <Animatable.View style={styles.modalBody} animation="fadeInUp">
            <TextInput 
            multiline={true}
            placeholderTextColor="#747474"
            autoCorrect={false}
            placeholder="Adicione a tarefa aqui"
            style={styles.input}
            value={input}
            onChangeText={(texto)=>setInput(texto)}
            />
            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text sytle={styles.handleAddText}>Cadastrar</Text>

            </TouchableOpacity>            
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatatedBtn 
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={()=>setOpen(true)}
      >
         <Ionicons name="ios-add" size={35} color="#FFF" />
      </AnimatatedBtn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b31',    
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign:'center',
    color:'#FFF',
  },
  fab:{
    position:'absolute',
    width:60,
    height:60,
    backgroundColor:"#0094FF",
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
    right:25,
    bottom:25,
    elevation:2,
    zIndex:9,
    shadowColor:'#FFF',
    shadowOpacity:0.2,
    shadowOffset:{
      width:1,
      height:3,
    }
  },
  modal:{
    flex:1,
    backgroundColor:'#171b31',
  },
  modalHeader:{
    marginLeft:10,
    marginTop:20,
    flexDirection: 'row',
    alignItems:'center',
  },
  modalTitle:{
    marginLeft:15,
    fontSize:23,
    color:'#FFF',
  },
  modalBody:{
    marginTop:15,
  },
  input:{
    fontSize:15,
    marginLeft:10,
    marginRight:10,
    marginTop:30,
    backgroundColor:'#FFF',
    padding:9,
    height: 85,
    textAlignVertical: 'top',
    color:'#000',
    borderRadius:5,
  },
  handleAdd:{
    backgroundColor:'#FFF',
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    height:40,
    borderRadius:5,
  },
  handleAddText:{
    fontSize:20,
  }
});
