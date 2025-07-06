import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const PreCheckPage = () => {
  const navigate = useNavigate();
  const entryId = localStorage.getItem('entryId');

  const [status, setStatus] = useState('Please complete each step.');
  const [countdown, setCountdown] = useState(5);

  const [micOk, setMicOk] = useState(false);
  const [silentOk, setSilentOk] = useState(false);
  const [speedOk, setSpeedOk] = useState(false);
  const [camOk, setCamOk] = useState(false);
  const [screenOk, setScreenOk] = useState(false);
  const [tabsClosed, setTabsClosed] = useState(false);
  const [deviceSupported, setDeviceSupported] = useState(true);

  const streamRef = useRef(null);

  const isValidDevice = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(ua);
    const isTooSmall = window.innerWidth < 1024 || window.innerHeight < 600;
    return !isMobile && !isTooSmall;
  };

  useEffect(() => {
    if (!isValidDevice()) {
      setDeviceSupported(false);
      setStatus('This interview is only allowed on a laptop or desktop with normal screen size ❌');
    }
  }, []);

  const requestMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setMicOk(true);
      setStatus('Microphone access granted ✅');
    } catch {
      setStatus('Microphone access denied ❌');
    }
  };

  const detectSilence = () => {
    return new Promise((resolve, reject) => {
      try {
        const stream = streamRef.current;
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);

        const data = new Uint8Array(analyser.fftSize);
        let silenceStart = Date.now();

        const check = () => {
          analyser.getByteTimeDomainData(data);
          const silent = data.every(v => Math.abs(v - 128) < 5);
          const secondsPassed = (Date.now() - silenceStart) / 1000;
          setCountdown(Math.max(0, 5 - Math.floor(secondsPassed)));

          if (silent) {
            if (secondsPassed >= 5) {
              setSilentOk(true);
              setStatus('Silence detected for 5 seconds ✅');
              resolve();
            } else {
              requestAnimationFrame(check);
            }
          } else {
            silenceStart = Date.now();
            requestAnimationFrame(check);
          }
        };

        check();
      } catch (err) {
        reject(err);
      }
    });
  };

  const startSilenceCheck = async () => {
    try {
      setCountdown(5);
      setStatus('Checking for silence...');
      await detectSilence();
    } catch {
      setStatus('Error detecting silence ❌');
    }
  };

  const checkInternetSpeed = () => {
    setStatus('Checking internet speed...');
    const fileUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg';
    const start = Date.now();

    return fetch(fileUrl, { method: 'GET', cache: 'no-store' })
      .then(response => {
        const reader = response.body.getReader();
        let loaded = 0;
        return reader.read().then(function process({ done, value }) {
          if (done) return;

          loaded += value.length;
          const duration = (Date.now() - start) / 1000;
          const speedMbps = (loaded * 8) / (1024 * 1024 * duration);

          if (speedMbps >= 2) {
            setSpeedOk(true);
            setStatus(`Internet OK: ${speedMbps.toFixed(2)} Mbps ✅`);
          } else {
            setStatus(`Internet too slow: ${speedMbps.toFixed(2)} Mbps ❌`);
          }

          return reader.read().then(process);
        });
      })
      .catch(() => setStatus('Internet check failed ❌'));
  };

  const requestCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCamOk(true);
      setStatus('Camera access granted ✅');
    } catch {
      setStatus('Camera access denied ❌');
    }
  };

  const requestScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'monitor' },
        preferCurrentTab: false
      });

      const trackSettings = stream.getVideoTracks()[0].getSettings();
      const isFullScreen = trackSettings.displaySurface === 'monitor';

      if (!isFullScreen) {
        setStatus('❌ Please share your entire screen, not just a window or tab.');
        stream.getTracks().forEach(t => t.stop());
        return;
      }

      setScreenOk(true);
      setStatus('Full screen sharing granted ✅');
      stream.getTracks().forEach(t => t.stop());
    } catch {
      setStatus('Screen sharing denied ❌');
    }
  };

  const canStart = micOk && silentOk && speedOk && camOk && screenOk && tabsClosed;

  if (!deviceSupported) {
    return (
      <div className="precheck-container">
        <h2>Unsupported Device ❌</h2>
        <p>
          This interview can only be taken on a <strong>laptop or desktop</strong> with a normal screen size.  
          Mobile, tablet, or small window is not supported.
        </p>
      </div>
    );
  }

  return (
    <div className="precheck-container">
      <h2>Pre-Interview Setup</h2>

      <div className="intro-box">
        <p>
          👋 <strong>How it works:</strong> You’ll speak with an AI interviewer. Your camera, microphone, and screen will be recorded during the session.
        </p>
        <ul>
          <li>🎙️ Use your voice to answer each question in real time.</li>
          <li>🔴 The red <strong>"End"</strong> button will mark your interview as <strong>incomplete</strong>. Recruiters will not see it.</li>
          <li>🔇 The <strong>"Pause"</strong> button temporarily mutes the mic — your answer will not be recorded during this time.</li>
          <li>🚫 Once the interview begins, you cannot restart or pause it entirely.</li>
          <li>🧘 Sit alone in a quiet space, without distractions.</li>
          <li>🖥️ Share your full screen — not just a tab or window.</li>
          <li>📴 Close all other browser tabs and apps before continuing.</li>
        </ul>
      </div>

      <p className="status-message">{status}</p>

      {!micOk && (
        <div className="step-box">
          <h4>1. Grant Microphone Access</h4>
          <button className='btn' onClick={requestMicrophone}>Allow Microphone</button>
        </div>
      )}

      {micOk && !silentOk && (
        <div className="step-box">
          <h4>2. Stay Silent for 5 Seconds</h4>
          <button className='btn' onClick={startSilenceCheck}>Start Silence Check</button>
          {countdown < 5 && <p>Countdown: {countdown}s</p>}
        </div>
      )}

      {micOk && silentOk && !speedOk && (
        <div className="step-box">
          <h4>3. Check Internet Speed (min 2 Mbps)</h4>
          <button className='btn' onClick={checkInternetSpeed}>Run Speed Test</button>
        </div>
      )}

      {micOk && silentOk && speedOk && !camOk && (
        <div className="step-box">
          <h4>4. Grant Camera Access</h4>
          <button className='btn' onClick={requestCamera}>Allow Camera</button>
        </div>
      )}

      {micOk && silentOk && speedOk && camOk && !screenOk && (
        <div className="step-box">
          <h4>5. Share Full Screen</h4>
          <button className='btn' onClick={requestScreenShare}>Share Screen</button>
        </div>
      )}

      {micOk && silentOk && speedOk && camOk && screenOk && !tabsClosed && (
        <div className="step-box">
          <h4>6. Close All Other Tabs & Apps</h4>
          <label>
            <input type="checkbox" onChange={e => setTabsClosed(e.target.checked)} />
            &nbsp; I confirm all other tabs and apps are closed.
          </label>
        </div>
      )}

      {canStart && (
        <div className="start-box">
          <h3>✅ All checks passed</h3>
          <button className='btn' onClick={() => navigate(`/candidate/interview/${entryId}`)}>
            Start Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default PreCheckPage;
