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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskModel } from './MapComponent';

interface Props {
  error: string | undefined;
  trackingId: string;
  task: TaskModel;
}

const TaskInformation: React.FC<Props> = ({ error, trackingId, task }) => {
  let message;
  const estimatedCompletionTime =
    task.estimatedCompletionTime?.toLocaleString();
  const numStops = task.remainingStopCount ? task.remainingStopCount : 0;

  if (numStops >= 2) {
    message = `${numStops} stops away`;
  } else if (numStops === 1) {
    message = 'You are the next stop';
  } else {
    message = task.outcome;
  }

  if (error) {
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (trackingId && task.status === 'CLOSED') {
    return (
      <View style={styles.view}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.label}>TASK STATUS</Text>
        <Text style={styles.text}>{task.status}</Text>
        <Text style={styles.label}>TASK OUTCOME</Text>
        <Text style={styles.text}>{task.outcome}</Text>
      </View>
    );
  }

  if (trackingId && task.status) {
    return (
      <View style={styles.view}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.label}>TASK STATUS</Text>
        <Text style={styles.text}>{task.status}</Text>
        <Text style={styles.label}># STOPS REMAINING</Text>
        <Text style={styles.text}>{numStops}</Text>
        <Text style={styles.label}>ESTIMATED COMPLETION TIME</Text>
        <Text style={styles.text}>{estimatedCompletionTime}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <Text style={{ ...styles.text, fontStyle: 'italic' }}>
          Enter a tracking ID to see shipment information.
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    padding: 5,
    marginTop: 10,
  },
  label: {
    fontSize: 10,
  },
  text: {
    marginVertical: 10,
    fontSize: 16,
  },
  message: {
    fontSize: 20,
    marginBottom: 15,
  },
});

export default TaskInformation;
