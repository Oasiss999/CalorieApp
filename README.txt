This application is a calorie tracker app called Burn!


An overview of what is happening:
    LOGIN SCREEN
    At the login in screen the user is prompted to enter a username and password combination.
    They have to be exactly the same as the ones used in the sign up page. once entered the user can click signin
    or signup.

    SIGNUP SCREEN
    The user can sign up by entering a username password and email(NOTE:BURN! does not sell info yet).
    In this screen the user must fill out all fields and username must be unique and not being already used.
    There are no restrictions on length of any og the fields or any other requirments. Just enter text sign up and 
    you will be taken back to the sign in screen to login with your new account.

    NOTE: once a user signs in their data that they enter will be save held together using a JWT(JSON Web Token) which is
    held in ASYNC storage which can be accesed by any screen with in the program to link data to the user. Their unique 
    Object id which is given to the user by mongodb during their profile creation what is being held within the JWT.

    HOME SCREEN
    On the home screen the users Total calories will be displayed from that day with a progress bar under it. The user 
    has the ability to enter a daily goal which is used in the progress bar to visualize the data. In the home screen the 
    user can enter a meal, all meals are kept in a document together from all users. There is a drop down menu when you click
    the gear icon which allows the user to go to a new screen to enter a daily goal or to delete their acount. 

    Meals SCREEN
    Here the user enters a meal name, time of meal, amount of calories, and date which is used to 
    group meals with the same date. Once they enter the meal they will automatically go back to the homescreen and 
    will see that if the date of the meal is the current date then their today's calories will be updated.

    CHANGE DAILY GOAL SCREEN 
    Here the user enters their daily goal and clicks submit which will update their daily goal if they have one or create one if they
    dont have one. Once the click submit they return to the main screeen where they can see that the progress bar will 
    now represent their current progress using the daily goal they just entered.

    DELETE ACCOUNT SCREEN
    Once the user click delete account on the main screen they are take to a new screen where they must click another button
    called Delete Account( to avoid accidental deletions). Once they click it all data associated with their unique id is 
    deleted from all collections in the database and they are taken back to the sign in screen.


CODE EXPLAINED:

NOTE: The application is built in react native using JS. The database used is mongodb and im connecting to it using the 
axios library.

