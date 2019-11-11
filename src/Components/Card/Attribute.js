import React, { Component, createRef } from 'react'

import ActionIcon from '../Util/ActionIcon'
import FlexBox from '../Layout/FlexBox'
import Dropdown from '../Form/Dropdown'

import cx from 'classnames'
import styles from './Card.module.scss'

import { formatAttrValues } from '../../helpers'

const LeftChild = () => {}
const RightChild = () => {}

export default class Attribute extends Component {
  static LeftChild = LeftChild
  static RightChild = RightChild

  state = {
    showDropdown: false
  }

  attributeRef = createRef()

  onSelect = idx => {
    const action = this.props.attribute.actions[idx]
    this.props.handleAction(action.name, this.props.attribute)
  }

  render() {
    const {
      children,
      attribute,
      pending,
      immutableActions,
      noDropdown
    } = this.props

    const AttributeStyle = cx(styles.Attribute, {
      [styles.Pending]: pending
    })

    let childArr = []
    if (children && typeof children !== Array) {
      childArr.push(children)
    } else if (children) {
      childArr = children
    }
    const leftChild = childArr.find(child => child.type === LeftChild)
    const rightChild = childArr.find(child => child.type === RightChild)

    const dropdownActions = attribute.actions.map(action => {
      return (
        <FlexBox direction="row" justify="start" align="center">
          <ActionIcon name={action.icon} fill="#1bbc9b" width="2em" />
          <span style={{ marginLeft: '8px' }}>{action.display_name}</span>
        </FlexBox>
      )
    })

    return (
      <div className={AttributeStyle}>
        {leftChild ? (
          <FlexBox
            direction="column"
            justify="start"
            align="start"
            className={styles.Left}
          >
            {leftChild.props.children}
          </FlexBox>
        ) : (
          <FlexBox justify="start" align="center" className={styles.Left}>
            <ActionIcon
              name={attribute.actions[0].icon}
              fill={immutableActions ? '#C4C4C4' : '#1bbc9b'}
              width="2.5em"
            />
          </FlexBox>
        )}
        <div className={styles.Middle} ref={this.attributeRef}>
          <FlexBox
            direction="column"
            justify="center"
            align="start"
            onClick={() =>
              this.setState({ showDropdown: !this.state.showDropdown })
            }
          >
            <span className={styles.Name}>{attribute.name}</span>
            <span className={styles.Value}>
              {attribute.value ? formatAttrValues(attribute.value) : 'Hidden'}
            </span>
          </FlexBox>
        </div>
        {!noDropdown && this.state.showDropdown && (
          <Dropdown
            show={this.state.showDropdown}
            parent={this.attributeRef.current}
            items={dropdownActions}
            close={() => this.setState({ showDropdown: false })}
            onSelect={this.onSelect}
          />
        )}
        {rightChild ? (
          <FlexBox justify="end" align="center" className={styles.Right}>
            {rightChild.props.children}
          </FlexBox>
        ) : (
          <FlexBox justify="end" align="center" className={styles.Right}>
            <ActionIcon
              name={attribute.actions[1].icon}
              fill={immutableActions ? '#C4C4C4' : '#1bbc9b'}
              width="2.5em"
            />
          </FlexBox>
        )}
      </div>
    )
  }
}
