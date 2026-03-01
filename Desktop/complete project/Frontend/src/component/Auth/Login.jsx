import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
        <div className='border-2 border-red-600'>
            <form className='center'>
                <input type="email" placeholder='Enter email' />
                <input type="password" placeholder='Enter password' />

            </form>
        </div>
      
    </div>
  )
}

export default Login
