import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { endpoints } from '../apis'
import { setUser } from '../../redux/slices/profileSlice'
import { setToken, setLoading } from '../../redux/slices/authSlice'

export const logIn = (email, password, navigate) => {

    return async (dispatch) => {
        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, {
                email,
                password,
            })
            console.log("Login response .... ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successfully");
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.userExist));
            const expirationTime = Date.now() + (5 * 60 * 60 * 1000)
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.userExist))
            localStorage.setItem("expiryTime", expirationTime); // Store the expiration time
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const sendOTP = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API, { email });
            console.log(response.data)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully");
            navigate('/verify-email');

        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const singUp = (data, navigate) => {
    // const {firstName, lastName, email, password, confirmPassword, accountType, otp} = data;

    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.SIGNUP_API, data);
            console.log("Sing up .......", response);
            toast.success("Account Created Successfully");

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            navigate("/login");

        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error("SingUp failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const resetPasswordToken = (email, navigate) => {
    return async (dispatch) => {

        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSWORDTOKEN_API, { email });
            console.log("Reset Password Token .......", response);
            toast.success("mail send successfully");

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

        } catch (error) {
            console.log("Reset Password Token API ERROR............", error);
            toast.error("failed to send mail")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);

    }
}

export const resetPassword = (data, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, data);
            console.log("Reset Password .......", response);
            toast.success("Password Reset Successfully");
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            navigate("/login");

        } catch (error) {
            console.log("Reset Password API ERROR............", error);
            toast.error("Password Reset failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logOut = (navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))
        try {
            dispatch(setUser(null));
            dispatch(setToken(null));
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
            toast.success("Logout successfully");
            console.log("logout")
        } catch (error) {
            console.log(error);
        }
        toast.dismiss(toastId)
    }
}
