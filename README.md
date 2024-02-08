# Buttermilk Kitchen Secret Shopper App

## Introduction

This is a freelance project for a restaurant, Buttermilk Kitchen in Atlanta, GA. This application was created to help initialize a "Secret Shopper" program to help the restaurant improve their customer experience based on their feedback.

## Overview

Designed mobile-first since most users will be in the restaurant during use and incorporating Buttermilk Kitchen's branding to provide a cohesive experience for the user reaching this form via their marketing site. This application was built using Next.js 14, utilizing it's server-side rendering and API routes, to create a password protected survey form that sends collected survey data, including an optional photo, on completion to the store manager and the respondent. After that, the store manager coordinates with the respondent to reward them with a gift card to the restaurant.

## Key Features

- Automated batch email service - Creates separate emails with content tailored to both the respondent and store manager. After the form is validated, the emails are sent via a Node.js API route to Resend, an automated email service.
- Photo upload - A user is given the option to upload a picture from their visit, which can be taken directly from a mobile device's camera or uploaded from any device, and send it along with the rest of the survey data via email. The images are scaled down to a maximum height of 800px and quality is determined based on file size, converted from HEIC or any other format, and then sent in jpg format.
- Dynamic question generation - Created with best practices and scalability in mind, survey questions are created by processing an array of question content, allowing for easy updating and addition of questions in the future. The content is formed in to Question class instances, then based on their types the questions are formed into components that represent the question response types (multiple choice and text).
- Form validation - Questions in this form can either be optional or required and on submission the form is checked over to make sure responses have been made for required fields, alerting the user to questions they did not respond to.
 
## Screenshots

Since this is a private, password-protected app, here are some screen shots of the app. If you would like a live demo of this app, please let me know!

