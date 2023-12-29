import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading"

const loading = ()=>{
  <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]" >
    <p className="text-xl text-gray-500" >Loading......</p>
  </div>
}


const formatTime = (seconds)=>{
  const minutes = Math.floor(seconds/60);
  const remaininggSeconds = seconds % 60;
  const formatedTime = `${String(minutes).padStart(2,"0")};${String(remaininggSeconds).padStart(2,"0")}`
  return formatTime
}




const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading,setLoading] = useState(false)
  const [timer,setTimer]= useState(60)
  const [status, setStatus] = useState("")
  const[timerIntervalId, setTimerIntervalId] = useState("")

  useEffect(() => {
    fetch("/quiz.json")
      .then((res) => res.json())
      .then((data) => 
      setQuestions(data));
      const intervalId = setInterval(()=>{
        setTimer((prevTimer)=> prevTimer - 1)
      },1000)
      setTimerIntervalId(intervalId);
      return()=>{
        clearInterval(intervalId)
        if(timer ===0){
          alert("Time is Out")
        }
      }
  }, [timer]);

  const handleAnswerSelect = (questionId, selectedOption)=>{
    const updateAnswer = {...answer,[questionId]:selectedOption}
    setAnswer(updateAnswer)

  }

  const handleSubmit = ()=>{
      window.scrollTo({top:0,behavior:"smooth"})
      setLoading(true)

      clearInterval(timerIntervalId);

      setTimeout(()=>{
        const quizeScore = calculateScore(answer)
        setScore(quizeScore)
        const percentage = (quizeScore/questions.length)*100
        const newStatus = percentage >= 50? "Passed":"Failed"
        setStatus(newStatus)
        setShowResult(true)
        setLoading(false)
      },3000)

  }

 const calculateScore = (userAnswers)=>{
  const correctAnswers = questions.map((question)=>question.answer)
  let score = 0;
  for(const questionId in userAnswers){
    if(userAnswers[questionId]===correctAnswers[questionId - 1]){
      score ++;
    }
  }
  return score
}
  return <div>
    
    <div className="md:w-9/12 w-[90%] mx-auto px-10 my-8 xl:flex">
       <div className="md:w-[70%] w-full  ">
       {
          questions.map((question,index)=>(
           <div key={question.id} className="m-3 py-3 px-4 shadow-sm border border-gray-900 rounded">
            <p className="flex items-center rounded p-2 cursor-pointer text-xl"> <span className="h-8 w-8 bg-primary rounded flex justify-center items-center mr-2">{index+1}</span> {question.question}</p>


            <div className="grid grid-cols-2 gap-4 mt-5">
              {
                question.options.map((option,index)=>(
                  <div onClick={()=>handleAnswerSelect(question.id,option)} key={index} className={`border border-gray-200 rounded taxt-sm coursor-pointer ${answer[question.id] === option ?"bg-gray-300":""}`}>
                      <p className="text-sm mb-1 p-2">Potion{index +1}</p>
                      <p className="text-sm p-2">{option}</p>
                  </div>
                ))
              }
            </div>
           </div>
          ))
    }
     <button onClick={handleSubmit}  className="px-4 py-2 bg-primary text-white font-semibold rounded-lg border border-primary-2 hover:bg-transparent hover:text-black duration-300 ease-in">
               Submit Quize
              </button>
       </div>

       {/* show answers  */}

       <div className="md:w-[30%] w-full p-4    " >
        {
          showResult && (
          <div>
            <h3 className="text-2xl font-medium" >Your Score:</h3>
            <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
              <h3 className={`text-xl ${status === "passed"? "text-green-800":"text-red-500"}`}>{status}</h3>
               <h1 className="font-semibold text-xl">{score*10} <span>/60</span></h1>
               {/* <p className="font-medium text-lg">Total Time: <span>
                {formatTime(60 -timer) }  <span>sec.</span>
                </span></p> */}
                <Link to="/" >  <button  className="px-4 py-2 bg-primary text-white font-semibold rounded-lg border border-primary-2 hover:bg-transparent hover:text-black duration-300 ease-in"> Restart</button>  </Link>
            </div>
           
          </div>
        )}

        {
          loading && <Loading/>
        }


       </div>



    </div>
  
  </div>;
};

export default Quiz;




