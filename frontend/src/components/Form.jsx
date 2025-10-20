import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Add a 2 second delay to see the indicator
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/");
            } else {
                alert("Registration successful. Please login.");
                navigate("/login");
            }
        }
        catch (error) {
            console.error("Full error:", error);
            console.error("Error response:", error.response);
            if (error.response) {
                alert(`Error: ${error.response.data.detail || JSON.stringify(error.response.data)}`);
            } else {
                alert("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return < form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit" disabled={loading}>
            {name}
        </button>
    </form>
}

export default Form 