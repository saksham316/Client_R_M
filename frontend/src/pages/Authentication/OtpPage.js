import React, { useEffect, useRef, useState } from 'react';
import OtpTimer from '../../hooks/OTPTimer';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  generateLoginOTP,
  logIn,
} from '../../features/actions/authenticationActions';
import { useDispatch, useSelector } from 'react-redux';

const OtpPage = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [confirmOtp, setConfirmOtp] = useState(null);
  const [minutes, seconds, resestTimer] = OtpTimer();
  const [signUpApiCalled, setSignUpApiCalled] = useState(false);

  const { isUserLoggedIn, isLogInSuccess } = useSelector((state) => state.auth);

  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const handleOtp = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    if (e.target.value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
    setOtp(newOtp);
  };

  useEffect(() => {
    if (otp.every((item) => item !== '')) {
      setConfirmOtp(otp.join(''));
    }
  }, [otp]);

  useEffect(() => {
    if (confirmOtp !== null && confirmOtp?.toString()?.length === 6) {
      sendPayload();
    }
  }, [confirmOtp]);

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index - 1] = '';
        return newOtp;
      });
    }
  };

  const sendPayload = () => {
    const { password, email } = state;
    const obj = {
      password,
      email,
      otp: `${confirmOtp}`,
    };
    dispatch(logIn(obj));
    setSignUpApiCalled(true);
  };

  const resendOTP = () => {
    if (seconds <= 0 || minutes !== 0) {
      resestTimer();
      const payload = {
        email: state?.email,
      };
      dispatch(generateLoginOTP(payload));
    } else return;
  };

  useEffect(() => {
    if (isLogInSuccess) {
      navigate('/dashboard');
    }
  }, [isLogInSuccess]);

  return (
    <>
      <div className="container mx-auto grid place-items-center h-screen">
        <div className="flex justify-center px-6 my-12  lg:w-[70%]">
          {/* Row */}
          <div className="w-full flex shadow-md">
            {/* Col */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://media.istockphoto.com/id/1792104405/photo/digital-cybersecurity-2fa-two-factor-authentication-and-password-protection-safeguarding.webp?b=1&s=170667a&w=0&k=20&c=Xxu8jLhSCi5lOyp2ljERKq1Va6gMPg2ktJVQp21ZO-A=")',
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full">
                  <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="font-semibold text-3xl">
                        <p>Email Verification</p>
                      </div>
                      <div className="flex flex-row text-sm font-medium text-gray-400">
                        <p>
                          We have sent a code to your email
                          abc @pearlorganisation.com
                        </p>
                      </div>
                    </div>
                    <div> 
                      <form action method="post">
                        <div className="flex flex-col space-y-16">
                          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-2">
                            {otp.map((item, index) => {
                              return (
                                <div className="w-16 h-14">
                                  <input
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-0 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"
                                    onChange={(e) => {
                                      handleOtp(e, index);
                                    }}
                                    maxLength={1}
                                    key={index}
                                    onKeyDown={(e) => {
                                      handleBackspace(e, index);
                                    }}
                                    value={item}
                                    ref={inputRefs[index]}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex flex-col space-y-5">
                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                              <p className="paragraph flex justify-between items-center w-full">
                                {seconds > 0 ? (
                                  <p>
                                    {' '}
                                    00:{seconds < 10 ? `0${seconds}` : seconds}
                                  </p>
                                ) : (
                                  <p>Didn't recieve code?</p>
                                )}
                                <div
                                  disabled={seconds > 0 || minutes > 0}
                                  style={{
                                    color:
                                      seconds > 0 || minutes > 0
                                        ? '#DFE3E8'
                                        : '#FF5630',
                                  }}
                                  onClick={resendOTP}
                                  className={
                                    seconds > 0 || minutes > 0
                                      ? 'cursor-auto'
                                      : 'cursor-pointer'
                                  }
                                >
                                  Resend OTP
                                </div>
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
