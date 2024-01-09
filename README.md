# Repo for development with OpenAI's GPT API.

## Description

This project is a quiz generator that uses ChatGPT to create a specific quiz question about the topic provided by the user. It will return 4 potential answers, with one being the correct one. It is a work-in-progress, and it likely be used as a part of a larger project for learning generation using ChatGPT. More to be determined in the future.

## Tools

This project is build with [React](https://react.dev/), the [OpenAI framework](https://openai.com/blog/openai-api), and a [Flask backend](https://flask.palletsprojects.com/).

## To Run on a Local Device

Under `/client`, run `npm start` to run the React application in your browser.

Under `/server`, run `python app.py` to boot up the local Flask server. An OpenAI API key will need to be provided in the `root` directory within a `.env` file.

### Link to this Github

[GitHub link](https://github.com/majorschwartz/openai-api-dev)