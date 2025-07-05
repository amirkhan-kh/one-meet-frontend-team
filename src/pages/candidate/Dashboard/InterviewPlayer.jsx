import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InterviewPlayer.css";

const InterviewPlayer = ({ interviewId }) => {
  const [status, setStatus] = useState("loading");
  const [audioUrl, setAudioUrl] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [mutedMessage, setMutedMessage] = useState("");

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const summarizeTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  console.log(mediaStream);

  const statusRef = useRef(status);
  const isMutedRef = useRef(false);
  const navigate = useNavigate();

  const SILENCE_THRESHOLD_MS = 5000;
  const AOS_TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const showTemporaryMessage = (message) => {
    setMutedMessage(message);
    setTimeout(() => setMutedMessage(""), 2000);
  };

  const summarize = async () => {
    try {
      setStatus("loading");
      setAudioUrl("");

      const response = await fetch(
        `https://api.onemeet.app/interview/candidate/${interviewId}/summarize`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AOS_TOKEN}`,
          },
        }
      );

      const isCompleted =
        response.headers.get("X-Interview-Completed") === "true";

      if (!response.ok) {
        const errorText = await response.text(); // Only read if needed
        console.error("❌ Summarize failed (non-200)", {
          status: response.status,
          errorText,
        });
        navigate("/candidate");
        return;
      }

      const blob = await response.blob();

      if (!blob || blob.size === 0) {
        console.error("❌ Empty audio blob in summarize response");
        navigate("/candidate");
        return;
      }

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setStatus(isCompleted ? "aiFinalSpeaking" : "aiSpeaking");
    } catch (error) {
      console.error("❌ Error during summarize:", error);
      navigate("/candidate");
    }
  };

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setStatus("loading");
        setAudioUrl("");

        const response = await fetch(
          `https://api.onemeet.app/interview/candidate/start/${interviewId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${AOS_TOKEN}`,
            },
          }
        );

        const contentType = response.headers.get("Content-Type");
        if (!response.ok || !contentType.includes("audio")) {
          console.error("❌ Interview start failed", {
            status: response.status,
            contentType,
            responseText: await response.text(),
          });
          navigate("/candidate");
          return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setStatus("aiSpeaking");
      } catch (error) {
        console.error("❌ Error fetching interview audio:", error);
        navigate("/candidate");
      }
    };

    fetchAudio();
  }, [interviewId, navigate, AOS_TOKEN]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (statusRef.current === "aiFinalSpeaking") {
        navigate("/candidate/finish");
      } else {
        setStatus("userSpeaking");
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [audioUrl, navigate]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("📷 Camera access error:", error);
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    if (status !== "userSpeaking") return;

    let silenceStart = null;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMediaStream(stream);

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorderRef.current = mediaRecorder;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkSilence = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
          const now = Date.now();

          if (volume < 5) {
            if (!silenceStart) silenceStart = now;
            else if (
              !isMutedRef.current &&
              now - silenceStart > SILENCE_THRESHOLD_MS &&
              statusRef.current === "userSpeaking"
            ) {
              stopRecording();
              setStatus("loading");
              summarize();
              return;
            }
          } else {
            silenceStart = null;
          }

          if (statusRef.current === "userSpeaking") {
            silenceTimerRef.current = requestAnimationFrame(checkSilence);
          }
        };

        checkSilence();

        mediaRecorder.ondataavailable = async (event) => {
          if (event.data.size > 0 && !isMutedRef.current) {
            const formData = new FormData();
            formData.append("file", event.data);

            try {
              await fetch(
                `https://api.onemeet.app/interview/candidate/chunks/${interviewId}`,
                {
                  method: "POST",
                  headers: { Authorization: `Bearer ${AOS_TOKEN}` },
                  body: formData,
                }
              );
            } catch (error) {
              console.error("⚠️ Error sending chunk:", error);
            }
          } else if (isMutedRef.current) {
            console.log("❌ Skipped chunk because user is muted");
          }
        };

        mediaRecorder.start(3000);

        if (!isMutedRef.current) {
          summarizeTimeoutRef.current = setTimeout(() => {
            summarize();
          }, 5 * 60 * 1000);
        }
      } catch (error) {
        console.error("🎙️ Audio recording error:", error);
      }
    };

    startRecording();

    return () => {
      stopRecording();
      if (silenceTimerRef.current)
        cancelAnimationFrame(silenceTimerRef.current);
      if (summarizeTimeoutRef.current)
        clearTimeout(summarizeTimeoutRef.current);
    };
  }, [status]);

  const stopRecording = async () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      try {
        await audioContextRef.current.close();
      } catch (err) {
        console.warn("⚠️ AudioContext close error:", err.message || err);
      }
    }

    if (statusRef.current !== "stopped") {
      setStatus("stopped");
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      isMutedRef.current = next;
      console.log(
        next
          ? "🎙️ Muted: Chunks will NOT be sent"
          : "🎙️ Unmuted: Chunks will be sent"
      );
      showTemporaryMessage(next ? "You are muted" : "You are unmuted");
      return next;
    });
  };

  return (
    <div className="interview-container">
      {status === "aiSpeaking" || status === "aiFinalSpeaking" ? (
        audioUrl ? (
          <div className="ai-speaking-waves sequential-dots">
            <span className="dot first"></span>
            <span className="dot second"></span>
            <span className="dot third"></span>
          </div>
        ) : null
      ) : status === "loading" ? (
        <div className="loading-ring"></div>
      ) : (
        <div className="listening-loader">
          <div className="pulse-circle"></div>
        </div>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          autoPlay
          src={audioUrl}
          style={{ display: "none" }}
        />
      )}

      <video
        ref={videoRef}
        className="webcam-preview"
        autoPlay
        muted
        playsInline
      />

      <div className="button-row bottom-buttons">
        <button className="icon-button" onClick={toggleMute}>
          <i className={`fas fa-microphone${isMuted ? "-slash" : ""}`}></i>
        </button>

        <button
          className="icon-button danger"
          onClick={() => setShowExitConfirm(true)}
        >
          <i
            className="fas fa-phone"
            style={{ transform: "rotate(135deg)" }}
          ></i>
        </button>
      </div>

      {mutedMessage && <div className="muted-info-banner">{mutedMessage}</div>}

      {showExitConfirm && (
        <div className="exit-confirm-modal">
          <div className="exit-dialog">
            <h3>Are you sure you want to leave the interview?</h3>
            <p>
              If you leave now, the interview will be{" "}
              <strong>marked as incomplete</strong>, and recruiters will not be
              able to view your results.
            </p>
            <div className="exit-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowExitConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="leave-btn"
                onClick={() => navigate("/candidate")}
              >
                Yes, Leave Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPlayer;
