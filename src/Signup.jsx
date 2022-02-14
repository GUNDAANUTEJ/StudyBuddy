import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/style.css'
import { Link } from 'react-router-dom'
import valid from 'validator'
import { useState } from 'react'

const Signup = () => {
    const [Data, setData] = useState({
        fname: "",
        mname: "",
        lname: "",
        sid: "",
        email: "",
        mobile: "",
        bod: "",
        password: ""
    })

    const insertData = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setData({ ...Data, [name]: value })
    }

    const validation = async (event) => {
        event.preventDefault()
        console.log(Data)
        const { fname, mname, lname, sid, email, mobile, bod, password } = Data
        if (!valid.isEmail(Data.email) && !valid.isStrongPassword(Data.password) && !(Data.password.length >= 8)) {
            alert('enter valid email or strong password!!!')
        } else {
            const result = await fetch("/signup", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    fname, mname, lname, sid, email, mobile, bod, password
                })
            })

            const data = await result.json();

            if (data.success) {
                window.alert(data.message)
                setData({
                    fname: "",
                    mname: "",
                    lname: "",
                    sid: "",
                    email: "",
                    mobile: "",
                    bod: "",
                    password: ""
                })
            } else {
                window.alert(data.error)
            }
        }
    }

    return (
        <>
            <form method="POST" className="signup-form mb-2 my-2" onSubmit={validation}>
                <h1 className="my-4 pb-2">Signup</h1>
                <div className="mb-3 mx-3">
                    <label htmlFor="fname" className="form-label">First name :</label>
                    <input type="text" name="fname" id="fname" className="form-control" value={Data.fname} onChange={insertData} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="mname" className="form-label">Middle name(optional) :</label>
                    <input type="text" name="mname" id="mname" className="form-control" value={Data.mname} onChange={insertData} />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="lname" className="form-label">last name :</label>
                    <input type="text" name="lname" id="lname" className="form-control" value={Data.lname} onChange={insertData} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="sid" className="form-label">Student Number :</label>
                    <input type="text" name="sid" id="sid" className="form-control" value={Data.sid} onChange={insertData} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="email" className="form-label">Email Address :</label>
                    <input type="email" name="email" id="email" className="form-control" value={Data.email} onChange={insertData} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="mobile" className="form-label">Mobile number :</label>
                    <input type="tel" name="mobile" id="mobile" className="form-control" value={Data.mobile} onChange={insertData} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="bod" className="form-label">Birth date :</label>
                    <input type="date" name="bod" id="bod" className="form-control" value={Data.bod} onChange={insertData} required />
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input type="password" name="password" id="password" value={Data.password} className="form-control" onChange={insertData} required />
                    <div id="passwordHelp" className="form-text" style={{ fontSize: "13px" }}>Password must contain at least 8 characters.</div>
                </div>
                <div className="mb-3 mx-3">
                    <button type="submit" className="btn btn-success fs-6 form-control">Submit</button>
                </div>
                <div className=" text-center">
                    <h6>Already registered ! <Link to="/login" className="text-decoration-none">Login</Link></h6>
                </div>
            </form>
        </>
    )
}

export default Signup