import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../css/ResetPassword.css";

function ResetPassword() {

    const navigate = useNavigate();

    // Get token from:
    // /reset-password?token=xxxxxxxx
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!token) {
            alert("Invalid or missing reset token.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/reset-password",
                {
                    token: token,
                    newPassword: formData.newPassword
                }
            );

            alert(response.data);

            navigate("/login");

        } catch (error) {

            console.error(
                "Password reset error:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                error.response?.data ||
                "Password reset failed."
            );
        }
    };

    return (

        <div className="reset-container">

            <form
                className="reset-form"
                onSubmit={handleSubmit}
            >

                <h2>Reset Password</h2>

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Reset Password
                </button>

            </form>

        </div>

    );
}

export default ResetPassword;