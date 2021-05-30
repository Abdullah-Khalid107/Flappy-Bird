import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Obstacles = ({randomBottom,color,obstacleHeight,obstacleWidth,obstaclesLeft,gap}) => {
   

    return (
        <>
        <View style={{
            position:'absolute',
            backgroundColor:color,
            height:obstacleHeight,
            width:obstacleWidth,
            left:obstaclesLeft,
            bottom:randomBottom+obstacleHeight + gap,
        }}/>

<View style={{
            position:'absolute',
            backgroundColor:color,
            height:obstacleHeight,
            width:obstacleWidth,
            left:obstaclesLeft,
            bottom:randomBottom,
        }}/>
        
      
    </>
    )
}

export default Obstacles


