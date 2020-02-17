import React, { useRef } from 'react'
import { FixedSizeList as VList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import styled from 'styled-components'

import AlphaNumericSlider from '../Util/AlphaNumericSlider'

const ListContainer = styled.div`
  position: relative;
  height: 100%;
`

type Props = {
  list: any
  children: any
}

const EntityList = ({ list, children }: Props) => {
  const virtualListEl = useRef(null)

  // const handleLetterClick = (idx: number) => {
  //   if (virtualListEl && virtualListEl.current) {
  //     virtualListEl.current.scrollToItem(idx, 'start')
  //   }
  // }

  const renderItem = ({ index, style }: any) => {
    const profile = list[index]
    return React.cloneElement(children, { profile, style })
  }

  return (
    <ListContainer>
      <AutoSizer>
        {({ height, width }) => (
          <VList
            ref={virtualListEl}
            height={height}
            itemCount={list.length}
            itemSize={60}
            width={width}
            itemData={list}
            overscanCount={10}
          >
            {renderItem}
          </VList>
        )}
      </AutoSizer>

      {/* {list.length > 10 && (
        <AlphaNumericSlider list={list} onClick={handleLetterClick} />
      )} */}
    </ListContainer>
  )
}

export default EntityList
