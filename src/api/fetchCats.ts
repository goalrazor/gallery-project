const config = {
  baseUrl: "https://api.thedogapi.com/v1/images/",
  headers: {
    "Content-Type": "application/json"
  }
};

type TConfig = {
  baseUrl: string,
  headers: {
    [key: string]: string
  }
}

class FetchCats {
  private _url: string;
  private _headers: {
    [key: string]: string
  };

  constructor({ baseUrl, headers }: TConfig) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res: Response) {
    if (res.status === 200) {
      return res.json()
    }
    return res.json().then((res) => {
      throw res.message
    })
  }
  getCats(count: number) {
    return fetch(`${this._url}search?limit=${count}`).then(this._checkResponse)
  }

}

const fetchCats = new FetchCats(config);
export default fetchCats;