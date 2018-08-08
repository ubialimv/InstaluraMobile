import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    AppRegistry
} from 'react-native';

import Post from './Post';

const width = Dimensions.get('screen').width;

export default class Feed extends Component {

    // inicializa a criacao do compomente com a variavel fotos vazia
    constructor() {
        super();
        this.state = {
            fotos: []
        }
    }

    // apos a criacao do compomente busca os dados da api https://instalura-api.herokuapp.com/
    componentDidMount() {
        fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
            .then(resposta => resposta.json())
            .then(json => this.setState({fotos: json}));
    }

    like(idFoto) {

        const foto = this.state.fotos.find(foto => foto.id === idFoto)

        let novaLista = []
        if(!foto.likeada) {
            // ao inves de usar concat posso usar o spread operator do es6
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ]
        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            })
        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }

        const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

        this.setState({fotos: fotos})
    }

    adicionaComentario(idFoto, valorComentario, inputComentario){

        if(valorComentario === '')
            return;

        const foto = this.state.fotos.find(foto => foto.id === idFoto)

        const novaLista = [...foto.comentarios,{
            id: valorComentario,
            login: 'meuUsuario',
            texto: valorComentario
        }];

        const fotoAtualizada = {
            ...foto,
            comentarios: novaLista
        }

        const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

        this.setState({fotos: fotos});
        inputComentario.clear();
    }

    render() {
        return (
            <FlatList style={styles.container}
                keyExtractor={item => String(item.id)}
                data={this.state.fotos}
                renderItem={ ({item}) =>
                    <Post foto={item}
                        likeCallback={this.like.bind(this)}
                        comentarioCallback={this.adicionaComentario.bind(this)}/>
                }
            />
        );
    }
}


const margem = Platform.OS == 'ios' ?  20 : 0;
const styles = StyleSheet.create({
    constainer:{
        marginTop: margem
    }
});
