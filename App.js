import { useState } from 'react';
import { View, StyleSheet, FlatList, Platform, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import CustomButton from './components/CustomButton';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  function addTaskHandler(enteredTaskText) {
    setTasks(currentTasks => [
      ...currentTasks,
      { text: enteredTaskText, id: Math.random().toString() },
    ]);
    endAddTaskHandler();
  }

  function deleteTaskHandler(id) {
    setTasks(currentTasks => {
      return currentTasks.filter(task => task.id !== id);
    });
  }

  function startAddTaskHandler() {
    setModalIsVisible(true);
  }

  function endAddTaskHandler() {
    setModalIsVisible(false);
  }

  function editTaskHandler(id, newText) {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient 
        colors={['#1a0033', '#4d0099']} 
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.innerContainer}>
          <CustomButton 
            title="Add New Task" 
            iconName="add-circle-outline"
            onPress={startAddTaskHandler} 
            style={styles.addButton}
            textStyle={styles.addButtonText}
          />
          
          <GoalInput
            showModal={modalIsVisible}
            onAddTask={addTaskHandler}
            onCancel={endAddTaskHandler}
          />
          
          <View style={styles.tasksContainer}>
            {tasks.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-done-outline" size={60} color="#a07cc5" />
                <Text style={styles.emptyStateText}>No tasks yet! Add your first task.</Text>
              </View>
            ) : (
              <FlatList
                data={tasks}
                renderItem={itemData => (
                  <GoalItem
                    text={itemData.item.text}
                    onDeleteItem={deleteTaskHandler}
                    onEditItem={editTaskHandler}
                    id={itemData.item.id}
                  />
                )}
                keyExtractor={(item, index) => item.id}
                alwaysBounceVertical={false}
                contentContainerStyle={styles.listContent}
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  addButton: {
    backgroundColor: '#7c25cc',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tasksContainer: {
    flex: 1,
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  emptyStateText: {
    color: '#d0b3e6',
    fontSize: 18,
    marginTop: 15,
    textAlign: 'center',
  },
});