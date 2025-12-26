import React, { useEffect, useState } from 'react'

function QuestionsLibrary(){
    const [level,setLevel] = useState("Easy")
    const [complete,setComplete] = useState(()=>{
      const save = localStorage.getItem("completedQuestions")
      return save ? JSON.parse(save):{
      Easy:{},
      Medium:{},
      Hard:{}
      }
    })
    useEffect(()=>{
      localStorage.setItem("completedQuestions",JSON.stringify(complete))
    },[complete])

    const todoComplete = (cat,i)=>{
      setComplete(x=>({...x,
        [cat]:{...x[cat],
          [i]:!x[cat][i]
        }
      }))
    }

    let Questions = {
    Easy: [
      "📗 Write a program to print numbers from 1 to 100.",
      "📗 Find the sum of all elements in an array.",
      "📗 Reverse an array without using built-in methods.",
      "📗 Check if a number is prime.",
      "📗 Count vowels in a given string.",
      // "📗 Find the Largest Element in the Array."
    ],
    Medium: [
      "📙 Find the second largest number in an array.",
      "📙 Remove duplicates from an array without Set.",
      "📙 Implement a function to merge two sorted arrays.",
      "📙 Find the longest word in a sentence.",
      "📙 Rotate an array by K positions."
    ],
    Hard: [
      "📕 Implement binary search recursively.",
      "📕 Create a stack and queue using arrays.",
      "📕 Detect a cycle in a linked list (Floyd’s Algorithm).",
      "📕 Find the longest substring without repeating characters.",
      "📕 Binary search in a rotated sorted array."
    ]
}
    return (
    <div style={{ padding: "15px", fontFamily:"sans-serif" }}>
      {/* <h2>🧠 Coding Problem Library</h2> */}
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <p>Choose difficulty:</p>
        <button onClick={() => setLevel("Easy")} 
          style={{height:"32px",padding: "6px 14px",borderRadius: "6px",border: "none",cursor: "pointer",
          background: level === "Easy" ? "#4caf50" : "#555",color: "#fff",fontWeight: "bold",transition: "0.2s"
        }}>Easy</button>

        <button onClick={() => setLevel("Medium")}
          style={{height:"32px",padding: "6px 14px",borderRadius: "6px",border: "none",cursor: "pointer",
          background: level === "Medium" ? "#ff9800" : "#555",color: "#fff",fontWeight: "bold",transition: "0.2s"
        }}>Medium</button>

        <button onClick={() => setLevel("Hard")}
          style={{height:"32px",padding: "6px 14px",borderRadius: "6px",border: "none",cursor: "pointer",
          background: level === "Hard" ? "#f44336" : "#555",color: "#fff",fontWeight: "bold",
        }}>Hard</button>
      </div>

      <h3>{level.toUpperCase()} PROBLEMS</h3>
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {Questions[level].map((q, i) => (
          <li key={i} style={{margin: "8px 0px",fontWeight: "500",display: "flex",alignItems: "center",gap: "8px"}}>
      <input type="checkbox"
        checked={complete[level][i] || false}
        onChange={() => todoComplete(level, i)}/>
      <span style={{
        textDecoration: complete[level][i] ? "line-through" : "none",
        opacity: complete[level][i] ? 0.7 : 1
      }}>{q}</span></li>
       ))}
      </ul>
    </div>
  );
}

export default QuestionsLibrary