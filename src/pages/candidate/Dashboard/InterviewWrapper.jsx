import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InterviewPlayer from './InterviewPlayer';

const InterviewWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleExit = () => {
    navigate('/finish');
  };

  return <InterviewPlayer interviewId={id} onExit={handleExit} />;
};

export default InterviewWrapper;
