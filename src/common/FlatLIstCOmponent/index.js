// Animated Flatlist

import {
    View,
    RefreshControl,
    FlatList,
    ActivityIndicator,
    Animated
  } from "react-native";
  import React, { memo, useState,useEffect } from "react";
  import { scale } from "react-native-size-matters";
  import { useRef } from "react";
import TextCompo from "../Text";
import { responsiveScreenWidth } from "../../config/typography";

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  
  const AnimatedFlatListWrapper = ({
    showsHorizontalScrollIndicator,
    flatListRef,
    showsVerticalScrollIndicator,
    contentContainerStyle,
    height,
    data,
    renderItem,
    numColumns,
    ListHeaderComponent,
    ListHeaderComponentStyle,
    onScrollBeginDrag,
    isDirection,
    _offset,
    style,
    ListEmptyComponent,
    ListFooterComponent,
    onRefresh,
    loading,
    animation,
    onContentSizeChange,
    onLayout,
    onEndReached,
    footerLoading,
    estimatedItemSize,
    horizontal,
    bounce,
    ...props
  }) => {
    const translateY = useRef(new Animated.Value(100)).current;

    const onEndReachedCalledDuringMomentum = useRef(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const AVATAR_SIZE = height;
  
    useEffect(() => {
      // Animate the translateY from 100 to 0 for each item
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);

    const [state, setState] = useState({
      offset: 0,
    });
    const { offset } = state;
  
    const _onRefresh = () => {
      if (onRefresh) {
        setRefreshing(true);
        onRefresh();
        wait(2000).then(() => setRefreshing(false));
      }
    };
    const _renderItem = ({ item, index }) => {
      return (
        <View
       key={index}
        >
          {renderItem({ item, index })}
        </View>
      );
    };
  
    const _onScrollBeginDrag = (event) => {
      if (onScrollBeginDrag) {
        onScrollBeginDrag(event);
      }
      if (isDirection || _offset) {
        const currentOffset = event.nativeEvent.contentOffset.y;
  
        setState((prev) => ({
          ...prev,
          offset: currentOffset,
        }));
  
        const direction =
          currentOffset > 0 && currentOffset > offset ? "down" : "up";
  
        if (direction == "up") {
          console.log("up");
          _offset ? _offset(currentOffset) : null;
          isDirection ? isDirection("up") : null;
        } else if (direction == "down") {
          console.log("down");
          _offset ? _offset(currentOffset) : null;
          isDirection ? isDirection("down") : null;
        }
      }
    };
  
    const _ListEmptyComponent = () => {
      return (
        <View
          style={{
            width:responsiveScreenWidth(100),
            // backgroundColor:'red',
            alignSelf: "center",
            alignItems: "center",
            paddingVertical: scale(20),
            // height: hp(70),
            justifyContent:'center',
          }}
        >
          <TextCompo semiBold medium>
            {'No Data Found'}
          </TextCompo>
        </View>
      );
    };
  
    const _ListFooterComponent = () => {
      return footerLoading ? (
        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <ActivityIndicator color={'navy'} size="large" />
          <TextCompo style={{ marginVertical: 5 }}>{'Loading'}</TextCompo>
        </View>
      ) : null;
    };
  
    const onEndReachedHandler = () => {
      if (onEndReached) {
        onEndReached();
      }
      //     if (!onEndReachedCalledDuringMomentum.current) {
      //       onEndReachedCalledDuringMomentum.current = true;
      //     }
    };
  
    return (
      <Animated.View style={[ {transform: [{ translateY }],}]}>
      <FlatList
      {...props}
      bounces={bounce}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      horizontal={horizontal}
        //    estimatedItemSize={estimatedItemSize || 183}
        ref={flatListRef}
        keyExtractor={(item, index) => `key-${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        }
        ListHeaderComponent={ListHeaderComponent}
        ListHeaderComponentStyle={ListHeaderComponentStyle}
        numColumns={numColumns}
        ListEmptyComponent={ListEmptyComponent || _ListEmptyComponent}
        style={style}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={contentContainerStyle}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        //    scrollToOverflowEnabled
        //    onScrollBeginDrag={_onScrollBeginDrag}
        onScroll={_onScrollBeginDrag}
        data={data}
        renderItem={_renderItem}
        initialNumToRender={10}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onEndReached={onEndReachedHandler}
        //  onEndReachedThreshold={0.7}
        ListFooterComponent={ListFooterComponent || _ListFooterComponent}
      />
      </Animated.View>
    );
  };
  
  export default memo (AnimatedFlatListWrapper);
  