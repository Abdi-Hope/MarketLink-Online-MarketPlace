import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import authService from '../services/authService';

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('Verifying your email...');
    const verificationStarted = React.useRef(false);

    useEffect(() => {
        if (!token || verificationStarted.current) return;

        const performVerification = async () => {
            verificationStarted.current = true;
            try {
                const result = await authService.verifyEmail(token);
                if (result.success) {
                    setStatus('success');
                    setMessage(result.message);
                } else {
                    setStatus('error');
                    setMessage(result.message);
                }
            } catch (error) {
                setStatus('error');
                setMessage('An unexpected error occurred during verification.');
            }
        };

        performVerification();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verifying...</h1>
                        <p className="text-gray-600">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle size={48} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h1>
                        <p className="text-gray-600 mb-8">{message}</p>
                        <Link
                            to="/login"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                            Sign In Now <ArrowRight size={20} />
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                            <XCircle size={48} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h1>
                        <p className="text-gray-600 mb-8">{message}</p>
                        <div className="flex flex-col gap-3 w-full">
                            <Link
                                to="/register"
                                className="py-4 bg-gray-100 text-gray-800 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                            >
                                Back to Register
                            </Link>
                            <Link
                                to="/"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Go to Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;
