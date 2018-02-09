import React from 'react';

const LoginButton = (props) => {
  
  const sendTestLoginReq = () => {
    fetch('/login', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
        });
      }
    })
    .catch( err => {
      return err
    })
  }

  return (
    <div>
      <button className="btn btn-default" onClick={sendTestLoginReq}>{props.otherProps}</button>
    </div>
  );
}

export default LoginButton;
