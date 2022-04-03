import { getCurrentDate, getLastWeekDate } from "./Date";

class NewsApi {
  /** constructor of NewsApi class.
   * @param  baseUrl - the URL to make the request to.
   */
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._from = getLastWeekDate();
    this._to = getCurrentDate();
    this._pageSize = "100";
    this._apiKey = "6c9f8d1c5f824fc8bef7fba2767e4a0e";
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  /** this function returns news from 7 days prior to current date. */
  getNews(q) {
    return fetch(
      `${this._baseUrl}/everything?q=${q}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}&apiKey=${this._apiKey}`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const newsApi = new NewsApi("https://nomoreparties.co/news/v2");

export default newsApi;
