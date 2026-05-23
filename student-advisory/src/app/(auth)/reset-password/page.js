"use client";

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ResetPassword() {
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleChange = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        // Validation
        if (newPass === "" || confirmPass === "") {
            setMessage({ type: "error", text: "Please fill all fields!" });
            return;
        }

        if (newPass.length < 8) {
            setMessage({ type: "error", text: "Password must be at least 8 characters!" });
            return;
        }

        if (newPass !== confirmPass) {
            setMessage({ type: "error", text: "Passwords do not match!" });
            setNewPass("");
            setConfirmPass("");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newPass, token }),
            })

            const data = await res.json();

            if (data.success) {
                setMessage({ type: "success", text: "Password changed successfully! Redirecting..." });
                setNewPass("");
                setConfirmPass("");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                setMessage({ type: "error", text: "Invalid or expired token. Please request a new password reset." });
                setNewPass("");
                setConfirmPass("");
            }
        } catch (error) {
            setMessage({ type: "error", text: error.message || "Something went wrong. Please try again." });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">

                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 pt-8 pb-6 text-center relative">
                        <div className="flex justify-center mb-4">
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-500">
                                <Image
                                    src="/images/logo-resetPass.png"
                                    alt="Reset Password Logo"
                                    width={80}
                                    height={80}
                                    unoptimized
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Reset Password</h1>
                        <p className="text-blue-100 text-sm mt-2">Create a new secure password</p>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleChange} className="px-6 sm:px-8 py-8 space-y-6">

                        {/* Message Alert */}
                        {message.text && (
                            <div className={`p-4 rounded-lg text-sm font-medium animate-fadeIn flex items-center gap-3 ${message.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                                }`}>
                                {message.type === 'success' ? (
                                    <CheckCircle2 size={20} className="flex-shrink-0" />
                                ) : (
                                    <AlertCircle size={20} className="flex-shrink-0" />
                                )}
                                <span>{message.text}</span>
                            </div>
                        )}

                        {/* New Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                New Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter new password"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full h-12 px-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-800">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirm-password"
                                    placeholder="Re-enter password"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full h-12 px-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Password Match Indicator */}
                        {newPass && confirmPass && (
                            <div className="flex items-center gap-2 text-sm">
                                {newPass === confirmPass ? (
                                    <>
                                        <CheckCircle2 size={18} className="text-green-500" />
                                        <span className="text-green-600 font-medium">Passwords match</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle size={18} className="text-red-500" />
                                        <span className="text-red-600 font-medium">Passwords do not match</span>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2 text-base"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Reset Password
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-6 sm:px-8 py-4 bg-gray-50/50 text-center">
                        <p className="text-xs text-gray-600">
                            Remember your password?
                            <a href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                                Back to login
                            </a>
                        </p>
                    </div>
                </div>

                {/* Security note */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>🔒 Your password is secure and encrypted</p>
                </div>
            </div>
        </div>
    )
}