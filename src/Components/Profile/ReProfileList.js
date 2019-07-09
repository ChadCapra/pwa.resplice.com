import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { FixedSizeList as VList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import ReProfileItem from './ReProfileItem'
import AlphaNumericSlider from '../Util/AlphaNumericSlider'

class ReProfileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toBulkShare: false,
      selectedUuids: []
    }
    this.listRef = React.createRef()
  }

  handleLetterClick = index => {
    this.listRef.current.scrollToItem(index, 'start')
  }

  renderProfileItem = ({ index, style }) => {
    const profile = this.props.list[index]
    const selected = this.props.selectedUuids.includes(profile.uuid)

    return (
      <ReProfileItem
        profile={profile}
        selected={selected}
        style={style}
        onSelect={this.props.handleSelect}
        onDeselect={this.props.handleDeselect}
      />
    )
  }

  render() {
    if (this.state.toBulkShare) return <Redirect push to="/share/bulk" />

    return (
      <div className="re-profile-list">
        <AutoSizer>
          {({ height, width }) => (
            <VList
              ref={this.listRef}
              height={height}
              itemCount={this.props.list.length}
              itemSize={60}
              width={width}
              itemData={this.props.list}
              overscanCount={10}
            >
              {this.renderProfileItem}
            </VList>
          )}
        </AutoSizer>

        {this.props.list.length > 0 && (
          <AlphaNumericSlider
            list={this.props.list}
            onClick={this.handleLetterClick}
          />
        )}
      </div>
    )
  }
}

ReProfileList.propTypes = {
  list: PropTypes.array.isRequired,
  selectedUuids: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleDeselect: PropTypes.func.isRequired
}

export default ReProfileList
