import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FixedSizeList as VList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { setBulkShares } from '../../state/actions'

import ReProfileItem from './ReProfileItem'
import AlphaNumericSlider from '../Util/AlphaNumericSlider'
import FABActionMenu from '../Util/FABActionMenu'

import { alphabetSort, handleBulkAction } from '../../helpers'

class ReProfileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreateModal: false,
      toBulkShare: false,
      list: this.props.list.map(item => ({ ...item })),
      selectedUuids: []
    }
    this.listRef = React.createRef()
  }

  handleLetterClick = index => {
    this.listRef.current.scrollToItem(index, 'start')
  }

  handleSelect = uuid => {
    const selectedUuids = [...this.state.selectedUuids]
    const list = [...this.state.list]
    const itemIdx = list.findIndex(item => item.uuid === uuid)
    list[itemIdx].selected = true
    selectedUuids.push(uuid)
    this.setState({ selectedUuids, list })
  }

  handleDeselect = uuid => {
    const selectedUuids = [...this.state.selectedUuids]
    const list = [...this.state.list]
    const itemIdx = list.findIndex(item => item.uuid === uuid)
    list[itemIdx].selected = false
    const idx = this.state.selectedUuids.findIndex(u => u === uuid)
    selectedUuids.splice(idx, 1)
    this.setState({ selectedUuids, list })
  }

  handleAction = action => {
    switch (action) {
      case 'share':
        this.props.setBulkShares(
          this.props.list.filter(profile =>
            this.state.selectedUuids.includes(profile.uuid)
          )
        )
        this.setState({ toBulkShare: true })
        break
      case 'email':
        handleBulkAction(action, [])
        break
      case 'sms':
        handleBulkAction(action, [])
        break
      case 'clear':
        this.setState({
          selectedUuids: [],
          list: this.props.list.map(item => ({ ...item }))
        })
        break
      default:
    }
  }

  renderProfileItem = ({ index, style }) => {
    const contact = this.state.list[index]
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
    if (this.state.toBulkShare) return <Redirect push to="/share/bulk" />
    const isSelecting = this.state.selectedUuids.length > 0
    this.props.onSelecting(isSelecting)

    return (
      <div className="re-profile-list">
        <AutoSizer>
          {({ height, width }) => (
            <VList
              ref={this.listRef}
              height={height}
              itemCount={this.state.list.length}
              itemSize={60}
              width={width}
              itemData={this.state.list}
              overscanCount={10}
            >
              {this.renderProfileItem}
            </VList>
          )}
        </AutoSizer>

        <AlphaNumericSlider
          list={this.state.list}
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
  } else if (ownProps.listType === 'contacts') {
    list = Object.values(state.contactState.contacts).sort((a, b) =>
      alphabetSort(a.name, b.name)
    )
  } else if (ownProps.listType === 'custom') {
    list = ownProps.list
  }
  return { list }
}

ReProfileList.propTypes = {
  listType: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onSelecting: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { setBulkShares }
)(ReProfileList)
