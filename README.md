# [React and Django Unicorn Attractor Web App](https://the-unicorn-attractor.herokuapp.com/)

## Milestone Project 4

[![Build Status](https://travis-ci.org/mrndhlovu/milestone-project4.svg?branch=master)](https://travis-ci.org/mrndhlovu/milestone-project4)

This is the last milestone project for the Code Institute Full Stack Frameworks With Django. The Unicorn attractor app is an issue tracker where users can sign up and submit code issue tickets. Bug issues are given priority when enough votes are made for a ticket and features will require a €5 payment. Users can sign up for a `Unicorn Free membership` for a free account or `Unicorn Pro membership` for an `ALL ACCESS` account which costs €10 per month.

The project is built using a number of technologies the core being Django for the backend and React JS for frontend.

# UX and Features

From the UX design point of view, the app is setup to be clear to users as to how the app will solve their problem. Using big CTA buttons, clear to read text and balanced contrast of colors, the user is drawn to the functionality of the app and understand what steps they need to take next.

#### Welcome page

From this page the user is given an overview of what the product can do with clear to read CTA buttons which redirect to different parts of the app. On this page and through out the whole app, a hero header is used to clearly help the user understand what elements or features they can expect from a page. As common practice, the mobile view of the app uses a `hamburger menu` to open or hide navigation links.

#### Dashboard page

This page shows all bug and feature tickets that have been submitted, indicating the progression or status of a ticket. Each ticket in the `Backlog` or `Up next` column has an orange indicator showing how far the ticket is from moving to `In Progress` status which is determined by the number of votes the ticket has. If each ticket gets a minimum of 5 votes the ticket will automatically move to `In Progress` status and if a ticket has been resolved it moves to the `Closed` column.

#### Pricing page

On the pricing page, users are shown the two account types they can sign up for. Each option lists what access they will have when they select an account to sign-up for.

#### Tickets page

The tickets page, lists all filed tickets indicating the owner of a ticket, how long ago it was created, the status and type of ticket filed. If a ticket is a feature, an `Add to Cart` button is shown.

#### Blog page

This page lists all blog articles created. A `Read more` button is used to redirect to the article detail page or by clicking the article title.

#### Login page

Login page for the user. When authenticated, user will be redirected to the user profile page otherwise an error message will be triggered if there is any.

#### Sign up page

All users have to sign up for a free account on this page, then can upgrade to an all access account if required.

Note: Form validation is handled by [`React Redux Form`](https://redux-form.com/6.4.0/examples/simple/) on the login, sign up, create-ticket and create-article pages.

#### Create ticket page

Create ticket form has radio buttons which when selected a `bug` or `feature` ticket type is created, and the default being ticket `bug` and the status as `to-do`.

#### Create article page

User will create an article from this page.

#### User profile page

Users will have access to this page if authenticated. If a purchase is completed, users should be redirected to this page and their order listed under purchases. The `updated account` option gives the user an choice to downgrade or deactivate their account if signed up for a Unicorn Pro account and the deactivate account is the only option if the user has a Unicorn Free account. The user also has an option to update their personal information on the update profile form.

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
16. [Stripe]() for payment processing.
17. [Github Desktop](https://desktop.github.com/) for version tracking of the app off the terminal

Note: the `package.json` file for the frontend and `Pipfile` for backend located in the root folder, lists all libraries used in the project.

### Saving images to AWS
* First setup an AWS bucket, 
* Then setup `react-s3` and `aws-s3` configuration on the frontend like this

```
import S3 from "aws-s3";
import axios from "axios";

    // AWS bucket configurations

    const config = {
        bucketName: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
        dirName: `${process.env.REACT_APP_AWS_MEDIA_POST}`,
        region: `${process.env.REACT_APP_AWS_REGION}`,
        accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY}`,
        secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`
    };

    // request
    function requestAwsFileUpload(file, fileName) {
    const S3Client = new S3(config());
    return S3Client.uploadFile(file, fileName);
    }

```

AWS Bucket folder structure

```
root folder 
    defaults: (stores all default images used through out the project)
    mediafiles: 
        posts: (stores article images )
        users: (stores user images )
 ```

#### How an image is uploded:

* A request is sent to the aws server to store an image.
* If the image is stored successfully, a response with a url of the image is returned.
* The response url received is then sent to the django server which will update the image field for an article or user profile with the url. 
* Then it is presented on the frontend `Image` component like so. `<Image src={IMAGE_URL} />`


#### Cloning this repo to run locally will require the following steps

1. Click the `Clone or download` button, then copy the `Clone with HTTPs`  URL which starts with `https://github/......`
2. Open your preferred terminal and type `git clone` and paste the URL you just copied and press enter.
3. The repo should be copied to your local directory.
4. Make sure you have these installed:
   - [NodeJS](https://nodejs.org/)
   - [npm](https://www.npmjs.com/)
   - [Django](https://www.djangoproject.com/)
   - [Pipenv](https://github.com/pypa/pipenv)
5. cd into the project folder by typing `cd milestone-project4`
6. If npm is installed, you should be able to run `npm install` to install all dependencies in the `package.json` file.

Backend setup
1. First lets create virtual environment to run Django, run `pipenv shell`.
2. Install Django version 3.6.5 by typing `pipenv install django==3.6.5`.
3. If you are using VS Code, select a `Python interpreter`, press `command + p`, then type `> interpreter` and select `python interpreter`
![](/wireframes/interpreter.png)
4. Select the matching the django version you just installed, in this case its django 3.6.5



2. Type `pipenv install` to install all django dependencies in the `Pipfile`
3. The project depends on environmental variables, create a `.env` file in the root of the project with a `SECRET_KEY` variable e.g SECRET_KEY="PROJECT_SECRET_KEY"




. The frontend side of the app also has environmental variables to be set, in the `.env` file, add these variables
    - REACT_APP_STRIPE_PUBLISHABLE='SOME_STRIPE_TOKEN'
    - REACT_APP_DEV_API_URL=http://localhost:8000
11.    


## Testing

* Frontend: 
[Jasmine](https://jasmine.github.io/)is used for frontend tests, The `spec` folder in the root of the project holds all test files. Because react allows us to break components into small unit, the test will check the functionality of each component providing the default `props` which allow a component to be created for a successful test. To run the tests type `npm test` in the terminal.

* Backend tests
Django automated tests is used to check the correct functionality of each app's models and expected url endpoints. To run the tests type `python3 manage.py test` in the terminal.

Cross-Browser and responsive testing was done on the following browser development tools

- Firefox
- Microsoft Edge
- Chrome 


## Deployment

Heroku is the host of this project. 
Requirements for a successful project deployment requires the following:

* Create a new heroku app.
* Instead of a `requirements.txt` file, this project expects a `Pipfile` to be in the root folder.
* Also make sure the `Procfile` is in the root folder, as it lets django know how to run the project.
* Link the Github repo of the project to heroku, so you only have to push the final project to Github and heroku will be automatically updated.
* Create all required environmental variables expected for both frontend and backend in heroku's `Config vars` section.
* Set DEBUG mode to false.
* Then push the final project to Github, heroku should inform you if there is an issue with the project build in the `Activity` section. 
* If the build is successful, click the `Open app` button. 
* The project should run successfully.


# Acknowledgements and Credits
An amazing experience and learning material, thanks to [Code Institute](https://codeinstitute.net/)

* The `Membership` app of the project was inspired by  [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA):  YouTube channel.
* In the `Cart` app and the idea of using `django polymorphism models` was thanks to [CodingEntrepreneurs](https://www.youtube.com/channel/UCWEHue8kksIaktO8KTTN_zg): YouTube channel.
* Implementing React for my frontend was inspired by Stephen Grinder's [Modern React with Redux course!](https://www.udemy.com/course/react-redux/).
* Default images are from [Pixabay](https://pixabay.com/)
* Image compression is thanks to [tinypng.com](https://tinypng.com/)

