import {
  LayoutAnimation,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import TextCompo from "../../common/Text/index";
import { useState, useEffect } from "react";
import FlatLIstCOmponent from "../../common/FlatLIstCOmponent/index";
import VectorIcon from "../../common/VectorIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlightsListingAction,
  filterAction,
  resetAction,
  sortAction,
} from "../../module/FlightAction";
import moment from "moment";

const Flight = () => {
  const [airlineCode, setAirlineCode] = useState([]);
  const [filterVisilble, setFilterVisible] = useState(false);
  const [filterArr, setFilterArr] = useState([]);
  const [oldFilterArr, setOldArr] = useState([]);
  const flightData = useSelector((state) => state.flightReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    getFlightApiCall();
  }, []);

  const getFlightApiCall = () => {
    const callback = (res) => {
      let codeArr = new Set(
        res?.data?.result?.flatMap((flight) =>
          flight?.displayData?.airlines?.map((airline) => airline?.airlineCode)
        )
      );
      setAirlineCode(Array.from(codeArr));
    };
    dispatch(getFlightsListingAction({ callback }));
  };

  const airLines = (item) => {
    return item?.map?.((x) => {
      return (
        <View style={styles.rowSpace}>
          <View>
            <TextCompo style={styles.textCenter} bold>
              {"Flight Number"}
            </TextCompo>
            <TextCompo style={styles.textCenter}>{x?.flightNumber}</TextCompo>
          </View>
          <View>
            <TextCompo bold style={styles.textCenter}>
              {"Airline Name"}
            </TextCompo>
            <TextCompo style={styles.textCenter}>{x?.airlineName}</TextCompo>
          </View>
          <View>
            <TextCompo bold style={styles.textCenter}>
              {"Airline code"}
            </TextCompo>
            <TextCompo style={styles.textCenter}>{x?.airlineCode}</TextCompo>
          </View>
        </View>
      );
    });
  };

  const sort = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    dispatch(sortAction({ type: flightData?.sortedType === 1 ? -1 : 1 }));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={sort} style={{ flexDirection: "row" }}>
          <VectorIcon
            size={20}
            groupName={"FontAwesome"}
            name={
              flightData?.sortedType === 1
                ? "sort-amount-desc"
                : "sort-amount-asc"
            }
          />
          <TextCompo bold>Fare</TextCompo>
        </TouchableOpacity>
        <TextCompo large bold>
          Flights List{" "}
        </TextCompo>
        <VectorIcon
          onPress={() => {
            setFilterVisible(true);
          }}
          size={20}
          groupName={"MaterialCommunityIcons"}
          name="filter"
        />
      </View>
      <FlatLIstCOmponent
        onRefresh={() => {
          getFlightApiCall();
        }}
        data={flightData?.flightShowData}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item, index }) => {
          return (
            <View key={item?.id} style={styles.flightItemContainer}>
              <View style={styles.rowSpace}>
                <VectorIcon
                  color={"navy"}
                  groupName="Ionicons"
                  name={"airplane"}
                  size={20}
                />
                <View
                  style={[
                    styles.rowSpace,
                    {
                      width: "80%",
                    },
                  ]}
                >
                  <View style={styles.itemCenter}>
                    <TextCompo bold>
                      {new Date(item.displayData?.source?.depTime)
                        .getDay()
                        .toString()
                        .padStart(2, 0)}
                    </TextCompo>
                    <TextCompo>
                      {moment(
                        new Date(item.displayData?.source?.depTime).getMonth()
                      ).format("MMM")}
                    </TextCompo>
                  </View>
                  <View>
                    <TextCompo bold>
                      {item.displayData?.source?.airport?.airportCode}
                    </TextCompo>
                    <TextCompo>
                      {new Date(item.displayData?.source?.depTime).getHours() +
                        ":" +
                        new Date(
                          item.displayData?.source?.depTime
                        ).getMinutes()}
                    </TextCompo>
                  </View>
                  <VectorIcon
                    groupName={"Entypo"}
                    name="arrow-long-right"
                    size={40}
                    color="black"
                  />
                  <View>
                    <TextCompo bold>
                      {item.displayData?.destination?.airport?.airportCode}
                    </TextCompo>
                    <TextCompo>
                      {new Date(
                        item.displayData?.destination?.arrTime
                      ).getHours() +
                        ":" +
                        new Date(
                          item.displayData?.destination?.arrTime
                        ).getMinutes()}
                    </TextCompo>
                  </View>
                </View>
              </View>
              {airLines(item?.displayData?.airlines)}
              <View style={styles.rowSpace}>
                <TextCompo textColor={"navy"} bold>
                  {item.displayData?.totalDuration}
                </TextCompo>
                <TextCompo
                  textColor={"navy"}
                  bold
                >{`₹ ${item?.fare}`}</TextCompo>
              </View>
            </View>
          );
        }}
      />
      <Modal
        onShow={() => {
          setOldArr(filterArr);
        }}
        onRequestClose={() => {
          setFilterArr(oldFilterArr);
          setFilterVisible(false);
        }}
        animationType="slide"
        transparent
        visible={filterVisilble}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setFilterVisible(false);
            setFilterArr(oldFilterArr);
          }}
          style={styles.modalContainer}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalSubContainer}>
            <TextCompo style={styles.textCenter} bold large>
              FILTER
            </TextCompo>
            <ScrollView style={{ flex: 1 }}>
              {airlineCode.map((x) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={x}
                    style={styles.airLineContainer}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (filterArr.includes(x)) {
                          let index = filterArr.findIndex((x1) => x1 == x);
                          let arr = [...filterArr];
                          arr.splice(index, 1);
                          LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.linear
                          );
                          setFilterArr(arr);
                        } else {
                          let arr = [...filterArr];
                          arr.push(x);
                          LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.linear
                          );
                          setFilterArr(arr);
                        }
                      }}
                      style={styles.checkBox}
                    >
                      {filterArr.includes(x) ? (
                        <VectorIcon
                          groupName={"AntDesign"}
                          name={"check"}
                          color={"navy"}
                          size={20}
                        />
                      ) : null}
                    </TouchableOpacity>
                    <TextCompo bold style={{ marginHorizontal: scale(10) }}>
                      {x}
                    </TextCompo>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.rowSpace}>
              <TouchableOpacity
                onPress={() => {
                  if (filterArr.length) {
                    dispatch(filterAction(filterArr));
                    setFilterVisible(false);
                  } else {
                    Alert.alert(
                      "Select Airline code",
                      "Please Select Airline Code."
                    );
                  }
                }}
                style={styles.filterButton}
              >
                <TextCompo bold textColor={"#fff"}>
                  Filter
                </TextCompo>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFilterArr([]);
                  dispatch(resetAction());
                  setFilterVisible(false);
                }}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: "gray",
                  },
                ]}
              >
                <TextCompo bold textColor={"#fff"}>
                  Reset
                </TextCompo>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Flight;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    // backgroundColor:'blue'
  },
  flatListContainer: {
    paddingBottom: scale(100),
  },
  flightItemContainer: {
    backgroundColor: "white",
    shadowOpacity: 0.5,
    elevation: 1,
    padding: scale(10),
    marginVertical: scale(10),
    marginHorizontal: scale(5),
    borderRadius: scale(10),
  },
  rowSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemCenter: { alignItems: "center" },
  textCenter: { textAlign: "center" },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalSubContainer: {
    backgroundColor: "white",
    padding: scale(20),
    width: "90%",
    height: "50%",
    borderRadius: scale(20),
  },
  airLineContainer: {
    flexDirection: "row",
    marginTop: scale(10),
    alignItems: "center",
  },
  checkBox: {
    height: 25,
    width: 25,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButton: {
    backgroundColor: "green",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: scale(10),
  },
});
