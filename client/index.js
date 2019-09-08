import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const THEME = createMuiTheme({
  typography: {
    primary: {
      main: 'Montserrat'
    },
    fontFamily: '"Montserrat", "Helvetica", "Arial", "sans-serif"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  palette: {
    primary: {
      main: '#1452c1'
    },
    secondary: {
      main: '#e252b9'
    }
  }
})
ReactDOM.render(
  <MuiThemeProvider theme={THEME}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
