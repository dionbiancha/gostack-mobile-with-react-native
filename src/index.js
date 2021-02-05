import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  StatusBar,
  FlatList,
  TouchableOpacity 
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      onwer: 'Dionei Bianchati'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar  backgroundColor="#7159c1"/>
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project})=> (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.6}
          onPress={handleAddProject}
        >
          <Text style={styles.textButton}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold'
  },
  project: {
    color: '#FFF',
    fontSize: 20
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 16
  }
});