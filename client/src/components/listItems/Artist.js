import React, { useState } from 'react'
import { Card, List, Button } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import UpdateArtist from '../forms/UpdateArtist'
import RemoveArtist from '../buttons/RemoveArtist'
import Instruments from '../lists/Instruments'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Artist = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const [learnClicked, setLearnClicked] = useState(false)

  const fullName = () => {
    return `${props.firstName} ${props.lastName}`
  }

  const handleLearnClick = () => { setLearnClicked(!learnClicked) }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <List.Item key={props.id}>
      {editMode ? (
        <UpdateArtist
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
          <Card
            actions={[
              <EditOutlined key='edit' onClick={handleButtonClick} />,
              <RemoveArtist id={id} firstName={firstName} lastName={lastName} />
            ]}
            style={styles.card}
          >
            {fullName()}
            <Button type="primary" size='small' onClick={handleLearnClick}>
              { learnClicked ? 'Close' : 'Learn more'}
          </Button>
          {learnClicked ? (
            <Card type="inner" title="About">
              <Instruments idArtist={id} />
            </Card>
          ) : ''}
          </Card>
        )}
    </List.Item>
  )
}

export default Artist
