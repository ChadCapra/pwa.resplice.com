import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { RespliceState } from '../../store/store'

import MdSearch from 'react-ionicons/lib/MdSearch'
import Flex from '../shared/layout/Flex'
import AvatarThumbnail from '../shared/avatar/AvatarThumbnail'
import AvatarLoading from '../skeleton/AvatarLoading'

const Search = styled.button`
  position: relative;
  height: 50px;
  width: 100%;
  border: 1px solid var(--light-3);
  border-radius: 5px;
  background-color: white;
  outline: none;
  display: flex;
  align-items: center;
  &:active {
    transform: scale(0.95);
  }
`

const Label = styled.label`
  margin-left: 1em;
  color: var(--text-light);
`

const ThumbnailContainer = styled.div`
  margin-left: 1em;
  &:active {
    transform: scale(0.9);
  }
`

type Props = {
  uuid?: string
}

const HomeHeader = ({ uuid }: Props) => {
  return (
    <Flex justify="between" style={{ width: '100%' }}>
      <Search>
        <MdSearch fontSize="2.8em" color="#1bbc9b" />
        <Label>Resplice</Label>
      </Search>
      <ThumbnailContainer>
        {uuid ? (
          <AvatarThumbnail uuid={uuid} onClick={() => {}} />
        ) : (
          <AvatarLoading />
        )}
      </ThumbnailContainer>
    </Flex>
  )
}

const mapStateToProps = (state: RespliceState) => {
  return {
    uuid: state.userState.profile?.uuid
  }
}

export default connect(mapStateToProps)(HomeHeader)
