import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconMicrophone } from "@tabler/icons-react";

const SpeechRecognitionComponent = ({ setSourceText }) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [microphoneAvailable, setMicrophoneAvailable] = useState(false);

  useEffect(() => {
    if (!listening && transcript) {
      setSourceText(transcript);
    }
  }, [listening, transcript, setSourceText]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioInputDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );
        setMicrophoneAvailable(audioInputDevices.length > 0);
      })
      .catch((err) => {
        console.error("Error enumerating devices:", err);
      });
  }, []);

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!microphoneAvailable) {
    return <span>Microphone is not available.</span>;
  }

  return (
    <div>
      <IconMicrophone
        size={22}
        className={listening ? "text-red-500" : "text-gray-400"}
        onClick={handleVoiceRecording}
      />
    </div>
  );
};

export default SpeechRecognitionComponent;
