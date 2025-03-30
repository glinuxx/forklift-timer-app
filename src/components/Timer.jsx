import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo, FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [history, setHistory] = useState([]);

  // Carrega histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("timerHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("timer");
    if (savedData) {
      const { time, startTime, isRunning, lastUpdate } = JSON.parse(savedData);
      const elapsed = isRunning ? Math.floor((Date.now() - lastUpdate) / 1000) : 0;
      setTime(time + elapsed);
      setStartTime(startTime);
      setIsRunning(isRunning);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
        localStorage.setItem("timer", JSON.stringify({
          time: time + 1,
          startTime,
          isRunning: true,
          lastUpdate: Date.now()
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, startTime]);

  const handleStartPause = () => {
    if (!isRunning) {
      setStartTime(startTime || new Date().toLocaleTimeString());
    }
    setIsRunning(!isRunning);
    localStorage.setItem("timer", JSON.stringify({
      time,
      startTime,
      isRunning: !isRunning,
      lastUpdate: Date.now()
    }));
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setStartTime(null);
    setEndTime(null);
    localStorage.removeItem("timer");
  };

  const handleFinish = () => {
    const finalTime = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const newRecord = {
      id: Date.now(),
      date,
      startTime,
      endTime: finalTime,
      totalTime: formatTime(time)
    };

    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    localStorage.setItem("timerHistory", JSON.stringify(updatedHistory));

    handleReset();
  };

  const handleDelete = (id) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("timerHistory", JSON.stringify(updatedHistory));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Descarregamento de Carreta</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <p className="text-lg font-semibold">Hora de Início: {startTime || "--:--:--"}</p>
        <p className="text-lg font-semibold">Hora de Finalização: {endTime || "--:--:--"}</p>
        <p className="text-2xl font-bold text-gray-800 my-4">{formatTime(time)}</p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 text-white p-2 rounded-lg shadow" onClick={handleStartPause}>
            {isRunning ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button className="bg-yellow-500 text-white p-2 rounded-lg shadow" onClick={handleReset}><FaRedo size={20} /></button>
          <button className="bg-blue-500 text-white p-2 rounded-lg shadow" onClick={handleFinish}><FaCheck size={20} /></button>
        </div>
      </div>
      <h2 className="text-lg font-semibold mt-6">Histórico</h2>
      <ul className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md mt-4">
        <li className="flex justify-between font-bold border-b pb-2">
          <span>Data</span>
          <span>Início</span>
          <span>Término</span>
          <span>Total</span>
          <span>Ações</span>
        </li>
        {history.map(({ id, date, startTime, endTime, totalTime }) => (
          <li key={id} className="flex justify-between items-center p-2 border-b">
            <span className="text-gray-700">{date}</span>
            <span className="text-gray-700">{startTime}</span>
            <span className="text-gray-700">{endTime}</span>
            <span className="text-gray-700">{totalTime}</span>
            <div className="flex gap-2">
              <button className="text-blue-500"><FaEdit size={18} /></button>
              <button className="text-red-500" onClick={() => handleDelete(id)}><FaTrash size={18} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Timer as default, Timer };
