import React from 'react';

const LoginButton = (props) => {
  
  const sendTestLoginReq = () => {
    fetch('/login')
    .then(response => {
      console.log(response);
      if (response.ok) {
        response.json().then(json => {
          props.setCookie(json);
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
      <button onClick={sendTestLoginReq}>{props.otherProps}</button>
    </div>
  );
}

export default LoginButton;
