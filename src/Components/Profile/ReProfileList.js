import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FixedSizeList as VList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import ReProfileItem from './ReProfileItem'
import AlphaNumericSlider from '../Util/AlphaNumericSlider'
import FABActionMenu from '../Util/FABActionMenu'

import { alphabetSort } from '../../helpers'

class ReProfileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreateModal: false,
      selectedUuids: []
    }
    this.listRef = React.createRef()
  }

  handleLetterClick = index => {
    this.listRef.current.scrollToItem(index, 'start')
  }

  handleSelect = uuid => {
    const selectedUuids = [...this.state.selectedUuids]
    selectedUuids.push(uuid)
    this.setState({ selectedUuids })
  }

  handleDeselect = uuid => {
    const selectedUuids = [...this.state.selectedUuids]
    const idx = this.state.selectedUuids.findIndex(u => u === uuid)
    selectedUuids.splice(idx, 1)
    this.setState({ selectedUuids })
  }

  handleAction = action => {}

  renderProfileItem = ({ index, style }) => {
    const contact = this.props.list[index]
    const selected = this.state.selectedUuids.includes(contact.uuid)

    return (
      <ReProfileItem
        contact={contact}
        selected={selected}
        style={style}
        onSelect={this.handleSelect}
        onDeselect={this.handleDeselect}
      />
    )
  }

  render() {
    const isSelecting = this.state.selectedUuids.length > 0
    this.props.isSelecting(isSelecting)

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

        <AlphaNumericSlider
          list={this.props.list}
          onClick={this.handleLetterClick}
        />

        {isSelecting && <FABActionMenu onClick={this.handleAction} />}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let list = []
  if (ownProps.listType === 'groups') {
    list = Object.values(state.groupState.groups).sort((a, b) =>
      alphabetSort(a.name, b.name)
    )
  } else if (ownProps.listType === 'contacts')
    list = Object.values(state.contactState.contacts).sort((a, b) =>
      alphabetSort(a.name, b.name)
    )
  return { list }
}

ReProfileList.propTypes = {
  listType: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  isSelecting: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(ReProfileList)
