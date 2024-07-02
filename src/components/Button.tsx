


import React from 'react'


export interface ButtonProps {
    text: string
    className: string
    type: string
   
}

const Button: React.FC<ButtonProps> = ({ text, type, className, ...props}) => {
  return (
    <button {...props} className={className}>
      {text}
    </button>
  )
}

export default Button
