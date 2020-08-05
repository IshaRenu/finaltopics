import { gql } from 'apollo-server-express'
import { filter, find, remove } from 'lodash'

const artists = [
  {
    id: '1',
    firstName: 'Eric',
    lastName: 'Clapton'
  },
  {
    id: '2',
    firstName: 'Elton',
    lastName: 'John'
  },
  {
    id: '3',
    firstName: 'Paul',
    lastName: 'McCartney'
  }
]

const instruments = [
  {
    id: '1',
    year: '2019',
    brand: 'Yamaha',
    type: 'Acoustic Guitar',
    price: '4000',
    artistId: '1'
  },
  {
    id: '2',
    year: '2018',
    brand: 'Fender',
    type: 'Electric Guitar',
    price: '1300',
    artistId: '1'
  },
  {
    id: '3',
    year: '2017',
    brand: 'Martin',
    type: 'Acoustic Guitar',
    price: '5000',
    artistId: '1'
  },
  {
    id: '4',
    year: '2019',
    brand: 'Yamaha',
    type: 'Grand Piano',
    price: '13000',
    artistId: '2'
  },
  {
    id: '5',
    year: '2018',
    brand: 'Steinway & Sons',
    type: 'Concert Piano',
    price: '70000',
    artistId: '2'
  },
  {
    id: '6',
    year: '2017',
    brand: 'Fazioli',
    type: 'Concert Piano',
    price: '150000',
    artistId: '2'
  },
  {
    id: '7',
    year: '2019',
    brand: 'Martin',
    type: 'Acoustic Guitar',
    price: '1400',
    artistId: '3'
  },
  {
    id: '8',
    year: '2018',
    brand: 'Kawai',
    type: 'Upright Piano',
    price: '2000',
    artistId: '3'
  },
  {
    id: '9',
    year: '2017',
    brand: 'Roland',
    type: 'Keyboard',
    price: '1200',
    artistId: '3'
  }
]

const typeDefs = gql`
  type Artist {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Instrument {
    id: ID!
    year: Int!
    brand: String!
    type: String!
    price: Int!
    artistId: ID!
  }

  type Query {
    artists: [Artist]
    instruments: [Instrument]
  }

  type Mutation {
    addArtist(id: String!, firstName: String!, lastName: String!): Artist
    addInstrument(id: ID!, year: Int!, brand: String!, type: String!, price: Int!, artistId: ID!): Instrument
    updateArtist(id: String!, firstName: String!, lastName: String!): Artist
    removeArtist(id: String!): Artist
  }
`

const resolvers = {
  Query: {
    artists: () => artists,
    instruments: () => instruments
  },
  Mutation: {
    addArtist: (root, args) => {
      const newArtist = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      artists.push(newArtist)
      return newArtist
    },
    addInstrument: (root, args) => {
      const newInstrument = {
        id: args.id,
        year: args.year,
        brand: args.brand,
        type: args.type,
        price: args.price,
        artistId: args.artistId
      }
      artists.push(newInstrument)
      return newInstrument
    },
    updateArtist: (root, args) => {
      const artist = find(artists, { id: args.id })
      if (!artist) {
        throw new Error(`Couldn't find artist with id ${args.id}`)
      }

      artist.firstName = args.firstName
      artist.lastName = args.lastName
      return artist
    },
    removeArtist: (root, args) => {
      const removedArtist = find(artists, { id: args.id })
      if (!removedArtist) {
        throw new Error(`Couldn't find artist with id ${args.id}`)
      }
      remove(artists, a => {
        return a.id === removedArtist.id
      })
      return removedArtist
    }
  }
}
export { typeDefs, resolvers }
