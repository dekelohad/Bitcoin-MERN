# Bitcoin App
 ### Demo: https://bitcoin-mern.herokuapp.com/

The Bitcoin app allows authenticated users to get the current Bitcoin value by a given date and by given currency( USD or NIS).

### Technologies in use:
React,Redux Toolkit,redux-thunk,Material-UI,Chart.js,Node.js,MongoDB.


### Description of the API:
The API contains of 4 routers: 2 routes are designated for users and 2 routes are designated for stocks. 

Users routes:<br>
1)/api/users         - Creates a new user and save the user in the database. <br>
2)/api/users/login   - allows login to the app and also stores a JWT token in the user's localstorage. <br>

Stocks routes:<br>
1)/api/stocks        - gets all the available Bitcoin data and stores it in the database.<br>
2)/api/stocks/stock  - gets the Bitcoin value for a given date from the data saved in /api/stocks.<br>
 
 
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

3.  The Dashboard consist of the 3 components: CurrencyPicker,DatePicker,StockChart.
    * The dashboard page displays the value of Bitcoin by date and by currency(USD or NIS).
    *	CurrencyPicker: allows the user to select the currency(NIS or USD), the component uses react-flags-select package.
    * DatePicker: allows the user to select the Date, the component uses date-fns, and Material-UI.
    *	StockChart:  displays the Bitcoin value, the component uses Chart.js.
 
5.  Error Page:
    * If the user tries to go to an undefined route he will get to the 404 error page which allows him to redirect to the login page.
 
  The app state is managed by Redux Toolkit, the state is divided into two slices:userSlice,userSlice.
  The asynchronous parts of the app are managed by redux-thunk.
  
 
  
  
