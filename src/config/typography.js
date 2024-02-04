import { useRef } from 'react';
import { Dimensions } from 'react-native';

const percentageCalculation = (max, val) => max * (val / 100);

const fontCalculation = (height, width, val) => {
    const widthDimension = height > width ? width : height;
    const aspectRatioBasedHeight = (16 / 9) * widthDimension;
    return percentageCalculation(
        Math.sqrt(
            Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
        ),
        val,
    );
};

export const responsiveScreenHeight = h => {
    const { height } = Dimensions.get('window');
    return percentageCalculation(height, h);
};

export const responsiveScreenWidth = w => {
    const { width } = Dimensions.get('window');
    return percentageCalculation(width, w);
};

export const responsiveScreenFontSize = f => {
    const { height, width } = Dimensions.get('window');
    return fontCalculation(height, width, f);
};

 export const screenWidth = Dimensions.get('window').width;
 export const screenHeight = Dimensions.get('window').height;

