export const createUserDetails = [
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'omodada',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobrole: 'employee',
    department: 'Engineering',
    address: '3,Talomoola Street, ajumobi, Lagos.'
  },
  {
    username: 'Abdullahi',
    firstname: 'Adullahi',
    lastname: 'kabdullahi',
    email: 'abdullahi@gmail.com',
    password: 'abdullahi123',
    gender: 'male',
    jobrole: 'employee',
    department: 'Engineering',
    address: '3, howareyou str'
  },
  {
    username: 'marusoft',
    firstname: 'kehinde',
    lastname: 'alimi',
    email: 'opeyemi@teamwork.com',
    password: 'teamdevc19',
    gender: 'male',
    jobrole: 'employee',
    department: 'Language',
    address: '3, Olourunosebi street, Oni, Lagos.'
  }
];


export const wrongCreateUserDetails = [
  // undefined email
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },

  // email contain space
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyoso  re@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // invalid email format
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosoregmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // existing user email
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined firstname
  {
    username: 'moyo',
    lastname: 'kmoyosore',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // spaced firstname
  {
    username: 'moyo',
    firstname: 'moyo sore',
    lastname: 'kmoyosore',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // firstname length short
  {
    username: 'moyo',
    firstname: 'mo',
    lastname: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined lastname
  {
    username: 'moyo',
    firstname: 'moyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // spaced lastname
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoy osore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // short lastname
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'km',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // password undefined
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosore@gmail.com',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // password length short
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'mo123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefinde gender
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    jobrole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined jobrole
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined department
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    address: '3, howareyou str'
  },
  // undefined address
  {
    username: 'moyo',
    firstname: 'moyosore',
    lastname: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobrole: 'employee',
    department: 'Accounting',
  }
];

export const invalidSigninDetails = [
  // empty email
  {
    password: 'moyosore123'
  },
  // user email not existent
  {
    email: 'osoreoluwa@teamwork.com',
    password: 'teamdevc19',
  },
  // empty password
  {
    email: 'moyosore@gmail.com'
  },
  // password incorrect
  {
    email: 'moyosore@gmail.com',
    password: 'yosore123',
  }
];
