## Home
### Description
The Home component is a React functional component representing the home page of the application. It serves as the main landing page for the users and provides information about the latest notices, admission process, frequently asked questions (FAQs), and other relevant details. The component fetches notice data from an API endpoint using Axios (not shown in the code) and displays the notices in an interactive format. Additionally, it includes a Carousel component for showcasing images, a navigation bar, and a footer.
### States
- user (object): Stores the user data obtained from the global state.
- isLoggedIn (boolean): Represents whether the user is logged in, obtained from the global state.
- jwt (string): Stores the JSON Web Token (JWT) obtained from the global state.
- notices (array): Contains an array of notice objects fetched from the API.
### Methods
- getNotice(): A function that fetches the notice data from the API using Axios and updates the notices state.
## Login
### Description
The Login component is a React functional component responsible for rendering the login page of the application. It allows users to sign in to their accounts using their email and password. The component also provides options for password reset, account registration, and toggling between light and dark themes.
### States
- isLoggedIn (boolean): Represents whether the user is logged in.
- isDarkMode (boolean): Represents whether the dark mode is enabled.
### Methods
- toggleTheme(): A function that toggles between dark and light themes.
- setTheme(): A function that sets the theme based on the user's preference or system settings.
- handleLogin(e): A function that handles the login form submission. It sends a request to the server for user authentication and updates the global state with user information upon successful login.
## Registration
### Description
The Registration component is a React functional component responsible for rendering the user registration page of the application. It allows users to create a new account by providing their full name, email, password, phone number, and accepting the terms and conditions. The component also provides options for toggling between light and dark themes and navigating back to the home page or the login page.
### States
- value (string): Represents the phone number entered by the user.
- isLoggedIn (boolean): Represents whether the user is logged in.
- loading (boolean): Represents whether the registration process is in progress.
- isDarkMode (boolean): Represents whether the dark mode is enabled.
### Methods
- toggleTheme(): A function that toggles between dark and light themes.
- setTheme(): A function that sets the theme based on the user's preference or system settings.
- toLogin(res): A function that navigates to the login page.
- handleRegister(e): A function that handles the registration form submission. It sends a request to the server to create a new user account and logs in the user upon successful registration.
## Profile
### Description
The Profile component is a React functional component responsible for rendering the user profile page of the application. It allows users to fill in their personal information, academic details, and upload necessary documents to complete their profile. The component uses several states to manage the user input and form data for profile completion. It also utilizes the Ant Design Modal component for displaying a confirmation modal when the user submits their profile.
### States
- page (string): Represents the current page of the profile form (1, 2, or 3).
- modal2Open (boolean): Represents whether the confirmation modal for profile submission is open.
- user (object): Represents the user's data obtained from the global user context.
- isLoggedIn (boolean): Represents whether the user is logged in.
- othersub (boolean): Represents whether the user is submitting for another user (not clear from the provided code).
- university (array): An array of university data obtained from an API call.
- subjects (array): An array of subject data obtained from an API call.
- page1complete (boolean): Represents whether the first page of the profile form is complete.
- page2complete (boolean): Represents whether the second page of the profile form is complete.
- duStudent (boolean): Represents whether the user is a Dhaka University student (not clear from the provided code).
- others (boolean): Represents whether the user is filling the profile for another user (not clear from the provided code).
- bangla (boolean): Represents whether the user has chosen the Bengali language (not clear from the provided code).
- previewData (object): Represents data for previewing the user's profile (not clear from the provided code).
- fetchedData (object): Represents data fetched from an API call related to SSC and HSC examination (not clear from the provided code).
- firstFormData (object): Represents form data from the first page of the profile form (not clear from the provided code).
- secondFormData (object): Represents form data from the second page of the profile form (not clear from the provided code).
- thirdFormData (object): Represents form data from the third page of the profile form (not clear from the provided code).
### Methods
- ProfileTab(): A function that returns a JSX element representing the profile tab containing buttons to navigate between different pages of the profile form.
- page1(), page2(), page3(): Functions that set the page state to navigate between different pages of the profile form.
- getSubjects(), getUniversities(): Functions that make API calls to fetch subject and university data for the profile form.
- page2Donee(e): A function that handles the form submission on the second page of the profile form and sets the respective state variables.
- page3Donee(e): A function that handles the form submission on the third page of the profile form and sets the respective state variables.
- submitProfile(): A function that submits the user's profile data to the server upon completing all pages of the profile form.
- fetchSscHscData(e): A function that fetches SSC and HSC examination data from the server based on user input and sets the respective state variables.
- advance(): A function to advance to the next page of the profile form (not clear from the provided code).
## ViewProfile
### Description
The ViewProfile component is a React functional component responsible for displaying the user's profile information. It fetches the user's profile data from the server using the /profile.php API endpoint and displays the information on the page. The component also uses the useGlobalState hook from the UserContext component to access the user's data.
### States
- user (object): Represents the user's data obtained from the global user context.
- profile (object): Represents the user's profile data fetched from the server.
### Methods
- getProfile(): A function that makes an API call to fetch the user's profile data from the server and sets the profile state with the response.
## Apply
### Description
The Apply component is a React functional component responsible for allowing users to apply for departments by submitting their applications. The component fetches department data from the server using the /department.php API endpoint and displays the available departments in a table format. The user can select a department and apply for it, triggering an API call to submit the application. The component uses the useGlobalState hook from the UserContext component to access the user's data.
### States
- loading (boolean): Represents whether data is currently being fetched from the server.
- user (object): Represents the user's data obtained from the global user context.
- modalOpen (boolean): Represents the visibility state of the main modal for selecting a department.
- modal2Open (boolean): Represents the visibility state of the confirmation modal for applying to a department.
- data (array): Represents the array of department data fetched from the server.
- selectedDept (string): Represents the ID of the selected department that the user wants to apply to.
- selectedNotice (string): Represents the selected notice for the application (not used in the provided code).
- startDate (Date object): Represents the start date for the application period.
- endDate (Date object): Represents the end date for the application period.
### Methods
- fetchData(): A function that makes an API call to fetch the department data from the server and sets the data state with the response.
- apply(): A function that makes an API call to submit the user's application for the selected department.
## Submission
### Description
The Submission component is a React functional component responsible for displaying and managing the submitted applications for MSc Admission. It fetches application data from the server using the /applications.php API endpoint and allows various actions like filtering, verifying applications, sending SMS/emails, downloading data in different formats (e.g., PDF, Excel), and granting/editing access to profiles. It also provides the functionality for bulk SMS/emails and searching for specific applications.
### States
- loading (boolean): Represents whether data is currently being fetched from the server.
- apiLoading (boolean): Represents whether an API call (e.g., initiating payment) is in progress.
- user (object): Represents the user's data obtained from the global user context.
- isLoggedIn (boolean): Represents whether the user is logged in.
- data (array): Represents the array of application data fetched from the server.
- paymentFilter (string): Represents the selected payment filter for applications (e.g., "paid", "unpaid", or "" for all).
- verifiedFilter (string): Represents the selected verification filter for applications (e.g., "verified", "not verified", or "" for all).
- detailsModalOpen (boolean): Represents the visibility state of the details modal to view an application's details.
- detailsLoading (boolean): Represents whether the application details are currently being fetched.
- profile (object): Represents the detailed profile of a selected application.
- smsModalOpen (boolean): Represents the visibility state of the SMS modal to send SMS to applicants.
- emailModalOpen (boolean): Represents the visibility state of the email modal to send emails to applicants.
- smsLoading (boolean): Represents whether the SMS is currently being sent.
- emailLoading (boolean): Represents whether the email is currently being sent.
- selectedApp (string): Represents the ID of the selected application for SMS/email actions.
- message (string): Represents the message to be sent via SMS/email.
- resultDownloadModalOpen (boolean): Represents the visibility state of the result download modal.
- downloadText (string): Represents the text for the "Download Admit" button.
- verificationLoading (boolean): Represents whether the verification process is currently in progress.
- resultModalOpen (boolean): Represents the visibility state of the result modal to display the selected application's result details.
- selectedRecord (object): Represents the data of the selected application for the result modal.
- confettiShower (boolean): Represents whether confetti animation is activated when displaying the result modal.
- searchTerm (string): Represents the search term for filtering applications based on name, roll, or U_ID.
- filteredData (array): Represents the filtered array of application data based on the search term.
### Methods
- fetchData(): A function that makes an API call to fetch application data from the server based on the selected payment and verification filters.
- searchData(): A function that filters the application data based on the search term (searchKey) provided.
- verifyApplication(record): Verifies an application for MSc admission, sends a request to the server to approve the application, and updates its verification status.
- showDetails(record): Fetches and displays detailed information about a selected application in a modal.
- confirmEditAccess(record): Initiates the process to grant edit access to the profile of the selected application.
- grantEditAccess(): Grants edit access to the profile of the selected application after confirmation.
- revokeEditAccess(record): Revokes edit access to the profile of the selected application.
- sendSMS(): Sends an SMS to the selected application with a custom message.
- sendEmail(): Sends an email to the selected application with a custom message.
- downloadAdmit(): Initiates the download of the admit card for the selected application.
- downloadXLSX(): Downloads the data in Excel (XLSX) format.
- generatePDF(): Generates and downloads the data in PDF format.
- openResultModal(record): Opens a modal to display the result details of the selected application.
- closeResultModal(): Closes the result details modal.
- bulkEmail(): Opens a modal to send bulk emails to selected applications.
- bulkSMS(): Opens a modal to send bulk SMS to selected applications.
## Admin
### Description
The Admin component is a React functional component that represents the admin dashboard page of an application. It provides information and functionalities related to reports and result management. The component fetches data from an API endpoint using Axios (not shown in the code) and displays the data in a user-friendly format.
### States
- loading (boolean): Represents whether the data is still being fetched from the API.
- user (object): Stores the user data obtained from the global state.
- isLoggedIn (boolean): Represents whether the user is logged in, obtained from the global state.
- jwt (string): Stores the JSON Web Token (JWT) obtained from the global state.
- reports (object|null): Contains the report data fetched from the API or null if data hasn't been fetched yet.
### Methods
- getReports(): A function that fetches the reports data from the API using Axios and updates the reports state.
