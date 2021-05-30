import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function Bird({birdBottom,birdLeft}) {
    const birdWidth=50
    const birdHeight=60
    return (
        <View style={{
            position:'absolute',
            backgroundColor:'blue',
            height:birdHeight,
            width:birdWidth,
            left:birdLeft-(birdWidth/2),
            bottom:birdBottom-(birdHeight/2),
        }}/>
      
    
    )
}

export default Bird
