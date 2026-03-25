import React from "react";
import { Link } from "react-router-dom";

const JavaMCQ = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Java Basic MCQs</h1>
      <p>Total Questions: 20</p>

      <ol>
        <li>Java is an Object Oriented Language.</li>
        <li>JVM stands for Java Virtual Machine.</li>
        <li>main() is the entry point of Java program.</li>
        <li>int size is 4 bytes.</li>
        <li>Java does not support pointers.</li>
        <li>Inheritance keyword is extends.</li>
        <li>Java is platform independent.</li>
        <li>String is not primitive type.</li>
        <li>Java supports garbage collection.</li>
        <li>Class is blueprint of object.</li>

        <li>Java arrays are static.</li>
        <li>do-while runs at least once.</li>
        <li>Object class is parent of all.</li>
        <li>Java bytecode runs on JVM.</li>
        <li>Interface supports multiple inheritance.</li>
        <li>this keyword refers current object.</li>
        <li>final keyword prevents inheritance.</li>
        <li>Java uses automatic memory management.</li>
        <li>Java is secure.</li>
        <li>Java is robust.</li>
      </ol>

      <Link to="/trainings">
        <button style={{ marginTop: "20px" }}>⬅ Back to Trainings</button>
      </Link>
    </div>
  );
};

export default JavaMCQ;
