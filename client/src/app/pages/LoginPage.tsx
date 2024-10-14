import React, { useState } from 'react';
import LoginModal from '../../features/auth_feature/components/LoginModal'; 
import SignupModal from '../../features/auth_feature/components/SignupModal';
import { AnimatePresence } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-full bg-white md:bg-gradient-to-b from-white via-startPurple to-white"></div>
      <div className="w-1/2 h-full bg-white md:bg-gradient-to-b from-white via-startGreen to-white"></div>
      <div className="absolute inset-0 flex items-center justify-center">
      <div className="max-w-[30%] w-full">

        <AnimatePresence mode="wait">
          {isLogin ? (
          
              <LoginModal onSwitchToSignup={toggleModal} />
          ) : (
          
              <SignupModal onSwitchToLogin={toggleModal} />
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;