import { useState } from "react";
import "./App.css";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("te");
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async () => {
    const url = "https://text-translator2.p.rapidapi.com/translate";

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", targetLang);
    encodedParams.append("text", inputText);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "d2ac7d8b1cmsh97e38ac8cf170a5p147c71jsn2fc816003285",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: encodedParams,
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);

      if (result.data && result.data.translatedText) {
        setTranslatedText(result.data.translatedText);
      } else {
        setTranslatedText("Translation failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setTranslatedText("Error occurred.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌐 Translator App</h1>

      <textarea
        className="inputBox"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      />

      <select
        className="dropdown"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
      >
        <option value="te">Telugu</option>
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="kn">Kannada</option>
      </select>

      <button className="btn" onClick={translateText}>
        Translate
      </button>

      <h3 className="outputTitle">Translated Text:</h3>
      <p className="outputBox">{translatedText}</p>
    </div>
  );
}