import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [number1, setnumber1] = useState("");
  const [number2, setnumber2] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("api/calculation", {
        number1,
        number2,
      });
      setResult(response.data.data);
    } catch (error) {
      console.error("Error calculating result:", error);
    }
  };

  const handlePrintPDF = async () => {
    try {
      const response = await axios.get("api/download-pdf-file", {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "result.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="text-center">
        <h1>Fill the Form</h1>
      <form className="w-50 border border-black p-4 m-auto align-content-center justify-content-center rounded-2">
        <div className="mb-3">
          <label className="form-label">Number One</label>
          <input type="number" className="form-control" required value={number1} onChange={(e) => setnumber1(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Number One</label>
          <input type="number" className="form-control" required value={number2} onChange={(e) => setnumber2(e.target.value)}/>
        </div>
        <div className="d-flex flex-row justify-content-evenly">
          <div>
            <button type="submit" className="btn btn-primary" onClick={handleCalculate}>
              Calculate
            </button>
          </div>
          <div>
            <h2>Result: {result}</h2>
          </div>
        </div>
      </form>

      <button type="submit" className="btn btn-primary text-center mt-2"  disabled={!result} onClick={handlePrintPDF}>
        Print
      </button>
    </div>
  );
}

export default App;
