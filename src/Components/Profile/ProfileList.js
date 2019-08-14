import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FixedSizeList as VList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import ProfileSummary from './ProfileSummary'
import AlphaNumericSlider from '../Util/AlphaNumericSlider'

import styles from './Profile.module.scss'

class ProfileList extends Component {
  constructor(props) {
    super(props)
    this.listRef = React.createRef()
  }

  handleLetterClick = index => {
    this.listRef.current.scrollToItem(index, 'start')
  }

  renderProfileItem = ({ index, style }) => {
    const profile = this.props.list[index]
    return (
      <ProfileSummary
        profile={profile}
        style={style}
        pad
        onClick={this.props.onClick}
        handleSelect={this.props.handleSelect}
        handleDeselect={this.props.handleDeselect}
      />
    )
  }

  render() {
    return (
      <div className={styles.ProfileList}>
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

        {this.props.list.length > 10 && (
          <AlphaNumericSlider
            list={this.props.list}
            onClick={this.handleLetterClick}
          />
        )}
      </div>
    )
  }
}

ProfileList.propTypes = {
  list: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleDeselect: PropTypes.func.isRequired
}

export default ProfileList
