import './Button.css'

function Button({text,onClick,style}) {
  return (
    <button onClick={onClick} className="button" style={style}>
      {text}
    </button>
  )
}

export default Button