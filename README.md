# [React and Django Unicorn Attractor Web App](https://the-unicorn-attractor.herokuapp.com/)

## Milestone Project 4

[![Build Status](https://travis-ci.org/mrndhlovu/milestone-project4.svg?branch=master)](https://travis-ci.org/mrndhlovu/milestone-project4)

This is the last milestone project for the Code Institute Full Stack Frameworks With Django. The Unicorn attractor app is an issue tracker where users can sign up and submit code issue tickets. Bug issues are given priority when enough votes are made for a ticket and features will require a €5 payment. Users can sign up for a `Unicorn Free membership` for a free account or `Unicorn Pro membership` for an `ALL ACCESS` account which costs €10 per month.

The project is built using a number of technologies the core being Django for the backend and React JS for frontend.

![](/project-media/milestone-project-4.gif)

# UX and Features

From the UX design point of view, the app is setup to be clear to users as to how the app will solve their problem. Using big CTA buttons, clear to read text and balanced contrast of colors, the user is drawn to the functionality of the app and understand what steps they need to take next.

#### Welcome page

From this page the user is given an overview of what the product can do with clear to read CTA buttons which redirect to different parts of the app. On this page and through out the whole app, a hero header is used to clearly help the user understand what elements or features they can expect from a page. As common practice, the mobile view of the app uses a `hamburger menu` to open or hide navigation links.

#### Dashboard page

This page shows all bug and feature tickets that have been submitted, indicating the progression or status of a ticket. Each ticket in the `Backlog` or `Up next` column has an indicator showing how far the ticket is from moving to `In Progress` status which is determined by the number of votes the ticket has.
If each ticket gets a minimum of 2 votes the ticket will automatically move to `In Progress` status and if a ticket has been resolved by admin it moves to the `Closed` column.

#### Pricing page

On the pricing page, users are shown the two account types they can sign up for. Each option lists what access they will have when they select an account to sign-up for.

#### Tickets page

The tickets page, lists all filed tickets indicating the owner of a ticket, how long ago it was created, the status and type of ticket filed. If a ticket has a solution, a `Get solution` button is shown otherwise the `Fix it now` button is rendered. A user will be alerted if they try to pay for a ticket which is in their purchases list in the user profile page.

#### Ticket detail page

From the ticket detail page, users see a more detailed look of a ticket filed. From this page a user can add ticket to a shopping cart, see a ticket solution if a payment is made else the will be prompted to pay first. User can also vote for a ticket and views are tracked everytime the ticket is open.
If a user opens a ticket they filed or own, they are given an option to edit, delete as well as create a new ticket.

The comments section from this page is restricted to users who have upgraded to an `All access account`.

#### Article detail page

Similar to the ticket detail page, users can read more on an article, like or vote for the article and views are tracked also from this page. The owner of an article has an option to update the article image, delete or edit the article.

Again the comments section from this page is restricted to users who have upgraded to an `All access account`.

Should a user try to open this page while on a free account, they will see a restriction notification modal and redirected to the pricing page.

#### Blog page

This page lists all blog articles created. A `Read more` button is used to redirect to the article detail page or by clicking the article title.

#### Login page

Login page for the user. When authenticated, users will be redirected to the previous page they where on otherwise an error message will be shown if there is an authentification issue.

#### Sign up page

All users have to sign up for a free account on this page, then can upgrade to an all access account if required.

Note: Form validation is handled by [`React Redux Form`](https://redux-form.com/6.4.0/examples/simple/) on the login, sign up, create-ticket and create-article pages.

#### Create ticket page

Create ticket form has radio buttons which when selected a `bug` or `feature` ticket type is created, and the default being ticket `bug` and the status as `to-do`.

Should a user try to open this page while on a free account, they will see a restriction notification modal and redirected to the pricing page.

#### Create article page

Users will create an article from this page. If an article is created successfully, a default image is provided until a user updates it.

Should a user try to open this page while on a free account, they will see a restriction notification modal and redirected to the pricing page.

#### User profile page

Users will have access to this page if authenticated. If a purchase is completed, users should be redirected to this page and their order listed under purchases. The `update account` option gives the user a choice to downgrade or deactivate their account if signed up for a Unicorn Pro account, however the deactivate account is the only option if the user has only a Unicorn Free account. The user also has an option to update their personal information on the update profile form as well as change their profile image.

#### Checkout page

From here a user will see all items in their cart, they can remove items from the cart or make a payment. If a payment is successful, the user is redirected to the user profile page.

# Technologies Used

1.  [Django](https://www.djangoproject.com/) the core backend of the app which the frontend depends on.
2.  [React JS](https://reactjs.org/): a javascript library developed by Facebook to build UIs.
3.  [NodeJS](https://nodejs.org/) a JavaScript runtime built engine.
4.  [Npm](https://www.npmjs.com/) frontend package manager
5.  [Semantic UI React](https://react.semantic-ui.com/): a frontend framework like bootstrap but with more advanced build tools mostly used on the site for handling the majority of the layout and some css styling.
6.  [Amazon AWS](https://aws.amazon.com/): for storing images.
7.  [Pipenv](https://github.com/pypa/pipenv): packet manager for Python
8.  CSS: for styling parts of the website
9.  [JSX](https://reactjs.org/docs/introducing-jsx.html): syntax extension for javascript.
10. [VS Code](https://code.visualstudio.com/): Integrated Development Environment
11. [Heroku](https://www.heroku.com/): App deployment.
12. [Git](https://git-scm.com/): for version tracking of the app.
13. Google chrome development tools.
14. [Draw.io](https://www.draw.io/): for wire-frame development
15. [Jasmine](https://jasmine.github.io/): unit testing on the frontend
16. [Stripe](https://stripe.com/ie) for payment processing.
17. [Github Desktop](https://desktop.github.com/) for version tracking of the app off the terminal

Note: the `package.json` file for the frontend and `Pipfile` for backend located in the root folder, lists all libraries used in the project.

### Cloning this repo to run locally will require the following steps

Note: To have this working properly, you will have to setup a [Stripe](https://stripe.com/ie) account, a product with 2 price plans, 'free' and 'pro'. You will also need an AWS S3-bucket.

#### Saving images to AWS

- First setup an AWS bucket,
- Then setup `react-s3` and `aws-s3` configuration on the frontend like this:

Follow [theses steps to setup AWS-S3 on the frontend](https://www.npmjs.com/package/aws-s3)

AWS Bucket folder structure

```
root folder
    defaults: (stores all default images used through out the project)
    mediafiles:
        posts: (stores article images )
        users: (stores user images )
```

#### How an image is uploded:

- A request is sent to the aws server to store an image.
- If the image is stored successfully, a response with a url of the image is returned.
- The response url received is then sent to the django server which will update the image field for an article or user profile with the url.
- Then it is presented on the frontend `Image` component like so. `<Image src={IMAGE_URL} />`

Frontend setup

1. Click the `Clone or download` button, then copy the `Clone with HTTPs` URL which starts with `https://github/......`
2. Open your preferred terminal and type `git clone` and paste the URL you just copied and press enter.
3. The repo should be copied to your local directory.
4. Make sure you have these installed:
   - [NodeJS](https://nodejs.org/)
   - [npm](https://www.npmjs.com/)
   - [Django](https://www.djangoproject.com/)
   - [Pipenv](https://github.com/pypa/pipenv)
5. cd into the project folder by typing `cd milestone-project4`
6. If npm is installed, you should be able to run `npm install` to install all dependencies in the `package.json` file.
7. The frontend side of the app has environmental variables to be set, in a `.env` file, add these variables

```
    - REACT_APP_STRIPE_PUBLISHABLE='SOME_STRIPE_TOKEN'
    - REACT_APP_DEV_API_URL=http://localhost:8000
    {Also include the aws s3 bucket config variables}
```

Backend setup

1. First lets create a virtual environment to run Django, run `pipenv shell`.
2. Install python version 3.6.5 by typing `pipenv install python==3.6.5`.
3. If you are using VS Code, select a `Python interpreter`, press `command + p`, then type `> interpreter` and select `python interpreter`

![](/project-media/interpreter.png)

4. Select the version matching python you just installed, in this case its python 3.6.5
5. Type `pipenv install` to install all django dependencies in the `Pipfile`
6. The project depends on environmental variables, create a `.env` file in the root of the project with a the following variables

```
    *  SECRET_KEY="PROJECT_SECRET_KEY"
    *  DEVELOPMENT=True

```

7.  Create a file called `db.sqlite3` in the root folder
8.  Because we set `DEVELOPMENT` to True in the `.env` file, sqlite3 will be the default local database
9.  Now in the console, type `python3 manage.py makemigrations`
10. Then `python3 manage.py migrate`
11. Create a superuser `python3 manage.py createsuperuser`(setup a username, email and password)
12. Run the app by typing, `python3 manage.py runserver`
13. Login with the credentials you set on setp 11,
14. In the `Django admin`, under `MEMBERSHIPS` select `Memberships`
15. Setup a stripe account and create 2 membership plans, in this case its a free and pro plan.
16. Add 2 membership types

```
##### First membership
Slug = free
Membership type: free
Price: 0
Stripe plan id: {free plan id you created on step 15}

 ##### Second membership
Slug = pro
Membership type: pro
Price: 10
Stripe plan id: {pro plan id you created on step 15}

```

17. When a superuser is created, they do not have a membership plan assigned to their account by default, lets do that. Click on `User memberships` under the memberships app in django admin.
18. Select the superuser name and assign them a `membership` and click save.
19. Now in the Accounts app, click `User profiles`, click the superuser name then select `free` as the `Active membership`
20. With this done, any new user signing up will be assigned a free membership by default.

## Testing

- Frontend:
  [Jasmine](https://jasmine.github.io/) is used for frontend tests. The `spec` folder in the root of the project holds all test files. Because react allows us to break components into small unit, the test will check the functionality of each component providing the default `props` which allow a component to be created for a successful test. To run the tests type `npm test` in the terminal.

- Backend tests
  Django automated tests is used to check the correct functionality of each app's models and expected url endpoints. To run the tests type `python3 manage.py test` in the terminal.

Cross-Browser and responsive testing was done on the following browser development tools

- Firefox
- Microsoft Edge
- Chrome

## Deployment

Heroku is the host of this project.
Requirements for a successful project deployment requires the following:

- Create a new heroku app.
- Instead of a `requirements.txt` file, this project expects a `Pipfile` to be in the root folder.
- Also make sure the `Procfile` is in the root folder, as it lets django know how to run the project.
- Link the Github repo of the project to heroku, so you only have to push the final project to Github and heroku will be automatically updated.
- Create all required environmental variables expected for both frontend and backend in heroku's `Config vars` section.
- Set DEBUG mode to false.
- Then push the final project to Github, heroku should inform you if there is an issue with the project build in the `Activity` section.
- If the build is successful, click the `Open app` button.
- The project should run successfully.

## Bug & Upgrade issues

There are bugs and upgrades that need to be made on the project, these include:

```
Bug issues:

* Django tests are passing when run locally but Fails on Travis CI.
* Figure out why alerts show up when using the url via parament. eg when you a user opens the profile page. If the page is refreshed, an alert will pop-up which is only supposed to show when coming from a particular url.
* These is no file type filter when a user is uploading and  image.

Upgrade Issue:

* Add soft delete functionality, allowing a user to reactivate a deleted account.
* Allow admin to drag and drop ticket cards in the dashboard, into different columns.
* Allow users to view and rate each other's profiles.
```

# Acknowledgements and Credits

An amazing experience and learning material, thanks to [Code Institute](https://codeinstitute.net/)

- The `Membership` app of the project was inspired by [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA): YouTube channel.
- In the `Cart` app and the idea of using `django polymorphism models` was thanks to [CodingEntrepreneurs](https://www.youtube.com/channel/UCWEHue8kksIaktO8KTTN_zg): YouTube channel.
- Implementing React for my frontend was inspired by Stephen Grinder's [Modern React with Redux course!](https://www.udemy.com/course/react-redux/).
- Default images are from [Pixabay](https://pixabay.com/)
- Image compression is thanks to [tinypng.com](https://tinypng.com/)

# Screenshots

![](/project-media/home.png)![](/project-media/blog.png)![](/project-media/tickets.png)![](/project-media/dashboard.png)
