class MainApi {
  /** constructor of MainApi class.
   * @param  baseUrl - the URL to make the request to.
   */
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  updateToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  saveArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ keyword, title, text, date, source, link, image }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const mainApi = new MainApi({
  baseUrl: "https://news-explorer-effip-api.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    authorization: "",
  },
});

export default mainApi;
