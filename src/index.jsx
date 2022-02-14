import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

const Index = () => {
    return (
        <>
            <div className="container">
                <h1 className="mt-5 py-5" style={{ background: "none",backdropFilter:"none", fontSize: "50px" }}>Bearcat Study Buddy</h1>
                <div className="d-flex justify-content-around">
                    <a href="/login"><button className="btn btn-success py-2 px-5">Login</button></a>
                    <a href="/signup"><button className="btn btn-danger py-2 px-5">SignUp</button></a>
                </div>
            </div>
        </>
    )
}

export default Index