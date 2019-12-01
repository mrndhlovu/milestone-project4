# [React and Django Unicorn Attractor Web App](https://the-unicorn-attractor.herokuapp.com/)

## Milestone Project 4

[![Build Status](https://travis-ci.org/mrndhlovu/milestone-project4.svg?branch=master)](https://travis-ci.org/mrndhlovu/milestone-project4)

This is the last milestone project for the Code Institute Full Stack Frameworks With Django. The Unicorn attractor app is an issue tracker where users can sign up and submit code issue ticket. Bug issues are given priority when enough votes are made for a ticket and features will require a €5 payment. User can sign up for a `Unicorn Free membership` for a free account or `Unicorn Pro membership` for an `ALL ACCESS` account which costs €10 per month.

The project is built using a number of technologies the core being Django for the backend and React JS for frontend.

## UX

---

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

Login page for the user. When authenticated, user will be redirected to the user profile page other error message will be triggered if there is any.

#### Sign up page

All users have to sign up for a free account on this page, then can upgrade to an all access account if required.

Note: Form validation is handled by [`React Redux Form`](https://redux-form.com/6.4.0/examples/simple/) on the login, sign up, create-ticket and create-article pages.

#### Create ticket page

Create ticket form has radio buttons which when selected a `bug` or `feature` ticket type is created, and the default being ticket `bug` and the status as `to-do`.

#### Create article page

User will create an article from this page.

#### User profile page

Users will have access to this page if authenticated. If a purchase is completed, users should be redirected to this page and their order listed under purchases. The `updated account` option gives the user an choice to downgrade or deactivate their account if signed up for a Unicorn Pro account and thes deactivate account is the only option if the user has a Unicorn Free account. The user also has an option to update their personal information on the update profile form.
