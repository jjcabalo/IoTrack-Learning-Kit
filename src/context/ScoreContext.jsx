import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [studentName, setStudentName] = useState('');
  const [scores, setScores] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedName = localStorage.getItem('iotrack_student_name');
    if (savedName) setStudentName(savedName);

    const savedScores = localStorage.getItem('iotrack_student_scores');
    if (savedScores) setScores(JSON.parse(savedScores));
    
    const savedDone = localStorage.getItem('iotrack_student_done');
    if (savedDone) setIsDone(savedDone === 'true');
  }, []);

  const saveName = (name) => {
    setStudentName(name);
    localStorage.setItem('iotrack_student_name', name);
  };

  const recordAnswer = (moduleId, qIndex, isCorrect, question, answerText) => {
    if (isDone) return;
    setScores(prev => {
      const newScores = {
        ...prev,
        [moduleId]: {
          ...(prev[moduleId] || {}),
          [qIndex]: { isCorrect, question, answerText }
        }
      };
      localStorage.setItem('iotrack_student_scores', JSON.stringify(newScores));
      return newScores;
    });
  };

  const submitCourse = async () => {
    if (!studentName || isDone || isSubmitting) return;
    setIsSubmitting(true);
    
    let totalQuestions = 0;
    let correctAnswers = 0;
    
    const scoresJson = {};
    const modules = Object.keys(scores);
    
    modules.forEach(modId => {
      let modCorrect = 0;
      let modTotal = 0;
      Object.keys(scores[modId]).forEach(qIdx => {
        modTotal++;
        totalQuestions++;
        if (scores[modId][qIdx].isCorrect) {
          modCorrect++;
          correctAnswers++;
        }
      });
      scoresJson[modId] = {
        score: modCorrect,
        total: modTotal,
        details: scores[modId]
      };
    });

    const payload = {
      student_name: studentName,
      total_score: correctAnswers,
      max_score: totalQuestions,
      module_scores: scoresJson,
      submitted_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('student_scores')
        .insert([payload]);
        
      if (error) {
        console.error("Error submitting to Supabase:", error);
        alert("Failed to submit score: " + error.message);
        setIsSubmitting(false);
        return false;
      }
      
      setIsDone(true);
      localStorage.setItem('iotrack_student_done', 'true');
      setIsSubmitting(false);
      return true;
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      return false;
    }
  };

  return (
    <ScoreContext.Provider value={{ studentName, saveName, scores, recordAnswer, submitCourse, isDone, isSubmitting }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  return useContext(ScoreContext);
}
