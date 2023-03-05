import React, { useState } from "react";
import { useLensContext } from "../LensContext";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Video } from "expo-av";
import { postPublicationMutation, uploadToIPFS } from "../api";

let timerId;

const { width } = Dimensions.get("window");

const videos = [
  {
    uri: require("../assets/4.mp4"), // removed vids for upload
    id: "1",
  },
  {
    uri: require("../assets/5.mp4"), // removed vids for upload
    id: "2",
  },
  {
    uri: require("../assets/6.mp4"), // removed vids for upload
    id: "3",
  },
];

const VideoSelector = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { jwtToken } = useLensContext();
  const profileId = "hoooks.lens";

  async function handleLongPress() {
    const ipfsData = await uploadToIPFS(
      videos[currentVideoIndex],
      "vid",
      "new vid",
      {}
    );
    timerId = setTimeout(() => {
      const postRequest = {
        profileId,
        contentURI: "ipfs://" + ipfsData.path,
        collectModule: {
          freeCollectModule: { followerOnly: true },
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
      };

      postPublicationMutation(postRequest, jwtToken);
    }, 3000); // 3 seconds
  }

  const handleVideoEnd = ({ didJustFinish }) => {
    if (didJustFinish) {
      setCurrentVideoIndex((index) => (index + 1) % videos.length);
    }
  };

  const handleCancelPress = () => {
    clearTimeout(timerId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onLongPress={handleLongPress}
            onPressOut={handleCancelPress}
          >
            <View style={{ width, height: "100%" }}>
              <Video
                resizeMode="contain"
                isLooping
                isMuted
                source={item.uri}
                style={styles.video}
                onPlaybackStatusUpdate={handleVideoEnd}
                shouldPlay={index === currentVideoIndex}
              />
            </View>
          </TouchableOpacity>
        )}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const { contentOffset } = nativeEvent;
          const index = Math.round(contentOffset.x / width);
          setCurrentVideoIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
  },
});

export default VideoSelector;
