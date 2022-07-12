/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TaskInformation = ({ error, trackingId, task }) => {

  const type = task.type;
  const status = task.status;
  const outcome = task.outcome;
  const estimatedCompletionTime = `${task.estimatedCompletionTime?.toDateString()}, ${task.estimatedCompletionTime?.toLocaleTimeString()}`;
  const numStops = task.numStops;

  if (trackingId && error) {
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, color: 'red' }}>{error}</Text>
      </View>
    )
  }

  if (trackingId && (status === 'CLOSED')) {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>TASK TYPE: <Text style={styles.bold}>{type}</Text></Text>
        <Text style={styles.text}>TASK STATUS: <Text style={styles.bold}>{status}</Text></Text>
        <Text style={styles.text}>TASK OUTCOME: <Text style={styles.bold}>{outcome}</Text></Text>
      </View>
    )
  }

  if (trackingId && status) {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>TASK TYPE: <Text style={styles.bold}>{type}</Text></Text>
        <Text style={styles.text}>TASK STATUS: <Text style={styles.bold}>{status}</Text></Text>
        <Text style={styles.text}># STOPS REMAINING: <Text style={styles.bold}>{numStops}</Text></Text>
        <Text style={styles.text}>ESTIMATED COMPLETION TIME: <Text style={styles.bold}>{estimatedCompletionTime}</Text></Text>
      </View>
    )
  } else if (trackingId){
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, fontStyle: 'italic' }}>Enter a tracking ID to see shipment information.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 5,
    width: '70%',
    marginLeft: 20
  },
  text: {
    marginBottom: 15,
    fontSize: '0.8rem'
  },
  bold: {
    fontWeight: 'bold',
  }
});

export default TaskInformation;
