import React, { useEffect } from 'react'

function LogoutForAdmin() {
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userDetails');
        window.location.href = '/login';
    }, [])


  return (
    <div>
        <p>Logging out</p>
    </div>
  )
}

export default LogoutForAdmin; 
