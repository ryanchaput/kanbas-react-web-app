import React from 'react';
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from './ReduxExamples';

const Assignment4 = () => {
    function sayHello() {
        alert("Hello");
    }
    return (
        <>
            <h1>Assignment 4</h1>
            <ReduxExamples />
            <PassingFunctions theFunction={sayHello} />
        </>
    );
};
export default Assignment4;