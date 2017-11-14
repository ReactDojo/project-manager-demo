export const otherAttributes = [
  { title: 'Mobile', value: 'mobile', type: 'phoneNumber' },
  { title: 'Home', value: 'home', type: 'phoneNumber' },
  { title: 'Company', value: 'company', type: 'company' },
  { title: 'Work', value: 'work', type: 'phoneNumber' },
  { title: 'Notes', value: 'note', type: 'paragraph' }
];



const userList = JSON.parse(
  `[{
  "id": 22143,
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dvdwinden/128.jpg",
  "firstName": "Benjamin",
  "lastName": "Jacobi",
  "name": "Benjamin Jacobi",
  "mobile": "(023) 302-3161 x60451",
  "home": "(136) 403-0476 x8388",
  "company": "Casper Inc",
  "work": "(399) 506-9438",
  "note": "Quisquam et nisi. Dicta in ut eos consequatur ipsum omnis. Quisquam doloremque error praesentium sapiente et vitae. Omnis facere sint nulla similique vel voluptatem officia deleniti."
}]`
);

export default class getData {
  constructor(size = 10) {
    this.size = size;
    this.datas = [];
  }

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }
  json(response) {
    return response.json()
  }
  dataModel(index) {
    return userList[index];
  }
  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }
    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }
    return this.datas[index];
  }
  getAll() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(this.status)
      .then(this.json)
      .then(function(data) {
        return data;
      });
  }

  getSize() {
    return this.size;
  }
}
