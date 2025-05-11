import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { api } from '../service/api';
import Toast from 'react-native-toast-message';
import { useAuth } from '../hooks/use-auth';

type Task = {
  id: string
  title: string
  done: boolean
}

export default function Home() {
  const { token } = useAuth();
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])

  async function handleSubmit() {
    await api.post('task', {
      title: task,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setTask("");
        fetchData();
        Toast.show({
          type: 'success',
          text1: 'Task criada com sucesso!',
        });
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro de conexão',
          text2: "Não foi possível inserir a task",
        });
      }
      );

  }

  async function handleDone(task: Task) {
    await api.patch(`task/${task.id}`, {
      data: {
        id: task.id,
        done: !task.done
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        auhorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response.data);
      fetchData();
      Toast.show({
        type: 'success',
        text1: 'Task atualizada com sucesso!',
      })
    })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro de conexão',
          text2: "Não foi possível atualizar a task",
        });
      });
  }

  async function fetchData() {
    await api.get('task', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response.data);
      setTasks(response.data);
    })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro de conexão',
          text2: "Não foi possível carregar os dados",
        });
      });
  }

  async function handleDelete(task: Task) {
    await api.delete(`task/${task.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response.data);
      fetchData();
      Toast.show({
        type: 'success',
        text1: 'Task deletada com sucesso!',
      });
    })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro de conexão',
          text2: "Não foi possível deletar a task",
        });
      });
  }


  useEffect(() => {
    fetchData();
  }, []);

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
        <TouchableOpacity style={styles.botaoAdiciona} onPress={handleSubmit}>
          <Text style={styles.textBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {
          tasks.map((task) => (
            <View style={styles.taskContainer} key={task.id}>
              <Text style={[styles.task, task.done && { textDecorationLine: "line-through", color: "red" },]}>{task.title}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonTask} onPress={() => handleDone(task)}>
                  {task.done ? (
                    <FontAwesome name="close" size={24} color="#ef4444" />
                  ) : (
                    <FontAwesome name="check" size={24} color="#22c55e" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTask} onPress={() => handleDelete(task)}>
                  <FontAwesome name="trash" size={24} color="#ef4444" />
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
  content: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 14,
  },
  textBotao: {
    color: 'white',
  },
  botaoAdiciona: {
    backgroundColor: '#181818',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,

  },
  inputTarefa: {
    color: 'white',
    padding: 4,
    height: 42,
    borderRadius: 8,
    borderColor: '#a1a1aa',
    borderWidth: 2,
    fontSize: 14,
    flex: 1
  },
  taskContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  task: {
    color: 'white',
    fontSize: 14,
  },
  buttonTask: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 5,
  }
});