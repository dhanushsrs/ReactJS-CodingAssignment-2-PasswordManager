import './index.css'

const PasswordItem = props => {
  /* const profileColors = [
    'light-blue',
    'yellow',
    'green',
    'orange',
    'cyan',
    'brown',
    'blue',
  ]

  const profilePicColor = profileColors[Math.floor(Math.random() * 10 - 4)] */

  const {record, showPassword, deletePasswordRecord} = props
  const {id, url, name, password, profilePicColor} = record

  const deleteItem = () => {
    deletePasswordRecord(id)
  }

  const passwordPattern = showPassword ? (
    <p className="website-text">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-icon"
    />
  )

  return (
    <li className="password-item">
      <div className={`circle ${profilePicColor}`}>{name.charAt(0)}</div>
      <div className="details-container">
        <p className="website-text">{url}</p>
        <p className="website-text">{name}</p>
        {passwordPattern}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={deleteItem}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
