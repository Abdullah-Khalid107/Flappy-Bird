import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View,TouchableWithoutFeedback } from 'react-native';
import Bird from './Components/Bird'
import Obstacle from './Components/Obstacles';


export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [score,setScore]=useState(0)
  const obstaleWidth = 60
  const obstaleHeight = 300
  const gap = 150
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  let obstaclesTopTimerId
const[isGameOver,setIsGameOver]=useState(false)

  //start bird falling

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])
  console.log(birdBottom)

  const jump=()=>{
    if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom=>birdBottom + 50)
      console.log('jumped')
    }
  }

  //start first obstale

  useEffect(() => {
    if (obstaclesLeft > -obstaleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
      setScore(score=>score + 1)
    }
  }, [obstaclesLeft])

  ///obstacles second start

  useEffect(() => {
    if (obstaclesLeftTwo > -obstaleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(- Math.random() * 100)
      setScore(score=>score + 1)
    }
  }, [obstaclesLeftTwo])

//check for collisionss
useEffect(()=>{

  if (
    ((birdBottom < (obstaclesNegHeight + obstaleHeight + 30) ||
    birdBottom > (obstaclesNegHeight + obstaleHeight + gap -30)) &&
    (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
    )
    || 
    ((birdBottom < (obstaclesNegHeightTwo + obstaleHeight + 30) ||
    birdBottom > (obstaclesNegHeightTwo + obstaleHeight + gap -30)) &&
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
    )
    ) 
    {
    console.log('game over')
    gameOver()
  }
})


 const gameOver = () => {
  clearInterval(gameTimerId)
  clearInterval(obstaclesLeftTimerId)
  clearInterval(obstaclesLeftTimerIdTwo)
  setIsGameOver(true)
}

  return (

    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      {isGameOver && <Text>GAME OVER :YOUR SCORE IS {score}</Text>}
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />

      <Obstacle
        color={'green'}
        obstacleHeight={obstaleHeight}
        obstacleWidth={obstaleWidth}
        obstaclesLeft={obstaclesLeft}
        randomBottom={obstaclesNegHeight}
        gap={gap}
      />

      <Obstacle
        color={'yellow'}
        obstacleHeight={obstaleHeight}
        obstacleWidth={obstaleWidth}
        randomBottom={obstaclesNegHeightTwo}
        obstaclesLeft={obstaclesLeftTwo}
        gap={gap}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
