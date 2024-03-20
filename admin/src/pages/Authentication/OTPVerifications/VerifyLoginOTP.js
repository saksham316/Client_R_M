import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  generateLoginOTP,
  logIn,
} from '../../../features/actions/auth/authenticationActions';
import OtpTimer from '../../../hooks/otpTimer';
// -----------------------------------------------------------------------------------------------------
const VerifyLoginOTP = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isUserLoggedIn, isLoginOtpGenerated } = useSelector(
    (state) => state?.authentication
  );

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [confirmOtp, setConfirmOtp] = useState(null);
  const [isVerifyOtpCalled, setIsVerifyOtpCalled] = useState(false);
  const [minutes, seconds, resetTimer] = OtpTimer();
  const [isResendOtpCalled, setIsResendOtpCalled] = useState(false);

  // Verify OTP Logic -- Start
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
    if (otp.every((item) => item !== '')) setConfirmOtp(otp.join(''));
  }, [otp]);

  useEffect(() => {
    if (confirmOtp !== null && confirmOtp?.toString()?.length === 6)
      handleLogin();
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

  // Verify OTP Logic -- Finish

  //This function is used to login and will be called after the otp is confirmed
  const handleLogin = () => {
    if (confirmOtp === null) return;
    const { password, email } = state;

    const reqPayload = {
      email,
      password,
      otp: `${confirmOtp}`,
    };

    setIsVerifyOtpCalled(true);
    dispatch(logIn(reqPayload));
  };

  // This method is used to call Generate Login OTP Api on Click of Resend OTP Link
  const resendLoginOtp = () => {
    if (seconds <= 0 || minutes !== 0) {
      resetTimer();
      dispatch(generateLoginOTP(state));
    } else return;
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/');
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (!isLoginOtpGenerated && !isResendOtpCalled) {
      navigate('/auth/login');
    }
  }, [isLoginOtpGenerated]);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-md">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://media.istockphoto.com/id/1792104405/photo/digital-cybersecurity-2fa-two-factor-authentication-and-password-protection-safeguarding.webp?b=1&s=170667a&w=0&k=20&c=Xxu8jLhSCi5lOyp2ljERKq1Va6gMPg2ktJVQp21ZO-A=")',
              }}
            />
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full">
                  <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="font-semibold text-3xl">
                        <p>Login OTP Verification</p>
                      </div>
                      {state?.email && (
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                          <p>
                            We have sent a code to your email {state?.email}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <form autoComplete="off" onSubmit={handleLogin}>
                        <div className="flex flex-col space-y-16">
                          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-2">
                            {otp.map((item, index) => {
                              return (
                                <div className="w-16 h-14" key={index}>
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
                            <div>
                              <button
                                type="submit"
                                disabled={confirmOtp === null}
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                              >
                                Verify Account
                                {isLoading && isVerifyOtpCalled && (
                                  <div
                                    className="inline-block ml-2 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status"
                                  >
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                      Loading...
                                    </span>
                                  </div>
                                )}
                              </button>
                            </div>
                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                              {seconds > 0 ? (
                                <p>
                                  00:{seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                              ) : (
                                <p className="ml-2">Didn't recieve code?</p>
                              )}

                              <div
                                className="flex flex-row items-center text-black ml-4"
                                onClick={() => {
                                  resendLoginOtp();
                                  setIsResendOtpCalled(true);
                                }}
                                disabled={seconds > 0 || minutes > 0}
                                style={{
                                  color:
                                    seconds > 0 || minutes > 0
                                      ? '#DFE3E8'
                                      : '#FF5630',
                                }}
                              >
                                Resend Login OTP
                              </div>
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

export default VerifyLoginOTP;
