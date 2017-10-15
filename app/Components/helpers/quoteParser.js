import React from 'react';
import FadeInView from './FadeInView';
import {Animated, Text, View, StyleSheet} from 'react-native';


/**
 * Wraps a string around each character/letter
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input as splitted by chars/letters
 */
function wrapChars(str, tmpl) {

    return str.replace(/\w/g, tmpl || "<span>$&</span>");
}

/**
 * Wraps a string around each word
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by words
 */
/*function wrapWords(str, tmpl) {
/!*
    console.log(str.replace(/\w+/g, tmpl || '<FadeInView animationDelay="' + Math.random() * 500 + '">$&</FadeInView>'));
*!/

/!*
    return str.replace(/\w+/g, tmpl || <FadeInView animationDelay={Math.random() * 500}><Text>$&</Text></FadeInView>);
*!/
}*/

function wrapWords(str, style) {
    let quoteArray = str.split(" ");
    let newArray = quoteArray.map(function(word, index) {
        return <FadeInView key={index} animationDuration={2000} animationDelay={Math.random() * 2000 }><Text style={style}> {word}</Text></FadeInView>
    })
    return newArray;
}

/**
 * Wraps a string around each line
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by lines
 */
function wrapLines(str, tmpl) {
    return str.replace(/.+$/gm, tmpl || "<span>$&</span>");
}

export default wrapWords;