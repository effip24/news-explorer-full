# news-explorer-api

The API of "news-explorer" a service where users can search for news articles and save them to their profiles.

#### Link to the API: https://api.effip24-news.students.nomoreparties.sbs

#### Technologies and Techniques

<p align="left"> 
 <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="express js" width="40" height="40"/>

<img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_plain_wordmark_logo_icon_146423.png" alt="mongoDB" width="40" height="40"/>
</p>

#### To run the server

```
  git clone https://github.com/effip24/news-explorer-api.git
```

```
  cd news-explorer-api
```

```
  npm install
```

```
  npm run start
```

#### Link to the API:

| end point                      | Description                            |
| :----------------------------- | :------------------------------------- |
| `POST /signin`                 | authorization                          |
| `POST /signup`                 | registration                           |
| `GET /users`                   | returns all users                      |
| `GET /users/me`                | returns a logged in user               |
| `GET /articles`                | returns all articles saved by the user |
| `POST /articles`               | creates an article                     |
| `DELETE /articles/:articleId ` | deletes the stored article by \_id     |
