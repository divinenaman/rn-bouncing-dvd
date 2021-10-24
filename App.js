import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, Animated, Dimensions, Easing } from "react-native";
import DvdLogo from "./assets/dvdlogo";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const IMAGE_WIDTH = 52;
  const IMAGE_HEIGHT = 52;
  const SCREEN_DIMENSIONS = Dimensions.get("window");

  const BOUND_X = SCREEN_DIMENSIONS.width - IMAGE_WIDTH;
  const BOUND_Y = SCREEN_DIMENSIONS.height - IMAGE_HEIGHT - StatusBar.length;

  const translateX = useRef(new Animated.Value(0)).current; 
  const translateY = useRef(new Animated.Value(0)).current;

  const [directionX, setDirectionX] = useState(1)
  const [directionY, setDirectionY] = useState(1)

  useEffect(() => {
    translateX.addListener(tx=>{
      if (tx.value >= BOUND_X-5) setDirectionX(-1);
      else if (tx.value <= 5) setDirectionX(1);
    })
    translateY.addListener(ty=>{
      if (ty.value >= BOUND_Y-5) setDirectionY(-1);
      else if (ty.value <= 5) setDirectionY(1);
    })
  },[]);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: BOUND_X * directionX,
      duration: 5500,
      timing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }, [directionX])

  useEffect(() => {
  Animated.timing(translateY, {
      toValue: BOUND_Y * directionY,
      duration: 5000,
      timing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }, [directionY])

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          position: "absolute",
          top: 0,
          left: 0,
          transform: [{ translateX }, { translateY }],
        }}
      ><DvdLogo width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
