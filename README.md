# Bitcoin App

The Bitcoin app allows authenticated users to get the current Bitcoin value by a given date and by given currency( USD or NIS).

### Technologies in use:
React, Redux Toolkit, Redux Thunk, Material-UI, Chart.js, Node.js, Express.js, MongoDB.


### Description of the API:
The API contains 4 routers: 2 routes are designated for users and 2 routes are designated for stocks. 

Users routes:<br>
1)/api/users         - Creates a new user and save the user in the database. <br>
2)/api/users/login   - Allows login to the app, stores a JWT token at the user's localstorage after the user has successfully logged in. <br>

Stocks routes:<br>
1)/api/stocks        - Gets all the available Bitcoin data from Alpha Vantage API and stores it in the database.<br>
2)/api/stocks/stock  - Gets the Bitcoin value for a selected date from the database.<br>
 
 
### The Client consist of 4 pages:
1.  Register Page:
    * The register page contains 2 fields: username and password.
    *	The registration page uses React Hook form to validate the form.
    * The username field should have at least 5 characters.
    *	The password field should have at least 8 characters and should contain at least one uppercase letter and a digit.
    *	If the user details are valid, then the user is saved on the database.

2.  Login Page:
    *	The Login page uses React Hook form to validate the form.
    * Only if the user is a valid user he will be redirected to the dashboard page.

3.  Dashboard Page:
    * The dashboard page displays the Bitcoin value based on the date and currency selected by the user.
    * The Dashboard page consist of three components: CurrencyPicker,DatePicker,StockChart.
    *	CurrencyPicker: allows the user to select the currency(NIS or USD), uses react-flags-select package.
    * DatePicker: allows the user to select the Date, uses date-fns, and Material-UI.
    *	StockChart: displays the Bitcoin value, uses Chart.js.
 
5.  404 Error Page:
    * If the user tries to go to an undefined route he will get to the 404 error page which allows him to redirect to the login page.
 
  The app state is managed by Redux Toolkit, the state is divided into two slices:userSlice,userSlice.
  The asynchronous parts of the app are managed by redux-thunk.
  
 
 

  
