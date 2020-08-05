import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_INSTRUMENTS } from '../../queries'
import { List } from 'antd'
import Instrument from '../listItems/Instrument'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Instruments = ({ idArtist }) => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_INSTRUMENTS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.instruments.map(({ id, year, brand, type, price, artistId }) => {
          if (artistId === idArtist) {
              return (
                <List.Item key={id}>
                <Instrument
                  key={id}
                  year={year}
                  brand={brand}
                  type={type}
                  price={price}
                  artistId={artistId}
                />
              </List.Item>
            )
          }
      })}
    </List>
  )
}

export default Instruments
