Bài tập:
1 - Chạy được server
2 - Tạo một type mới vẻ resolver của nó 

với type Person gồm 3 trường

name: String!
age: Int!
gender: String!

và gồm các resolvers sau:
persons: [Person] => lấy ra danh sách tất cả person
person_name(name: String): Person => lấy ra 1 Person bằng tên
persons_gender(gender: String): [Person] => lấy ra danh sách Person bằng gender

VD:
với query

query{
  persons {
    name
    age
    gender
  }
  person_name(name: "dungnm") {
    name
    age
  }
  persons_gender(gender: "female") {
    name
  }
}

sẽ trả về kết quả :
{
  "data": {
    "persons": [
      {
        "name": "dungnm",
        "age": 23,
        "gender": "male"
      },
      {
        "name": "hungnv",
        "age": 23,
        "gender": "male"
      },
      {
        "name": "binhnt",
        "age": 30,
        "gender": "male"
      },
      {
        "name": "thuvh",
        "age": 23,
        "gender": "female"
      }
    ],
    "person_name": {
      "name": "dungnm",
      "age": 23
    },
    "persons_gender": [
      {
        "name": "thuvh"
      }
    ]
  }
}