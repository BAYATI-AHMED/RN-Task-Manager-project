import { 
  StyleSheet, 
  View, 
  TextInput, 
  Modal, 
  Image, 
  Text,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView
} from "react-native";
import { useState, useEffect, useRef } from 'react';
import CustomButton from './CustomButton';

function GoalInput(props) {
  const [enteredTaskText, setEnteredTaskText] = useState('');
  const scaleAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (props.showModal) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [props.showModal]);

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    if (enteredTaskText.trim().length === 0) return;
    props.onAddTask(enteredTaskText);   
    setEnteredTaskText('');
  }

  return (
    <Modal visible={props.showModal} animationType="fade" transparent={true}>
      <KeyboardAvoidingView 
        style={styles.modalBackdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={[styles.inputContainer, { transform: [{ scale: scaleAnim }] }]}>
              <Image 
                source={require('../assets/images/tasksIcon.png')} 
                style={styles.imageStyle} 
              />
              
              <Text style={styles.title}>Add New Task</Text>
              
              <TextInput 
                style={styles.textInput}
                placeholder='Enter your task here...'
                placeholderTextColor="#aaa"
                onChangeText={taskInputHandler}
                value={enteredTaskText}
                autoFocus={true}
                multiline={true}
              />
              
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonWrapper}>
                  <CustomButton 
                    title="Cancel" 
                    onPress={props.onCancel} 
                    style={styles.cancelButton}
                    iconName="close-outline"
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <CustomButton 
                    title="Add Task" 
                    onPress={addTaskHandler} 
                    style={styles.addButton}
                    iconName="checkmark-outline"
                  />
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#3d1a75',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginBottom: 15,
    tintColor: '#b388ff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#b388ff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 25,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonWrapper: {
    minHeight: 50,
    flex: 1,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#6200ee',
  },
  cancelButton: {
    backgroundColor: '#b00020',
  },
});

export default GoalInput;