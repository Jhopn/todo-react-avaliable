import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { useState, useEffect} from 'react';

type Task = {
  id: string
  task: string
  done: boolean
}

export default function Home() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])

  // async function handleSubmit(){
  //   const { error } = await supabase.from('task').insert({task})
  
  //   if(error){
  //     Alert.alert("Não foi possível inserir a task");
  //   } else{
  //     setTask("");
  //     await fetchData(); 
  //   }
  // }
  
  // async function handleDone(task:Task){
  //   const {error} = await supabase.from('task').update({done: !task.done}).eq("id", task.id)

  //   if(error){
  //     Alert.alert("Não foi possível atualizar a task");
  //   } else{
  //     await fetchData();
  //   }
  // }

  // async function fetchData(){
  //   const { data,error } = await supabase.from('task').select("*")
  //   if(error){
  //     Alert.alert("Não foi possível carregar os dados")
  //   } else{
  //     setTasks(data)
  //   }
  // }
  
  // async function handleDelete(task:Task){
  //   const {error} = await supabase.from('task').delete().eq("id", task.id)
  //   if(error){
  //     Alert.alert("Não foi possível apagar a task");
  //   } else{
  //     await fetchData();
  //   }
  // }

  
// useEffect( () =>{
//   fetchData();
// }, []);

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Todo App</Text>

      <View style={styles.content}>
        <TextInput style={styles.inputTarefa} 
        placeholder='Digite a terefa...'  
        placeholderTextColor="#52525b"
        value={task}
        onChangeText={setTask}
        ></TextInput>
        <TouchableOpacity style={styles.botaoAdiciona} > 
            <Text style={styles.textBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {
          tasks.map((task) =>(
            <View style={styles.taskContainer}  key={task.id}>
              <Text style={[styles.task, task.done && { textDecorationLine: "line-through", color: "red"},]}>{task.task}</Text> 
              <View style={styles.buttons}> 
                <TouchableOpacity style={styles.buttonTask} >
                  <FontAwesome name="check" size={24} color="#22c55e"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTask} >
                  <FontAwesome name="trash" size={24} color="#ef4444"/>
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFDB00',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
   },
   content:{
    marginTop: 30,
    flexDirection: 'row',
    gap: 14,
   },
   textBotao:{
    color: 'white',
   },
   botaoAdiciona: {
    backgroundColor: '#181818',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

   },
   inputTarefa:{
    color: 'white', 
    padding: 4,
    height: 42, 
    borderRadius: 8,
    borderColor: '#a1a1aa',
    borderWidth: 2,
    fontSize: 14,
    flex: 1
   },
   taskContainer:{
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
   },
   task:{
    color: 'white',
    fontSize: 14,
   },
   buttonTask:{
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 12,
   },
   buttons:{
    flexDirection: 'row',
    gap: 5,
   }
});