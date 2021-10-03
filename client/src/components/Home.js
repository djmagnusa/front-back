import React, {useState, useEffect} from 'react';

const Home = () => {

    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
   
    const userHomePage = async() => {
        try{
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            //console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch(err) {
            console.log(err);
        } 

    }


    useEffect(() => {
        userHomePage();
    },[])

    return (
        <>

            <div className="home-page">
                <div className="home-div">
                    { show ? <p></p> : <p>Login to see your name here</p> }
                    { show ? <h1>{userName} is logged in</h1> : <h1>MoxieHawk</h1>  }
                    <h1>{ show ? 'Assignment Completed' : 'Assignment'}</h1>
                </div>
            
            </div>
        
        </>
    )
}

export default Home;