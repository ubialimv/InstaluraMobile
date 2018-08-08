import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';

import InputComentario from './InputComentario';
import Likes from './Likes';
import Comentario from './Comentario';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    exibeLegenda(foto){
        if(foto.comentario === '')
            return;

        return (
            <View>
                <Comentario  usuario={foto.loginUsuario} texto={foto.comentario}/>
            </View>
        );
    }

    render() {

        //  para evitar repeticao de codigo ao acessar o estado do compomente
        const { foto, likeCallback, comentarioCallback } = this.props;

        return(
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{uri: foto.urlPerfil}} style={styles.fotoDePerfil} />
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image source={require('../../resources/img/alura.jpg')} style={styles.foto} />
                <View style={styles.rodape}>
                    <Likes foto={foto} likeCallback={likeCallback}/>
                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario =>
                        <Comentario key={comentario.id} usuario={comentario.login} texto={comentario.texto}/>
                    )}

                    <InputComentario idFoto ={foto.id} comentarioCallback={comentarioCallback}/>
                </View>
            </View>
        );
    }
}

// underlineColorAndroid transparent retirar aquela borda nativa do android
// so tenho o acesso ao valor do input na funcao novoComentario pois o callback do onChangeText esta implementado

const styles = StyleSheet.create({
    cabecalho: {
        margin:10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoDePerfil: {
        margin: 10,
        borderRadius: 20,
        width:40, height:40
    },
    foto: {
        width:width,
        height:width
    },
    rodape: {
        margin: 10
    }
})
