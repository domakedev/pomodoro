import { useState, useEffect } from "react";
import "./App.css";
import GearIcon from "./assets/icons/gear.svg";
import Ring from "./assets/audio/ring.mp3";

// Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [timeEnd, setTimeEnd] = useState(false);
  const [timeRunning, setTimeRunning] = useState(false);
  const [timeConfig, setTimeConfig] = useState(false);

  useEffect(() => {
    const runTime = setInterval(async () => {
      clearInterval(runTime);

      if (timeRunning === true) {
        if (seconds === 0) {
          if (minutes > 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else if (minutes === 0) {
            setTimeRunning(false);
            setTimeEnd(true);
            await new Audio(Ring).play();

            const MySwal = withReactContent(Swal);

            MySwal.fire({
              title: "Termino el tiempo!",
              text: "Vuelve en 5 minutos",
              icon: "success",
              confirmButtonText: "Claro que si",
              customClass: {
                title: "alert-styles",
                container: "alert-styles",
              },
            });
          }
        } else {
          setSeconds(seconds - 1);
        }
      }

      console.log("seungo pasado");
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, timeRunning]);

  const minutesFormated = minutes >= 10 ? minutes : `0${minutes}`;
  const secondsFormated = seconds >= 10 ? seconds : `0${seconds}`;

  const handleConfigTime = () => {
    console.log("clicke en congid");
    setTimeConfig(!timeConfig);
  };

  const onChangeInput = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    if (e.target.name === "minutes") {
      setMinutes(Number(e.target.value));
    } else if (e.target.name === "seconds") {
      setSeconds(Number(e.target.value));
    }
  };

  const handlerRun = () => {
    if (seconds > 0 || minutes > 0) {
      setTimeRunning(!timeRunning);
      setTimeConfig(false);
    }
  };

  return (
    <div className="App">
      <div
        className={` time-container
      ${timeRunning ? "time-container__green" : ""}
      `}
      >
        <h2 className="time-count">
          {minutesFormated}:{secondsFormated}
        </h2>
        <button className="time-ss-button" onClick={handlerRun}>
          {timeRunning ? "STOP" : "START"}
        </button>
        <button className="time-config" onClick={handleConfigTime}>
          <img src={GearIcon} alt="configurar tiempo" />
        </button>
      </div>
      {timeConfig ? (
        <div className="time-config-inputs">
          <label htmlFor="minutes">
            Minutos
            <input
              type="number"
              min="0"
              max="59"
              id="minutes"
              name="minutes"
              onChange={onChangeInput}
            />
          </label>

          <label htmlFor="seconds">
            Segundos
            <input
              type="number"
              min="0"
              max="59"
              id="seconds"
              name="seconds"
              onChange={onChangeInput}
            />
          </label>
        </div>
      ) : (
        <div className="time-config-inputs"></div>
      )}
    </div>
  );
}

export default App;
