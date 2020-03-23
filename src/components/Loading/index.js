import React from 'react'
import './Loading.css'
class Loading extends React.Component{


    render(){
        return(
            <div className="column">
            <div className="container animation-6">
              <div className="shape shape1"></div>
              <div className="shape shape2"></div>
              <div className="shape shape3"></div>
              <div className="shape shape4"></div>
            </div>
            <p className='loadingtext'>Loading......</p>
          </div>
        )
    }
}

export default Loading