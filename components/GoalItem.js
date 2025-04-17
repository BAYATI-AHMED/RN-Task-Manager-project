import { StyleSheet, View, Text, Pressable, Animated, Platform, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';

function GoalItem(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    if (editedText.trim().length === 0) return;
    props.onEditItem(props.id, editedText); // استدعاء دالة التعديل
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedText(props.text);
    setIsEditing(false);
  }

  return (
    <Animated.View style={[styles.taskItem, { opacity: fadeAnim }]}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={setEditedText}
            autoFocus
            onSubmitEditing={handleSave} // حفظ عند الضغط على زر الإدخال
          />
          <View style={styles.editButtons}>
            <Pressable 
              onPress={handleSave} 
              style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
              android_ripple={{ color: '#ddd' }}
            >
              <Ionicons name="checkmark" size={20} color="#4CAF50" />
            </Pressable>
            <Pressable 
              onPress={handleCancel} 
              style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
              android_ripple={{ color: '#ddd' }}
            >
              <Ionicons name="close" size={20} color="#F44336" />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.taskContent}>
          <Text style={styles.taskText}>{props.text}</Text>
          <View style={styles.actions}>
            <Pressable 
              onPress={handleEdit}
              style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
              android_ripple={{ color: '#ddd' }}
            >
              <Ionicons name="create-outline" size={18} color="#FFC107" />
            </Pressable>
            <Pressable
              onPress={props.onDeleteItem.bind(this, props.id)}
              style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
              android_ripple={{ color: '#ddd' }}
            >
              <Ionicons name="trash-outline" size={18} color="#F44336" />
            </Pressable>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#7c4dff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    paddingRight: 10,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  pressed: {
    opacity: Platform.OS === 'ios' ? 0.5 : 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  editInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  editButtons: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 10,
    marginLeft: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
});

export default GoalItem;