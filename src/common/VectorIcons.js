import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto'

const colordef = 'black';

const VectorIcons = {
    AntDesign,
    MaterialIcons,
    EvilIcons,
    Entypo,
    FontAwesome,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    Zocial,
    Feather,
    Octicons,
    SimpleLineIcons,
    Fontisto
};

const VectorIcon = ({ groupName, name, size, style, color,onPress }) => {
    const Icon = VectorIcons[groupName];
    return (
        <Icon
        onPress={onPress}
            name={name}
            size={size}
            style={style}
            color={color != null ? color : colordef}
        />
    );
};

export default VectorIcon;
