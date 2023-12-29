import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleStartQuiz = ()=>{
    setLoading(true)
    setTimeout(()=>{
      navigate("/quiz")
      setLoading(false)
    },2000)

  }
  return (
    <section className="lg:w-9/12 md:w-[90%] mx-auto mt-12">
      {loading && <Loading/> }
      <div className="xl:flex text-center xl:text-left justify-between items-center">
        <div>
          <h2 className="my-8 lg:leading-normal lg:text-4xl text-3xl font-medium text-[#333] md:w-4/6">
            Learn new concepts for each question
          </h2>
          <p className="py-2 mb-6 xl:w-2/3 text-gray-500 pl-2 border-l-4 border-indigo-700">
            We help you prepare for exams and quizzes
          </p>
          <div className="space-x-3">
            
              <button onClick={handleStartQuiz} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg border border-primary-2 hover:bg-transparent hover:text-black duration-300 ease-in">
                Start Quize
              </button>
            
            <button className="px-4 py-2  font-semibold rounded-lg border border-primary-2 text-primary hover:bg-primary hover:text-white duration-300 ease-in">
              Read more
            </button>
          </div>
        </div>
        <div>
          <img src="../public/images/banner.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Home;
