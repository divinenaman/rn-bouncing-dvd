import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";

export default function App() {
  const IMAGE_WIDTH = 52;
  const IMAGE_HEIGHT = 52;
  const SCREEN_DIMENSIONS = Dimensions.get("screen");
  const BOUND_X = SCREEN_DIMENSIONS.width - IMAGE_WIDTH;
  const BOUND_Y = SCREEN_DIMENSIONS.height - IMAGE_HEIGHT;

  const directionX = useRef(new Animated.Value(1)).current; 
  const directionY = useRef(new Animated.Value(1)).current;

  const translateX = useRef(new Animated.Value(1)).current; 
  const translateY = useRef(new Animated.Value(1)).current;

  const posX = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(0)).current;

  // const directionY = posY.interpolate({
  //     inputRange: [-BOUND_Y, 0, BOUND_Y],
  //     outputRange: [1, 1, -1],
  //   })
  
  //   const directionX = posX.interpolate({
  //     inputRange: [-BOUND_X, 0, BOUND_X],
  //     outputRange: [1, 1, -1],
  //   });
    
  // const translateY = directionY.interpolate({
  //   inputRange: [-1, 1],
  //   outputRange: [-BOUND_Y, BOUND_Y],
  // })
  
  // const translateX = directionX.interpolate({
  //   inputRange: [-1, 1],
  //   outputRange: [-BOUND_X, BOUND_X],
  // })

  useEffect(() => {
    Animated.parallel(
      [
        Animated.spring(translateX, {
          toValue: directionX.interpolate({
            inputRange: [-1, 1],
            outputRange: [-BOUND_X, BOUND_X],
          }),
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: directionY.interpolate({
            inputRange: [-1, 1],
            outputRange: [-BOUND_Y, BOUND_Y],
          }),
          useNativeDriver: true,
        }),
        
        Animated.spring(directionX, {
          toValue: posX.interpolate({
            inputRange: [0, BOUND_X],
            outputRange: [1, -1],
          }),
          useNativeDriver: true,
        }),
        Animated.spring(directionY, {
          toValue: posY.interpolate({
            inputRange: [0, BOUND_Y],
            outputRange: [1, -1],
          }),
          useNativeDriver: true,
        }),
      ],
      {
        useNativeDriver: true,
      }
    ).start();

    translateX.addListener(x=>console.log("transX",x.value))
    translateY.addListener(x=>console.log("transY",x.value))
    directionX.addListener(x=>console.log("dirX",x.value))
    directionY.addListener(x=>console.log("dirY",x.value))
    posX.addListener(x=>console.log("posX",x.value))
    posY.addListener(x=>console.log("posY",x.value))
    

  },[]);

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        onLayout={Animated.event(
          [{ nativeEvent: { layout: { x: posX, y: posY } } }],
          { useNativeDriver: true }
        )}
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          position: "absolute",
          backgroundColor: "red",
          transform: [{ translateX }, { translateY }],
        }}
      >
        <Animated.Text>
          Open up App.js to start working on your app!
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
