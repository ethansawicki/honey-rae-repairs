import React, { useEffect, useState } from 'react'

const CustomerForm = () => {
  const localHoneyUser = localStorage.getItem("honey_user")
  const honeyUserObject = JSON.parse(localHoneyUser)
  const [feedback, setFeedback] = useState("")
  const [profile, updateProfile] = useState({
    address: "",
    phoneNumber: ""
  })

  useEffect(
    () => {
      const fetchProfile = async () => {
        const res = await fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
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
        setTimeout(() => setFeedback(""), 5000)
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
      const response = await fetch(`http://localhost:8088/customers/${profile.id}`, put)
      await response.json()
      setFeedback("You did it! Updated Profile Succesfully")
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
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
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

export default CustomerForm