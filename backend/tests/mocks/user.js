export const createUserDetails = [
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'omodada',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobRole: 'employee',
    department: 'Engineering',
    address: '3,Talomoola Street, ajumobi, Lagos.'
  },
  {
    username: 'Abdullahi',
    firstName: 'Adullahi',
    lastName: 'kabdullahi',
    email: 'abdullahi@gmail.com',
    password: 'abdullahi123',
    gender: 'male',
    jobRole: 'employee',
    department: 'Engineering',
    address: '3, howareyou str'
  },
  {
    username: 'marusoft',
    firstName: 'kehinde',
    lastName: 'alimi',
    email: 'opeyemi@teamwork.com',
    password: 'teamdevc19',
    gender: 'male',
    jobRole: 'employee',
    department: 'Language',
    address: '3, Olourunosebi street, Oni, Lagos.'
  }
];


export const wrongCreateUserDetails = [
  // undefined email
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },

  // email contain space
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyoso  re@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // invalid email format
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosoregmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // existing user email
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined firstname
  {
    username: 'moyo',
    lastName: 'kmoyosore',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // spaced firstname
  {
    username: 'moyo',
    firstName: 'moyo sore',
    lastName: 'kmoyosore',
    email: 'moyosoreoluwa@teamwork.com',
    password: 'teamdevc19',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // firstname length short
  {
    username: 'moyo',
    firstName: 'mo',
    lastName: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined lastname
  {
    username: 'moyo',
    firstName: 'moyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // spaced lastname
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoy osore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // short lastname
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'km',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // password undefined
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosore@gmail.com',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // password length short
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'mo123',
    gender: 'female',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefinde gender
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    jobRole: 'employee',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined jobrole
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    department: 'Accounting',
    address: '3, howareyou str'
  },
  // undefined department
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
    address: '3, howareyou str'
  },
  // undefined address
  {
    username: 'moyo',
    firstName: 'moyosore',
    lastName: 'kmoyosore',
    email: 'moyosore@gmail.com',
    password: 'moyosore123',
    gender: 'female',
    jobRole: 'employee',
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
