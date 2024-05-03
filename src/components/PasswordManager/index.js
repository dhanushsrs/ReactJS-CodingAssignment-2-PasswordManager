import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const profileColors = [
  'light-blue',
  'yellow',
  'green',
  'orange',
  'cyan',
  'brown',
  'blue',
]

class PasswordManager extends Component {
  state = {
    passwordRecord: [],
    inputUrl: '',
    inputName: '',
    inputPassword: '',
    searchInput: '',
    showPassword: false,
  }

  deletePasswordRecord = id => {
    const {passwordRecord} = this.state
    const filteredPasswordRecords = passwordRecord.filter(
      eachRecord => eachRecord.id !== id,
    )

    this.setState({passwordRecord: filteredPasswordRecords})
  }

  getSearchRecords = () => {
    const {passwordRecord, searchInput} = this.state

    return passwordRecord.filter(eachRecord =>
      eachRecord.url.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  oncheckChange = () => {
    this.setState(prevstate => ({
      showPassword: !prevstate.showPassword,
    }))
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onInputPasswordChange = event => {
    this.setState({inputPassword: event.target.value})
  }

  onInputNameChange = event => {
    this.setState({inputName: event.target.value})
  }

  onInputUrlChange = event => {
    this.setState({inputUrl: event.target.value})
  }

  addPasswordRecord = event => {
    event.preventDefault()
    const {inputUrl, inputName, inputPassword} = this.state
    const profilePicColor = profileColors[Math.floor(Math.random() * 7)]
    console.log(profilePicColor)

    const newPasswordRecord = {
      id: uuidv4(),
      url: inputUrl,
      name: inputName,
      password: inputPassword,
      profilePicColor,
    }

    this.setState(prevstate => ({
      passwordRecord: [...prevstate.passwordRecord, newPasswordRecord],
      inputUrl: '',
      inputName: '',
      inputPassword: '',
    }))
  }

  render() {
    const {showPassword, inputUrl, inputPassword, inputName} = this.state

    const searchResults = this.getSearchRecords()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="app-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-logo"
            />
          </div>
          <div className="card-container ">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="manager-image-sm"
            />
            <div className="card-form-container">
              <form
                className="card-responsive"
                onSubmit={this.addPasswordRecord}
              >
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>

                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onInputUrlChange}
                    value={inputUrl}
                  />
                </div>

                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>

                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onInputNameChange}
                    value={inputName}
                  />
                </div>

                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>

                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onInputPasswordChange}
                    value={inputPassword}
                  />
                </div>

                <div className="btn-container">
                  <button className="add-btn" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="manager-image-lg"
            />
          </div>

          <div className="manager-container">
            <div className="card-responsive-container">
              <div className="passwords-header">
                <h1 className="passwords-header-title">Your Passwords</h1>
                <p className="results-count">{searchResults.length}</p>
              </div>

              <div className="search-container">
                <div className="search-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </div>
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onSearchChange}
                />
              </div>
            </div>
            <hr className="hr-line" />

            <div className="checkbox-container">
              <input
                className="checkbox-input"
                type="checkbox"
                id="checkbox"
                checked={showPassword}
                onChange={this.oncheckChange}
              />

              <label htmlFor="checkbox" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {searchResults.length !== 0 ? (
              <ul className="password-list-container">
                {searchResults.map(eachRecord => (
                  <PasswordItem
                    key={eachRecord.id}
                    record={eachRecord}
                    showPassword={showPassword}
                    deletePasswordRecord={this.deletePasswordRecord}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  className="no-passwords-image"
                  alt="no passwords"
                />
                <p className="no-passwords-title">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
