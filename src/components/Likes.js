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

export default class Likes extends Component{

    carregaIcone(likeada){
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png')
    }

    exibeLikers(likers){

        /*
        a forma comentada seria a mais comum
        if(likers.length <= 0)
            return;

        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );
        */

        return likers.length > 0 &&
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
    }

    render(){
        const { foto, likeCallback } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <Image source={this.carregaIcone(foto.likeada)}  style={styles.botaoDeLike}/>
                </TouchableOpacity>

                {this.exibeLikers(foto.likers)}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    botaoDeLike: {
        marginBottom: 10,
        height: 40,
        width: 40
    },
    likes: {
        fontWeight: 'bold'
    }
})
