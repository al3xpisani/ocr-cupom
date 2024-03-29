import logo from './logo.svg';
import React, { useEffect, useState, useMemo } from "react";
import Tesseract from "tesseract.js";

function App() {
  const [ocr, setOcr] = useState("Recognizing...");
  useEffect(() => {
    doOCR();
  }, []);

  const doOCR = async () => {
    let timeStarting = new Date().getTime();
    console.log("starting ......");

    Tesseract.recognize("https://i.ibb.co/.......png", "por", {
      logger: ({ status, progress }) => {
        console.log(status, ` -> ` + Math.round(progress * 100) + ` %`);
      },
    }).then(({ data: { text } }) => {
      // console.log("text recognized.... ", text);

      let timeEnding = new Date().getTime();
      var difference = timeEnding - timeStarting;
      var minutesDifference = Math.floor(difference / 1000 / 60);
      difference -= minutesDifference * 1000 * 60;
      var secondsDifference = Math.floor(difference / 1000);

      console.log(
        "End recognition in minutes ................",
        minutesDifference
      );
      console.log(
        "End recognition in seconds ................",
        secondsDifference
      );
      setOcr(text);

      const invoiceExtractedLines = [];
      const invoiceContent = text.split("\n");
      console.log("Reading text..............");
      invoiceContent.forEach((element) => {
        invoiceExtractedLines.push(element);
      });
      console.log(invoiceExtractedLines);
    });
  };
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
