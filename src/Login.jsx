import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/style.css'
import { Link } from 'react-router-dom'
import valid from 'validator'
import { useState } from 'react'

const Login = () => {

    const [Email, setEmail] = useState("")
    const [Pass, setPass] = useState("")

    const validation = async (event) => {
        event.preventDefault()

        if (!valid.isEmail(Email) && !valid.isStrongPassword(Pass) && !(Pass.length >= 8)) {
            alert('enter valid email or strong password!!!')
        } else {
            const email = Email
            const password = Pass
            const result = await fetch("/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })