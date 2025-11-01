// import { useEffect, useState } from "react";

// const useTranslate = (sourceText, selectedLanguage) => {
//   const [targetText, setTargetText] = useState("");

//   useEffect(() => {
//     const handleTranslate = async () => {
//       if (!sourceText.trim()) {
//         setTargetText("");
//         return;
//       }

//       try {
//         const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
//         const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             q: sourceText,
//             target: selectedLanguage,
//           }),
//         });

//         const data = await response.json();

//         if (data.error) {
//           console.error("Error translating text:", data.error.message);
//           setTargetText(
//             "Translation error occurred. Please check your API key configuration."
//           );
//         } else {
//           setTargetText(data.data.translations[0].translatedText);
//         }
//       } catch (error) {
//         console.error("Error translating text:", error);
//         setTargetText(
//           "Translation error occurred. Please check your API key configuration."
//         );
//       }
//     };

//     const timeoutId = setTimeout(() => {
//       handleTranslate();
//     }, 500); // Adjust the delay as needed

//     return () => clearTimeout(timeoutId);
//   }, [sourceText, selectedLanguage]);

//   return targetText;
// };

// export default useTranslate;

// import { useEffect, useState } from "react";

// const useTranslate = (sourceText, selectedLanguage) => {
//   const [targetText, setTargetText] = useState("");

//   useEffect(() => {
//     const handleTranslate = async () => {
//       if (!sourceText.trim()) {
//         setTargetText("");
//         return;
//       }

//       try {
//         const response = await fetch("https://libretranslate.de/translate", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             q: sourceText,
//             source: "auto",
//             target: selectedLanguage,
//             format: "text",
//           }),
//         });

//         const data = await response.json();

//         if (data.error) {
//           console.error("Error translating text:", data.error);
//           setTargetText("Translation error — free API limit or server busy.");
//         } else {
//           setTargetText(data.translatedText);
//         }
//       } catch (error) {
//         console.error("Error translating text:", error);
//         setTargetText("Translation error — server unreachable.");
//       }
//     };

//     const timeoutId = setTimeout(() => {
//       handleTranslate();
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [sourceText, selectedLanguage]);

//   return targetText;
// };

// export default useTranslate;

import { useEffect, useState } from "react";

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    if (!sourceText.trim()) {
      setTargetText("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            sourceText
          )}&langpair=en|${selectedLanguage}`
        );

        const data = await response.json();

        if (data?.responseData?.translatedText) {
          setTargetText(data.responseData.translatedText);
        } else {
          setTargetText("Translation failed — try again.");
        }
      } catch (error) {
        console.error("Translation error:", error);
        setTargetText("Translation error — network issue.");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
