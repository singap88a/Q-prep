import React, { useEffect, useState } from "react";

const ChangePassword = () => {

    const [userdata, setUserData] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const GetUserFunc = async () => {
        if (!token) return;
        try {
            if (!token) {
                throw new Error("No Token found");
            }
            const response = await fetch(
                `https://questionprep.azurewebsites.net/api/Account/GetUser`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);

            // console.log("GetUser Data:", data);
        } catch (error) {
            console.error("Error fetching user:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetUserFunc();
    }, [token]);


    const validatePassword = (password) => {
        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setMessage("Password must contain at least one special character.");
            return false;
        }
        return true;
    };

    const handleChangePassword = async () => {



        if (!password || !confirmPassword) {
            setMessage("Please fill all fields.");
            return;
        }

        if (!validatePassword(password)) {
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Password and Confirm Password do not match.");
            return;
        }


        const url = `https://questionprep.azurewebsites.net/api/Authenticate/ChangePassword/${userdata.id}`;
        console.log(url);

        // Create FormData object
        const formData = new FormData();
        formData.append("NewPassword", password);
        formData.append("ConfirmedNewPassword", confirmPassword);


        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            // const data = await response.json();

            // console.log("ChangePassword Data:", data);


            if (response.ok) {
                setMessage("Password changed successfully!");
            } else {
                setMessage("Failed to change password");
            }
        }
        catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className='ChangePassword pt-5 px-10'>
            <h1 className='text-center text-3xl font-bold pb-8'>Change Password</h1>

            <div className="lg:w-1/2 md:w-2/3 w-full form flex justify-center flex-col items-center gap-2 pt-5  pb-10 m-auto">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg border-secondary text-secondary"
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg border-secondary text-secondary"
                />

                {/* <p className={message !== "Password changed successfully!" ? "w-full text-sm  text-center font-semibold text-red-800" :" w-full text-sm  text-center font-semibold text-green-800"}>{message}</p> */}
                <p className={`w-full text-md text-center font-semibold ${message.includes("success") ? "text-green-800" : "text-red-800"}`}>
                    {message}
                </p>
                <button onClick={handleChangePassword}
                    className=" w-full relative z-10 px-2 mx-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md cursor-pointer md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-1000 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-1000 hover:text-secondary bg-secondary "
                >Change Password
                </button>
            </div>
        </div>
        // </div >
    )
}

export default ChangePassword