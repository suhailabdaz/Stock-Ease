import React from 'react';
import LoginModal from '../../features/auth_feature/components/LoginModal';

const LoginPage: React.FC = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-full bg-gradient-to-b from-white via-startPurple to-white"></div>
      <div className="w-1/2 h-full bg-gradient-to-b from-white via-startGreen to-white"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <LoginModal />
      </div>
    </div>
  );
};

export default LoginPage;
