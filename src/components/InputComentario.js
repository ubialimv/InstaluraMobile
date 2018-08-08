import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class InputComentario extends Component{

    constructor () {
        super();
        this.state = {
            valorComentario: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Adiconar comentario"
                    underlineColorAndroid='transparent'
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({valorComentario: texto})}
                />
                <TouchableOpacity onPress={() => {
                    this.props.comentarioCallback(this.props.idFoto, this.state.valorComentario, this.inputComentario)
                    this.setState({valorComentario:''})
                }}>
                <Image style={styles.icone} source={require('../../resources/img/send.png')} />
                </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    input: {
        flex: 1,
        height: 40
    },
    icone :{
        width: 30,
        height: 30
    }
})
