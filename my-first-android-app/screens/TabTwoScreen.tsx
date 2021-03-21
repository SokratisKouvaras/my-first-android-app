import * as React from 'react';
import { StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
/* import Icon from 'react-native-vector-icons/Ionicons'; */
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { FlatList } from 'react-native-gesture-handler';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';



type MyProps = { };
type MyState = { isLoading: boolean, dataSource: any };
export default class TabTwoScreen extends React.Component <MyProps, MyState> {

constructor(props){
  super(props);
  /* This represents the current state of this component */
  this.state = {
    /* We start with a loading API with an empty datasource*/
    isLoading:true,
    dataSource:null,
  }
}

/*
componentDidMount is invoked immediately after a component is mounted (inserted into the tree). 
Initialization that requires DOM nodes should go here. 
If you need to load data from a remote endpoint, 
this is a good place to instantiate the network request. 
*/

componentDidMount(){
  this.apiCall();
  }

  async apiCall(){
    /* Fetch does a GET request but you can pass 2nd arg for POST */
    let resp = await fetch('https://facebook.github.io/react-native/movies.json')
    /* Convert response to json */
    let responseJson = await resp.json()
    console.log(responseJson)

      /* At this point we have the data which means we are not loading anymore
      and our dataSource can be populated by the data
       */
      this.setState({
        isLoading:false,
        dataSource: responseJson.movies
      })
  }

  /* Each screen is a class with a render method that is returning the view */
  render(){
    /* If the screen is still loading and data are not present yet... */
    if (this.state.isLoading){
      return(
        /* ...render a spinning loader */
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {

  return (
    <View>

      <View>
        <Text> hjjhh </Text>
        <FlatList 
        data={this.state.dataSource}
        renderItem={({item})=><Text>{item.title}</Text>}
         ></FlatList>
      </View>
      <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
           {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
                   ]
              }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
  />
    </View>
  </View>
  )
      }
      }
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
