import { Zipcode } from "@/app/basic-table/page";

export const zipcodes: Zipcode[] = [
  {
    "zipcode": "90001",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90002",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90003",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90004",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90005",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90006",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90007",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90008",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90011",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90012",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90013",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90014",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  },
  {
    "zipcode": "90015",
    "created_at": "2024-04-22T15:58:07.879588+00:00",
    "updated_at": "2024-04-22T15:58:07.879588+00:00"
  }
]


export default function generateZipcodesData(n: number) {
  let zipcodes = []
  for (let i = 1; i < n; i++) {
    const zipNumber = Math.floor(Math.random() * 99999)
    const zipcode =  String(zipNumber).padStart(5, "0")

    const day = Math.floor(Math.random() * 30)
    const month = Math.floor(Math.random() * 12)
    const createdDate = new Date(2012, month, day)
    const updatedDate = new Date(2015, month, day)
    let data: Zipcode = {
      zipcode: zipcode,
      created_at: createdDate.toISOString(),
      updated_at: updatedDate.toISOString()
    }
    zipcodes.push(data)
  }
  return zipcodes
}