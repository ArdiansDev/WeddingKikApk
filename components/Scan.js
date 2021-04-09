import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native';

import database from '@react-native-firebase/database';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {LogBox} from 'react-native';

const Scan = ({route}) => {
  // console.log(route);
  const {itemId} = route.params;

  LogBox.ignoreLogs(['Setting a timer']);
  const scanner = useRef(null);
  const [scan, setScan] = useState(true);
  const [Nama, setNama] = useState('');
  const [Result, setResult] = useState('');
  const conditions = ['.', '#', '$', '[', ']'];
  function contains(target, pattern) {
    var value = 0;
    pattern.forEach(function (word) {
      value = value + target.includes(word);
    });
    return value === 1;
  }
  let today = new Date();
  const hh = String(today.getHours());
  const mm = String(today.getMinutes());
  const ss = String(today.getSeconds());
  function makeTwoDigits(time) {
    const timeString = `${time}`;
    if (timeString.length === 2) return time;
    return `0${time}`;
  }
  const timestamp = `${makeTwoDigits(hh)}${makeTwoDigits(mm)}${makeTwoDigits(
    ss,
  )}`;
  // console.log(contains(Result, conditions));

  const onSuccess = e => {
    setResult(e.data);
    setScan(false);
  };

  useEffect(() => {
    if (!Result) {
      //   alert('kosong');
    } else if (contains(Result, conditions)) {
      alert('QR  mengandung Link');
    } else {
      completeTodo();
    }
  }, [Result]);

  const update = () => {
    const todoRef = database().ref(itemId).child('Name').child(Result);
    todoRef.update({
      hadir: true,
      time: timestamp,
    });
  };

  const completeTodo = () => {
    database()
      .ref(itemId)
      .child('Name')
      .once('value', function (snapshot) {
        if (snapshot.hasChild(Result)) {
          update();
          HandleNama();
        } else alert('tidak terdaftar');
      });
  };

  const HandleNama = () => {
    database()
      .ref(itemId)
      .child('Name')
      .child(Result)
      .once('value', snapshot => {
        const Userdata = snapshot.val();
        console.log(Userdata.title);
        setNama(Userdata.title);
      });
  };

  return !scan ? (
    <View style={styles.containerTrue}>
      <Text style={styles.buttonText}>{Nama}</Text>

      <TouchableOpacity
        style={styles.buttonTouchable}
        onPress={() => setScan(true)}>
        <Text style={styles.buttonText}>START SCAN</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <QRCodeScanner
      onRead={onSuccess}
      ref={scanner}
      reactivate={true}
      showMarker={true}
      bottomContent={
        <>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => scanner.current.reactive()}></TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => setScan(false)}>
            <Text style={styles.buttonText}>STOP</Text>
          </TouchableOpacity>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  containerTrue: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  containerFalse: {
    backgroundColor: 'red',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,

    color: 'black',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scan;
