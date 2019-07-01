import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FixedSizeList as VList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import ReProfileItem from './ReProfileItem'
import AlphaNumericSlider from '../Util/AlphaNumericSlider'

import { alphabetSort } from '../../helpers'

class ReProfileList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showCreateModal: false,
      contactsSelectable: false,
      contactsSelected: []
    }
    this.listRef = React.createRef()
  }

  handleLetterClick = index => {
    this.listRef.current.scrollToItem(index, 'start')
  }

  handleSelect = uuid => {
    const newUuids = [...this.state.contactsSelected]
    newUuids.push(uuid)
    this.setState({ contactsSelected: newUuids, contactsSelectable: true })
  }

  renderProfileItem = ({ index, style }) => {
    const contact = this.props.list[index]
    const selected = this.state.contactsSelected.includes(contact.uuid)

    return (
      <ReProfileItem
        contact={contact}
        selected={selected}
        selectable={this.state.contactsSelectable}
        style={style}
        onSelect={this.handleSelect}
      />
    )
  }

  render() {
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
  onSelecting: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(ReProfileList)
