import { useEffect, useState } from "react"

const EmployeeForm = () => {
    // TODO: Provide initial state for profile
    const [feedback, setFeedback] = useState("")
    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // TODO: Get employee profile info from API and update state
    useEffect(
        () => {
            const fetchProfile = async () => {
                const res = await fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
                const result = await res.json()
                updateProfile(result[0])
            }
            fetchProfile()
        },
        []
    )

    useEffect(
        () => {
            if(feedback !== "") {
                //Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000)
            }
        },
        [feedback]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const updateData = async () => {
            const put = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            }
            const response = await fetch (`http://localhost:8088/employees/${profile.id}`, put)
            await response.json()
            setFeedback("Employee profile successfully saved")
        }
        updateData()
    }

    return (
        <form className="profile">
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <h2 className="profile__title">Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.rate = parseFloat(evt.target.value, 2)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}

export default EmployeeForm